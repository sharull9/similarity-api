import { cn } from "@/lib/utils";
import React, { forwardRef, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof HeadingVariants> & {};

const HeadingVariants = cva(
  "text-black dark:text-white text-center lg:text-left font-extrabold leading-tight tracking-tighter",
  {
    variants: {
      size: {
        default: "text-4xl md:text-5xl lg:text-6xl",
        sm: "text-2xl md:text-3xl lg:text-4xl",
        lg: "text-5xl md:text-6xl lg:text-7xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function (
  { className, size, children, ...props },
  ref
) {
  return (
    <h1
      ref={ref}
      {...props}
      className={cn(HeadingVariants({ size, className }))}
    >
      {children}
    </h1>
  );
});

Heading.displayName = "Heading";

type ParagraphProps = HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof ParagraphVariants> & {};

const ParagraphVariants = cva(
  "max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center",
  {
    variants: {
      size: {
        default: "text-base sm:text-lg",
        sm: "text-sm sm:text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  function ({ className, size, children, ...props }, ref) {
    return (
      <p
        ref={ref}
        {...props}
        className={cn(ParagraphVariants({ size, className }))}
      >
        {children}
      </p>
    );
  }
);

Paragraph.displayName = "Paragraph";
