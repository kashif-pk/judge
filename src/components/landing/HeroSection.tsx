import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Scale, Shield, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import JudgeAvatar from "@/components/ui/judge-avatar";

interface HeroSectionProps {
  onStartCase?: () => void;
}

const HeroSection = ({
  onStartCase = () => console.log("Start case clicked"),
}: HeroSectionProps) => {
  return (
    <section className="relative w-full h-[600px] bg-navy-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-no-repeat bg-cover opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 to-navy-900"></div>
      </div>

      <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Left content */}
        <div className="w-full md:w-1/2 pt-16 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-gold-400">
              AI-Powered <span className="text-white">Indian Court</span> Judge
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl">
              Understand potential legal outcomes based on Indian law with our
              AI-powered virtual judge system. Get insights backed by IPC/CrPC
              citations and relevant precedents.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onStartCase}
                size="lg"
                className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-medium px-8 py-3 rounded-md transition-all duration-200 text-base"
              >
                Enter Virtual Courtroom
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white px-8 py-3 rounded-md transition-all duration-200 text-base"
                onClick={() => (window.location.href = "/how-it-works")}
              >
                How It Works
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex flex-col items-center text-center"
              >
                <Scale className="h-8 w-8 text-gold-400 mb-2" />
                <p className="text-sm font-medium">Legal Accuracy</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex flex-col items-center text-center"
              >
                <Shield className="h-8 w-8 text-gold-400 mb-2" />
                <p className="text-sm font-medium">Secure & Private</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <BookOpen className="h-8 w-8 text-gold-400 mb-2" />
                <p className="text-sm font-medium">IPC/CrPC Citations</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right content - Scales of Justice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0"
        >
          <div className="relative">
            <Scale className="h-64 w-64 md:h-80 md:w-80 text-gold-400" />
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-navy-900 via-gold-500/20 to-navy-900"></div>
    </section>
  );
};

export default HeroSection;
