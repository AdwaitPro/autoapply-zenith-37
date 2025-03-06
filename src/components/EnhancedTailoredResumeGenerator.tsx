
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Edit, CheckCircle, ChevronLeft, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Job {
  title: string;
  company: string;
  description: string;
}

interface EnhancedTailoredResumeGeneratorProps {
  job: Job;
  onClose: () => void;
}

export const EnhancedTailoredResumeGenerator = ({ job, onClose }: EnhancedTailoredResumeGeneratorProps) => {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    summary: `I am a skilled professional with experience in ${job.title.toLowerCase()} roles. I have a proven track record of success in fast-paced environments like ${job.company}.`,
    experience: `• Implemented solutions relevant to ${job.title}\n• Collaborated with cross-functional teams\n• Improved processes resulting in significant efficiency gains\n• Led projects that delivered measurable results\n• Mentored junior team members`,
    education: "Bachelor's Degree in Computer Science",
    skills: "JavaScript, React, Node.js, Project Management, Team Leadership",
    certifications: "Certified Scrum Master, AWS Certified Developer",
    projects: "• Built a responsive web application with React\n• Developed a data visualization dashboard\n• Created an automated testing framework"
  });
  
  const [isEditing, setIsEditing] = useState(true);
  const [activeTab, setActiveTab] = useState("edit");
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
    setActiveTab("preview");
    toast({
      title: "Resume saved!",
      description: "Your tailored resume is ready to download."
    });
  };

  const handleCopyToClipboard = () => {
    const resumeText = generateResumeText();
    navigator.clipboard.writeText(resumeText);
    toast({
      title: "Resume copied to clipboard!",
      description: "You can now paste your resume anywhere."
    });
  };

  const generateResumeText = () => {
    return `
${resumeData.name}
${resumeData.email} | ${resumeData.phone}${resumeData.location ? ` | ${resumeData.location}` : ''}
${resumeData.linkedin ? `LinkedIn: ${resumeData.linkedin}` : ''}${resumeData.website ? ` | Website: ${resumeData.website}` : ''}

PROFESSIONAL SUMMARY
${resumeData.summary}

EXPERIENCE
${resumeData.experience}

EDUCATION
${resumeData.education}

SKILLS
${resumeData.skills}

${resumeData.certifications ? `CERTIFICATIONS
${resumeData.certifications}

` : ''}
${resumeData.projects ? `PROJECTS
${resumeData.projects}` : ''}
    `.trim();
  };

  const handleDownload = () => {
    // Format the resume as a simple text file
    const resumeText = generateResumeText();

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
    <Card className="w-full mx-auto animate-in slide-in-from-bottom-5">
      <CardHeader className="bg-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="mr-2 p-2 h-auto" 
              onClick={onClose}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-6 w-6" />
              <span>Tailored Resume for {job.title} at {job.company}</span>
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit" className="pt-4">
          <CardContent>
            <div className="space-y-6">
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
                <div>
                  <label className="text-sm font-medium mb-1 block">Location</label>
                  <Input 
                    name="location"
                    value={resumeData.location}
                    onChange={handleInputChange}
                    placeholder="New York, NY"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">LinkedIn (optional)</label>
                  <Input 
                    name="linkedin"
                    value={resumeData.linkedin}
                    onChange={handleInputChange}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Website (optional)</label>
                  <Input 
                    name="website"
                    value={resumeData.website}
                    onChange={handleInputChange}
                    placeholder="johndoe.com"
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
              
              <div>
                <label className="text-sm font-medium mb-1 block">Certifications (optional)</label>
                <Textarea 
                  name="certifications"
                  value={resumeData.certifications}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Projects (optional)</label>
                <Textarea 
                  name="projects"
                  value={resumeData.projects}
                  onChange={handleInputChange}
                  rows={3}
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
          </CardContent>
        </TabsContent>
        
        <TabsContent value="preview" className="pt-4">
          <CardContent>
            <div className="space-y-6 print:space-y-4 max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
              <div className="border-b-2 border-gray-800 pb-4 text-center">
                <h2 className="text-3xl font-bold">{resumeData.name || "Your Name"}</h2>
                <p className="text-gray-600 mt-2">
                  {resumeData.email && <span>{resumeData.email}</span>}
                  {resumeData.phone && <span> | {resumeData.phone}</span>}
                  {resumeData.location && <span> | {resumeData.location}</span>}
                </p>
                <p className="text-gray-600 mt-1">
                  {resumeData.linkedin && <span>{resumeData.linkedin}</span>}
                  {resumeData.website && resumeData.linkedin && <span> | </span>}
                  {resumeData.website && <span>{resumeData.website}</span>}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 border-b border-gray-300 pb-1">PROFESSIONAL SUMMARY</h3>
                <p className="text-gray-700">{resumeData.summary}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 border-b border-gray-300 pb-1">EXPERIENCE</h3>
                <div className="whitespace-pre-line text-gray-700">{resumeData.experience}</div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 border-b border-gray-300 pb-1">EDUCATION</h3>
                <p className="text-gray-700">{resumeData.education}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 border-b border-gray-300 pb-1">SKILLS</h3>
                <p className="text-gray-700">{resumeData.skills}</p>
              </div>
              
              {resumeData.certifications && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 border-b border-gray-300 pb-1">CERTIFICATIONS</h3>
                  <p className="whitespace-pre-line text-gray-700">{resumeData.certifications}</p>
                </div>
              )}
              
              {resumeData.projects && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 border-b border-gray-300 pb-1">PROJECTS</h3>
                  <div className="whitespace-pre-line text-gray-700">{resumeData.projects}</div>
                </div>
              )}
              
              <div className="flex justify-end space-x-2 pt-6">
                <Button variant="outline" onClick={() => setActiveTab("edit")}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" onClick={handleCopyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
