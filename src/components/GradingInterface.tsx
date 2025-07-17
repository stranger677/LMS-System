
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, SkipForward, User, FileText, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GradingInterfaceProps {
  onBack: () => void;
  darkMode?: boolean;
}

const GradingInterface: React.FC<GradingInterfaceProps> = ({ onBack, darkMode = false }) => {
  const { toast } = useToast();
  const [currentSubmission, setCurrentSubmission] = useState(0);
  const [grades, setGrades] = useState<Record<number, number>>({});
  const [feedback, setFeedback] = useState<Record<number, string>>({});

  // Sample submission data
  const submissions = [
    {
      id: 1,
      studentName: "John Doe",
      studentId: "2021001234",
      submittedAt: "2024-06-20T15:45:00",
      answers: [
        {
          questionId: 3,
          question: "Explain the fundamental theorem of calculus in your own words.",
          answer: "The fundamental theorem of calculus connects differentiation and integration. It states that if a function is continuous over an interval and has an antiderivative, then the definite integral of the function over that interval equals the difference between the values of the antiderivative at the endpoints.",
          maxPoints: 20
        }
      ]
    },
    {
      id: 2,
      studentName: "Jane Smith", 
      studentId: "2021001235",
      submittedAt: "2024-06-20T15:30:00",
      answers: [
        {
          questionId: 3,
          question: "Explain the fundamental theorem of calculus in your own words.",
          answer: "It's about how derivatives and integrals are related. You can use it to calculate areas under curves.",
          maxPoints: 20
        }
      ]
    }
  ];

  const currentSub = submissions[currentSubmission];
  const totalSubmissions = submissions.length;

  const handleGradeChange = (questionId: number, grade: number) => {
    setGrades(prev => ({ ...prev, [questionId]: grade }));
  };

  const handleFeedbackChange = (questionId: number, feedbackText: string) => {
    setFeedback(prev => ({ ...prev, [questionId]: feedbackText }));
  };

  const handleSaveAndNext = () => {
    // Save current grades and feedback
    console.log('Saving grades:', grades, 'Feedback:', feedback);
    
    toast({
      title: "Grades Saved",
      description: `Grades saved for ${currentSub.studentName}`
    });

    // Move to next submission
    if (currentSubmission < totalSubmissions - 1) {
      setCurrentSubmission(currentSubmission + 1);
      setGrades({});
      setFeedback({});
    } else {
      toast({
        title: "All Done!",
        description: "All submissions have been graded."
      });
      onBack();
    }
  };

  const handleSkip = () => {
    if (currentSubmission < totalSubmissions - 1) {
      setCurrentSubmission(currentSubmission + 1);
      setGrades({});
      setFeedback({});
    }
  };

  const getTotalGrade = () => {
    return Object.values(grades).reduce((sum, grade) => sum + grade, 0);
  };

  const getMaxPossibleGrade = () => {
    return currentSub.answers.reduce((sum, answer) => sum + answer.maxPoints, 0);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Manage
              </Button>
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                    Manual Grading
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Submission {currentSubmission + 1} of {totalSubmissions}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                Progress: {currentSubmission + 1}/{totalSubmissions}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Grading Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Student Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Student Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <Label className="font-medium">Name</Label>
                    <p>{currentSub.studentName}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Student ID</Label>
                    <p>{currentSub.studentId}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Submitted At</Label>
                    <p>{new Date(currentSub.submittedAt).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Questions to Grade */}
            {currentSub.answers.map((answer, index) => (
              <Card key={answer.questionId}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {index + 1} ({answer.maxPoints} points)
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">{answer.question}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="font-medium">Student Answer:</Label>
                    <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm">{answer.answer}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`grade-${answer.questionId}`}>
                        Grade (out of {answer.maxPoints})
                      </Label>
                      <Input
                        id={`grade-${answer.questionId}`}
                        type="number"
                        min="0"
                        max={answer.maxPoints}
                        value={grades[answer.questionId] || ''}
                        onChange={(e) => handleGradeChange(answer.questionId, parseInt(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <Label htmlFor={`feedback-${answer.questionId}`}>
                        Feedback (optional)
                      </Label>
                      <Textarea
                        id={`feedback-${answer.questionId}`}
                        value={feedback[answer.questionId] || ''}
                        onChange={(e) => handleFeedbackChange(answer.questionId, e.target.value)}
                        placeholder="Provide feedback to the student..."
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Grading Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Grading Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Current Total:</span>
                  <span className="font-medium">{getTotalGrade()}/{getMaxPossibleGrade()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Percentage:</span>
                  <span className="font-medium">
                    {getMaxPossibleGrade() > 0 ? Math.round((getTotalGrade() / getMaxPossibleGrade()) * 100) : 0}%
                  </span>
                </div>
                <div className="pt-3 border-t">
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Questions: {currentSub.answers.length}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={handleSaveAndNext} 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={Object.keys(grades).length === 0}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save & Next
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleSkip} 
                  className="w-full"
                  disabled={currentSubmission >= totalSubmissions - 1}
                >
                  <SkipForward className="h-4 w-4 mr-2" />
                  Skip for Now
                </Button>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {submissions.map((sub, index) => (
                    <Button
                      key={sub.id}
                      variant={index === currentSubmission ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setCurrentSubmission(index);
                        setGrades({});
                        setFeedback({});
                      }}
                      className="w-full justify-start text-left"
                    >
                      <div>
                        <div className="font-medium">{sub.studentName}</div>
                        <div className="text-xs opacity-70">{sub.studentId}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradingInterface;
