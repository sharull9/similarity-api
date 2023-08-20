"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Code from "./code";
import { nodejs, python } from "@/helpers/documention-code";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

type Props = {};

export default function DocumentationTabs({}: Props) {
  return (
    <Tabs defaultValue="nodejs" className="max-w-2xl w-full">
      <TabsList>
        <TabsTrigger value="nodejs">NodeJS</TabsTrigger>
        <TabsTrigger value="python">Python</TabsTrigger>
      </TabsList>
      <TabsContent
        value="nodejs"
        className="border p-3 dark:border-slate-300 rounded-lg"
      >
        <SimpleBar>
          <Code animate language="javascript" code={nodejs} show />
        </SimpleBar>
      </TabsContent>
      <TabsContent
        value="python"
        className="border p-3 dark:border-slate-300 rounded-lg"
      >
        <SimpleBar>
          <Code animate language="python" code={python} show />
        </SimpleBar>
      </TabsContent>
    </Tabs>
  );
}
