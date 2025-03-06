
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ATSFeedback } from "@/utils/atsScorer";
import { AlertCircle, CheckCircle, LightbulbIcon } from "lucide-react";

interface ATSScoreCardProps {
  result: ATSFeedback;
}

export const ATSScoreCard = ({ result }: ATSScoreCardProps) => {
  // Determine score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-amber-500";
    return "text-destructive";
  };

  // Determine progress color based on value
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-amber-500";
    return "bg-destructive";
  };

  return (
    <Card className="p-6 animate-in slide-in-from-bottom-5">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">ATS Compatibility Score</h2>
        <div className="flex justify-center">
          <div className={`text-5xl font-bold ${getScoreColor(result.score)}`}>
            {result.score}%
          </div>
        </div>
        <Progress 
          value={result.score} 
          className="mt-2 h-2" 
          indicatorClassName={getProgressColor(result.score)} 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Strengths */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <h3 className="font-semibold">Strengths</h3>
          </div>
          <ul className="space-y-2 text-sm">
            {result.strengths.length > 0 ? (
              result.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  {strength}
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">No strengths detected</li>
            )}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <h3 className="font-semibold">Areas to Improve</h3>
          </div>
          <ul className="space-y-2 text-sm">
            {result.weaknesses.length > 0 ? (
              result.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  {weakness}
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">No issues detected</li>
            )}
          </ul>
        </div>

        {/* Suggestions */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <LightbulbIcon className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold">Suggestions</h3>
          </div>
          <ul className="space-y-2 text-sm">
            {result.suggestions.length > 0 ? (
              result.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  {suggestion}
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">No suggestions available</li>
            )}
          </ul>
        </div>
      </div>
    </Card>
  );
};
