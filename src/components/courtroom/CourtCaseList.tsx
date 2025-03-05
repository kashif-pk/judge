import React from "react";
import { Gavel, ChevronRight, Calendar, User, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface CourtCase {
  id: string;
  title: string;
  type: string;
  date: string;
  status: "active" | "concluded" | "pending";
  verdict?: "guilty" | "not-guilty" | "dismissed" | null;
}

interface CourtCaseListProps {
  cases?: CourtCase[];
  onCaseSelect: (caseId: string) => void;
  onNewCase: () => void;
}

const CourtCaseList = ({
  cases = [],
  onCaseSelect,
  onNewCase,
}: CourtCaseListProps) => {
  // Sample cases if none provided
  const sampleCases: CourtCase[] = [
    {
      id: "case-001",
      title: "State vs. Sharma",
      type: "Criminal",
      date: "2023-06-15",
      status: "concluded",
      verdict: "guilty",
    },
    {
      id: "case-002",
      title: "Mehta Property Dispute",
      type: "Property",
      date: "2023-07-22",
      status: "active",
      verdict: null,
    },
    {
      id: "case-003",
      title: "Kumar Divorce Proceedings",
      type: "Family",
      date: "2023-08-05",
      status: "pending",
      verdict: null,
    },
  ];

  const displayCases = cases.length > 0 ? cases : sampleCases;

  const getStatusBadge = (status: string, verdict?: string | null) => {
    if (status === "concluded") {
      if (verdict === "guilty") {
        return <Badge className="bg-red-100 text-red-800">Guilty</Badge>;
      } else if (verdict === "not-guilty") {
        return (
          <Badge className="bg-green-100 text-green-800">Not Guilty</Badge>
        );
      } else if (verdict === "dismissed") {
        return <Badge className="bg-gray-100 text-gray-800">Dismissed</Badge>;
      }
      return <Badge className="bg-navy-100 text-navy-800">Concluded</Badge>;
    } else if (status === "active") {
      return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
    } else {
      return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-navy-700 rounded-full flex items-center justify-center mr-3">
            <Gavel className="h-5 w-5 text-gold-500" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-navy-800">
              Virtual Court Cases
            </h2>
            <p className="text-gray-600">
              View and manage your AI courtroom sessions
            </p>
          </div>
        </div>
        <Button
          onClick={onNewCase}
          className="bg-navy-700 hover:bg-navy-800 text-white"
        >
          <Scale className="mr-2 h-4 w-4" />
          New Case
        </Button>
      </div>

      <div className="space-y-4">
        {displayCases.map((courtCase) => (
          <Card
            key={courtCase.id}
            className="hover:border-navy-300 transition-colors cursor-pointer"
            onClick={() => onCaseSelect(courtCase.id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <h3 className="text-lg font-medium text-navy-800">
                      {courtCase.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className="ml-2 border-navy-300 text-navy-700"
                    >
                      {courtCase.type}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{formatDate(courtCase.date)}</span>
                    <User className="h-4 w-4 mr-1" />
                    <span>You vs. AI</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(courtCase.status, courtCase.verdict)}
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {displayCases.length === 0 && (
          <div className="text-center py-8">
            <Scale className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">
              No Court Cases Yet
            </h3>
            <p className="text-gray-500 mb-4">
              Start a new virtual court case to begin arguing before the AI
              Judge
            </p>
            <Button
              onClick={onNewCase}
              className="bg-navy-700 hover:bg-navy-800 text-white"
            >
              Start Your First Case
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourtCaseList;
