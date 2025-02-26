
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Application {
  id: string;
  job_id: string;
  user_id: string;
  status: "applied" | "interview" | "rejected";
  notes?: string;
  created_at: string;
  updated_at: string;
  job?: {
    title: string;
    company: string;
  };
}

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setError("User not authenticated");
          return;
        }

        const { data, error } = await supabase
          .from("applications")
          .select(`
            *,
            job:jobs(title, company)
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setApplications(data);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch applications");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();

    // Subscribe to real-time updates
    const channel = supabase
      .channel("applications-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "applications",
        },
        (payload) => {
          console.log("Real-time application update:", payload);
          fetchApplications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const applyToJob = async (jobId: string, notes?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase
        .from("applications")
        .insert([
          {
            job_id: jobId,
            user_id: user.id,
            notes,
            status: "applied",
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error applying to job:", err);
      throw err;
    }
  };

  return { applications, isLoading, error, applyToJob };
}
