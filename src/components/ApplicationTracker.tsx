
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckIcon, Clock8Icon, XIcon } from "lucide-react";

interface Application {
  jobTitle: string;
  company: string;
  status: "applied" | "interview" | "rejected";
  date: string;
}

const StatusBadge = ({ status }: { status: Application["status"] }) => {
  const styles = {
    applied: "bg-primary/10 text-primary",
    interview: "bg-success/10 text-success",
    rejected: "bg-destructive/10 text-destructive",
  };

  const icons = {
    applied: <Clock8Icon className="w-4 h-4" />,
    interview: <CheckIcon className="w-4 h-4" />,
    rejected: <XIcon className="w-4 h-4" />,
  };

  return (
    <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {icons[status]}
      <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    </span>
  );
};

export const ApplicationTracker = () => {
  const applications: Application[] = [
    { jobTitle: "Senior Frontend Developer", company: "TechCorp", status: "interview", date: "2024-02-20" },
    { jobTitle: "Full Stack Engineer", company: "StartupX", status: "applied", date: "2024-02-19" },
    { jobTitle: "React Developer", company: "InnovateLabs", status: "rejected", date: "2024-02-18" },
  ];

  const stats = {
    total: applications.length,
    interviews: applications.filter(app => app.status === "interview").length,
    success: (applications.filter(app => app.status === "interview").length / applications.length) * 100,
  };

  return (
    <Card className="glass-card p-6 animate-in">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Application Tracker</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Applications</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.interviews}</p>
              <p className="text-sm text-gray-600">Interviews</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{Math.round(stats.success)}%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
          </div>
          <Progress value={stats.success} className="mt-2" />
        </div>
        
        <div className="space-y-4">
          {applications.map((application, index) => (
            <div key={index} className="p-4 rounded-lg bg-background border">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-medium">{application.jobTitle}</h3>
                  <p className="text-sm text-gray-600">{application.company}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{application.date}</span>
                  <StatusBadge status={application.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
