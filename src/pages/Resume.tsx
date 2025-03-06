
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { FileText, Upload, FileType, CheckCircle, X, BarChart } from "lucide-react";
import { Header } from "@/components/Header";
import { scoreResume, ATSFeedback } from "@/utils/atsScorer";
import { ATSScoreCard } from "@/components/ATSScoreCard";

const Resume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsResult, setAtsResult] = useState<ATSFeedback | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setFile(file);
    setAtsResult(null); // Reset ATS result when a new file is uploaded
  };

  const analyzeResume = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    try {
      const result = await scoreResume(file);
      setAtsResult(result);
      toast({
        title: "Resume analyzed",
        description: `Your resume has an ATS compatibility score of ${result.score}%`,
      });
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    // Here you would typically upload the file to your backend
    // For now, we'll just mark the step as completed
    localStorage.setItem("resumeUploaded", "true");
    toast({
      title: "Resume uploaded successfully!",
      description: "Your resume has been saved.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 animate-in slide-in">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-full">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Upload Your Resume</h1>
                <p className="text-gray-500">Upload your resume to get started and check ATS compatibility</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {file ? "File ready to upload" : "Drop your resume here"}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    or click to browse (PDF or Word, max 5MB)
                  </p>
                  <input
                    type="file"
                    id="resume"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileInput}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("resume")?.click()}
                  >
                    Browse files
                  </Button>
                </div>
              </div>

              {file && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileType className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              )}

              {file && !atsResult && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={analyzeResume}
                  disabled={isAnalyzing}
                >
                  <BarChart className="w-4 h-4 mr-2" />
                  {isAnalyzing ? "Analyzing Resume..." : "Check ATS Compatibility"}
                </Button>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={!file}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Upload Resume
              </Button>
            </form>

            {atsResult && (
              <div className="mt-8">
                <ATSScoreCard result={atsResult} />
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Resume;
