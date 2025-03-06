import React from "react";
import { Scale, BookOpen, Gavel } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface JudicialStyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

const JudicialStyleSelector = ({
  selectedStyle,
  onStyleChange,
}: JudicialStyleSelectorProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-serif text-navy-800 flex items-center">
          <Gavel className="h-5 w-5 mr-2 text-navy-700" />
          Judicial Approach
        </CardTitle>
        <CardDescription>
          Select the judicial philosophy you prefer for this case
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedStyle}
          onValueChange={onStyleChange}
          className="space-y-4"
        >
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="strict" id="strict" className="mt-1" />
            <div className="grid gap-1.5">
              <Label
                htmlFor="strict"
                className="font-medium text-navy-800 flex items-center"
              >
                <Scale className="h-4 w-4 mr-2 text-blue-600" />
                Strict Formalism
              </Label>
              <p className="text-sm text-gray-600">
                Adheres strictly to the letter of the law and precedent. Focuses
                on literal interpretation of statutes and established legal
                doctrine.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <RadioGroupItem value="balanced" id="balanced" className="mt-1" />
            <div className="grid gap-1.5">
              <Label
                htmlFor="balanced"
                className="font-medium text-navy-800 flex items-center"
              >
                <Gavel className="h-4 w-4 mr-2 text-green-600" />
                Balanced Approach
              </Label>
              <p className="text-sm text-gray-600">
                Considers both legal text and context. Balances precedent with
                practical implications and societal impact.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <RadioGroupItem
              value="progressive"
              id="progressive"
              className="mt-1"
            />
            <div className="grid gap-1.5">
              <Label
                htmlFor="progressive"
                className="font-medium text-navy-800 flex items-center"
              >
                <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
                Progressive Interpretation
              </Label>
              <p className="text-sm text-gray-600">
                Emphasizes evolving societal values and context. Interprets law
                in light of changing circumstances and focuses on justice
                outcomes.
              </p>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default JudicialStyleSelector;
