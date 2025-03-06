import React from "react";
import { motion } from "framer-motion";
import { Scale, BookOpen, Shield } from "lucide-react";

import Header from "../layout/Header";
import Footer from "../layout/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
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
                  About Our{" "}
                  <span className="text-gold-400">AI Indian Court Judge</span>{" "}
                  Platform
                </h1>
                <p className="text-lg text-gray-300">
                  Revolutionizing legal understanding through artificial
                  intelligence
                </p>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-serif font-bold text-navy-800 mb-8 text-center">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  The AI Indian Court Judge platform was created with a singular
                  vision: to democratize access to legal insights and make the
                  Indian legal system more accessible to everyone.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  We believe that understanding potential legal outcomes should
                  not be limited to those who can afford expensive legal
                  consultations. Our AI-powered system provides preliminary
                  insights based on Indian law, helping users navigate the
                  complexities of the legal landscape.
                </p>
                <p className="text-lg text-gray-700">
                  While our platform is not a substitute for professional legal
                  advice, it serves as an educational tool that can help
                  individuals understand the potential direction of their legal
                  matters based on Indian legal precedents and statutes.
                </p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-serif font-bold text-navy-800 mb-12 text-center">
                Our Core Values
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Scale className="h-8 w-8 text-navy-700" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-navy-800 mb-4 text-center">
                    Legal Accuracy
                  </h3>
                  <p className="text-gray-700 text-center">
                    We strive for the highest level of accuracy in our AI
                    analysis, basing our insights on the Indian Constitution,
                    IPC, CrPC, and relevant Supreme Court precedents.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Shield className="h-8 w-8 text-navy-700" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-navy-800 mb-4 text-center">
                    Privacy & Security
                  </h3>
                  <p className="text-gray-700 text-center">
                    We prioritize the confidentiality of your information. All
                    case details submitted to our platform are encrypted and
                    handled with the utmost security.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <BookOpen className="h-8 w-8 text-navy-700" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-navy-800 mb-4 text-center">
                    Educational Focus
                  </h3>
                  <p className="text-gray-700 text-center">
                    Our platform is designed primarily as an educational tool to
                    help users understand legal concepts and potential outcomes
                    based on Indian law.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-serif font-bold text-navy-800 mb-12 text-center">
                Our Team
              </h2>

              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-gray-700 mb-8 text-center">
                  Our platform is developed by a dedicated team of legal
                  experts, AI specialists, and software engineers committed to
                  making legal insights more accessible.
                </p>

                <div className="bg-navy-50 p-8 rounded-lg border border-navy-100">
                  <h3 className="text-xl font-serif font-bold text-navy-800 mb-4">
                    Legal Oversight
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Our AI system is developed under the guidance of experienced
                    Indian legal professionals, including former judges,
                    advocates, and legal scholars who ensure the accuracy of our
                    legal analysis.
                  </p>

                  <h3 className="text-xl font-serif font-bold text-navy-800 mb-4">
                    AI Development
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Our AI team specializes in natural language processing and
                    legal text analysis, continuously improving our system's
                    ability to understand and analyze legal scenarios based on
                    Indian law.
                  </p>

                  <h3 className="text-xl font-serif font-bold text-navy-800 mb-4">
                    User Experience
                  </h3>
                  <p className="text-gray-700">
                    Our design and development team focuses on creating an
                    intuitive, accessible interface that makes complex legal
                    concepts understandable to users regardless of their legal
                    background.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Disclaimer Section */}
          <section className="py-16 bg-navy-900 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-serif font-bold mb-8">
                  Important <span className="text-gold-400">Disclaimer</span>
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  While our AI Indian Court Judge platform strives for accuracy,
                  it is important to understand that it is not a substitute for
                  professional legal advice.
                </p>
                <p className="text-lg text-gray-300">
                  The analysis provided by our system should be used for
                  educational and informational purposes only. For specific
                  legal matters, we strongly recommend consulting with a
                  qualified legal professional.
                </p>
              </div>
            </div>
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
