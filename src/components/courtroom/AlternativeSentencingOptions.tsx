import React from "react";
import { Heart, Briefcase, BookOpen, Home, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SentencingOption {
  id: string;
  title: string;
  description: string;
  applicability: string[];
  icon: React.ReactNode;
  legalBasis: string;
}

interface AlternativeSentencingOptionsProps {
  caseType: string;
  mitigatingFactors: string[];
  onSelectOption: (option: SentencingOption) => void;
}

const AlternativeSentencingOptions = ({
  caseType,
  mitigatingFactors,
  onSelectOption,
}: AlternativeSentencingOptionsProps) => {
  // Alternative sentencing options in Indian legal system
  const sentencingOptions: SentencingOption[] = [
    {
      id: "probation",
      title: "Probation",
      description:
        "Release of the offender under supervision with certain conditions",
      applicability: [
        "first-time offender",
        "non-violent crime",
        "young offender",
      ],
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      legalBasis: "Probation of Offenders Act, 1958",
    },
    {
      id: "community-service",
      title: "Community Service",
      description: "Mandatory unpaid work for the benefit of the community",
      applicability: [
        "minor offenses",
        "first-time offender",
        "non-violent crime",
      ],
      icon: <Heart className="h-5 w-5 text-red-600" />,
      legalBasis: "Section 357 CrPC - Court's power to order community service",
    },
    {
      id: "rehabilitation",
      title: "Rehabilitation Program",
      description:
        "Mandatory participation in rehabilitation programs (drug treatment, counseling, etc.)",
      applicability: [
        "addiction-related crimes",
        "mental health issues",
        "domestic violence",
      ],
      icon: <BookOpen className="h-5 w-5 text-green-600" />,
      legalBasis: "Mental Healthcare Act, 2017 and NDPS Act provisions",
    },
    {
      id: "house-arrest",
      title: "House Arrest",
      description: "Confinement to one's residence with electronic monitoring",
      applicability: [
        "elderly offenders",
        "health concerns",
        "non-violent crime",
      ],
      icon: <Home className="h-5 w-5 text-purple-600" />,
      legalBasis: "Supreme Court guidelines in Gautam Navlakha v. NIA (2021)",
    },
    {
      id: "plea-bargain",
      title: "Plea Bargaining",
      description: "Reduced sentence in exchange for a guilty plea",
      applicability: [
        "offenses with maximum punishment up to 7 years",
        "non-violent crime",
      ],
      icon: <Briefcase className="h-5 w-5 text-amber-600" />,
      legalBasis: "Chapter XXIA of CrPC (Sections 265A to 265L)",
    },
  ];

  // Filter options based on case type and mitigating factors
  const getApplicableOptions = () => {
    let filteredOptions = [...sentencingOptions];

    // Filter based on case type
    if (
      caseType.toLowerCase().includes("murder") ||
      caseType.toLowerCase().includes("rape")
    ) {
      // For serious crimes, limit options
      filteredOptions = filteredOptions.filter(
        (option) =>
          !option.id.includes("community-service") &&
          !option.id.includes("plea-bargain"),
      );
    }

    // Sort by relevance to mitigating factors
    return filteredOptions.sort((a, b) => {
      const aRelevance = a.applicability.filter((factor) =>
        mitigatingFactors.some((mf) => factor.includes(mf.toLowerCase())),
      ).length;

      const bRelevance = b.applicability.filter((factor) =>
        mitigatingFactors.some((mf) => factor.includes(mf.toLowerCase())),
      ).length;

      return bRelevance - aRelevance;
    });
  };

  const applicableOptions = getApplicableOptions();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-serif text-navy-800">
          Alternative Sentencing Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applicableOptions.map((option) => {
            // Calculate relevance score based on mitigating factors
            const relevantFactors = option.applicability.filter((factor) =>
              mitigatingFactors.some((mf) => factor.includes(mf.toLowerCase())),
            );

            const isHighlyRelevant = relevantFactors.length > 0;

            return (
              <div
                key={option.id}
                className={`p-3 rounded-md border cursor-pointer transition-all ${isHighlyRelevant ? "border-green-300 bg-green-50" : "border-gray-200 bg-white hover:bg-gray-50"}`}
                onClick={() => onSelectOption(option)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {option.icon}
                    <h3 className="font-medium text-navy-800 ml-2">
                      {option.title}
                    </h3>
                  </div>
                  {isHighlyRelevant && (
                    <Badge className="bg-green-100 text-green-800">
                      Recommended
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  {option.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-1">
                  {option.applicability.map((factor, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className={
                        mitigatingFactors.some((mf) =>
                          factor.includes(mf.toLowerCase()),
                        )
                          ? "border-green-500 text-green-700"
                          : "border-gray-300 text-gray-600"
                      }
                    >
                      {factor}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Legal basis: {option.legalBasis}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlternativeSentencingOptions;
