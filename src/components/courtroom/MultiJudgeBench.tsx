import React from "react";
import { Gavel, Scale, BookOpen, ThumbsUp, ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import JudgeAvatar from "@/components/ui/judge-avatar";

interface JudgeOpinion {
  judgeName: string;
  judgeStyle: "textualist" | "progressive" | "balanced";
  opinion: string;
  verdict: string;
  concurring: boolean;
}

interface MultiJudgeBenchProps {
  caseTitle: string;
  caseType: string;
  majorityVerdict: string;
  sentencing?: string;
  opinions: JudgeOpinion[];
  onClose: () => void;
}

const MultiJudgeBench = ({
  caseTitle,
  caseType,
  majorityVerdict,
  sentencing,
  opinions,
  onClose,
}: MultiJudgeBenchProps) => {
  // Calculate majority and dissenting opinions
  const majorityOpinions = opinions.filter((opinion) => opinion.concurring);
  const dissentingOpinions = opinions.filter((opinion) => !opinion.concurring);

  // Get judge style description
  const getJudgeStyleDescription = (style: string) => {
    switch (style) {
      case "textualist":
        return "Strict interpretation of legal text";
      case "progressive":
        return "Context-driven, evolving interpretation";
      case "balanced":
        return "Balanced approach to legal interpretation";
      default:
        return "";
    }
  };

  // Get judge style color
  const getJudgeStyleColor = (style: string) => {
    switch (style) {
      case "textualist":
        return "bg-blue-100 text-blue-800";
      case "progressive":
        return "bg-purple-100 text-purple-800";
      case "balanced":
        return "bg-green-100 text-green-800";
      default:
        return "";
    }
  };

  return (
    <div className="w-full bg-gray-50 flex flex-col rounded-lg overflow-hidden">
      {/* Bench Header */}
      <div className="bg-navy-800 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Gavel className="h-6 w-6 text-gold-500 mr-2" />
            <div>
              <h2 className="text-xl font-serif font-bold">{caseTitle}</h2>
              <div className="flex items-center">
                <Badge
                  variant="outline"
                  className="border-gold-500 text-gold-400 mr-2"
                >
                  {caseType}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-green-500 text-green-400"
                >
                  Judgment Delivered
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verdict Summary */}
      <div className="p-4 bg-navy-50 border-b border-navy-200">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-serif font-bold text-navy-800 mb-2 flex items-center">
            <Scale className="h-5 w-5 mr-2 text-gold-500" />
            Bench Verdict ({majorityOpinions.length}-{dissentingOpinions.length}
            )
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge
              className={
                majorityVerdict.toLowerCase().includes("guilty")
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }
            >
              {majorityVerdict}
            </Badge>
            <Badge className="bg-navy-100 text-navy-800">
              Majority Opinion
            </Badge>
          </div>
          {sentencing && (
            <div className="bg-white p-3 rounded-md border border-gray-200 mb-3">
              <p className="text-sm font-medium text-navy-800">Sentencing:</p>
              <p className="text-sm text-gray-700">{sentencing}</p>
            </div>
          )}
          <p className="text-sm text-gray-600">
            The bench has delivered a {majorityOpinions.length}-
            {dissentingOpinions.length} verdict. Click on each judge's opinion
            below to read their full reasoning.
          </p>
        </div>
      </div>

      {/* Judges Opinions */}
      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          {/* Majority Opinions */}
          <div className="mb-6">
            <h3 className="text-lg font-serif font-bold text-navy-800 mb-3 flex items-center">
              <ThumbsUp className="h-5 w-5 mr-2 text-green-600" />
              Majority Opinions
            </h3>
            <div className="space-y-4">
              {majorityOpinions.map((opinion, index) => (
                <Card key={index} className="border-green-200">
                  <CardHeader className="pb-2 bg-green-50 flex flex-row items-center justify-between">
                    <div className="flex items-center">
                      <JudgeAvatar size="xs" />
                      <CardTitle className="text-sm font-medium ml-2">
                        Justice {opinion.judgeName}
                      </CardTitle>
                    </div>
                    <Badge className={getJudgeStyleColor(opinion.judgeStyle)}>
                      {getJudgeStyleDescription(opinion.judgeStyle)}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {opinion.opinion}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Dissenting Opinions */}
          {dissentingOpinions.length > 0 && (
            <div>
              <h3 className="text-lg font-serif font-bold text-navy-800 mb-3 flex items-center">
                <ThumbsDown className="h-5 w-5 mr-2 text-red-600" />
                Dissenting Opinions
              </h3>
              <div className="space-y-4">
                {dissentingOpinions.map((opinion, index) => (
                  <Card key={index} className="border-red-200">
                    <CardHeader className="pb-2 bg-red-50 flex flex-row items-center justify-between">
                      <div className="flex items-center">
                        <JudgeAvatar size="xs" />
                        <CardTitle className="text-sm font-medium ml-2">
                          Justice {opinion.judgeName}
                        </CardTitle>
                      </div>
                      <Badge className={getJudgeStyleColor(opinion.judgeStyle)}>
                        {getJudgeStyleDescription(opinion.judgeStyle)}
                      </Badge>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {opinion.opinion}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legal Implications */}
      <div className="p-4 bg-navy-50 border-t border-navy-200">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-serif font-bold text-navy-800 mb-3 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-navy-700" />
            Legal Implications
          </h3>
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <p className="text-sm text-gray-700 mb-3">
              This judgment establishes precedent for similar cases. Key legal
              principles from this decision:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
              <li>
                The burden of proof in criminal cases remains beyond reasonable
                doubt
              </li>
              <li>
                Procedural irregularities must be substantial to invalidate
                evidence
              </li>
              <li>
                Circumstantial evidence must form a complete chain with no gaps
              </li>
              <li>
                Both aggravating and mitigating factors must be considered in
                sentencing
              </li>
            </ul>
            <Separator className="my-3" />
            <p className="text-sm text-gray-600">
              Appeal options: The{" "}
              {majorityVerdict.toLowerCase().includes("guilty")
                ? "convicted party"
                : "prosecution"}{" "}
              may appeal this decision to a higher court within 90 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiJudgeBench;
