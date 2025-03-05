import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Header from "./layout/Header";
import HeroSection from "./landing/HeroSection";
import FeatureSection from "./landing/FeatureSection";
import TrustIndicators from "./landing/TrustIndicators";
import Footer from "./layout/Footer";
import AuthModal from "./auth/AuthModal";
import CaseInputForm from "./case/CaseInputForm";
import CaseAnalysisResult from "./case/CaseAnalysisResult";

const Home = () => {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">(
    "login",
  );
  const [isCaseFormOpen, setIsCaseFormOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAnalysisResult, setShowAnalysisResult] = useState(false);
  const [currentCase, setCurrentCase] = useState({
    caseTitle: "",
    caseType: "",
    documents: [],
  });

  const handleLoginClick = () => {
    setAuthModalTab("login");
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthModalTab("register");
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleLoginSuccess = (userData: any) => {
    console.log("User logged in:", userData);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleRegisterSuccess = (userData: any) => {
    console.log("User registered:", userData);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleStartCase = () => {
    // No login required, directly open the case form
    setIsCaseFormOpen(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleContactClick = () => {
    console.log("Contact button clicked");
    // Implement contact form or redirect to contact page
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        onLogoutClick={handleLogout}
      />

      <main className="pt-20">
        {" "}
        {/* Add padding top to account for fixed header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HeroSection
            onStartCase={() => (window.location.href = "/courtroom")}
          />
          <FeatureSection />
          <TrustIndicators />
        </motion.div>
      </main>

      <Footer onContactClick={handleContactClick} />

      {/* No Auth Modal needed as the site is free to use */}

      {isCaseFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-navy-800">
                  Submit Your Case
                </h2>
                <button
                  onClick={() => setIsCaseFormOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4">
                <CaseInputForm
                  onSubmit={(values) => {
                    console.log("Case submitted:", values);
                    // Here you would send the case data to your backend
                    setIsCaseFormOpen(false);

                    // Set current case info for the analysis result
                    setCurrentCase({
                      caseTitle: values.caseTitle,
                      caseType:
                        values.caseType === "civil"
                          ? "Civil Case"
                          : values.caseType === "criminal"
                            ? "Criminal Case"
                            : values.caseType === "family"
                              ? "Family Law"
                              : values.caseType === "property"
                                ? "Property Dispute"
                                : values.caseType === "constitutional"
                                  ? "Constitutional Matter"
                                  : values.caseType === "corporate"
                                    ? "Corporate Law"
                                    : "Other",
                      documents: values.fileContents || [],
                    });

                    // Process the uploaded files and generate analysis
                    console.log(
                      "Processing uploaded files:",
                      values.fileContents,
                    );

                    // In a real app, you would send the file contents to your backend for analysis
                    // For now, we'll simulate processing with a loading delay
                    setTimeout(() => {
                      setShowAnalysisResult(true);
                    }, 1500);
                  }}
                  onCancel={() => setIsCaseFormOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showAnalysisResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <CaseAnalysisResult
                caseTitle={currentCase.caseTitle}
                caseType={currentCase.caseType}
                documents={currentCase.documents}
                onClose={() => setShowAnalysisResult(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
