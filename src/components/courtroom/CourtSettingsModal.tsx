import React, { useState } from "react";
import { Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CourtSettings from "./CourtSettings";

interface CourtSettingsModalProps {
  initialSettings: {
    multiJudgeBench: boolean;
    liveObjections: boolean;
    alternativeSentencing: boolean;
    judicialStyle: string;
    benchSize: number;
  };
  onSettingsSave: (settings: any) => void;
}

const CourtSettingsModal = ({
  initialSettings,
  onSettingsSave,
}: CourtSettingsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(initialSettings);

  const handleSettingsChange = (newSettings: any) => {
    setSettings(newSettings);
  };

  const handleSave = () => {
    onSettingsSave(settings);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-navy-500 text-navy-500 hover:bg-navy-100"
        >
          <Settings className="h-4 w-4 mr-2" />
          Court Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-navy-800 flex items-center">
            <Settings className="h-5 w-5 mr-2 text-navy-700" />
            Courtroom Settings
          </DialogTitle>
          <DialogDescription>
            Customize your virtual courtroom experience with these settings
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <CourtSettings
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-navy-700 hover:bg-navy-800"
          >
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourtSettingsModal;
