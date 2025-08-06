import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  Plus,
  Edit,
  Eye,
  Trash2
} from "lucide-react";
import ExamManager from './ExamManager';
import InstructorCreateExam from './InstructorCreateExam';
import InstructorManageExams from './InstructorManageExams';

interface InstructorDashboardProps {
  user: { role: string; name: string };
  onLogout: () => void;
}
interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  description?: string;
  status: 'active' | 'closed';
}

const InstructorDashboard: React.FC<InstructorDashboardProps> = ({ user, onLogout }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  // Dummy data for instructor dashboard
  const courses = [
    { id: 1, name: "Advanced Mathematics", code: "MATH301", students: 45, assignments: 8, exams: 3 },
    { id: 2, name: "Linear Algebra", code: "MATH201", students: 38, assignments: 6, exams: 2 },
    { id: 3, name: "Calculus II", code: "MATH102", students: 52, assignments: 10, exams: 4 }
  ];
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, title: "Problem Set 5", course: "MATH301", dueDate: "2024-06-20", status: 'active' },
    { id: 2, title: "Quiz 3", course: "MATH201", dueDate: "2024-06-18", status: 'active' }
  ]);
  const recentActivity = [
    { id: 1, action: "New assignment submitted", course: "MATH301", time: "2 hours ago", type: "assignment" },
    { id: 2, action: "Exam completed by 28 students", course: "MATH201", time: "1 day ago", type: "exam" },
    { id: 3, action: "Course material uploaded", course: "MATH102", time: "2 days ago", type: "material" }
  ];

  const upcomingExams = [
    { id: 1, title: "Midterm Exam", course: "MATH301", date: "2024-06-20", students: 45 },
    { id: 2, title: "Final Assessment", course: "MATH201", date: "2024-06-25", students: 38 }
  ];

  const handleNavigateToExams = () => {
    setCurrentView('exams');
  };

  const handleCreateExam = () => {
    setCurrentView('create-exam');
  };
const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newAssignment: Assignment = {
      id: Date.now(),
      title: formData.get('assignmentTitle') as string,
      course: formData.get('assignmentCourse') as string,
      dueDate: formData.get('dueDate') as string,
      description: formData.get('assignmentDescription') as string,
      status: 'active'
    };
    setAssignments([...assignments, newAssignment]);
    setShowCreateAssignment(false);
  };

  const handleManageExams = () => {
    setCurrentView('manage-exams');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedExam(null);
  };

  const handleEditExam = (exam: any) => {
    setSelectedExam(exam);
    setCurrentView('edit-exam');
  };

  // Render different views based on currentView
  if (currentView === 'exams') {
    return (
      <ExamManager
        onBack={handleBackToDashboard}
        userRole="instructor"
        darkMode={false}
      />
    );
  }

  if (currentView === 'create-exam') {
    return (
      <InstructorCreateExam
        onBack={handleBackToDashboard}
        onExamCreated={handleBackToDashboard}
      />
    );
  }

  if (currentView === 'manage-exams') {
    return (
      <InstructorManageExams
        onBack={handleBackToDashboard}
        onEditExam={handleEditExam}
      />
    );
  }

  if (currentView === 'edit-exam' && selectedExam) {
    return (
      <InstructorCreateExam
        onBack={() => setCurrentView('manage-exams')}
        onExamCreated={() => setCurrentView('manage-exams')}
        editingExam={selectedExam}
      />
    );
  }

  const SidebarContent = () => (
    <div className="p-4 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <GraduationCap className="h-8 w-8 text-green-600" />
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white">Instructor Portal</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Daffodil International University</p>
        </div>
      </div>
      
      <nav className="space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400 text-gray-700 dark:text-gray-200 transition-all duration-200"
        >
          <Home className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">Dashboard</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400 text-gray-700 dark:text-gray-200 transition-all duration-200"
        >
          <BookOpen className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">My Courses</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400 text-gray-700 dark:text-gray-200 transition-all duration-200"
          onClick={handleNavigateToExams}
        >
          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">Exam Management</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400 text-gray-700 dark:text-gray-200 transition-all duration-200"
        >
          <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">Assignments</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400 text-gray-700 dark:text-gray-200 transition-all duration-200"
        >
          <Award className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">Grades</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400 text-gray-700 dark:text-gray-200 transition-all duration-200"
        >
          <Users className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">Students</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400 text-gray-700 dark:text-gray-200 transition-all duration-200"
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
          <AvatarFallback>SW</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Employee ID: EMP001</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Department: Mathematics</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div><strong>Email:</strong> sarah.wilson@diu.edu.bd</div>
        <div><strong>Phone:</strong> +880 1234567890</div>
        <div><strong>Office:</strong> Room 301, Building A</div>
        <div><strong>Office Hours:</strong> Mon-Wed 2:00-4:00 PM</div>
      </div>
      <Button variant="outline" className="w-full mt-4" onClick={() => setShowProfile(false)}>
        Close
      </Button>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-100 dark:bg-green-900/30 shadow-sm border-b sticky top-0 z-50">
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
                <GraduationCap className="h-8 w-8 text-green-600" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Instructor Dashboard</h1>
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
                className="hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400 relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
              </Button>

              {/* Profile */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/api/placeholder/24/24" />
                    <AvatarFallback>SW</AvatarFallback>
                  </Avatar>
                </Button>
                {showProfile && (
                  <div className="absolute right-0 top-full mt-2 z-50">
                    <ProfileDropdown />
                  </div>
                )}
              </div>

              <Button variant="outline" size="sm" onClick={onLogout} className="hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400">
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
              <Card className="hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400 cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{courses.length}</div>
                  <p className="text-xs text-muted-foreground">Active this semester</p>
                </CardContent>
              </Card>
              
              <Card className="hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400 cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{courses.reduce((sum, course) => sum + course.students, 0)}</div>
                  <p className="text-xs text-muted-foreground">Across all courses</p>
                </CardContent>
              </Card>
              
              <Card className="hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400 cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:scale-105" onClick={handleNavigateToExams}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">My Exams</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{JSON.parse(localStorage.getItem('instructorExams') || '[]').length}</div>
                  <p className="text-xs text-muted-foreground">Total created</p>
                </CardContent>
              </Card>
              
              <Card className="hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400 cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Assignments to grade</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    className="h-20 flex flex-col justify-center items-center space-y-2 bg-green-600 hover:bg-green-700"
                    onClick={handleCreateExam}
                  >
                    <Plus className="h-6 w-6" />
                    <span>Create Exam</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col justify-center items-center space-y-2 hover:bg-green-100 hover:text-green-700"
                    onClick={handleManageExams}
                  >
                    <Edit className="h-6 w-6" />
                    <span>Manage Exams</span>
                  </Button>
                      <Dialog open={showCreateAssignment} onOpenChange={setShowCreateAssignment}>
                        <DialogTrigger asChild>
                          <Button className="h-20 flex flex-col hover:shadow-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 hover:scale-105" variant="outline">
                            <FileText className="h-6 w-6 mb-2" />
                            <span className="text-xs sm:text-sm">New Assignment</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md w-full">
                          <DialogHeader>
                            <DialogTitle>Create Assignment</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleCreateAssignment} className="space-y-4">
                            <div>
                              <Label htmlFor="assignmentTitle">Assignment Title</Label>
                              <Input id="assignmentTitle" name="assignmentTitle" placeholder="e.g., Problem Set 6" required />
                            </div>
                            <div>
                              <Label htmlFor="assignmentCourse">Course</Label>
                              <select name="assignmentCourse" className="w-full p-2 border rounded" required>
                                <option value="">Select Course</option>
                                {myCourses.map(course => (
                                  <option key={course.id} value={course.code}>{course.name}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <Label htmlFor="dueDate">Due Date</Label>
                              <Input id="dueDate" name="dueDate" type="datetime-local" required />
                            </div>
                            <div>
                              <Label htmlFor="assignmentDescription">Description</Label>
                              <Textarea id="assignmentDescription" name="assignmentDescription" placeholder="Assignment instructions..." />
                            </div>
                            <Button type="submit" className="w-full">Create Assignment</Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col justify-center items-center space-y-2 hover:bg-green-100 hover:text-green-700"
                  >
                    <Award className="h-6 w-6" />
                    <span>Grade Submissions</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* My Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">My Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {courses.map((course) => (
                    <Card key={course.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium text-sm">{course.name}</h3>
                            <p className="text-xs text-gray-500">{course.code}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {course.students} students
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                          <div>Assignments: {course.assignments}</div>
                          <div>Exams: {course.exams}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          {activity.type === 'assignment' && <FileText className="h-4 w-4 text-green-600" />}
                          {activity.type === 'exam' && <Clock className="h-4 w-4 text-green-600" />}
                          {activity.type === 'material' && <BookOpen className="h-4 w-4 text-green-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{activity.action}</h4>
                          <p className="text-xs text-gray-500">{activity.course}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <GraduationCap className="h-6 w-6" />
              <span className="font-medium">Daffodil International University LMS</span>
            </div>
            <div className="text-sm text-green-200">
              &copy; 2024 Daffodil International University. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InstructorDashboard;