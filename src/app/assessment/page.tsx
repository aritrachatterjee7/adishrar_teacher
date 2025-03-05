import QuizCreator from "@/src/components/assessment/quiz-creator";
import AnalyticsChart from "@/src/components/assessment/analytics-chart";
import { BookOpen } from "lucide-react";

export default function AssessmentPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-2">
        <BookOpen className="h-8 w-8 text-blue-600" />
        <h2 className="text-3xl font-bold tracking-tight">Assessment</h2>
      </div>

      {/* Quiz Creator Section */}
      <div className="mb-8">
        <QuizCreator />
      </div>

      {/* Analytics Chart Section */}
      <div>
        <AnalyticsChart />
      </div>
    </div>
  );
}
