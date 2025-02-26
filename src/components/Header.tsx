
import { BriefcaseIcon } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BriefcaseIcon className="w-6 h-6 text-primary" />
          <span className="text-xl font-semibold text-primary">AutoApply AI</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Dashboard
          </a>
          <a href="#applications" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Applications
          </a>
          <a href="#profile" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Profile
          </a>
        </nav>
      </div>
    </header>
  );
};
