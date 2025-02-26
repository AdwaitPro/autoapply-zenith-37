
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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
    path: "/profile",
    storageKey: "profileCompleted",
  },
  {
    title: "Upload Your Resume",
    description: "Upload your resume to automatically fill your profile.",
    icon: FileText,
    path: "/resume",
    storageKey: "resumeUploaded",
  },
  {
    title: "Search Jobs",
    description: "Browse through job listings that match your skills.",
    icon: Search,
    path: "/jobs",
    storageKey: "jobsSearched",
  },
  {
    title: "Apply to Jobs",
    description: "Submit applications to positions you're interested in.",
    icon: Send,
    path: "/apply",
    storageKey: "jobsApplied",
  },
  {
    title: "Track Applications",
    description: "Monitor your application status and follow up.",
    icon: CheckCircle,
    path: "/applications",
    storageKey: "applicationsTracked",
  },
];

export const OnboardingGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load completed steps from localStorage
    const completed = steps
      .filter(step => localStorage.getItem(step.storageKey) === "true")
      .map(step => step.storageKey);
    setCompletedSteps(completed);
  }, []);

  const handleStepClick = (index: number) => {
    const step = steps[index];
    navigate(step.path);
  };

  const isStepCompleted = (storageKey: string) => {
    return completedSteps.includes(storageKey);
  };

  // If all steps are completed, don't show the guide
  if (completedSteps.length === steps.length) {
    return null;
  }

  return (
    <Card className="p-6 animate-in slide-in">
      <h2 className="text-2xl font-semibold mb-6">Welcome! Let's get started 🚀</h2>
      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const completed = isStepCompleted(step.storageKey);
          return (
            <div
              key={index}
              className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 ${
                !completed ? "cursor-pointer hover:bg-gray-50" : "bg-success/5"
              } ${currentStep === index ? "bg-primary/5 scale-[1.02]" : ""}`}
              onClick={() => !completed && handleStepClick(index)}
            >
              <div
                className={`p-2 rounded-full ${
                  completed
                    ? "bg-success/10 text-success"
                    : currentStep === index
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
              {completed && (
                <CheckCircle className="w-5 h-5 text-success" />
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
