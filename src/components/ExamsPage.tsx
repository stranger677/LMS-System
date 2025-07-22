
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Clock, MapPin, Calendar, FileText, Award, AlertTriangle, CheckCircle, Plus, Settings, Filter, Search } from "lucide-react";

interface ExamsPageProps {
  onBack: () => void;
  onStartExam?: (exam: any) => void;
  onViewExamDetails?: (exam: any) => void;
  onCreateExam?: () => void;
  onManageExams?: () => void;
  userRole: 'student' | 'instructor' | 'admin';
  darkMode?: boolean;
}

const ExamsPage: React.FC<ExamsPageProps> = ({ 
  onBack, 
  onStartExam, 
  onViewExamDetails, 
  onCreateExam,
  onManageExams,
  userRole,
  darkMode = false 
}) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");

  // Sample data with more comprehensive exam information
  const upcomingExams = [
    {
      id: 1,
      title: "Midterm Exam",
      course: "Advanced Mathematics",
      courseCode: "MATH301",
      date: "2024-06-20",
      time: "2:00 PM",
      duration: "2 hours",
      location: "Room 301, Building A",
      status: "scheduled",
      type: "midterm",
      instructor: "Dr. Smith",
      totalMarks: 100,
      questions: 25,
      startTime: "2024-06-20T14:00:00",
      isLive: false,
      sections: ["A", "B"],
      batches: ["2021", "2022"]
    },
    {
      id: 2,
      title: "Final Project Presentation",
      course: "Computer Science Fundamentals",
      courseCode: "CS101",
      date: "2024-06-25",
      time: "10:00 AM",
      duration: "1 hour",
      location: "Lab 201, Building B",
      status: "scheduled",
      type: "presentation",
      instructor: "Prof. Johnson",
      totalMarks: 50,
      questions: 1,
      startTime: "2024-06-25T10:00:00",
      isLive: false,
      sections: ["C"],
      batches: ["2023"]
    }
  ];

  const ongoingExams = [
    {
      id: 3,
      title: "Online Quiz",
      course: "Physics Laboratory",
      courseCode: "PHYS201",
      date: "2024-06-08",
      time: "11:00 AM",
      duration: "30 minutes",
      location: "Online",
      status: "ongoing",
      type: "quiz",
      timeRemaining: "15 minutes",
      instructor: "Dr. Wilson",
      totalMarks: 20,
      questions: 10,
      isLive: true
    }
  ];

  // Load published exams from localStorage for students
  const [publishedExams, setPublishedExams] = useState<any[]>([]);
  
  React.useEffect(() => {
    if (userRole === 'student') {
      const exams = JSON.parse(localStorage.getItem('publishedExams') || '[]');
      setPublishedExams(exams);
    }
  }, [userRole]);

  // Combine static exams with published exams for students
  const allUpcomingExams = userRole === 'student' 
    ? [...upcomingExams, ...publishedExams.filter(exam => exam.status === 'published')]
    : upcomingExams;

  const pastExams = [
    {
      id: 4,
      title: "First Term Exam",
      course: "Advanced Mathematics",
      courseCode: "MATH301",
      date: "2024-05-15",
      time: "2:00 PM",
      duration: "2 hours",
      location: "Room 301, Building A",
      status: "completed",
      type: "midterm",
      grade: "A",
      score: "85/100",
      instructor: "Dr. Smith",
      submittedAt: "2024-05-15T16:00:00"
    },
    {
      id: 5,
      title: "Programming Assignment Test",
      course: "Computer Science Fundamentals",
      courseCode: "CS101",
      date: "2024-05-10",
      time: "9:00 AM",
      duration: "1.5 hours",
      location: "Lab 201, Building B",
      status: "completed",
      type: "practical",
      grade: "B+",
      score: "78/100",
      instructor: "Prof. Johnson",
      submittedAt: "2024-05-10T10:30:00"
    }
  ];

  // Filter function
  const filterExams = (exams: any[]) => {
    return exams.filter(exam => {
      // For students, also check if they're in the allowed sections/batches
      if (userRole === 'student') {
        const studentSection = 'A'; // This would come from user profile
        const studentBatch = '2021'; // This would come from user profile
        
        const hasAccess = (!exam.sections || exam.sections.length === 0 || exam.sections.includes(studentSection)) &&
                         (!exam.batches || exam.batches.length === 0 || exam.batches.includes(studentBatch));
        
        if (!hasAccess) return false;
      }
      
      const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exam.course.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || exam.status === statusFilter;
      const matchesCourse = courseFilter === "all" || exam.courseCode === courseFilter;
      
      return matchesSearch && matchesStatus && matchesCourse;
    });
  };

  const getStatusBadge = (status: string, isLive?: boolean) => {
    if (isLive) {
      return <Badge className="bg-red-100 text-red-700 animate-pulse">Live</Badge>;
    }
    
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-700">Scheduled</Badge>;
      case "ongoing":
        return <Badge className="bg-green-100 text-green-700">Ongoing</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-700">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "midterm":
      case "final":
        return <FileText className="h-4 w-4" />;
      case "quiz":
        return <Clock className="h-4 w-4" />;
      case "presentation":
        return <Award className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const ExamCard = ({ exam, showActions = false }: { exam: any; showActions?: boolean }) => (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-3 sm:space-y-0">
            <div className="flex items-start space-x-3 flex-1 min-w-0">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                {getTypeIcon(exam.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm sm:text-base lg:text-lg truncate">{exam.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                  {exam.course} ({exam.courseCode})
                </p>
                {exam.instructor && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                    Instructor: {exam.instructor}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              {getStatusBadge(exam.status, exam.isLive)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{exam.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{exam.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FileText className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{exam.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{exam.location}</span>
            </div>
          </div>

          {exam.totalMarks && (
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <span>Total Marks: {exam.totalMarks}</span>
              {exam.questions && <span className="ml-3">Questions: {exam.questions}</span>}
            </div>
          )}

          {exam.timeRemaining && (
            <div className="flex items-center space-x-1 text-sm text-orange-600">
              <AlertTriangle className="h-3 w-3 animate-pulse" />
              <span>Time remaining: {exam.timeRemaining}</span>
            </div>
          )}

          {exam.grade && (
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-green-600">
                <CheckCircle className="h-3 w-3" />
                <span>Grade: {exam.grade}</span>
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Score: {exam.score}
              </div>
            </div>
          )}

          {showActions && (
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              {exam.status === "ongoing" && (
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 flex-1"
                  onClick={() => onStartExam && onStartExam(exam)}
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Continue Exam
                </Button>
              )}
              {exam.status === "scheduled" && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                    onClick={() => onViewExamDetails && onViewExamDetails(exam)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  {exam.isLive && (
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 flex-1"
                      onClick={() => onStartExam && onStartExam(exam)}
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      Start Exam
                    </Button>
                  )}
                </>
              )}
              {exam.status === "completed" && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  onClick={() => onViewExamDetails && onViewExamDetails(exam)}
                >
                  <Award className="h-4 w-4 mr-1" />
                  View Results
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button 
                variant="ghost" 
                onClick={onBack} 
                className="p-2 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
                    Exams
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {userRole === 'student' ? 'Your examinations' : 'Manage examinations'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons for instructors and admins */}
            {(userRole === 'instructor' || userRole === 'admin') && (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onManageExams}
                  className="hidden sm:flex"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Manage
                </Button>
                <Button 
                  size="sm"
                  onClick={onCreateExam}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Create</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        {/* Search and Filter Bar */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search exams..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="MATH301">MATH301</SelectItem>
                  <SelectItem value="CS101">CS101</SelectItem>
                  <SelectItem value="PHYS201">PHYS201</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming" className="text-xs sm:text-sm">
              Upcoming ({filterExams(upcomingExams).length})
            </TabsTrigger>
            <TabsTrigger value="ongoing" className="text-xs sm:text-sm">
              Ongoing ({filterExams(ongoingExams).length})
            </TabsTrigger>
            <TabsTrigger value="past" className="text-xs sm:text-sm">
              Past ({filterExams(pastExams).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Upcoming Exams</h2>
              <Badge variant="outline" className="self-start sm:self-center">
                {filterExams(allUpcomingExams).length} scheduled
              </Badge>
            </div>
            {filterExams(allUpcomingExams).length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No upcoming exams</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchTerm || statusFilter !== 'all' || courseFilter !== 'all' 
                      ? 'No exams match your current filters.'
                      : 'You have no exams scheduled at the moment.'
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filterExams(allUpcomingExams).map((exam) => (
                  <ExamCard key={exam.id} exam={exam} showActions />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="ongoing" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Ongoing Exams</h2>
              <Badge variant="outline" className="self-start sm:self-center">
                {filterExams(ongoingExams).length} active
              </Badge>
            </div>
            {filterExams(ongoingExams).length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No ongoing exams</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchTerm || statusFilter !== 'all' || courseFilter !== 'all' 
                      ? 'No exams match your current filters.'
                      : 'You have no exams in progress right now.'
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filterExams(ongoingExams).map((exam) => (
                  <ExamCard key={exam.id} exam={exam} showActions />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Past Exams</h2>
              <Badge variant="outline" className="self-start sm:self-center">
                {filterExams(pastExams).length} completed
              </Badge>
            </div>
            {filterExams(pastExams).length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Award className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No past exams</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchTerm || statusFilter !== 'all' || courseFilter !== 'all' 
                      ? 'No exams match your current filters.'
                      : 'Your completed exams will appear here.'
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filterExams(pastExams).map((exam) => (
                  <ExamCard key={exam.id} exam={exam} showActions />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExamsPage;
