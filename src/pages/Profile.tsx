
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { UserCircle, Building2Icon, MapPinIcon, GraduationCapIcon, BriefcaseIcon } from "lucide-react";
import { Header } from "@/components/Header";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    company: "",
    location: "",
    education: "",
    experience: "",
    skills: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save to your backend
    localStorage.setItem("profileCompleted", "true");
    toast({
      title: "Profile Completed!",
      description: "Your profile has been successfully updated.",
    });
    navigate("/");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 animate-in slide-in">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-full">
                <UserCircle className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Complete Your Profile</h1>
                <p className="text-gray-500">Let's get to know you better</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Current Title</label>
                  <div className="relative">
                    <BriefcaseIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Company</label>
                  <div className="relative">
                    <Building2Icon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Location</label>
                  <div className="relative">
                    <MapPinIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Education</label>
                  <div className="relative">
                    <GraduationCapIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Years of Experience</label>
                  <Input
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Skills (comma separated)</label>
                  <Input
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="React, TypeScript, Node.js"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Complete Profile
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
