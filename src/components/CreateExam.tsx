
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Plus, Trash2, Clock, Users, FileText, Save, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateExamProps {
  onBack: () => void;
  darkMode?: boolean;
}

interface Question {
  id: number;
  type: 'mcq' | 'short';
  question: string;
  options?: string[];
  correctAnswer?: number;
  maxPoints: number;
}

const CreateExam: React.FC<CreateExamProps> = ({ onBack, darkMode = false }) => {
  const { toast } = useToast();
  const [examData, setExamData] = useState({
    title: '',
    course: '',
    startTime: '',
    duration: '',
    assignedCohort: '',
    instructions: ''
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: 'mcq',
    question: '',
    options: ['', '', '', ''],
    maxPoints: 10
  });

  const courses = [
    { value: 'MATH301', label: 'Advanced Mathematics (MATH301)' },
    { value: 'CS101', label: 'Computer Science Fundamentals (CS101)' },
    { value: 'PHYS201', label: 'Physics Laboratory (PHYS201)' },
    { value: 'ENG102', label: 'English Literature (ENG102)' }
  ];

  const cohorts = [
    { value: 'cs2021', label: 'Computer Science 2021' },
    { value: 'cs2022', label: 'Computer Science 2022' },
    { value: 'math2021', label: 'Mathematics 2021' },
    { value: 'phys2021', label: 'Physics 2021' }
  ];

  const addQuestion = () => {
    if (!currentQuestion.question?.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question.",
        variant: "destructive"
      });
      return;
    }

    if (currentQuestion.type === 'mcq') {
      const hasEmptyOptions = currentQuestion.options?.some(opt => !opt.trim());
      if (hasEmptyOptions || !currentQuestion.options) {
        toast({
          title: "Error",
          description: "Please fill all options for MCQ.",
          variant: "destructive"
        });
        return;
      }
      if (currentQuestion.correctAnswer === undefined) {
        toast({
          title: "Error",
          description: "Please select the correct answer.",
          variant: "destructive"
        });
        return;
      }
    }

    const newQuestion: Question = {
      id: Date.now(),
      type: currentQuestion.type as 'mcq' | 'short',
      question: currentQuestion.question!,
      options: currentQuestion.type === 'mcq' ? currentQuestion.options : undefined,
      correctAnswer: currentQuestion.type === 'mcq' ? currentQuestion.correctAnswer : undefined,
      maxPoints: currentQuestion.maxPoints || 10
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion({
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      maxPoints: 10
    });

    toast({
      title: "Success",
      description: "Question added successfully!"
    });
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSubmit = () => {
    if (!examData.title || !examData.course || !examData.startTime || !examData.duration) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (questions.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one question.",
        variant: "destructive"
      });
      return;
    }

    // Simulate exam creation
    console.log('Creating exam:', { examData, questions });
    toast({
      title: "Success",
      description: "Exam created successfully!"
    });
    onBack();
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.maxPoints, 0);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Exams
              </Button>
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Create New Exam</h1>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Design your examination</p>
                </div>
              </div>
            </div>
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Create Exam
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Exam Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Exam Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Exam Title *</Label>
                    <Input
                      id="title"
                      value={examData.title}
                      onChange={(e) => setExamData({...examData, title: e.target.value})}
                      placeholder="e.g. Midterm Examination"
                    />
                  </div>
                  <div>
                    <Label htmlFor="course">Course *</Label>
                    <Select value={examData.course} onValueChange={(value) => setExamData({...examData, course: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.value} value={course.value}>
                            {course.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="datetime-local"
                      value={examData.startTime}
                      onChange={(e) => setExamData({...examData, startTime: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (minutes) *</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={examData.duration}
                      onChange={(e) => setExamData({...examData, duration: e.target.value})}
                      placeholder="e.g. 120"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="cohort">Assigned Cohort</Label>
                    <Select value={examData.assignedCohort} onValueChange={(value) => setExamData({...examData, assignedCohort: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cohort" />
                      </SelectTrigger>
                      <SelectContent>
                        {cohorts.map((cohort) => (
                          <SelectItem key={cohort.value} value={cohort.value}>
                            {cohort.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="instructions">Exam Instructions</Label>
                    <Textarea
                      id="instructions"
                      value={examData.instructions}
                      onChange={(e) => setExamData({...examData, instructions: e.target.value})}
                      placeholder="Additional instructions for students..."
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add Questions */}
            <Card>
              <CardHeader>
                <CardTitle>Add Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Question Type</Label>
                  <Select 
                    value={currentQuestion.type} 
                    onValueChange={(value) => setCurrentQuestion({...currentQuestion, type: value as 'mcq' | 'short'})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcq">Multiple Choice Question</SelectItem>
                      <SelectItem value="short">Short Answer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="question">Question *</Label>
                  <Textarea
                    id="question"
                    value={currentQuestion.question}
                    onChange={(e) => setCurrentQuestion({...currentQuestion, question: e.target.value})}
                    placeholder="Enter your question here..."
                    rows={3}
                  />
                </div>

                {currentQuestion.type === 'mcq' && (
                  <div className="space-y-3">
                    <Label>Answer Options *</Label>
                    {currentQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...(currentQuestion.options || [])];
                            newOptions[index] = e.target.value;
                            setCurrentQuestion({...currentQuestion, options: newOptions});
                          }}
                          placeholder={`Option ${index + 1}`}
                        />
                        <RadioGroup
                          value={currentQuestion.correctAnswer?.toString()}
                          onValueChange={(value) => setCurrentQuestion({...currentQuestion, correctAnswer: parseInt(value)})}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={index.toString()} id={`correct-${index}`} />
                            <Label htmlFor={`correct-${index}`} className="text-sm">Correct</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="points">Points:</Label>
                    <Input
                      id="points"
                      type="number"
                      value={currentQuestion.maxPoints}
                      onChange={(e) => setCurrentQuestion({...currentQuestion, maxPoints: parseInt(e.target.value) || 10})}
                      className="w-20"
                      min="1"
                    />
                  </div>
                  <Button onClick={addQuestion} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Exam Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exam Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Questions: {questions.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Total Points: {totalPoints}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Duration: {examData.duration || 0} minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Cohort: {examData.assignedCohort || 'Not selected'}</span>
                </div>
              </CardContent>
            </Card>

            {/* Questions List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Questions Added</CardTitle>
              </CardHeader>
              <CardContent>
                {questions.length === 0 ? (
                  <p className="text-gray-500 text-sm">No questions added yet</p>
                ) : (
                  <div className="space-y-3">
                    {questions.map((question, index) => (
                      <div key={question.id} className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium">Q{index + 1}: {question.type.toUpperCase()}</p>
                          <p className="text-xs text-gray-600 mt-1 truncate">{question.question}</p>
                          <p className="text-xs text-blue-600 mt-1">{question.maxPoints} points</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
