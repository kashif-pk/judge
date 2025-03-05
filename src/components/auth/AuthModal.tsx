import React, { useState } from "react";
import { X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultTab?: "login" | "register";
  onLoginSuccess?: (data: any) => void;
  onRegisterSuccess?: (data: any) => void;
}

const AuthModal = ({
  isOpen = true,
  onClose = () => {},
  defaultTab = "login",
  onLoginSuccess = () => {},
  onRegisterSuccess = () => {},
}: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);

  const handleLoginSubmit = (values: any) => {
    // In a real implementation, this would handle the login API call
    console.log("Login submitted:", values);
    onLoginSuccess(values);
  };

  const handleRegisterSubmit = (values: any) => {
    // In a real implementation, this would handle the registration API call
    console.log("Registration submitted:", values);
    onRegisterSuccess(values);
  };

  const handleSwitchToLogin = () => {
    setActiveTab("login");
  };

  const handleSwitchToRegister = () => {
    setActiveTab("register");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white">
        <DialogHeader className="pt-6 px-6 bg-navy-700 text-white">
          <DialogTitle className="text-2xl font-serif text-center">
            AI Indian Court Judge Platform
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none text-white"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <div className="p-6">
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "login" | "register")
            }
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-navy-700 data-[state=active]:text-white"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-navy-700 data-[state=active]:text-white"
              >
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-0">
              <LoginForm
                onSubmit={handleLoginSubmit}
                onForgotPassword={() => console.log("Forgot password clicked")}
              />
            </TabsContent>

            <TabsContent value="register" className="mt-0">
              <RegisterForm
                onSubmit={handleRegisterSubmit}
                onLoginClick={handleSwitchToLogin}
              />
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-px flex-1 bg-gray-200"></div>
              <span className="text-sm text-gray-500 px-2">
                {activeTab === "login"
                  ? "New to the platform?"
                  : "Already have an account?"}
              </span>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            <button
              onClick={
                activeTab === "login"
                  ? handleSwitchToRegister
                  : handleSwitchToLogin
              }
              className="mt-4 text-navy-700 hover:text-navy-800 font-medium text-sm"
            >
              {activeTab === "login" ? "Create an account" : "Sign in instead"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
