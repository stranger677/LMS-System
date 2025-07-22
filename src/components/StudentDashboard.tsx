
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  FileText, 
  Award,
  Bell,
  User,
  LogOut,
  CheckCircle,
  AlertTriangle,
  GraduationCap,
  Menu,
  Search,
  Users,
  Home,
  Settings,
  Check
} from "lucide-react";
import FacultiesModal from './FacultiesModal';
import NotificationModal from './NotificationModal';
import SettingsModal from './SettingsModal';
import ExamManager from './ExamManager';
import SemesterGrades from './SemesterGrades';

interface StudentDashboardProps {
  user: { role: string; name: string };
  onLogout: () => void;
  onNavigateToCourses?: () => void;
  onNavigateToAssignments?: () => void;
  onNavigateToGradeBreakdown?: (course: any) => void;
  onNavigateToExams?: () => void;
  onStartExam?: (exam: any) => void;
  onViewExamDetails?: (exam: any) => void;
  onEnterCourse?: (course: any) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ 
  user, 
  onLogout, 
  onNavigateToCourses,
  onNavigateToAssignments,
  onNavigateToGradeBreakdown,
  onNavigateToExams,
  onStartExam,
  onViewExamDetails,
  onEnterCourse,
  darkMode,
  setDarkMode
}) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showFaculties, setShowFaculties] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showExams, setShowExams] = useState(false);
  const [showSemesterGrades, setShowSemesterGrades] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  
  // Dummy data
  const enrolledCourses = [
    { id: 1, name: "Advanced Mathematics", code: "MATH301", instructor: "Fazlur Rahman", progress: 75, nextClass: "Tomorrow 2:00 PM", lastAccessed: "2 hours ago", isFuture: false },
    { id: 2, name: "Computer Science Fundamentals", code: "CS101", instructor: "Prof.Taimur Ahad", progress: 60, nextClass: "Wednesday 10:00 AM", lastAccessed: "1 day ago", isFuture: false },
    { id: 3, name: "Physics Laboratory", code: "PHYS201", instructor: "Dr. Sheikh Haider Noori", progress: 90, nextClass: "Friday 1:00 PM", lastAccessed: "3 hours ago", isFuture: false }
  ];

  const assignments = [
    { id: 1, title: "Calculus Problem Set 5", course: "MATH301", dueDate: "2024-06-15", status: "pending", grade: null },
    { id: 2, title: "Programming Assignment 3", course: "CS101", dueDate: "2024-06-12", status: "submitted", grade: 85 },
    { id: 3, title: "Lab Report - Wave Mechanics", course: "PHYS201", dueDate: "2024-06-18", status: "graded", grade: 92 }
  ];

  const upcomingExams = [
    { id: 1, title: "Midterm Exam", course: "MATH301", date: "2024-06-20", time: "2:00 PM", duration: "2 hours" },
    { id: 2, title: "Final Project Presentation", course: "CS101", date: "2024-06-25", time: "10:00 AM", duration: "1 hour" }
  ];

  // Load published exams from instructor
  const [publishedExams, setPublishedExams] = useState<any[]>([]);
  
  React.useEffect(() => {
    const exams = JSON.parse(localStorage.getItem('publishedExams') || '[]');
    setPublishedExams(exams.filter((exam: any) => exam.status === 'published'));
  }, []);

  // Combine static exams with published exams
  const allUpcomingExams = [...upcomingExams, ...publishedExams];

  // Tasks to be completed (combination of pending assignments and upcoming tasks)
  const tasksToComplete = [
    { id: 1, title: "Complete Calculus Problem Set 5", type: "assignment", course: "MATH301", dueDate: "2024-06-15", priority: "high" },
    { id: 2, title: "Review Midterm Materials", type: "study", course: "MATH301", dueDate: "2024-06-19", priority: "medium" },
    { id: 3, title: "Submit Lab Report Draft", type: "assignment", course: "PHYS201", dueDate: "2024-06-16", priority: "medium" },
    { id: 4, title: "Prepare Project Presentation", type: "project", course: "CS101", dueDate: "2024-06-24", priority: "high" }
  ];

  // Sample course for grade breakdown
  const sampleCourse = {
    id: 1,
    name: "Advanced Mathematics",
    code: "MATH301",
    finalGrade: 85
  };

  // Academic performance data
  const academicData = {
    currentCGPA: 3.78,
    totalCredits: 108,
    averageGrade: 85.2,
    currentSemester: "Fall 2024"
  };

  const handleNavigateToExams = () => {
    setShowExams(true);
  };

  const handleBackFromExams = () => {
    setShowExams(false);
  };

  const handleNavigateToGrades = () => {
    setShowSemesterGrades(true);
  };

  const handleBackFromGrades = () => {
    setShowSemesterGrades(false);
  };

  const handleTaskComplete = (taskId: number) => {
    const newCompletedTasks = new Set(completedTasks);
    if (completedTasks.has(taskId)) {
      newCompletedTasks.delete(taskId);
    } else {
      newCompletedTasks.add(taskId);
    }
    setCompletedTasks(newCompletedTasks);
  };

  // If showing exams, render ExamManager
  if (showExams) {
    return (
      <ExamManager
        onBack={handleBackFromExams}
        userRole="student"
        darkMode={darkMode}
      />
    );
  }

  // If showing semester grades, render SemesterGrades
  if (showSemesterGrades) {
    return (
      <SemesterGrades
        onBack={handleBackFromGrades}
        onNavigateToGradeBreakdown={onNavigateToGradeBreakdown}
        darkMode={darkMode}
      />
    );
  }

  const SidebarContent = () => (
    <div className="p-4 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <GraduationCap className="h-8 w-8 text-nu-secondary" />
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white">Student Portal</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Daffodil International University</p>
        </div>
      </div>
      
      <nav className="space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 transition-all duration-200"
        >
          <Home className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">Dashboard</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 transition-all duration-200"
          onClick={onNavigateToCourses}
        >
          <BookOpen className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">My Courses</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 transition-all duration-200"
          onClick={onNavigateToAssignments}
        >
          <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">Assignments</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 transition-all duration-200"
          onClick={handleNavigateToExams}
        >
          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">Exams</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 transition-all duration-200"
          onClick={handleNavigateToGrades}
        >
          <Award className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">Grades</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 transition-all duration-200"
          onClick={() => setShowFaculties(true)}
        >
          <Users className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">Faculties</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 transition-all duration-200"
          onClick={() => setShowSettings(true)}
        >
          <Settings className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">Settings</span>
        </Button>
      </nav>
    </div>
  );

  const ProfileDropdown = () => (
    <Card className="w-80 p-4 shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src="/api/placeholder/48/48" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Student ID: 2021001234</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Department: Computer Science</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div><strong>Email:</strong> Mahazabin@diu.ac.bd</div>
        <div><strong>Phone:</strong> +880 1234567890</div>
        <div><strong>Semester:</strong> 7th</div>
        <div><strong>CGPA:</strong> 3.85</div>
        <div><strong>Batch:</strong> 2021</div>
        <div><strong>Blood Group:</strong> B+</div>
        <div><strong>Address:</strong> Dhaka, Bangladesh</div>
        <div><strong>Guardian:</strong> Mr. Ahmed Ali</div>
        <div><strong>Emergency Contact:</strong> +880 1987654321</div>
      </div>
      <Button variant="outline" className="w-full mt-4" onClick={() => setShowProfile(false)}>
        Close
      </Button>
    </Card>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="bg-blue-100 dark:bg-blue-900/30 shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {/* Mobile Sidebar Toggle */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-white dark:bg-gray-800">
                  <SidebarContent />
                </SheetContent>
              </Sheet>

              <div className="hidden md:flex items-center space-x-3">
                <GraduationCap className="h-8 w-8 text-nu-secondary" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Student Dashboard</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, {user.name}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 w-64"
                />
              </div>

              {/* Notifications */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 relative"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
              </Button>

              {/* Profile */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/api/placeholder/24/24" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
                {showProfile && (
                  <div className="absolute right-0 top-full mt-2 z-50">
                    <ProfileDropdown />
                  </div>
                )}
              </div>

              <Button variant="outline" size="sm" onClick={onLogout} className="hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 shadow-sm min-h-screen">
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <Card className="hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:scale-105" onClick={onNavigateToCourses}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                  <p className="text-xs text-muted-foreground">Active this semester</p>
                </CardContent>
              </Card>
              
              <Card className="hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:scale-105" onClick={onNavigateToAssignments}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tasksToComplete.filter(t => t.priority === 'high').length}</div>
                  <p className="text-xs text-muted-foreground">High priority</p>
                </CardContent>
              </Card>
              
              <Card className="hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:scale-105" onClick={handleNavigateToExams}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium truncate">Upcoming Exams</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{allUpcomingExams.length}</div>
                  <p className="text-xs text-muted-foreground">Next 2 weeks</p>
                </CardContent>
              </Card>
              
              <Card className="hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:scale-105" onClick={handleNavigateToGrades}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Academic Performance</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">{academicData.averageGrade}%</div>
                  <div className="text-sm font-semibold text-blue-600">CGPA: {academicData.currentCGPA}</div>
                  <p className="text-xs text-muted-foreground">Current semester avg</p>
                </CardContent>
              </Card>
            </div>

            {/* Recently Accessed Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recently Accessed Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {enrolledCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onEnterCourse && onEnterCourse(course)}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium text-sm">{course.name}</h3>
                            <p className="text-xs text-gray-500">{course.code}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {course.progress}%
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{course.instructor}</p>
                        <p className="text-xs text-gray-500">Last accessed: {course.lastAccessed}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tasks to be Completed */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Tasks to be Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasksToComplete.map((task) => (
                    <div 
                      key={task.id} 
                      className={`flex items-center justify-between p-3 border rounded-lg transition-all duration-200 hover:shadow-md hover:border-blue-200 ${
                        completedTasks.has(task.id) ? 'bg-green-50 border-green-200 opacity-75' : 'hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <Checkbox
                          checked={completedTasks.has(task.id)}
                          onCheckedChange={() => handleTaskComplete(task.id)}
                          className="flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className={`font-medium text-sm ${completedTasks.has(task.id) ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                          </h4>
                          <p className="text-xs text-gray-500">{task.course} • Due: {task.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {task.priority === 'high' && !completedTasks.has(task.id) && (
                          <Badge className="bg-red-100 text-red-700">High Priority</Badge>
                        )}
                        {task.priority === 'medium' && !completedTasks.has(task.id) && (
                          <Badge className="bg-orange-100 text-orange-700">Medium</Badge>
                        )}
                        {completedTasks.has(task.id) && (
                          <Badge className="bg-green-100 text-green-700">Completed</Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <GraduationCap className="h-6 w-6" />
              <span className="font-medium">Daffodil International University LMS</span>
            </div>
            <div className="text-sm text-blue-200">
              &copy; 2024 Daffodil International University. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <FacultiesModal isOpen={showFaculties} onClose={() => setShowFaculties(false)} />
      <NotificationModal isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </div>
  );
};

export default StudentDashboard;
