
import { useState } from "react";
import { Header } from "@/components/Header";
import { EnhancedTailoredResumeGenerator } from "@/components/EnhancedTailoredResumeGenerator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Briefcase } from "lucide-react";

// Sample jobs for the tailored resume feature
const sampleJobs = [
  {
    id: "job-123",
    title: "Frontend Developer",
    company: "TechCorp",
    description: "We're looking for a skilled Frontend Developer proficient in React, TypeScript, and modern web technologies."
  },
  {
    id: "job-124",
    title: "UX/UI Designer",
    company: "DesignHub",
    description: "Seeking a creative UX/UI Designer with expertise in user research, wireframing, and prototyping."
  },
  {
    id: "job-125",
    title: "Data Scientist",
    company: "DataWorks",
    description: "Looking for a Data Scientist with strong analytical skills and experience in machine learning and data visualization."
  },
  {
    id: "job-126",
    title: "Project Manager",
    company: "AgileTeam",
    description: "We need an experienced Project Manager with knowledge of Agile methodologies to lead our software development teams."
  }
];

const TailoredResume = () => {
  const [selectedJob, setSelectedJob] = useState<typeof sampleJobs[0] | null>(null);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {!selectedJob ? (
            <div className="space-y-6 animate-in slide-in">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-full">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Tailored Resume Generator</h1>
                  <p className="text-gray-500">Create custom resumes optimized for specific job descriptions</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleJobs.map((job) => (
                  <Card 
                    key={job.id} 
                    className="cursor-pointer hover-scale card-hover" 
                    onClick={() => setSelectedJob(job)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Briefcase className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <p className="text-sm font-medium text-primary">{job.company}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 line-clamp-3">{job.description}</p>
                      <div className="mt-4 text-sm text-primary font-medium">
                        Click to create tailored resume
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <EnhancedTailoredResumeGenerator 
              job={selectedJob} 
              onClose={() => setSelectedJob(null)} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default TailoredResume;
