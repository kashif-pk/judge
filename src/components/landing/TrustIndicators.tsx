import React from "react";
import { Shield, Lock, Award, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TrustIndicatorProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TrustIndicator = (
  { icon, title, description }: TrustIndicatorProps = {
    icon: <Shield className="h-6 w-6" />,
    title: "Trusted Platform",
    description: "Our platform adheres to the highest security standards",
  },
) => {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-3 text-navy-700">{icon}</div>
      <h3 className="text-lg font-serif font-semibold mb-1 text-navy-800">
        {title}
      </h3>
      <p className="text-sm text-center text-gray-600">{description}</p>
    </div>
  );
};

interface EndorsementProps {
  name: string;
  organization: string;
}

const LegalEndorsement = (
  { name, organization }: EndorsementProps = {
    name: "Justice A.K. Sharma",
    organization: "Former High Court Judge",
  },
) => {
  return (
    <div className="flex items-center space-x-2">
      <Badge variant="outline" className="border-gold-500 text-navy-700">
        <CheckCircle className="h-3 w-3 mr-1 text-gold-500" />
        Verified
      </Badge>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="text-sm font-medium text-navy-800 hover:underline cursor-help">
            {name}, {organization}
          </TooltipTrigger>
          <TooltipContent>
            <p>Endorsed our platform's legal accuracy</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

interface TrustIndicatorsProps {
  indicators?: TrustIndicatorProps[];
  endorsements?: EndorsementProps[];
}

const TrustIndicators = ({
  indicators = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Platform",
      description: "End-to-end encryption for all your legal documents",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Data Privacy",
      description:
        "Your information is protected with industry-standard protocols",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Legal Accuracy",
      description: "Verified by experienced legal professionals",
    },
  ],
  endorsements = [
    { name: "Justice A.K. Sharma", organization: "Former High Court Judge" },
    {
      name: "Dr. Rajesh Gupta",
      organization: "Legal Scholar, Delhi University",
    },
    { name: "Adv. Priya Mehta", organization: "Supreme Court Advocate" },
  ],
}: TrustIndicatorsProps) => {
  return (
    <section className="w-full py-12 bg-gray-50 border-t border-b border-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-serif font-bold text-center mb-8 text-navy-800">
          Trusted by Legal Professionals
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {indicators.map((indicator, index) => (
            <TrustIndicator
              key={index}
              icon={indicator.icon}
              title={indicator.title}
              description={indicator.description}
            />
          ))}
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-4">
            <Badge className="bg-navy-700 text-white">
              Endorsed by Legal Experts
            </Badge>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {endorsements.map((endorsement, index) => (
              <LegalEndorsement
                key={index}
                name={endorsement.name}
                organization={endorsement.organization}
              />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center space-x-4">
            <img
              src="/public/vite.svg"
              alt="Encryption Certificate"
              className="h-10 w-auto"
            />
            <div className="h-8 w-px bg-gray-300"></div>
            <Badge variant="outline" className="border-navy-500">
              <Lock className="h-3 w-3 mr-1 text-navy-700" />
              256-bit Encryption
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
