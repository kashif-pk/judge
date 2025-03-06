import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Scale,
  Shield,
  BookOpen,
  MessageSquare,
  FileText,
  Check,
} from "lucide-react";

import Header from "../layout/Header";
import Footer from "../layout/Footer";

const HowItWorksPage = () => {
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
                  How Our <span className="text-gold-400">AI Judge</span> Works
                </h1>
                <p className="text-lg text-gray-300">
                  Understanding the technology and process behind our AI Indian
                  Court Judge platform
                </p>
              </div>
            </div>
          </section>

          {/* Process Overview */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-serif font-bold text-navy-800 mb-12 text-center">
                The Process
              </h2>

              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-[15px] md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-navy-100"></div>

                  {/* Step 1 */}
                  <div className="relative flex flex-col md:flex-row items-start mb-16">
                    <div className="flex-1 md:text-right md:pr-8 order-2 md:order-1">
                      <h3 className="text-xl font-serif font-bold text-navy-800 mb-3">
                        Submit Your Case
                      </h3>
                      <p className="text-gray-700">
                        Begin by providing details about your legal matter.
                        Select the case type (criminal, civil, property, etc.)
                        and enter a description of the situation. You can also
                        upload relevant documents for more comprehensive
                        analysis.
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-navy-700 rounded-full flex items-center justify-center z-10 mx-4 mb-4 md:mb-0 order-1 md:order-2">
                      <span className="text-gold-500 font-bold">1</span>
                    </div>
                    <div className="flex-1 md:pl-8 order-3">
                      <div className="bg-navy-50 p-4 rounded-lg">
                        <FileText className="h-8 w-8 text-navy-700 mb-2" />
                        <p className="text-sm text-navy-700">
                          Our system accepts various case types and can process
                          multiple document formats including PDFs, DOCs, and
                          images.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex flex-col md:flex-row items-start mb-16">
                    <div className="flex-1 md:pr-8 order-2">
                      <div className="bg-navy-50 p-4 rounded-lg">
                        <Scale className="h-8 w-8 text-navy-700 mb-2" />
                        <p className="text-sm text-navy-700">
                          Our AI uses advanced NLP techniques to analyze your
                          case details against a comprehensive database of
                          Indian laws and precedents.
                        </p>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-navy-700 rounded-full flex items-center justify-center z-10 mx-4 mb-4 md:mb-0 order-1">
                      <span className="text-gold-500 font-bold">2</span>
                    </div>
                    <div className="flex-1 md:text-left md:pl-8 order-3">
                      <h3 className="text-xl font-serif font-bold text-navy-800 mb-3">
                        AI Analysis
                      </h3>
                      <p className="text-gray-700">
                        Our sophisticated AI system analyzes your case using
                        natural language processing and legal pattern
                        recognition. It identifies relevant sections of Indian
                        law, applicable precedents, and potential legal outcomes
                        based on similar cases.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex flex-col md:flex-row items-start mb-16">
                    <div className="flex-1 md:text-right md:pr-8 order-2 md:order-1">
                      <h3 className="text-xl font-serif font-bold text-navy-800 mb-3">
                        Comprehensive Results
                      </h3>
                      <p className="text-gray-700">
                        Receive a detailed analysis of your case including
                        relevant constitutional articles, applicable laws,
                        precedents, possible outcomes, and recommendations. Each
                        analysis is backed by citations to specific sections of
                        Indian legal codes.
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-navy-700 rounded-full flex items-center justify-center z-10 mx-4 mb-4 md:mb-0 order-1 md:order-2">
                      <span className="text-gold-500 font-bold">3</span>
                    </div>
                    <div className="flex-1 md:pl-8 order-3">
                      <div className="bg-navy-50 p-4 rounded-lg">
                        <BookOpen className="h-8 w-8 text-navy-700 mb-2" />
                        <p className="text-sm text-navy-700">
                          Each analysis includes citations to relevant sections
                          of the IPC, CrPC, Constitution, and other applicable
                          laws, along with precedent cases.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative flex flex-col md:flex-row items-start">
                    <div className="flex-1 md:pr-8 order-2">
                      <div className="bg-navy-50 p-4 rounded-lg">
                        <MessageSquare className="h-8 w-8 text-navy-700 mb-2" />
                        <p className="text-sm text-navy-700">
                          Experience a realistic courtroom simulation where you
                          can present arguments and receive a judgment based on
                          Indian legal principles.
                        </p>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-navy-700 rounded-full flex items-center justify-center z-10 mx-4 mb-4 md:mb-0 order-1">
                      <span className="text-gold-500 font-bold">4</span>
                    </div>
                    <div className="flex-1 md:text-left md:pl-8 order-3">
                      <h3 className="text-xl font-serif font-bold text-navy-800 mb-3">
                        Virtual Courtroom Experience
                      </h3>
                      <p className="text-gray-700">
                        For a more interactive experience, enter our Virtual
                        Courtroom where you can present arguments as either the
                        prosecution or defense. The AI Judge will analyze your
                        arguments, ask relevant questions, and deliver a
                        judgment based on Indian law.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Behind */}
          <section className="py-16 bg-navy-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-serif font-bold text-navy-800 mb-12 text-center">
                The Technology Behind Our AI Judge
              </h2>

              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-serif font-bold text-navy-800 mb-4">
                    Natural Language Processing
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Our AI uses advanced NLP techniques to understand and
                    analyze legal text, including case descriptions, documents,
                    and legal arguments. This allows it to extract relevant
                    information and identify key legal issues.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Semantic understanding of legal terminology
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Context-aware analysis of case details
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Extraction of relevant facts and legal issues
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-serif font-bold text-navy-800 mb-4">
                    Legal Knowledge Base
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Our system is built on a comprehensive database of Indian
                    legal texts, including the Constitution, IPC, CrPC, various
                    Acts, and significant court judgments. This ensures that the
                    analysis is grounded in actual Indian law.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Comprehensive coverage of Indian legal codes
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Database of Supreme Court and High Court precedents
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Regular updates to incorporate new legislation and
                        judgments
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-serif font-bold text-navy-800 mb-4">
                    Pattern Recognition
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Our AI identifies patterns in legal cases and judgments to
                    predict potential outcomes based on similar historical
                    cases. This helps provide insights into how courts might
                    approach your specific legal scenario.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Analysis of case similarity and relevance
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Identification of legal reasoning patterns in judgments
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Outcome prediction based on precedent analysis
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-serif font-bold text-navy-800 mb-4">
                    Document Analysis
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Our system can analyze uploaded documents to extract
                    relevant information and incorporate it into the case
                    analysis. This includes contracts, statements, evidence
                    documents, and other legal materials.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Multi-format document processing (PDF, DOC, images)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Extraction of key information from legal documents
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Integration of document content into case analysis
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Try It Now */}
          <section className="py-16 bg-navy-900 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-serif font-bold mb-6">
                Experience Our AI Indian Court Judge Platform
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                Ready to see how our AI can analyze your legal matter? Enter our
                Virtual Courtroom to get started with a free analysis based on
                Indian law.
              </p>
              <a
                href="/courtroom"
                className="inline-flex items-center bg-gold-500 hover:bg-gold-600 font-medium px-8 py-3 rounded-md transition-all duration-200 text-lg"
              >
                <span className="text-navy-900">Enter Virtual Courtroom</span>
                <ArrowRight className="ml-2 h-5 w-5 text-navy-900" />
              </a>
            </div>
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;
