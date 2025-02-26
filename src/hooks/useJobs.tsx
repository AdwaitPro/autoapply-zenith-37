
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary_min: number;
  salary_max: number;
  description: string;
  requirements: string[];
  created_at: string;
  updated_at: string;
  matchScore?: number;
}

export function useJobs(searchQuery: string = "") {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        let query = supabase.from("jobs").select("*");

        if (searchQuery) {
          query = query.or(
            `title.ilike.%${searchQuery}%,company.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`
          );
        }

        const { data, error } = await query.order("created_at", { ascending: false });

        if (error) throw error;

        // Calculate match scores (in a real app, this would be more sophisticated)
        const jobsWithScores = data.map((job) => ({
          ...job,
          matchScore: Math.floor(Math.random() * 30) + 70, // Random score between 70-100 for demo
        }));

        setJobs(jobsWithScores);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch jobs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [searchQuery]);

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel("jobs-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "jobs",
        },
        async (payload) => {
          console.log("Real-time update received:", payload);
          
          // Refresh the jobs list when changes occur
          const { data, error } = await supabase
            .from("jobs")
            .select("*")
            .order("created_at", { ascending: false });

          if (!error && data) {
            const jobsWithScores = data.map((job) => ({
              ...job,
              matchScore: Math.floor(Math.random() * 30) + 70,
            }));
            setJobs(jobsWithScores);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { jobs, isLoading, error };
}
