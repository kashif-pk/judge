import React from "react";
import { motion } from "framer-motion";

import Header from "../layout/Header";
import Footer from "../layout/Footer";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQPage = () => {
  const faqs = [
    {
      question: "What is the AI Indian Court Judge platform?",
      answer:
        "The AI Indian Court Judge is an educational platform that uses artificial intelligence to analyze legal scenarios based on Indian law. It provides insights into potential legal outcomes by referencing relevant sections of Indian legal codes and precedents.",
    },
    {
      question: "Is this a substitute for professional legal advice?",
      answer:
        "No, our platform is not a substitute for professional legal advice. It is designed as an educational tool to help users understand potential legal outcomes. For specific legal matters, we strongly recommend consulting with a qualified legal professional.",
    },
    {
      question: "How accurate is the AI analysis?",
      answer:
        "Our AI system is trained on Indian legal texts, including the Constitution, IPC, CrPC, and Supreme Court precedents. While we strive for high accuracy, the analysis should be considered as informational guidance rather than definitive legal advice. Legal outcomes can vary based on specific case details and judicial interpretation.",
    },
    {
      question: "Is my information kept confidential?",
      answer:
        "Yes, we take privacy very seriously. All case details submitted to our platform are encrypted and handled with the highest level of confidentiality. We do not share your information with third parties without your explicit consent.",
    },
    {
      question: "How does the Virtual Courtroom work?",
      answer:
        "The Virtual Courtroom is an interactive feature where you can present arguments as either the prosecution or defense. The AI Judge will analyze your arguments, ask relevant questions, and eventually deliver a judgment based on Indian law. This simulates a courtroom experience for educational purposes.",
    },
    {
      question: "What types of cases can the AI analyze?",
      answer:
        "Our AI can analyze various types of cases under Indian law, including criminal cases, civil disputes, property matters, family law issues, constitutional questions, and corporate legal matters. The analysis is based on the relevant Indian legal codes applicable to each type of case.",
    },
    {
      question: "Do I need to create an account to use the platform?",
      answer:
        "No, our platform is designed to be accessible without requiring registration. You can submit cases for analysis and use the Virtual Courtroom feature without creating an account. This ensures easy access to legal insights for everyone.",
    },
    {
      question: "Can I upload documents for analysis?",
      answer:
        "Yes, you can upload relevant documents related to your case for the AI to analyze. These might include contracts, statements, or other legal documents. Our system uses advanced NLP techniques to extract and analyze relevant information from these documents.",
    },
    {
      question: "How are the legal citations in the analysis determined?",
      answer:
        "The AI identifies relevant sections of Indian legal codes (such as the IPC, CrPC, or specific Acts) based on the case details you provide. It also references precedents from Supreme Court and High Court judgments that are relevant to your specific legal scenario.",
    },
    {
      question: "Is there a limit to how many cases I can submit?",
      answer:
        "Currently, there is no limit to the number of cases you can submit for analysis. Our platform is designed to be freely accessible to help as many people as possible understand potential legal outcomes under Indian law.",
    },
    {
      question: "Can the AI Judge handle complex legal scenarios?",
      answer:
        "The AI Judge is designed to handle a wide range of legal scenarios of varying complexity. However, extremely complex cases with multiple intersecting legal issues might receive a more generalized analysis. In such cases, the AI will highlight the key legal principles involved while acknowledging the complexity.",
    },
    {
      question: "How often is the legal database updated?",
      answer:
        "Our legal database is regularly updated to incorporate new legislation and significant court judgments. This ensures that the AI's analysis reflects the current state of Indian law and recent precedents set by the courts.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <section className="bg-navy-900 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                  Frequently Asked{" "}
                  <span className="text-gold-400">Questions</span>
                </h1>
                <p className="text-lg text-gray-300">
                  Find answers to common questions about our AI Indian Court
                  Judge platform
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-serif text-navy-800 hover:text-navy-600">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-serif font-bold text-navy-800 mb-6">
                  Still Have Questions?
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  If you couldn't find the answer to your question, feel free to
                  contact our support team.
                </p>
                <a
                  href="mailto:support@aiindianjudge.com"
                  className="inline-flex items-center bg-navy-700 hover:bg-navy-800 text-white font-medium px-8 py-3 rounded-md transition-all duration-200"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
