
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, BriefcaseIcon, MapPinIcon, Building2Icon } from "lucide-react";

const JobCard = ({ title, company, location, matchScore }: { 
  title: string;
  company: string;
  location: string;
  matchScore: number;
}) => (
  <Card className="glass-card p-4 hover-scale cursor-pointer">
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="flex items-center">
            <Building2Icon className="w-4 h-4 mr-1" />
            {company}
          </span>
          <span className="flex items-center">
            <MapPinIcon className="w-4 h-4 mr-1" />
            {location}
          </span>
        </div>
      </div>
      <div className="text-right">
        <span className="inline-block px-2 py-1 text-xs font-medium text-success bg-success/10 rounded-full">
          {matchScore}% Match
        </span>
      </div>
    </div>
  </Card>
);

export const JobSearch = () => {
  const jobs = [
    { title: "Senior Frontend Developer", company: "TechCorp", location: "Remote", matchScore: 92 },
    { title: "Full Stack Engineer", company: "StartupX", location: "San Francisco", matchScore: 87 },
    { title: "React Developer", company: "InnovateLabs", location: "New York", matchScore: 85 },
  ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <Input type="search" placeholder="Search jobs..." className="pl-10" />
      </div>
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};
