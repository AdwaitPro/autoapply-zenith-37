
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Search,
  FileText,
  UserCircle,
  Send,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    title: "Complete Your Profile",
    description: "Add your professional information and skills to stand out.",
    icon: UserCircle,
  },
  {
    title: "Upload Your Resume",
    description: "Upload your resume to automatically fill your profile.",
    icon: FileText,
  },
  {
    title: "Search Jobs",
    description: "Browse through job listings that match your skills.",
    icon: Search,
  },
  {
    title: "Apply to Jobs",
    description: "Submit applications to positions you're interested in.",
    icon: Send,
  },
  {
    title: "Track Applications",
    description: "Monitor your application status and follow up.",
    icon: CheckCircle,
  },
];

export const OnboardingGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Card className="p-6 animate-in slide-in">
      <h2 className="text-2xl font-semibold mb-6">Welcome! Let's get started 🚀</h2>
      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 ${
                currentStep === index
                  ? "bg-primary/5 scale-[1.02]"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setCurrentStep(index)}
            >
              <div
                className={`p-2 rounded-full ${
                  currentStep === index
                    ? "bg-primary/10 text-primary"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
              {index < currentStep && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          onClick={() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1);
            }
          }}
          disabled={currentStep === steps.length - 1}
        >
          {currentStep === steps.length - 1 ? "All set!" : "Next step"}
        </Button>
      </div>
    </Card>
  );
};
