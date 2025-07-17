
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Edit, Trash2, Eye, Users, Clock, FileText, Search, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ManageExamsProps {
  onBack: () => void;
  onGradeExam: () => void;
  userRole: 'instructor' | 'admin';
  darkMode?: boolean;
}

const ManageExams: React.FC<ManageExamsProps> = ({ onBack, onGradeExam, userRole, darkMode = false }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [showSubmissions, setShowSubmissions] = useState(false);

  // Sample exams data
  const exams = [
    {
      id: 1,
      title: "Midterm Exam",
      course: "Advanced Mathematics",
      courseCode: "MATH301",
      status: "active",
      startTime: "2024-06-20T14:00:00",
      duration: 120,
      totalQuestions: 25,
      totalMarks: 100,
      submissions: 28,
      totalStudents: 35,
      instructor: "Dr. Smith"
    },
    {
      id: 2,
      title: "Final Project Presentation",
      course: "Computer Science Fundamentals", 
      courseCode: "CS101",
      status: "draft",
      startTime: "2024-06-25T10:00:00",
      duration: 60,
      totalQuestions: 1,
      totalMarks: 50,
      submissions: 0,
      totalStudents: 42,
      instructor: "Prof. Johnson"
    },
    {
      id: 3,
      title: "Physics Lab Quiz",
      course: "Physics Laboratory",
      courseCode: "PHYS201", 
      status: "completed",
      startTime: "2024-05-15T11:00:00",
      duration: 30,
      totalQuestions: 10,
      totalMarks: 20,
      submissions: 38,
      totalStudents: 38,
      instructor: "Dr. Wilson"
    }
  ];

  // Sample submissions data
  const submissions = [
    {
      id: 1,
      studentName: "John Doe",
      studentId: "2021001234",
      submittedAt: "2024-06-20T15:45:00",
      mcqScore: 75,
      totalMcqMarks: 80,
      shortAnswerStatus: "pending",
      totalMarks: 100,
      finalScore: null
    },
    {
      id: 2,
      studentName: "Jane Smith",
      studentId: "2021001235", 
      submittedAt: "2024-06-20T15:30:00",
      mcqScore: 68,
      totalMcqMarks: 80,
      shortAnswerStatus: "graded",
      shortAnswerScore: 15,
      totalShortMarks: 20,
      totalMarks: 100,
      finalScore: 83
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-700">Draft</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-700">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || exam.status === statusFilter;
    const matchesInstructor = userRole === 'admin' || exam.instructor === "Dr. Smith"; // Current user
    
    return matchesSearch && matchesStatus && matchesInstructor;
  });

  const handleDeleteExam = (examId: number) => {
    toast({
      title: "Exam Deleted",
      description: "The exam has been deleted successfully."
    });
  };

  const handleViewSubmissions = (exam: any) => {
    setSelectedExam(exam);
    setShowSubmissions(true);
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
                Back to Exams
              </Button>
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Manage Exams</h1>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {userRole === 'admin' ? 'All examinations' : 'Your examinations'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search exams..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold truncate">{exam.title}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {exam.course} ({exam.courseCode})
                    </p>
                  </div>
                  {getStatusBadge(exam.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>{exam.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-green-600" />
                    <span>{exam.totalQuestions} questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span>{exam.submissions}/{exam.totalStudents}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {exam.totalMarks} marks
                  </div>
                </div>

                {userRole === 'admin' && (
                  <div className="text-xs text-gray-500">
                    Instructor: {exam.instructor}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewSubmissions(exam)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteExam(exam.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No exams found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No exams match your current filters.'
                  : 'You haven\'t created any exams yet.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Submissions Modal */}
      <Dialog open={showSubmissions} onOpenChange={setShowSubmissions}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedExam?.title} - Student Submissions
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {selectedExam?.submissions} of {selectedExam?.totalStudents} students submitted
              </div>
              <Button size="sm" onClick={onGradeExam} className="bg-green-600 hover:bg-green-700">
                Grade Submissions
              </Button>
            </div>
            
            <div className="space-y-3">
              {submissions.map((submission) => (
                <Card key={submission.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{submission.studentName}</h4>
                        <p className="text-sm text-gray-600">ID: {submission.studentId}</p>
                        <p className="text-xs text-gray-500">
                          Submitted: {new Date(submission.submittedAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">
                          MCQ: {submission.mcqScore}/{submission.totalMcqMarks}
                        </div>
                        {submission.shortAnswerStatus === 'graded' && (
                          <div className="text-sm">
                            Short: {submission.shortAnswerScore}/{submission.totalShortMarks}
                          </div>
                        )}
                        <div className="font-medium">
                          {submission.finalScore ? (
                            <span className="text-green-600">Final: {submission.finalScore}%</span>
                          ) : (
                            <Badge className="bg-orange-100 text-orange-700">Pending</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageExams;
