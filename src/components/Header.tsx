
import { BriefcaseIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <BriefcaseIcon className="w-6 h-6 text-primary" />
          <span className="text-xl font-semibold text-primary">AutoApply AI</span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/" ? "text-primary" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/jobs" 
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/jobs" ? "text-primary" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Jobs
          </Link>
          <Link 
            to="/applications" 
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/applications" ? "text-primary" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Applications
          </Link>
          <Link 
            to="/profile" 
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/profile" ? "text-primary" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
};
