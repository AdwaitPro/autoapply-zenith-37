
import { Header } from "@/components/Header";
import { ProfileSetup } from "@/components/ProfileSetup";
import { JobSearch } from "@/components/JobSearch";
import { ApplicationTracker } from "@/components/ApplicationTracker";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ProfileSetup />
            <ApplicationTracker />
          </div>
          <div className="space-y-8">
            <Card className="glass-card p-6">
              <h2 className="text-2xl font-semibold mb-6">Job Search</h2>
              <JobSearch />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
