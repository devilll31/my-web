'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Database, Info } from "lucide-react";
import HowToUseGuide from "../how-to-use-guide";

export default function SqlFormatterTool() {
  const guideProps = {
    title: "About the SQL Formatter",
    steps: [
      { title: "What it Does", description: "A SQL formatter takes a messy or compact SQL query and adds indentation and line breaks to make it readable." },
      { title: "Dialect-Specific Rules", description: "Formatting can differ between SQL dialects (e.g., PostgreSQL, MySQL, SQL Server). A robust tool needs to understand these differences." },
      { title: "Future Update", description: "This tool is planned for a future update when we integrate a powerful, multi-dialect SQL formatting library." }
    ],
    features: [
      { icon: Database, title: "Improve Readability", description: "Make complex queries easier to read, debug, and maintain." },
      { icon: Info, title: "Stay Tuned", description: "We are building the backend necessary to provide this tool reliably. Thank you for your patience!" }
    ]
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">SQL Formatter/Beautifier</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold">Tool Under Development</h3>
          <p className="text-muted-foreground mt-2">
            A reliable SQL formatter requires a server-side library that understands different SQL dialects. It is planned for a future update.
          </p>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
