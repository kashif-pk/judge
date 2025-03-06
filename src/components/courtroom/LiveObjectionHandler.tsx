import React, { useState } from "react";
import { AlertTriangle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ObjectionType {
  id: string;
  type: string;
  description: string;
  legalBasis: string;
}

interface LiveObjectionHandlerProps {
  onObjectionRuled: (objection: ObjectionType, sustained: boolean) => void;
}

const LiveObjectionHandler = ({
  onObjectionRuled,
}: LiveObjectionHandlerProps) => {
  const [selectedObjection, setSelectedObjection] =
    useState<ObjectionType | null>(null);
  const [recentRulings, setRecentRulings] = useState<
    Array<{ objection: ObjectionType; sustained: boolean }>
  >([]);

  // Common objection types in Indian courts
  const objectionTypes: ObjectionType[] = [
    {
      id: "relevance",
      type: "Relevance",
      description:
        "The evidence or testimony is not relevant to the case at hand",
      legalBasis:
        "Section 5 of the Indian Evidence Act - Evidence may be given of facts in issue and relevant facts",
    },
    {
      id: "hearsay",
      type: "Hearsay",
      description:
        "The testimony is based on what someone else said, not direct knowledge",
      legalBasis:
        "Sections 59 and 60 of the Indian Evidence Act - Oral evidence must be direct",
    },
    {
      id: "leading",
      type: "Leading Question",
      description: "The question suggests the desired answer",
      legalBasis: "Section 141 of the Indian Evidence Act - Leading questions",
    },
    {
      id: "opinion",
      type: "Opinion",
      description:
        "Witness is giving opinion rather than facts (except expert witnesses)",
      legalBasis:
        "Sections 45-51 of the Indian Evidence Act - Opinions of experts",
    },
    {
      id: "character",
      type: "Character Evidence",
      description: "Improper reference to character or past conduct",
      legalBasis:
        "Sections 52-55 of the Indian Evidence Act - Character when relevant",
    },
    {
      id: "privileged",
      type: "Privileged Communication",
      description: "Communication protected by legal privilege",
      legalBasis:
        "Sections 122-129 of the Indian Evidence Act - Privileged communications",
    },
    {
      id: "procedure",
      type: "Procedural Violation",
      description: "Evidence obtained through improper procedure",
      legalBasis: "Article 20(3) of the Constitution and D.K. Basu guidelines",
    },
  ];

  const handleObjectionSelect = (objection: ObjectionType) => {
    setSelectedObjection(objection);
  };

  const handleRuling = (sustained: boolean) => {
    if (selectedObjection) {
      onObjectionRuled(selectedObjection, sustained);
      setRecentRulings((prev) => [
        { objection: selectedObjection, sustained },
        ...prev.slice(0, 4),
      ]);
      setSelectedObjection(null);
    }
  };

  return (
    <div className="w-full">
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-serif text-navy-800 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
            Raise Objection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {objectionTypes.map((objection) => (
              <Badge
                key={objection.id}
                variant={
                  selectedObjection?.id === objection.id ? "default" : "outline"
                }
                className={`cursor-pointer ${selectedObjection?.id === objection.id ? "bg-navy-700" : "hover:bg-navy-100"}`}
                onClick={() => handleObjectionSelect(objection)}
              >
                {objection.type}
              </Badge>
            ))}
          </div>

          {selectedObjection && (
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200 mb-4">
              <p className="text-sm font-medium text-navy-800">
                {selectedObjection.type} Objection
              </p>
              <p className="text-sm text-gray-600 mb-2">
                {selectedObjection.description}
              </p>
              <p className="text-xs text-gray-500">
                Legal basis: {selectedObjection.legalBasis}
              </p>
              <div className="flex justify-end space-x-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-50"
                  onClick={() => handleRuling(false)}
                >
                  <X className="h-4 w-4 mr-1" /> Overrule
                </Button>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleRuling(true)}
                >
                  <Check className="h-4 w-4 mr-1" /> Sustain
                </Button>
              </div>
            </div>
          )}

          {recentRulings.length > 0 && (
            <>
              <Separator className="my-3" />
              <div>
                <p className="text-sm font-medium text-navy-800 mb-2">
                  Recent Rulings
                </p>
                <div className="space-y-2">
                  {recentRulings.map((ruling, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-700">
                        {ruling.objection.type}
                      </span>
                      <Badge
                        className={
                          ruling.sustained
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {ruling.sustained ? "Sustained" : "Overruled"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveObjectionHandler;
