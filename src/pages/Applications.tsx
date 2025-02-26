
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckIcon, Clock8Icon, XIcon } from "lucide-react";
import { useApplications } from "@/hooks/useApplications";

const StatusBadge = ({ status }: { status: "applied" | "interview" | "rejected" }) => {
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

const Applications = () => {
  const { applications, isLoading } = useApplications();

  const stats = {
    total: applications.length,
    interviews: applications.filter(app => app.status === "interview").length,
    success: applications.length ? 
      (applications.filter(app => app.status === "interview").length / applications.length) * 100 : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">My Applications</h1>
                <p className="text-gray-500">Track your job applications and their status</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-background rounded-lg border">
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-gray-600">Total Applications</p>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border">
                  <p className="text-2xl font-bold">{stats.interviews}</p>
                  <p className="text-sm text-gray-600">Interviews</p>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border">
                  <p className="text-2xl font-bold">{Math.round(stats.success)}%</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>

              <Progress value={stats.success} className="mt-2" />

              <div className="space-y-4">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <Card key={i} className="p-4">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-2/3" />
                        <Skeleton className="h-4 w-1/3" />
                      </div>
                    </Card>
                  ))
                ) : (
                  applications.map((application) => (
                    <Card key={application.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="font-medium">{application.job?.title}</h3>
                          <p className="text-sm text-gray-600">{application.job?.company}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">
                            {new Date(application.created_at).toLocaleDateString()}
                          </span>
                          <StatusBadge status={application.status} />
                        </div>
                      </div>
                      {application.notes && (
                        <p className="mt-2 text-sm text-gray-600">{application.notes}</p>
                      )}
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

export default Applications;
