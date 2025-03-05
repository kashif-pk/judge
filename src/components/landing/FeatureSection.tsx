import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Scale, Shield, BookOpen, MessageSquare } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description = "" }: FeatureCardProps) => {
  return (
    <Card className="bg-white border-2 border-gray-100 hover:border-gold-300 transition-all duration-300 h-full">
      <CardHeader className="pb-2">
        <div className="w-12 h-12 rounded-full bg-navy-50 flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl font-serif text-navy-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

interface FeatureSectionProps {
  features?: FeatureCardProps[];
}

const FeatureSection = ({ features = [] }: FeatureSectionProps) => {
  const defaultFeatures: FeatureCardProps[] = [
    {
      icon: <Scale className="w-6 h-6 text-navy-700" />,
      title: "Legal Analysis",
      description:
        "Advanced AI analysis of your case with references to relevant Indian laws and precedents.",
    },
    {
      icon: <Shield className="w-6 h-6 text-navy-700" />,
      title: "Secure & Confidential",
      description:
        "Your case details are encrypted and handled with the highest level of confidentiality.",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-navy-700" />,
      title: "Legal Education",
      description:
        "Learn about Indian laws and legal procedures relevant to your situation.",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-navy-700" />,
      title: "Virtual Courtroom",
      description:
        "Argue your case in our AI-powered virtual courtroom and receive a legally sound judgment.",
    },
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
            How Our Free AI Judge Platform Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the power of artificial intelligence applied to Indian
            law, providing insights and guidance for your legal matters -
            completely free and with no registration required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
