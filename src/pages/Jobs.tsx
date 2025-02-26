
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Search, Building2Icon, MapPinIcon, BriefcaseIcon, CheckCircle } from "lucide-react";
import { Header } from "@/components/Header";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  matchScore: number;
}

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock job data - in a real app, this would come from an API
  const jobs: Job[] = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      type: "Full-time",
      salary: "$120k - $150k",
      matchScore: 92,
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupX",
      location: "San Francisco",
      type: "Full-time",
      salary: "$130k - $160k",
      matchScore: 87,
    },
    {
      id: 3,
      title: "React Developer",
      company: "InnovateLabs",
      location: "New York",
      type: "Contract",
      salary: "$100k - $130k",
      matchScore: 85,
    },
  ];

  const handleJobClick = (jobId: number) => {
    // Mark the jobs search step as completed when user interacts with jobs
    localStorage.setItem("jobsSearched", "true");
    toast({
      title: "Great choice!",
      description: "Click 'Apply Now' to start your application.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 animate-in slide-in">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-full">
                <BriefcaseIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Find Your Next Opportunity</h1>
                <p className="text-gray-500">Browse through our curated job listings</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search jobs by title, company, or location..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                {jobs.map((job) => (
                  <Card
                    key={job.id}
                    className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleJobClick(job.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Building2Icon className="w-4 h-4 mr-1" />
                              {job.company}
                            </span>
                            <span className="flex items-center">
                              <MapPinIcon className="w-4 h-4 mr-1" />
                              {job.location}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                              {job.type}
                            </span>
                            <span className="text-sm bg-success/10 text-success px-2 py-1 rounded">
                              {job.salary}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2 py-1 text-xs font-medium text-success bg-success/10 rounded-full">
                          {job.matchScore}% Match
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/apply/${job.id}`);
                        }}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Jobs;
