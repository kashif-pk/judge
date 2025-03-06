import React from "react";
import { Gavel, Users, AlertTriangle, Scale } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import JudicialStyleSelector from "./JudicialStyleSelector";

interface CourtSettingsProps {
  settings: {
    multiJudgeBench: boolean;
    liveObjections: boolean;
    alternativeSentencing: boolean;
    judicialStyle: string;
    benchSize: number;
  };
  onSettingsChange: (settings: any) => void;
}

const CourtSettings = ({ settings, onSettingsChange }: CourtSettingsProps) => {
  const handleToggleChange = (key: string) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key as keyof typeof settings],
    });
  };

  const handleJudicialStyleChange = (style: string) => {
    onSettingsChange({ ...settings, judicialStyle: style });
  };

  const handleBenchSizeChange = (size: number) => {
    onSettingsChange({ ...settings, benchSize: size });
  };

  return (
    <Tabs defaultValue="features" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="features">Court Features</TabsTrigger>
        <TabsTrigger value="style">Judicial Style</TabsTrigger>
      </TabsList>

      <TabsContent value="features" className="space-y-4 pt-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-serif text-navy-800 flex items-center">
              <Users className="h-5 w-5 mr-2 text-navy-700" />
              Bench Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="multi-judge">Multi-Judge Bench</Label>
                <p className="text-sm text-gray-500">
                  Enable a panel of judges instead of a single judge
                </p>
              </div>
              <Switch
                id="multi-judge"
                checked={settings.multiJudgeBench}
                onCheckedChange={() => handleToggleChange("multiJudgeBench")}
              />
            </div>

            {settings.multiJudgeBench && (
              <div className="pl-4 border-l-2 border-navy-100 space-y-2">
                <p className="text-sm font-medium text-navy-800">Bench Size</p>
                <div className="flex space-x-2">
                  {[3, 5, 7].map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 rounded-md text-sm ${settings.benchSize === size ? "bg-navy-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                      onClick={() => handleBenchSizeChange(size)}
                    >
                      {size} Judges
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Larger benches are typically used for constitutional or
                  landmark cases
                </p>
              </div>
            )}

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="objections">Live Objections</Label>
                <p className="text-sm text-gray-500">
                  Allow raising and ruling on objections during proceedings
                </p>
              </div>
              <Switch
                id="objections"
                checked={settings.liveObjections}
                onCheckedChange={() => handleToggleChange("liveObjections")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="alt-sentencing">Alternative Sentencing</Label>
                <p className="text-sm text-gray-500">
                  Enable rehabilitation and alternative punishment options
                </p>
              </div>
              <Switch
                id="alt-sentencing"
                checked={settings.alternativeSentencing}
                onCheckedChange={() =>
                  handleToggleChange("alternativeSentencing")
                }
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="style" className="pt-4">
        <JudicialStyleSelector
          selectedStyle={settings.judicialStyle}
          onStyleChange={handleJudicialStyleChange}
        />
      </TabsContent>
    </Tabs>
  );
};

export default CourtSettings;
