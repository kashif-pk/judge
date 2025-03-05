import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import CourtCaseForm from "./CourtCaseForm";
import CourtCaseList from "./CourtCaseList";
import VirtualCourtroom from "./VirtualCourtroom";

const VirtualCourtroomPage = () => {
  const [view, setView] = useState<"list" | "form" | "courtroom">("list");
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewCase = () => {
    setView("form");
  };

  const handleCaseSelect = (caseId: string) => {
    // In a real app, you would fetch the case details from the database
    // For now, we'll create a dummy case object
    setIsLoading(true);

    // Simulate loading time
    setTimeout(() => {
      const caseDetails = {
        id: caseId,
        title:
          caseId === "case-001"
            ? "State vs. Sharma"
            : caseId === "case-002"
              ? "Mehta Property Dispute"
              : "Kumar Divorce Proceedings",
        type:
          caseId === "case-001"
            ? "Criminal"
            : caseId === "case-002"
              ? "Property"
              : "Family",
        role: "prosecution",
      };

      setSelectedCase(caseDetails);
      setView("courtroom");
      setIsLoading(false);
    }, 1000);
  };

  const handleCaseFormSubmit = (values: any) => {
    // In a real app, you would save the case to the database
    setIsLoading(true);

    // Simulate loading time
    setTimeout(() => {
      const newCase = {
        id: `new-case-${Date.now()}`,
        title: values.caseTitle,
        type: values.caseType,
        role: values.userRole,
      };

      setSelectedCase(newCase);
      setView("courtroom");
      setIsLoading(false);
    }, 1000);
  };

  const handleCourtroomClose = () => {
    setView("list");
    setSelectedCase(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 pt-20 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto max-w-6xl mt-4"
        >
          {view === "list" && (
            <CourtCaseList
              onCaseSelect={handleCaseSelect}
              onNewCase={handleNewCase}
            />
          )}

          {view === "form" && (
            <CourtCaseForm
              onSubmit={handleCaseFormSubmit}
              onCancel={() => setView("list")}
            />
          )}

          {view === "courtroom" && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {isLoading ? (
                <div className="flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-navy-700"></div>
                </div>
              ) : selectedCase ? (
                <VirtualCourtroom
                  caseId={selectedCase.id}
                  caseTitle={selectedCase.title}
                  caseType={selectedCase.type}
                  initialRole={selectedCase.role}
                  onClose={handleCourtroomClose}
                />
              ) : null}
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default VirtualCourtroomPage;
