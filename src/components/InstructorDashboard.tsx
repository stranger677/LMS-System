import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Users, 
  FileText, 
  Clock,
  Plus,
  Bell,
  User,
  LogOut,
  Calendar,
  Award,
  Settings,
  GraduationCap,
  Edit,
  Trash2,
  Search,
  Home,
  BarChart3,
  CheckSquare,
  AlertCircle,
  History,
  Play,
  CalendarDays,
  X
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter
} from "@/components/ui/sidebar";

interface InstructorDashboardProps {
  user: { role: string; name: string };
  onLogout: () => void;
}

interface Course {
  id: number;
  name: string;
  code: string;
  students: number;
  assignments: number;
  announcements: number;
  nextClass: string;
  description?: string;
  status: 'past' | 'present' | 'future';
  semester: string;
  year: number;
  startDate: string;
  endDate: string;
}

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  description?: string;
  status: 'active' | 'closed';
}

interface Exam {
  id: number;
  title: string;
  course: string;
  date: string;
  time: string;
  students: number;
  duration?: number;
  description?: string; // Added this line
}

interface Task {
  id: number;
  title: string;
  course: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  status: 'pending' | 'completed';
}

const InstructorDashboard: React.FC<InstructorDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  const [showCreateExam, setShowCreateExam] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  // State for assignment drawer
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showAssignmentDrawer, setShowAssignmentDrawer] = useState(false);
  // State for exam drawer
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [showExamDrawer, setShowExamDrawer] = useState(false);

  // Updated courses with status and additional information
  const [myCourses, setMyCourses] = useState<Course[]>([
    { 
      id: 1, 
      name: "Advanced Mathematics", 
      code: "MATH301", 
      students: 45, 
      assignments: 8, 
      announcements: 12,
      nextClass: "Tomorrow 2:00 PM",
      status: 'present',
      semester: 'Spring',
      year: 2024,
      startDate: '2024-01-15',
      endDate: '2024-05-15'
    },
    { 
      id: 2, 
      name: "Linear Algebra", 
      code: "MATH201", 
      students: 38, 
      assignments: 6, 
      announcements: 8,
      nextClass: "Wednesday 10:00 AM",
      status: 'present',
      semester: 'Spring',
      year: 2024,
      startDate: '2024-01-15',
      endDate: '2024-05-15'
    },
    {
      id: 3,
      name: "Calculus I",
      code: "MATH101",
      students: 52,
      assignments: 12,
      announcements: 15,
      nextClass: "Completed",
      status: 'past',
      semester: 'Fall',
      year: 2023,
      startDate: '2023-08-20',
      endDate: '2023-12-15'
    },
    {
      id: 4,
      name: "Statistics",
      code: "MATH205",
      students: 28,
      assignments: 10,
      announcements: 6,
      nextClass: "Completed",
      status: 'past',
      semester: 'Fall',
      year: 2023,
      startDate: '2023-08-20',
      endDate: '2023-12-15'
    },
    {
      id: 5,
      name: "Advanced Calculus",
      code: "MATH401",
      students: 0,
      assignments: 0,
      announcements: 0,
      nextClass: "August 25, 2024",
      status: 'future',
      semester: 'Fall',
      year: 2024,
      startDate: '2024-08-25',
      endDate: '2024-12-20'
    },
    {
      id: 6,
      name: "Differential Equations",
      code: "MATH302",
      students: 0,
      assignments: 0,
      announcements: 0,
      nextClass: "August 27, 2024",
      status: 'future',
      semester: 'Fall',
      year: 2024,
      startDate: '2024-08-27',
      endDate: '2024-12-22'
    }
  ]);

  // State for managing created items
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, title: "Problem Set 5", course: "MATH301", dueDate: "2024-06-20", status: 'active' },
    { id: 2, title: "Quiz 3", course: "MATH201", dueDate: "2024-06-18", status: 'active' }
  ]);

  const [exams, setExams] = useState<Exam[]>([
    { id: 1, title: "Midterm Exam", course: "MATH301", date: "2024-06-20", time: "14:00", students: 45 },
    { id: 2, title: "Final Exam", course: "MATH201", date: "2024-06-25", time: "10:00", students: 38 }
  ]);

  const [tasksToComplete, setTasksToComplete] = useState<Task[]>([
    { id: 1, title: "Grade Problem Set 5", course: "MATH301", priority: "high", dueDate: "2024-06-15", status: "pending" },
    { id: 2, title: "Prepare Midterm Questions", course: "MATH201", priority: "medium", dueDate: "2024-06-18", status: "pending" },
    { id: 3, title: "Update Course Materials", course: "MATH301", priority: "low", dueDate: "2024-06-20", status: "completed" },
    { id: 4, title: "Review Assignment Rubric", course: "MATH201", priority: "medium", dueDate: "2024-06-16", status: "pending" }
  ]);

  const recentSubmissions = [
    { id: 1, student: "John Doe", assignment: "Problem Set 5", course: "MATH301", submittedAt: "2 hours ago", status: "pending" },
    { id: 2, student: "Jane Smith", assignment: "Quiz 3", course: "MATH201", submittedAt: "1 day ago", status: "graded" },
    { id: 3, student: "Mike Johnson", assignment: "Problem Set 4", course: "MATH301", submittedAt: "2 days ago", status: "pending" }
  ];

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newCourse: Course = {
      id: Date.now(),
      name: formData.get('courseName') as string,
      code: formData.get('courseCode') as string,
      students: 0,
      assignments: 0,
      announcements: 0,
      nextClass: "TBD",
      description: formData.get('courseDescription') as string,
      status: formData.get('courseStatus') as 'past' | 'present' | 'future',
      semester: formData.get('courseSemester') as string,
      year: parseInt(formData.get('courseYear') as string),
      startDate: formData.get('courseStartDate') as string,
      endDate: formData.get('courseEndDate') as string
    };
    setMyCourses([...myCourses, newCourse]);
    setShowCreateCourse(false);
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

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newExam: Exam = {
      id: Date.now(),
      title: formData.get('examTitle') as string,
      course: formData.get('examCourse') as string,
      date: formData.get('examDate') as string,
      time: formData.get('examTime') as string,
      students: 0,
      duration: parseInt(formData.get('duration') as string) || 120
    };
    setExams([...exams, newExam]);
    setShowCreateExam(false);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newTask: Task = {
      id: Date.now(),
      title: formData.get('taskTitle') as string,
      course: formData.get('taskCourse') as string,
      priority: formData.get('taskPriority') as 'high' | 'medium' | 'low',
      dueDate: formData.get('taskDueDate') as string,
      status: 'pending'
    };
    setTasksToComplete([...tasksToComplete, newTask]);
    setShowCreateTask(false);
  };

  const handleCourseAction = (course: Course) => {
    setSelectedCourse(course);
    setShowCourseDetails(true);
  };

  // Add ref for pending tasks section
  const pendingTasksRef = useRef<HTMLDivElement>(null);

  // Filter courses by status
  const pastCourses = myCourses.filter(course => course.status === 'past');
  const presentCourses = myCourses.filter(course => course.status === 'present');
  const futureCourses = myCourses.filter(course => course.status === 'future');

  const CourseCard = ({ course }: { course: Course }) => (
    <Card key={course.id} className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <CardTitle className="truncate">{course.name}</CardTitle>
            <CardDescription>{course.code} • {course.semester} {course.year}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge 
              variant={
                course.status === 'present' ? 'default' : 
                course.status === 'past' ? 'secondary' : 'outline'
              }
              className={
                course.status === 'present' ? 'bg-green-100 text-green-700' :
                course.status === 'past' ? 'bg-gray-100 text-gray-700' :
                'bg-blue-100 text-blue-700'
              }
            >
              {course.status === 'present' ? 'Active' : 
               course.status === 'past' ? 'Completed' : 'Upcoming'}
            </Badge>
            <Button size="sm" variant="ghost" className="hover:bg-blue-50 hover:text-blue-700 transition-colors">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="hover:bg-blue-50 hover:text-blue-700 transition-colors">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <div className="flex justify-between mb-1">
            <span>Duration:</span>
            <span>{course.startDate} to {course.endDate}</span>
          </div>
          {course.status === 'present' && (
            <div className="flex justify-between">
              <span>Next Class:</span>
              <span className="font-medium">{course.nextClass}</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-bold text-blue-600">{course.students}</div>
            <div className="text-xs text-gray-500">Students</div>
          </div>
          <div>
            <div className="font-bold text-green-600">{course.assignments}</div>
            <div className="text-xs text-gray-500">Assignments</div>
          </div>
          <div>
            <div className="font-bold text-purple-600">{course.announcements}</div>
            <div className="text-xs text-gray-500">Announcements</div>
          </div>
        </div>
        <Button 
          className="w-full hover:shadow-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
          onClick={() => handleCourseAction(course)}
          variant="outline"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          {course.status === 'present' ? 'Manage Course' : 
           course.status === 'past' ? 'View Records' : 'Setup Course'}
        </Button>
      </CardContent>
    </Card>
  );

  // --- Responsive Assignment floating drawer ---
  const AssignmentDetailDrawer = () => {
    if (!selectedAssignment) return null;
    return (
      <Drawer open={showAssignmentDrawer} onOpenChange={setShowAssignmentDrawer}>
        <DrawerContent className="max-h-[90vh] w-full sm:max-w-2xl mx-auto">
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <DrawerTitle className="text-lg font-bold">{selectedAssignment.title}</DrawerTitle>
                <p className="text-xs text-gray-500">{selectedAssignment.course}</p>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <div className="p-6 flex flex-col gap-6 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500">Due Date:</span>
                  <span className="ml-2 font-medium">{selectedAssignment.dueDate}</span>
                </div>
                {selectedAssignment.description && (
                  <div className="mt-2">
                    <span className="text-sm text-gray-500">Description:</span>
                    <p className="mt-1 text-gray-700">{selectedAssignment.description}</p>
                  </div>
                )}
                <div className="mt-2">
                  <Badge variant={selectedAssignment.status === "active" ? "default" : "secondary"}>
                    {selectedAssignment.status}
                  </Badge>
                </div>
              </div>
              {/* Example student submissions */}
              <div className="flex-1">
                <p className="text-sm font-semibold mb-2">Recent Submissions</p>
                <div className="space-y-1 max-h-36 overflow-y-auto">
                  {recentSubmissions
                    .filter((s) => s.assignment === selectedAssignment.title)
                    .map((s) => (
                    <div key={s.id} className="flex justify-between items-center p-2 bg-gray-50 rounded text-xs">
                      <span>{s.student}</span>
                      <Badge variant={s.status === 'pending' ? 'default' : 'secondary'}>
                        {s.status}
                      </Badge>
                    </div>
                  ))}
                  {recentSubmissions.filter((s) => s.assignment === selectedAssignment.title).length === 0 &&
                    <span className="text-muted-foreground">No submissions yet.</span>
                  }
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  };

  // --- Updated CourseDetailsDrawer (removed Course Management section) ---
  const CourseDetailsDrawer = () => {
    if (!selectedCourse) return null;
    return (
      <Drawer open={showCourseDetails} onOpenChange={setShowCourseDetails}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <DrawerTitle className="text-xl font-bold">{selectedCourse.name}</DrawerTitle>
                <p className="text-sm text-gray-500">{selectedCourse.code} • {selectedCourse.semester} {selectedCourse.year}</p>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          
          <div className="p-6 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Course Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Course Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <Badge 
                        variant={
                          selectedCourse.status === 'present' ? 'default' : 
                          selectedCourse.status === 'past' ? 'secondary' : 'outline'
                        }
                        className={
                          selectedCourse.status === 'present' ? 'bg-green-100 text-green-700' :
                          selectedCourse.status === 'past' ? 'bg-gray-100 text-gray-700' :
                          'bg-blue-100 text-blue-700'
                        }
                      >
                        {selectedCourse.status === 'present' ? 'Active' : 
                         selectedCourse.status === 'past' ? 'Completed' : 'Upcoming'}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium text-sm">{selectedCourse.startDate} to {selectedCourse.endDate}</p>
                    </div>
                  </div>
                  
                  {selectedCourse.description && (
                    <div>
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="text-sm">{selectedCourse.description}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="font-bold text-blue-600 text-lg">{selectedCourse.students}</div>
                      <div className="text-xs text-gray-500">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-600 text-lg">{selectedCourse.assignments}</div>
                      <div className="text-xs text-gray-500">Assignments</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-purple-600 text-lg">{selectedCourse.announcements}</div>
                      <div className="text-xs text-gray-500">Announcements</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Schedule & Timing</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Academic Period</p>
                    <p className="font-medium">{selectedCourse.semester} {selectedCourse.year}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Course Duration</p>
                    <p className="font-medium">{selectedCourse.startDate} - {selectedCourse.endDate}</p>
                  </div>
                  
                  {selectedCourse.status === 'present' && (
                    <div>
                      <p className="text-sm text-gray-500">Next Class</p>
                      <p className="font-medium text-green-600">{selectedCourse.nextClass}</p>
                    </div>
                  )}
                  
                  {selectedCourse.status === 'future' && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-700">Upcoming Course</p>
                      <p className="text-sm text-blue-600">Starts on {selectedCourse.startDate}</p>
                    </div>
                  )}
                  
                  {selectedCourse.status === 'past' && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">Course Completed</p>
                      <p className="text-sm text-gray-600">Ended on {selectedCourse.endDate}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  };

  // --- Responsive Exam floating drawer ---
  const ExamDetailDrawer = () => {
    if (!selectedExam) return null;
    return (
      <Drawer open={showExamDrawer} onOpenChange={setShowExamDrawer}>
        <DrawerContent className="max-h-[90vh] w-full sm:max-w-2xl mx-auto">
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <DrawerTitle className="text-lg font-bold">{selectedExam.title}</DrawerTitle>
                <p className="text-xs text-gray-500">{selectedExam.course}</p>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <div className="p-6 flex flex-col gap-6 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500">Date:</span>
                  <span className="ml-2 font-medium">{selectedExam.date}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Time:</span>
                  <span className="ml-2 font-medium">{selectedExam.time}</span>
                </div>
                {typeof selectedExam.duration === 'number' && (
                  <div>
                    <span className="text-sm text-gray-500">Duration:</span>
                    <span className="ml-2 font-medium">{selectedExam.duration} min</span>
                  </div>
                )}
                <div>
                  <span className="text-sm text-gray-500">Students:</span>
                  <span className="ml-2 font-medium">{selectedExam.students}</span>
                </div>
              </div>
              {selectedExam.description && (
                <div>
                  <span className="text-sm text-gray-500">Description:</span>
                  <p className="mt-1 text-gray-700">{selectedExam.description}</p>
                </div>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  };

  const sidebarItems = [
    { id: "overview", title: "Overview", icon: Home },
    { id: "courses", title: "Courses", icon: BookOpen },
    { id: "assignments", title: "Assignments", icon: FileText },
    { id: "exams", title: "Exams", icon: Clock },
    { id: "gradebook", title: "Gradebook", icon: Award },
    { id: "analytics", title: "Analytics", icon: BarChart3 },
  ];

  const AppSidebar = () => (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-sm text-gray-900 dark:text-white truncate">Instructor Portal</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Daffodil International University</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton 
                isActive={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
                className="w-full hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400 transition-all duration-200"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => setShowSettings(true)}
              className="w-full hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400 transition-all duration-200"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );

  const ProfileDropdown = () => (
    <Card className="w-80 p-4 shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src="/api/placeholder/48/48" />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Instructor ID: INS001</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Department: Mathematics</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div><strong>Email:</strong> instructor@diu.ac.bd</div>
        <div><strong>Phone:</strong> +880 1234567890</div>
        <div><strong>Office:</strong> Room 205, Building A</div>
        <div><strong>Office Hours:</strong> Mon-Fri 2:00-4:00 PM</div>
      </div>
      <Button variant="outline" className="w-full mt-4" onClick={() => setShowProfile(false)}>
        Close
      </Button>
    </Card>
  );

  const scrollToPendingTasks = () => {
    pendingTasksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <AppSidebar />
        
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b sticky top-0 z-40">
            <div className="flex justify-between items-center h-16 px-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="lg:hidden" />
                <div className="hidden sm:flex items-center space-x-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, {user.name}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Search */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search..." 
                    className="pl-10 w-48 lg:w-64"
                  />
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
                </Button>

                {/* Profile */}
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowProfile(!showProfile)}
                    className="hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/api/placeholder/24/24" />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                  {showProfile && (
                    <div className="absolute right-0 top-full mt-2 z-50">
                      <ProfileDropdown />
                    </div>
                  )}
                </div>

                <Button variant="outline" size="sm" onClick={onLogout} className="hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  <Card 
                    className="hover:shadow-lg hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 cursor-pointer transform hover:scale-105"
                    onClick={() => setActiveTab("courses")}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{myCourses.length}</div>
                      <p className="text-xs text-muted-foreground">Active this semester</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className="hover:shadow-lg hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 cursor-pointer transform hover:scale-105"
                    onClick={() => setActiveTab("courses")}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {myCourses.reduce((sum, course) => sum + course.students, 0)}
                      </div>
                      <p className="text-xs text-muted-foreground">Across all courses</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className="hover:shadow-lg hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 cursor-pointer transform hover:scale-105"
                    onClick={() => setActiveTab("gradebook")}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {recentSubmissions.filter(s => s.status === 'pending').length}
                      </div>
                      <p className="text-xs text-muted-foreground">Submissions to review</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className="hover:shadow-lg hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 cursor-pointer transform hover:scale-105"
                    onClick={scrollToPendingTasks}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                      <CheckSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {tasksToComplete.filter(t => t.status === 'pending').length}
                      </div>
                      <p className="text-xs text-muted-foreground">Tasks to complete</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <Dialog open={showCreateCourse} onOpenChange={setShowCreateCourse}>
                        <DialogTrigger asChild>
                          <Button className="h-20 flex flex-col hover:shadow-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 hover:scale-105" variant="outline">
                            <Plus className="h-6 w-6 mb-2" />
                            <span className="text-xs sm:text-sm">Create Course</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Create New Course</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleCreateCourse} className="space-y-4">
                            <div>
                              <Label htmlFor="courseName">Course Name</Label>
                              <Input id="courseName" name="courseName" placeholder="e.g., Advanced Mathematics" required />
                            </div>
                            <div>
                              <Label htmlFor="courseCode">Course Code</Label>
                              <Input id="courseCode" name="courseCode" placeholder="e.g., MATH301" required />
                            </div>
                            <div>
                              <Label htmlFor="courseDescription">Description</Label>
                              <Textarea id="courseDescription" name="courseDescription" placeholder="Course description..." />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor="courseStatus">Status</Label>
                                <select name="courseStatus" className="w-full p-2 border rounded" required>
                                  <option value="future">Future</option>
                                  <option value="present">Present</option>
                                  <option value="past">Past</option>
                                </select>
                              </div>
                              <div>
                                <Label htmlFor="courseSemester">Semester</Label>
                                <select name="courseSemester" className="w-full p-2 border rounded" required>
                                  <option value="Spring">Spring</option>
                                  <option value="Summer">Summer</option>
                                  <option value="Fall">Fall</option>
                                </select>
                              </div>
                              <div>
                                <Label htmlFor="courseYear">Year</Label>
                                <Input id="courseYear" name="courseYear" type="number" placeholder="2024" min="2020" max="2030" required />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="courseStartDate">Start Date</Label>
                                <Input id="courseStartDate" name="courseStartDate" type="date" required />
                              </div>
                              <div>
                                <Label htmlFor="courseEndDate">End Date</Label>
                                <Input id="courseEndDate" name="courseEndDate" type="date" required />
                              </div>
                            </div>
                            <Button type="submit" className="w-full">Create Course</Button>
                          </form>
                        </DialogContent>
                      </Dialog>

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

                      <Dialog open={showCreateExam} onOpenChange={setShowCreateExam}>
                        <DialogTrigger asChild>
                          <Button className="h-20 flex flex-col hover:shadow-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 hover:scale-105" variant="outline">
                            <Clock className="h-6 w-6 mb-2" />
                            <span className="text-xs sm:text-sm">Create Exam</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Create Exam</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleCreateExam} className="space-y-4">
                            <div>
                              <Label htmlFor="examTitle">Exam Title</Label>
                              <Input id="examTitle" name="examTitle" placeholder="e.g., Midterm Exam" required />
                            </div>
                            <div>
                              <Label htmlFor="examCourse">Course</Label>
                              <select name="examCourse" className="w-full p-2 border rounded" required>
                                <option value="">Select Course</option>
                                {myCourses.map(course => (
                                  <option key={course.id} value={course.code}>{course.name}</option>
                                ))}
                              </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="examDate">Exam Date</Label>
                                <Input id="examDate" name="examDate" type="date" required />
                              </div>
                              <div>
                                <Label htmlFor="examTime">Start Time</Label>
                                <Input id="examTime" name="examTime" type="time" required />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="duration">Duration (minutes)</Label>
                              <Input id="duration" name="duration" type="number" placeholder="120" required />
                            </div>
                            <Button type="submit" className="w-full">Create Exam</Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>

                {/* Tasks To Be Completed */}
                <Card ref={pendingTasksRef}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Tasks To Be Completed</CardTitle>
                      <CardDescription>Your pending tasks and assignments</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setShowCreateTask(true)} className="hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Task
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {tasksToComplete.filter(task => task.status === 'pending').map((task) => (
                        <Card key={task.id} className="hover:shadow-md hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className={`w-3 h-3 rounded-full ${
                                  task.priority === 'high' ? 'bg-red-500' :
                                  task.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                                }`} />
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold truncate">{task.title}</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{task.course}</p>
                                </div>
                              </div>
                              <Badge 
                                variant="outline"
                                className={
                                  task.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                                  'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                                }
                              >
                                {task.priority}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-2 text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>Due: {task.dueDate}</span>
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setTasksToComplete(tasks => 
                                    tasks.map(t => 
                                      t.id === task.id ? { ...t, status: 'completed' } : t
                                    )
                                  );
                                }}
                                className="hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                              >
                                Mark Complete
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Submissions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentSubmissions.map((submission) => (
                        <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{submission.student}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{submission.assignment}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">{submission.course} • {submission.submittedAt}</p>
                          </div>
                          <Badge 
                            variant={submission.status === 'pending' ? 'default' : 'secondary'}
                            className="ml-2"
                          >
                            {submission.status}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-2xl font-bold">My Courses</h2>
                  <Button onClick={() => setShowCreateCourse(true)} className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Course
                  </Button>
                </div>
                
                {/* Present Courses */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Play className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-700">Present Courses</h3>
                      <p className="text-sm text-gray-600">Currently active courses</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {presentCourses.length} Active
                    </Badge>
                  </div>
                  
                  {presentCourses.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {presentCourses.map(course => <CourseCard key={course.id} course={course} />)}
                    </div>
                  ) : (
                    <Card className="p-8 text-center text-gray-500">
                      <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No active courses this semester</p>
                    </Card>
                  )}
                </div>

                {/* Future Courses */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CalendarDays className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-700">Future Courses</h3>
                      <p className="text-sm text-gray-600">Upcoming courses to be offered</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {futureCourses.length} Upcoming
                    </Badge>
                  </div>
                  
                  {futureCourses.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {futureCourses.map(course => <CourseCard key={course.id} course={course} />)}
                    </div>
                  ) : (
                    <Card className="p-8 text-center text-gray-500">
                      <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No upcoming courses scheduled</p>
                    </Card>
                  )}
                </div>

                {/* Past Courses */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <History className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-700">Past Courses</h3>
                      <p className="text-sm text-gray-600">Previously completed courses</p>
                    </div>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      {pastCourses.length} Completed
                    </Badge>
                  </div>
                  
                  {pastCourses.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {pastCourses.map(course => <CourseCard key={course.id} course={course} />)}
                    </div>
                  ) : (
                    <Card className="p-8 text-center text-gray-500">
                      <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No past courses to display</p>
                    </Card>
                  )}
                </div>

                {/* Enhanced Create Course Dialog */}
                <Dialog open={showCreateCourse} onOpenChange={setShowCreateCourse}>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Create New Course</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateCourse} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="courseName">Course Name</Label>
                          <Input id="courseName" name="courseName" placeholder="e.g., Advanced Mathematics" required />
                        </div>
                        <div>
                          <Label htmlFor="courseCode">Course Code</Label>
                          <Input id="courseCode" name="courseCode" placeholder="e.g., MATH301" required />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="courseStatus">Status</Label>
                          <select name="courseStatus" className="w-full p-2 border rounded" required>
                            <option value="future">Future</option>
                            <option value="present">Present</option>
                            <option value="past">Past</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="courseSemester">Semester</Label>
                          <select name="courseSemester" className="w-full p-2 border rounded" required>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Fall">Fall</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="courseYear">Year</Label>
                          <Input id="courseYear" name="courseYear" type="number" placeholder="2024" min="2020" max="2030" required />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="courseStartDate">Start Date</Label>
                          <Input id="courseStartDate" name="courseStartDate" type="date" required />
                        </div>
                        <div>
                          <Label htmlFor="courseEndDate">End Date</Label>
                          <Input id="courseEndDate" name="courseEndDate" type="date" required />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="courseDescription">Description</Label>
                        <Textarea id="courseDescription" name="courseDescription" placeholder="Course description..." />
                      </div>
                      
                      <Button type="submit" className="w-full">Create Course</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {activeTab === "assignments" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-2xl font-bold">Assignment Management</h2>
                  <Button onClick={() => setShowCreateAssignment(true)} className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Assignment
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <Card key={assignment.id} className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                      <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4 flex-1 min-w-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{assignment.title}</h3>
                            <p className="text-sm text-gray-600">{assignment.course}</p>
                            <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 w-full sm:w-auto">
                          <Badge variant={assignment.status === 'active' ? 'default' : 'secondary'}>
                            {assignment.status}
                          </Badge>
                          <Button 
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={() => { setSelectedAssignment(assignment); setShowAssignmentDrawer(true); }}
                          >
                            Manage
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {/* Responsive Create Assignment Dialog */}
                <Dialog open={showCreateAssignment} onOpenChange={setShowCreateAssignment}>
                  <DialogContent className="w-full sm:max-w-xl">
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
                {/* Assignment Detail Drawer */}
                <AssignmentDetailDrawer />
              </div>
            )}

            {activeTab === "exams" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-2xl font-bold">Exam Management</h2>
                  <Button onClick={() => setShowCreateExam(true)} className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Exam
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {exams.map((exam) => (
                    <Card key={exam.id} className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                      <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4 flex-1 min-w-0">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Clock className="h-5 w-5 text-red-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{exam.title}</h3>
                            <p className="text-sm text-gray-600">{exam.course}</p>
                            <p className="text-sm text-gray-500">
                              {exam.date} at {exam.time} • {exam.students} students
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                          <Badge variant="outline">
                            <Calendar className="h-3 w-3 mr-1" />
                            Scheduled
                          </Badge>
                          <div className="flex space-x-2 w-full sm:w-auto">
                            <Button size="sm" variant="outline" className="flex-1 sm:flex-none"
                              onClick={() => { setSelectedExam(exam); setShowExamDrawer(true); }}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" className="flex-1 sm:flex-none"
                              onClick={() => { setSelectedExam(exam); setShowExamDrawer(true); }}>
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {/* Exam Detail Drawer */}
                <ExamDetailDrawer />
              </div>
            )}

            {activeTab === "gradebook" && (
              <Card>
                <CardHeader>
                  <CardTitle>Gradebook</CardTitle>
                  <CardDescription>Manage student grades across all courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto max-w-full">
                    <table className="min-w-full text-sm text-left border rounded-lg overflow-hidden">
                      <thead className="bg-blue-100 dark:bg-blue-900 text-blue-700">
                        <tr>
                          <th className="px-4 py-2">Student</th>
                          <th className="px-4 py-2">Course</th>
                          <th className="px-4 py-2">Assignment</th>
                          <th className="px-4 py-2">Grade</th>
                          <th className="px-4 py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentSubmissions.map((sub, idx) => (
                          <tr key={idx} className="even:bg-gray-50 dark:even:bg-gray-800">
                            <td className="px-4 py-2">{sub.student}</td>
                            <td className="px-4 py-2">{sub.course}</td>
                            <td className="px-4 py-2">{sub.assignment}</td>
                            <td className="px-4 py-2">{sub.status === "graded" ? Math.floor(Math.random() * 30) + 70 : "-"}</td>
                            <td className="px-4 py-2">
                              <Badge variant={sub.status === "pending" ? "default" : "secondary"}>
                                {sub.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-2xl font-bold">Course Analytics</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Course Statistics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5" />
                        <span>Course Overview</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{presentCourses.length}</div>
                            <div className="text-sm text-blue-700">Active Courses</div>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{pastCourses.length}</div>
                            <div className="text-sm text-green-700">Completed Courses</div>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">{futureCourses.length}</div>
                            <div className="text-sm text-purple-700">Upcoming Courses</div>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-orange-600">
                              {myCourses.reduce((sum, c) => sum + c.students, 0)}
                            </div>
                            <div className="text-sm text-orange-700">Total Students</div>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h4 className="font-semibold mb-2">Course Distribution</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Active Courses:</span>
                              <span className="font-medium">{Math.round((presentCourses.length / myCourses.length) * 100)}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Completed Courses:</span>
                              <span className="font-medium">{Math.round((pastCourses.length / myCourses.length) * 100)}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Upcoming Courses:</span>
                              <span className="font-medium">{Math.round((futureCourses.length / myCourses.length) * 100)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Course Status Pie Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Award className="h-5 w-5" />
                        <span>Course Status Distribution</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center">
                        <div className="relative w-48 h-48">
                          {/* Simple CSS-based pie chart */}
                          <div className="w-full h-full rounded-full relative overflow-hidden bg-gray-200">
                            {/* Active courses slice */}
                            <div 
                              className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-blue-500 origin-bottom-left"
                              style={{
                                transform: `rotate(${(presentCourses.length / myCourses.length) * 360}deg)`,
                                clipPath: 'polygon(0 100%, 100% 100%, 100% 0)'
                              }}
                            ></div>
                            {/* Completed courses slice */}
                            <div 
                              className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-green-500 origin-bottom-left"
                              style={{
                                transform: `rotate(${((presentCourses.length + pastCourses.length) / myCourses.length) * 360}deg)`,
                                clipPath: 'polygon(0 100%, 100% 100%, 100% 0)'
                              }}
                            ></div>
                            {/* Upcoming courses slice */}
                            <div 
                              className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-purple-500 origin-bottom-left"
                              style={{
                                transform: 'rotate(0deg)',
                                clipPath: 'polygon(0 100%, 100% 100%, 100% 0)'
                              }}
                            ></div>
                          </div>
                          
                          {/* Center circle for donut effect */}
                          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-lg font-bold">{myCourses.length}</div>
                              <div className="text-xs text-gray-500">Total</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Legend */}
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded"></div>
                          <span className="text-sm">Active ({presentCourses.length})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span className="text-sm">Completed ({pastCourses.length})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-purple-500 rounded"></div>
                          <span className="text-sm">Upcoming ({futureCourses.length})</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Analytics */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="h-5 w-5" />
                        <span>Student Engagement</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">
                            {assignments.length}
                          </div>
                          <div className="text-sm text-gray-600">Total Assignments</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600">
                            {exams.length}
                          </div>
                          <div className="text-sm text-gray-600">Scheduled Exams</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-orange-600">
                            {recentSubmissions.filter(s => s.status === 'pending').length}
                          </div>
                          <div className="text-sm text-gray-600">Pending Reviews</div>
                        </div>
                      </div>
                      
                      <div className="mt-6 border-t pt-4">
                        <h4 className="font-semibold mb-3">Recent Activity Summary</h4>
                        <div className="space-y-2">
                          {recentSubmissions.slice(0, 3).map((submission, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm">{submission.student} - {submission.assignment}</span>
                              <Badge variant={submission.status === 'pending' ? 'default' : 'secondary'}>
                                {submission.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </main>
        </SidebarInset>
        
        {/* Course Details Drawer */}
        <CourseDetailsDrawer />
      </div>
    </SidebarProvider>
  );
};

export default InstructorDashboard;
