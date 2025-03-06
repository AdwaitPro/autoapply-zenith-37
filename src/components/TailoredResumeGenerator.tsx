
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Edit, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Job {
  title: string;
  company: string;
  description: string;
}

interface TailoredResumeGeneratorProps {
  job: Job;
  onClose: () => void;
}

export const TailoredResumeGenerator = ({ job, onClose }: TailoredResumeGeneratorProps) => {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: `I am a skilled professional with experience in ${job.title.toLowerCase()} roles. I have a proven track record of success in fast-paced environments like ${job.company}.`,
    experience: `• Implemented solutions relevant to ${job.title}\n• Collaborated with cross-functional teams\n• Improved processes resulting in significant efficiency gains`,
    education: "Bachelor's Degree in Computer Science",
    skills: "JavaScript, React, Node.js, Project Management, Team Leadership"
  });
  
  const [isEditing, setIsEditing] = useState(true);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      [name]: value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Resume saved!",
      description: "Your tailored resume is ready to download."
    });
  };

  const handleDownload = () => {
    // Format the resume as a simple text file
    const resumeText = `
${resumeData.name}
${resumeData.email} | ${resumeData.phone}

SUMMARY
${resumeData.summary}

EXPERIENCE
${resumeData.experience}

EDUCATION
${resumeData.education}

SKILLS
${resumeData.skills}
    `.trim();

    // Create a blob and download link
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.name.replace(/\s+/g, '_')}_${job.title.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Resume downloaded!",
      description: "You can now use this tailored resume to apply for the job.",
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto animate-in slide-in-from-bottom-5">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-6 w-6" />
          <span>Tailored Resume for {job.title} at {job.company}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Full Name</label>
                  <Input 
                    name="name"
                    value={resumeData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input 
                    name="email"
                    value={resumeData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Phone</label>
                  <Input 
                    name="phone"
                    value={resumeData.phone}
                    onChange={handleInputChange}
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Professional Summary</label>
                <Textarea 
                  name="summary"
                  value={resumeData.summary}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Experience (Use bullet points)</label>
                <Textarea 
                  name="experience"
                  value={resumeData.experience}
                  onChange={handleInputChange}
                  rows={6}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Education</label>
                <Input 
                  name="education"
                  value={resumeData.education}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Skills</label>
                <Textarea 
                  name="skills"
                  value={resumeData.skills}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Resume
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-2xl font-bold">{resumeData.name}</h2>
                <p className="text-gray-600">{resumeData.email} | {resumeData.phone}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">SUMMARY</h3>
                <p>{resumeData.summary}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">EXPERIENCE</h3>
                <div className="whitespace-pre-line">{resumeData.experience}</div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">EDUCATION</h3>
                <p>{resumeData.education}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">SKILLS</h3>
                <p>{resumeData.skills}</p>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
