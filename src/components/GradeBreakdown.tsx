
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Award, BookOpen, FileText, Clock, Users, UserCheck, TrendingUp } from "lucide-react";

interface GradeBreakdownProps {
  course: {
    id: number;
    name: string;
    code: string;
    finalGrade: number;
  };
  onBack: () => void;
  darkMode?: boolean;
}

const GradeBreakdown: React.FC<GradeBreakdownProps> = ({ course, onBack, darkMode = false }) => {
  const gradeComponents = [
    {
      category: "Midterm Exam",
      icon: Clock,
      weight: 25,
      maxPoints: 100,
      earned: 82,
      color: "bg-blue-500",
      details: "Written examination covering first half of curriculum"
    },
    {
      category: "Assignments",
      icon: FileText,
      weight: 20,
      maxPoints: 100,
      earned: 88,
      color: "bg-green-500",
      details: "5 assignments submitted throughout the semester"
    },
    {
      category: "Quizzes",
      icon: BookOpen,
      weight: 15,
      maxPoints: 100,
      earned: 75,
      color: "bg-yellow-500",
      details: "8 quizzes conducted during regular classes"
    },
    {
      category: "Final Exam",
      icon: Award,
      weight: 30,
      maxPoints: 100,
      earned: 90,
      color: "bg-purple-500",
      details: "Comprehensive final examination"
    },
    {
      category: "Presentation",
      icon: Users,
      weight: 5,
      maxPoints: 100,
      earned: 85,
      color: "bg-orange-500",
      details: "Group presentation on assigned topic"
    },
    {
      category: "Attendance",
      icon: UserCheck,
      weight: 5,
      maxPoints: 100,
      earned: 95,
      color: "bg-cyan-500",
      details: "Regular class attendance throughout semester"
    }
  ];

  const calculateWeightedScore = (earned: number, weight: number) => {
    return (earned * weight) / 100;
  };

  const totalWeightedScore = gradeComponents.reduce((total, component) => {
    return total + calculateWeightedScore(component.earned, component.weight);
  }, 0);

  const getGradeLetter = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  const getGradeColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={onBack} className="mr-4 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Back to Grades</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="flex items-center space-x-4">
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Grade Breakdown</h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{course.name} ({course.code})</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Overall Grade Summary */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg sm:text-xl">Final Course Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className={`text-4xl sm:text-6xl font-bold ${getGradeColor(totalWeightedScore)}`}>
                {getGradeLetter(totalWeightedScore)}
              </div>
              <div className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                {totalWeightedScore.toFixed(1)}%
              </div>
              <Progress value={totalWeightedScore} className="h-3 sm:h-4 mx-auto max-w-md" />
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <TrendingUp className="h-4 w-4" />
                <span>Overall Performance</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grade Components Breakdown */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Grade Components</h2>
          
          <div className="grid gap-4 sm:gap-6">
            {gradeComponents.map((component, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${component.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <component.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg truncate">{component.category}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Weight: {component.weight}% of final grade
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                          {component.details}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:flex-shrink-0">
                      <div className="grid grid-cols-2 sm:flex sm:items-center sm:space-x-4 gap-4 sm:gap-0">
                        <div className="text-center sm:text-right">
                          <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                            {component.earned}/{component.maxPoints}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            {((component.earned / component.maxPoints) * 100).toFixed(1)}%
                          </div>
                        </div>
                        <div className="text-center sm:text-right">
                          <div className="text-base sm:text-lg font-semibold text-blue-600">
                            {calculateWeightedScore(component.earned, component.weight).toFixed(1)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            Weighted Points
                          </div>
                        </div>
                      </div>
                      <Progress 
                        value={(component.earned / component.maxPoints) * 100} 
                        className="h-2 w-full sm:w-32 lg:w-40" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Grade Scale Reference */}
        <Card className="mt-6 sm:mt-8">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Grading Scale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-600">A</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">90-100%</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">B</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">80-89%</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-yellow-600">C</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">70-79%</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-orange-600">D</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">60-69%</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-red-600">F</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Below 60%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GradeBreakdown;
