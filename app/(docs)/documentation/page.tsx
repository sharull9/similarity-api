import DocumentationTabs from "@/components/documentation-tabs";
import { Heading, Paragraph } from "@/components/text-component";
import { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Similarity API | SHARULL | Documentation",
  description: "Text similarity tester API Free and Open source project.",
};

export default function Documention({}: Props) {
  return (
    <div className="container mx-auto max-w-7xl mt-12">
      <div className="flex flex-col items-center gap-6">
        <Heading>Making a request</Heading>
        <Paragraph>api/v1/similarity</Paragraph>
        <DocumentationTabs/>
      </div>
    </div>
  );
}
