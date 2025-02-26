
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LinkedinIcon, Upload } from "lucide-react";

export const ProfileSetup = () => {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
      duration: 3000,
    });
  };

  return (
    <Card className="glass-card p-6 animate-in">
      <h2 className="text-2xl font-semibold mb-6">Set Up Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">LinkedIn Profile URL</label>
          <div className="relative">
            <LinkedinIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="url"
              placeholder="https://linkedin.com/in/your-profile"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Or Upload Your Resume</label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Drag and drop your resume here, or click to browse</p>
            <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Save Profile
        </Button>
      </form>
    </Card>
  );
};
