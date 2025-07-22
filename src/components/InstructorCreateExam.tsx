import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus, Trash2, Clock, Users, FileText, Save, Award, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InstructorCreateExamProps {
  onBack: () => void;
  onExamCreated: () => void;
  editingExam?: any;
}

interface Question {
  id: number;
  type: 'mcq' | 'short';
  question: string;
  options?: string[];
  correctAnswer?: number;
  maxPoints: number;
}

interface ExamData {
  title: string;
  course: string;
  startDate: string;
  startTime: string;
  duration: string;
  instructions: string;
  sections: string[];
  batches: string[];
  maxStudents: string;
  isPublished: boolean;
}

const InstructorCreateExam: React.FC<InstructorCreateExamProps> = ({ 
  onBack, 
  onExamCreated, 
  editingExam 
}) => {
  const { toast } = useToast();
  const [examData, setExamData] = useState<ExamData>({
    title: '',
    course: '',
    startDate: '',
    startTime: '',
    duration: '',
    instructions: '',
    sections: [],
    batches: [],
    maxStudents: '',
    isPublished: false
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: 'mcq',
    question: '',
    options: ['', '', '', ''],
    maxPoints: 10
  });

  // Load exam data if editing
  useEffect(() => {
    if (editingExam) {
      setExamData({
        title: editingExam.title || '',
        course: editingExam.courseCode || '',
        startDate: editingExam.startDate || '',
        startTime: editingExam.startTime || '',
        duration: editingExam.duration?.toString() || '',
        instructions: editingExam.instructions || '',
        sections: editingExam.sections || [],
        batches: editingExam.batches || [],
        maxStudents: editingExam.maxStudents?.toString() || '',
        isPublished: editingExam.isPublished || false
      });
      setQuestions(editingExam.questions || []);
    }
  }, [editingExam]);

  const courses = [
    { value: 'MATH301', label: 'Advanced Mathematics (MATH301)' },
    { value: 'CS101', label: 'Computer Science Fundamentals (CS101)' },
    { value: 'PHYS201', label: 'Physics Laboratory (PHYS201)' },
    { value: 'ENG102', label: 'English Literature (ENG102)' }
  ];

  const availableSections = [
    { value: 'A', label: 'Section A' },
    { value: 'B', label: 'Section B' },
    { value: 'C', label: 'Section C' },
    { value: 'D', label: 'Section D' }
  ];

  const availableBatches = [
    { value: '2021', label: 'Batch 2021' },
    { value: '2022', label: 'Batch 2022' },
    { value: '2023', label: 'Batch 2023' },
    { value: '2024', label: 'Batch 2024' }
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

  const handleSectionChange = (sectionValue: string, checked: boolean) => {
    if (checked) {
      setExamData(prev => ({
        ...prev,
        sections: [...prev.sections, sectionValue]
      }));
    } else {
      setExamData(prev => ({
        ...prev,
        sections: prev.sections.filter(s => s !== sectionValue)
      }));
    }
  };

  const handleBatchChange = (batchValue: string, checked: boolean) => {
    if (checked) {
      setExamData(prev => ({
        ...prev,
        batches: [...prev.batches, batchValue]
      }));
    } else {
      setExamData(prev => ({
        ...prev,
        batches: prev.batches.filter(b => b !== batchValue)
      }));
    }
  };

  const handleSaveAsDraft = () => {
    if (!examData.title || !examData.course) {
      toast({
        title: "Error",
        description: "Please fill exam title and course.",
        variant: "destructive"
      });
      return;
    }

    // Save exam as draft
    const examToSave = {
      ...examData,
      questions,
      status: 'draft',
      createdAt: new Date().toISOString(),
      instructor: 'Dr. Sarah Wilson'
    };

    // Store in localStorage for demo purposes
    const existingExams = JSON.parse(localStorage.getItem('instructorExams') || '[]');
    if (editingExam) {
      const updatedExams = existingExams.map((exam: any) => 
        exam.id === editingExam.id ? { ...examToSave, id: editingExam.id } : exam
      );
      localStorage.setItem('instructorExams', JSON.stringify(updatedExams));
    } else {
      const newExam = { ...examToSave, id: Date.now() };
      localStorage.setItem('instructorExams', JSON.stringify([...existingExams, newExam]));
    }

    toast({
      title: "Success",
      description: editingExam ? "Exam updated as draft!" : "Exam saved as draft!"
    });
    onExamCreated();
  };

  const handlePublishExam = () => {
    if (!examData.title || !examData.course || !examData.startDate || !examData.duration) {
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

    if (examData.sections.length === 0 && examData.batches.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one section or batch.",
        variant: "destructive"
      });
      return;
    }

    // Publish exam
    const examToPublish = {
      ...examData,
      questions,
      status: 'published',
      isPublished: true,
      createdAt: new Date().toISOString(),
      instructor: 'Dr. Sarah Wilson'
    };

    // Store in localStorage for demo purposes
    const existingExams = JSON.parse(localStorage.getItem('instructorExams') || '[]');
    const publishedExams = JSON.parse(localStorage.getItem('publishedExams') || '[]');
    
    if (editingExam) {
      const updatedExams = existingExams.map((exam: any) => 
        exam.id === editingExam.id ? { ...examToPublish, id: editingExam.id } : exam
      );
      localStorage.setItem('instructorExams', JSON.stringify(updatedExams));
      
      const updatedPublished = publishedExams.map((exam: any) => 
        exam.id === editingExam.id ? { ...examToPublish, id: editingExam.id } : exam
      );
      if (!publishedExams.find((exam: any) => exam.id === editingExam.id)) {
        updatedPublished.push({ ...examToPublish, id: editingExam.id });
      }
      localStorage.setItem('publishedExams', JSON.stringify(updatedPublished));
    } else {
      const newExam = { ...examToPublish, id: Date.now() };
      localStorage.setItem('instructorExams', JSON.stringify([...existingExams, newExam]));
      localStorage.setItem('publishedExams', JSON.stringify([...publishedExams, newExam]));
    }

    toast({
      title: "Success",
      description: editingExam ? "Exam updated and published!" : "Exam published successfully! Students can now see it."
    });
    onExamCreated();
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.maxPoints, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="hover:bg-green-100 hover:text-green-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {editingExam ? 'Edit Exam' : 'Create New Exam'}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500">Design your examination</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleSaveAsDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
              <Button onClick={handlePublishExam} className="bg-green-600 hover:bg-green-700">
                <Calendar className="h-4 w-4 mr-2" />
                Publish Exam
              </Button>
            </div>
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
                    <Label htmlFor="startDate">Exam Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={examData.startDate}
                      onChange={(e) => setExamData({...examData, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="time"
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
                  <div>
                    <Label htmlFor="maxStudents">Max Students (optional)</Label>
                    <Input
                      id="maxStudents"
                      type="number"
                      value={examData.maxStudents}
                      onChange={(e) => setExamData({...examData, maxStudents: e.target.value})}
                      placeholder="Leave empty for no limit"
                    />
                  </div>
                </div>

                {/* Section Selection */}
                <div>
                  <Label className="text-base font-medium">Allowed Sections *</Label>
                  <p className="text-sm text-gray-600 mb-3">Select which sections can participate in this exam</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {availableSections.map((section) => (
                      <div key={section.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`section-${section.value}`}
                          checked={examData.sections.includes(section.value)}
                          onCheckedChange={(checked) => handleSectionChange(section.value, checked as boolean)}
                        />
                        <Label htmlFor={`section-${section.value}`} className="text-sm">
                          {section.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Batch Selection */}
                <div>
                  <Label className="text-base font-medium">Allowed Batches *</Label>
                  <p className="text-sm text-gray-600 mb-3">Select which batches can participate in this exam</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {availableBatches.map((batch) => (
                      <div key={batch.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`batch-${batch.value}`}
                          checked={examData.batches.includes(batch.value)}
                          onCheckedChange={(checked) => handleBatchChange(batch.value, checked as boolean)}
                        />
                        <Label htmlFor={`batch-${batch.value}`} className="text-sm">
                          {batch.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="instructions">Exam Instructions</Label>
                  <Textarea
                    id="instructions"
                    value={examData.instructions}
                    onChange={(e) => setExamData({...examData, instructions: e.target.value})}
                    placeholder="Additional instructions for students..."
                    rows={3}
                  />
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
                  <Button onClick={addQuestion} className="bg-green-600 hover:bg-green-700">
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
                  <FileText className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Questions: {questions.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Total Points: {totalPoints}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Duration: {examData.duration || 0} minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Sections: {examData.sections.length > 0 ? examData.sections.join(', ') : 'None selected'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm">Batches: {examData.batches.length > 0 ? examData.batches.join(', ') : 'None selected'}</span>
                </div>
                {examData.maxStudents && (
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-red-600" />
                    <span className="text-sm">Max Students: {examData.maxStudents}</span>
                  </div>
                )}
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
                          <p className="text-xs text-green-600 mt-1">{question.maxPoints} points</p>
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

export default InstructorCreateExam;