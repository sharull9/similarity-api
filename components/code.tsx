"use client";
import React, { useEffect, useState } from "react";
import { Highlight, type Language, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";

type Props = {
  code: string;
  show: boolean;
  language: Language;
  animationDelay?: number;
  animate?: boolean;
};

export default function Code({
  code,
  animate,
  language,
  show,
  animationDelay,
}: Props) {
  const { theme: systemTheme } = useTheme();
  const [text, setText] = useState(animate ? "" : code);
  useEffect(() => {
    if (show && animate) {
      let i = 0;
      setTimeout(() => {
        const interval = setInterval(() => {
          setText(code.slice(0, i));
          i++;
          if (i > code.length) {
            clearInterval(interval);
          }
        }, 15);
        return () => clearInterval(interval);
      }, animationDelay || 150);
    }
  }, [code, animate, show, animationDelay]);

  const lines = text.split(/\r\n|\r|\n/).length;
  const theme =
    systemTheme === "light" ? themes.nightOwlLight : themes.nightOwl;
  return (
    <Highlight code={text} language={language} theme={theme}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={
            className +
            "transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar"
          }
          style={{
            maxHeight: show ? lines * 24 : 0,
            opacity: show ? 1 : 0,
          }}
        >
          {tokens.map((line, i) => {
            // eslint-disable-next-line no-unused-vars
            const { key, ...rest } = getLineProps({ line, key: i });
            return (
              <div key={`line-${i}`} style={{ position: "relative" }} {...rest}>
                {line.map((token, index) => {
                  // eslint-disable-next-line no-unused-vars
                  const { key, ...props } = getTokenProps({ token, i });
                  return <span key={index} {...props} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
}
