
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Search, Building2Icon, MapPinIcon, BriefcaseIcon } from "lucide-react";
import { Header } from "@/components/Header";
import { useJobs } from "@/hooks/useJobs";
import { Skeleton } from "@/components/ui/skeleton";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { jobs, isLoading, error } = useJobs(searchQuery);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleJobClick = (jobId: string) => {
    localStorage.setItem("jobsSearched", "true");
    toast({
      title: "Great choice!",
      description: "Click 'Apply Now' to start your application.",
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="pt-24 pb-12 px-4">
          <Card className="max-w-4xl mx-auto p-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-red-600">Error Loading Jobs</h2>
              <p className="text-gray-600 mt-2">{error}</p>
            </div>
          </Card>
        </main>
      </div>
    );
  }

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
                {isLoading ? (
                  Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <Card key={index} className="p-6">
                        <div className="space-y-3">
                          <Skeleton className="h-6 w-2/3" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-4 w-1/4" />
                          </div>
                        </div>
                      </Card>
                    ))
                ) : (
                  jobs.map((job) => (
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
                                ${job.salary_min / 1000}k - ${job.salary_max / 1000}k
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
                      <div className="mt-4">
                        <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>
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
                  ))
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Jobs;

