import React from "react";
import { motion } from "framer-motion";
import { Scale, Gavel, BookOpen } from "lucide-react";

interface JudgeAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  withEffects?: boolean;
  withBadge?: boolean;
}

const JudgeAvatar = ({
  size = "md",
  withEffects = true,
  withBadge = true,
}: JudgeAvatarProps) => {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
    xl: "w-80 h-80",
  };

  const avatarSize = sizeClasses[size];

  return (
    <div className="relative inline-block">
      {withEffects && (
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 opacity-75 blur-sm"></div>
      )}
      <div className="relative bg-navy-800 rounded-full p-1">
        <img
          src="/judge-avatar.png"
          alt="AI Judge Avatar"
          className={`${avatarSize} object-cover rounded-full bg-navy-700`}
        />

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-0 transform translate-x-1/2 bg-gold-500 rounded-full p-1">
          <Gavel className="h-5 w-5 text-navy-900" />
        </div>
        <div className="absolute bottom-1/4 left-0 transform -translate-x-1/2 bg-navy-700 rounded-full p-1 border-2 border-gold-500">
          <Scale className="h-5 w-5 text-gold-500" />
        </div>
      </div>
      {withBadge && (
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gold-500 text-navy-900 px-4 py-1 rounded-full font-medium text-sm whitespace-nowrap">
          AI Indian Judge
        </div>
      )}
    </div>
  );
};

export default JudgeAvatar;
