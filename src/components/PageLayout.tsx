
import { ReactNode } from "react";
import Header from "./Header";
import { Card } from "@/components/ui/card";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

const PageLayout = ({ children, title }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto py-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          {children}
        </Card>
      </main>
    </div>
  );
};

export default PageLayout;
