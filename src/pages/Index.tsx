import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Users, Calendar, Award, ArrowRight, User, GraduationCap, UserCog, Lock, Mail } from "lucide-react";
import LoginModal from "@/components/LoginModal";
import StudentDashboard from "@/components/StudentDashboard";
import InstructorDashboard from "@/components/InstructorDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import CourseListPage from "@/components/CourseListPage";
import CourseDetailsPage from "@/components/CourseDetailsPage";
import AssignmentListPage from "@/components/AssignmentListPage";
import ExamInterface from "@/components/ExamInterface";
import ExamInstructions from "@/components/ExamInstructions";
import GradeBreakdown from "@/components/GradeBreakdown";

const Index = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<{role: string, name: string} | null>(null);
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [showExamInstructions, setShowExamInstructions] = useState(false);
  
  // Separate theme states for each user role
  const [studentDarkMode, setStudentDarkMode] = useState(() => {
    const saved = localStorage.getItem('studentDarkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [instructorDarkMode, setInstructorDarkMode] = useState(() => {
    const saved = localStorage.getItem('instructorDarkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [adminDarkMode, setAdminDarkMode] = useState(() => {
    const saved = localStorage.getItem('adminDarkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [loginTab, setLoginTab] = useState('login');

  // Get current theme based on user role
  const getCurrentTheme = () => {
    if (!currentUser) return false;
    switch (currentUser.role) {
      case 'student':
        return studentDarkMode;
      case 'instructor':
        return instructorDarkMode;
      case 'admin':
        return adminDarkMode;
      default:
        return false;
    }
  };

  // Set theme for current user role
  const setCurrentTheme = (isDark: boolean) => {
    if (!currentUser) return;
    
    switch (currentUser.role) {
      case 'student':
        setStudentDarkMode(isDark);
        localStorage.setItem('studentDarkMode', JSON.stringify(isDark));
        break;
      case 'instructor':
        setInstructorDarkMode(isDark);
        localStorage.setItem('instructorDarkMode', JSON.stringify(isDark));
        break;
      case 'admin':
        setAdminDarkMode(isDark);
        localStorage.setItem('adminDarkMode', JSON.stringify(isDark));
        break;
    }
  };

  useEffect(() => {
    const currentTheme = getCurrentTheme();
    if (currentTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentUser, studentDarkMode, instructorDarkMode, adminDarkMode]);

  const features = [
    {
      icon: BookOpen,
      title: "Course Management",
      description: "Create and manage comprehensive courses with rich content delivery"
    },
    {
      icon: Users,
      title: "Student Enrollment",
      description: "Easy enrollment system with cohort management for targeted learning"
    },
    {
      icon: Calendar,
      title: "Assignment System",
      description: "Streamlined assignment creation, submission, and grading workflow"
    },
    {
      icon: Award,
      title: "Exam Management",
      description: "Secure, timed exams with auto-grading and comprehensive analytics"
    }
  ];

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleLogin = (userData: {role: string, name: string}) => {
    setCurrentUser(userData);
    setShowLoginModal(false);
    setCurrentView('dashboard');
    
    // Set student profile for demo purposes
    if (userData.role === 'student') {
      const studentProfile = {
        section: 'A',
        batch: '2021',
        studentId: '2021001234',
        department: 'Computer Science'
      };
      localStorage.setItem('currentStudentProfile', JSON.stringify(studentProfile));
    }
  };

  const handleDirectLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      handleLogin({
        role: selectedRole,
        name: selectedRole === 'student' ? 'John Doe' : selectedRole === 'instructor' ? 'Dr. Sarah Wilson' : 'Admin User'
      });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const handleNavigateToCourses = () => {
    setCurrentView('courses');
  };

  const handleNavigateToAssignments = () => {
    setCurrentView('assignments');
  };

  const handleNavigateToGradeBreakdown = (course: any) => {
    setSelectedCourse(course);
    setCurrentView('grade-breakdown');
  };

  const handleStartExam = (exam: any) => {
    setSelectedExam(exam);
    setCurrentView('exam');
  };

  const handleViewExamDetails = (exam: any) => {
    setSelectedExam(exam);
    setShowExamInstructions(true);
  };

  const handleStartExamFromInstructions = () => {
    setShowExamInstructions(false);
    setCurrentView('exam');
  };

  const handleExamSubmit = (answers: Record<number, string | number>) => {
    console.log('Exam submitted:', answers);
    setCurrentView('dashboard');
    setSelectedExam(null);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedCourse(null);
    setSelectedExam(null);
  };

  const handleEnterCourse = (course: any) => {
    setSelectedCourse(course);
    setCurrentView('course-details');
  };

  // Sample exam data
  const sampleExam = {
    id: 1,
    title: "Midterm Examination - Advanced Mathematics",
    duration: 120, // 2 hours
    questions: [
      {
        id: 1,
        type: 'mcq' as const,
        question: "What is the derivative of x² + 3x + 2?",
        options: ["2x + 3", "x² + 3", "2x + 2", "3x + 2"],
        correctAnswer: 0,
        maxPoints: 10
      },
      {
        id: 2,
        type: 'mcq' as const,
        question: "Which of the following is a prime number?",
        options: ["15", "21", "17", "25"],
        correctAnswer: 2,
        maxPoints: 10
      },
      {
        id: 3,
        type: 'short' as const,
        question: "Explain the fundamental theorem of calculus in your own words.",
        maxPoints: 20
      }
    ]
  };

  if (currentUser) {
    const currentTheme = getCurrentTheme();
    
    switch (currentView) {
      case 'courses':
        return <CourseListPage user={currentUser} onBack={handleBackToDashboard} onEnterCourse={handleEnterCourse} />;
      case 'course-details':
        return <CourseDetailsPage course={selectedCourse} onBack={() => setCurrentView('courses')} />;
      case 'assignments':
        return <AssignmentListPage user={currentUser} onBack={handleBackToDashboard} />;
      case 'grade-breakdown':
        return <GradeBreakdown course={selectedCourse} onBack={handleBackToDashboard} />;
      case 'exam':
        return <ExamInterface exam={selectedExam || sampleExam} onSubmit={handleExamSubmit} onExit={handleBackToDashboard} />;
      case 'dashboard':
      default:
        switch (currentUser.role) {
          case 'student':
            return (
              <>
                <StudentDashboard 
                  user={currentUser} 
                  onLogout={handleLogout}
                  onNavigateToCourses={handleNavigateToCourses}
                  onNavigateToAssignments={handleNavigateToAssignments}
                  onNavigateToGradeBreakdown={handleNavigateToGradeBreakdown}
                  onStartExam={handleStartExam}
                  onViewExamDetails={handleViewExamDetails}
                  onEnterCourse={handleEnterCourse}
                  darkMode={currentTheme}
                  setDarkMode={setCurrentTheme}
                />
                <ExamInstructions
                  exam={selectedExam}
                  isOpen={showExamInstructions}
                  onClose={() => setShowExamInstructions(false)}
                  onStartExam={handleStartExamFromInstructions}
                />
              </>
            );
          case 'instructor':
            return <InstructorDashboard user={currentUser} onLogout={handleLogout} />;
          case 'admin':
            return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
          default:
            return null;
        }
    }
  }

  return (
    <div className={`min-h-screen`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-5" 
          style={{backgroundImage: "url('/api/placeholder/1920/1080')"}}
        ></div>
        
        {/* Header */}
        <header className="bg-blue-100 dark:bg-blue-900/30 shadow-sm border-b relative z-10 sticky top-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                {/* University Logo */}
                <div className="university-logo">
                  <img 
                    src="/api/placeholder/40/40?text=DIU" 
                    alt="Daffodil International University Logo" 
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-nu-primary dark:text-white">Daffodil International University</h1>
                  <p className="text-sm text-nu-secondary dark:text-gray-300">Learning Management System</p>
                </div>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-nu-primary dark:hover:text-white transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/20 p-2 rounded">Features</a>
                <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-nu-primary dark:hover:text-white transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/20 p-2 rounded">About</a>
                <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-nu-primary dark:hover:text-white transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/20 p-2 rounded">Contact</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen grid md:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left Side - Hero Text */}
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Transform Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nu-primary to-nu-secondary">
                {" "}Learning Experience
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              A comprehensive Learning Management System designed for modern education. 
              Manage courses, conduct secure exams, and track student progress all in one platform.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">24/7 Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">Interactive Content</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">Progress Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">Mobile Friendly</span>
              </div>
            </div>
          </div>

          {/* Right Side - Login Box */}
          <div>
            <Card className="shadow-lg border-0">
              <CardContent className="pt-6">
                {!selectedRole ? (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome to DIU LMS</h2>
                      <p className="text-gray-600 dark:text-gray-400">Please select your role to continue</p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <Button 
                        onClick={() => handleRoleSelect('student')}
                        className="flex items-center justify-center space-x-3 h-16 bg-blue-600 hover:bg-blue-700"
                      >
                        <User className="h-6 w-6" />
                        <span className="text-lg">Student</span>
                      </Button>
                      <Button 
                        onClick={() => handleRoleSelect('instructor')}
                        className="flex items-center justify-center space-x-3 h-16 bg-green-600 hover:bg-green-700"
                      >
                        <GraduationCap className="h-6 w-6" />
                        <span className="text-lg">Instructor</span>
                      </Button>
                      <Button 
                        onClick={() => handleRoleSelect('admin')}
                        className="flex items-center justify-center space-x-3 h-16 bg-orange-600 hover:bg-orange-700"
                      >
                        <UserCog className="h-6 w-6" />
                        <span className="text-lg">Admin</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <Button 
                        variant="ghost" 
                        onClick={() => setSelectedRole("")}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        ← Back to role selection
                      </Button>
                    </div>
                    
                    <Tabs value={loginTab} onValueChange={setLoginTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="login" className="space-y-4 pt-6">
                        <div className="text-center mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Login as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                          </h3>
                        </div>
                        
                        <form onSubmit={handleDirectLogin} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email or Student/Employee ID</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input id="email" placeholder="yourname@diu.edu.bd" className="pl-10" required />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="password">Password</Label>
                              <a href="#" className="text-xs text-blue-600 hover:underline">Forgot Password?</a>
                            </div>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input id="password" type="password" placeholder="********" className="pl-10" required />
                            </div>
                          </div>
                          <div className="pt-2">
                            <Button type="submit" className="w-full" size="lg">
                              Login as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                            </Button>
                          </div>
                        </form>
                      </TabsContent>
                      
                      <TabsContent value="register" className="space-y-4 pt-6">
                        <div className="text-center mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Register as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                          </h3>
                        </div>
                        
                        <form className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input id="firstName" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input id="lastName" placeholder="Doe" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input id="email" type="email" placeholder="yourname@diu.edu.bd" className="pl-10" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="registerPassword">Password</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input id="registerPassword" type="password" placeholder="********" className="pl-10" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input id="confirmPassword" type="password" placeholder="********" className="pl-10" />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 pt-2">
                            <input type="checkbox" id="terms" className="h-4 w-4" />
                            <Label htmlFor="terms" className="text-sm">
                              I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                            </Label>
                          </div>
                          <div className="pt-2">
                            <Button className="w-full" size="lg">Register</Button>
                          </div>
                        </form>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Powerful Features for Modern Learning
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Everything you need to deliver exceptional educational experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-nu-primary to-nu-secondary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-nu-primary to-nu-secondary text-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">1,200+</div>
                <div className="text-orange-100">Active Students</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">150+</div>
                <div className="text-orange-100">Expert Instructors</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">45+</div>
                <div className="text-orange-100">Courses Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-orange-100">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-900 text-white py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img 
                    src="/api/placeholder/32/32?text=DIU" 
                    alt="Daffodil International University Logo" 
                    className="h-8 w-8 rounded-full"
                  />
                  <h3 className="text-xl font-bold">Daffodil International University LMS</h3>
                </div>
                <p className="text-gray-400">
                  Empowering education through innovative technology and seamless learning experiences.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Platform</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Course Management</li>
                  <li>Exam System</li>
                  <li>Analytics</li>
                  <li>Mobile App</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Help Center</li>
                  <li>Documentation</li>
                  <li>Community</li>
                  <li>Contact Us</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">University</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>About DIU</li>
                  <li>Admissions</li>
                  <li>Research</li>
                  <li>Campus Life</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Daffodil International University. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <LoginModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          selectedRole={selectedRole}
          onLogin={handleLogin}
        />
      </div>
    </div>
  );
};

// CheckIcon component for the landing page
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default Index;
