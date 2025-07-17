
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, Clock, Eye, Camera } from "lucide-react";

interface ExamInterfaceProps {
  exam: {
    id: number;
    title: string;
    duration: number; // in minutes
    questions: Array<{
      id: number;
      type: 'mcq' | 'short';
      question: string;
      options?: string[];
      correctAnswer?: number;
      maxPoints: number;
    }>;
  };
  onSubmit: (answers: Record<number, string | number>) => void;
  onExit: () => void;
}

const ExamInterface: React.FC<ExamInterfaceProps> = ({ exam, onSubmit, onExit }) => {
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60); // Convert to seconds
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [violations, setViolations] = useState(0);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [showViolationWarning, setShowViolationWarning] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !examSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !examSubmitted) {
      handleAutoSubmit();
    }
  }, [timeLeft, examSubmitted]);

  // Anti-cheating measures
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !examSubmitted) {
        setViolations(prev => prev + 1);
        setShowViolationWarning(true);
      }
    };

    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
      alert("Right-click is disabled during the exam.");
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v' || e.key === 'a')) {
        e.preventDefault();
        alert("Copy/Paste is disabled during the exam.");
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [examSubmitted]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: number, answer: string | number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    setShowSubmitModal(true);
  };

  const confirmSubmit = () => {
    setExamSubmitted(true);
    setShowSubmitModal(false);
    onSubmit(answers);
  };

  const handleAutoSubmit = () => {
    setExamSubmitted(true);
    onSubmit(answers);
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  const getTotalQuestions = () => {
    return exam.questions.length;
  };

  if (examSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-green-600">Exam Submitted Successfully!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>Your exam has been submitted and saved.</p>
            <p className="text-sm text-gray-600">
              Questions Answered: {getAnsweredCount()} out of {getTotalQuestions()}
            </p>
            <Button onClick={onExit} className="w-full">
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ userSelect: 'none' }}>
      {/* Fixed Header with Timer */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-xl font-bold text-nu-primary">{exam.title}</h1>
            <p className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {exam.questions.length}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Monitoring Indicator */}
            <div className="flex items-center space-x-2 text-red-600">
              <Camera className="h-5 w-5" />
              <span className="text-sm">Monitoring Enabled</span>
            </div>
            
            {/* Timer */}
            <div className={`flex items-center space-x-2 p-2 rounded ${timeLeft < 300 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
              <Clock className="h-5 w-5" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>
                Question {currentQuestion + 1}: {exam.questions[currentQuestion].question}
              </CardTitle>
              <p className="text-sm text-gray-600">
                Points: {exam.questions[currentQuestion].maxPoints}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {exam.questions[currentQuestion].type === 'mcq' ? (
                <RadioGroup
                  value={answers[exam.questions[currentQuestion].id]?.toString() || ''}
                  onValueChange={(value) => handleAnswerChange(exam.questions[currentQuestion].id, parseInt(value))}
                >
                  {exam.questions[currentQuestion].options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <Textarea
                  placeholder="Type your answer here..."
                  value={answers[exam.questions[currentQuestion].id] as string || ''}
                  onChange={(e) => handleAnswerChange(exam.questions[currentQuestion].id, e.target.value)}
                  className="min-h-32"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fixed Footer with Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Answered: {getAnsweredCount()} / {getTotalQuestions()}
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            {currentQuestion < exam.questions.length - 1 ? (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="bg-nu-secondary hover:bg-blue-700"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Exam
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Violation Warning Modal */}
      <Dialog open={showViolationWarning} onOpenChange={setShowViolationWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span>Exam Violation Warning</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>You have left the exam window. This may be recorded as a violation.</p>
            <p className="text-sm text-gray-600">
              Violations: {violations}/3
            </p>
            {violations >= 3 && (
              <p className="text-red-600 font-semibold">
                Multiple violations detected. Your exam session may be terminated.
              </p>
            )}
            <Button 
              onClick={() => setShowViolationWarning(false)}
              className="w-full"
            >
              Continue Exam
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Submit Confirmation Modal */}
      <Dialog open={showSubmitModal} onOpenChange={setShowSubmitModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Exam?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to submit your exam?</p>
            <div className="bg-gray-50 p-4 rounded">
              <p><strong>Questions Answered:</strong> {getAnsweredCount()} out of {getTotalQuestions()}</p>
              <p><strong>Time Remaining:</strong> {formatTime(timeLeft)}</p>
            </div>
            <p className="text-sm text-red-600">
              Warning: You cannot change your answers after submission.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowSubmitModal(false)} className="flex-1">
                Continue Exam
              </Button>
              <Button onClick={confirmSubmit} className="flex-1 bg-green-600 hover:bg-green-700">
                Submit Final Answers
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamInterface;
