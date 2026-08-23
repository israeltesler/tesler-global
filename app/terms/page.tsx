import { LegalDocument } from "@/components/legal/legal-document";
import { createMetadata } from "@/lib/metadata";
import { legalPages } from "@/lib/legal-content";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const content = legalPages.terms;

export const metadata: Metadata = createMetadata({
  title: content.title,
  description: content.description,
  path: content.path,
});

export default function TermsPage(): ReactNode {
  return <LegalDocument content={content} />;
}
