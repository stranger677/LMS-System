
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import { 
  Users, 
  BookOpen, 
  Settings,
  BarChart3,
  Plus,
  Bell,
  User,
  LogOut,
  UserCog,
  GraduationCap,
  Edit,
  Trash2,
  Shield,
  Activity,
  AlertTriangle,
  LayoutDashboard,
  FileText
} from "lucide-react";

interface AdminDashboardProps {
  user: { role: string; name: string };
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddUser, setShowAddUser] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Sidebar menu items
  const menuItems = [
    { title: "Overview", value: "overview", icon: LayoutDashboard },
    { title: "User Management", value: "users", icon: Users },
    { title: "Course Management", value: "courses", icon: BookOpen },
    { title: "System Settings", value: "system", icon: Settings },
    { title: "Activity Logs", value: "logs", icon: FileText },
  ];

  // Dummy data
  const systemStats = {
    totalUsers: 1247,
    totalCourses: 45,
    activeStudents: 980,
    instructors: 156,
    admins: 12
  };

  const allUsers = [
    { id: 1, name: "John Doe", email: "john@edu.com", role: "student", status: "active", lastActive: "2 hours ago" },
    { id: 2, name: "Dr. Sarah Wilson", email: "sarah@edu.com", role: "instructor", status: "active", lastActive: "1 hour ago" },
    { id: 3, name: "Mike Johnson", email: "mike@edu.com", role: "student", status: "inactive", lastActive: "2 days ago" },
    { id: 4, name: "Prof. Robert Chen", email: "robert@edu.com", role: "instructor", status: "active", lastActive: "30 mins ago" },
    { id: 5, name: "Admin User", email: "admin@edu.com", role: "admin", status: "active", lastActive: "5 mins ago" }
  ];

  const allCourses = [
    { id: 1, name: "Advanced Mathematics", code: "MATH301", instructor: "Dr. Sarah Wilson", students: 45, status: "active" },
    { id: 2, name: "Computer Science Fundamentals", code: "CS101", instructor: "Prof. Robert Chen", students: 38, status: "active" },
    { id: 3, name: "Physics Laboratory", code: "PHYS201", instructor: "Dr. Michael Brown", students: 32, status: "active" },
    { id: 4, name: "Linear Algebra", code: "MATH201", instructor: "Dr. Sarah Wilson", students: 28, status: "active" }
  ];

  const systemLogs = [
    { id: 1, action: "User login", user: "john@edu.com", timestamp: "2024-06-01 14:30:00", type: "info" },
    { id: 2, action: "Course created", user: "sarah@edu.com", timestamp: "2024-06-01 13:45:00", type: "success" },
    { id: 3, action: "Failed login attempt", user: "unknown@test.com", timestamp: "2024-06-01 12:15:00", type: "warning" },
    { id: 4, action: "User account deleted", user: "admin@edu.com", timestamp: "2024-06-01 11:30:00", type: "error" },
    { id: 5, action: "Assignment submitted", user: "mike@edu.com", timestamp: "2024-06-01 10:20:00", type: "info" }
  ];

  const notifications = [
    { id: 1, title: "New User Registration", message: "5 new users registered today", time: "2 hours ago", type: "info" },
    { id: 2, title: "System Update", message: "System maintenance scheduled for tonight", time: "4 hours ago", type: "warning" },
    { id: 3, title: "Course Completion", message: "Advanced Math course completed by 15 students", time: "1 day ago", type: "success" }
  ];

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddUser(false);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'addUser':
        setShowAddUser(true);
        break;
      case 'manageCourses':
        setActiveTab('courses');
        break;
      case 'systemSettings':
        setActiveTab('system');
        break;
      case 'viewAnalytics':
        // Just show a simple alert for now
        alert('Analytics dashboard would open here');
        break;
      default:
        break;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'instructor': return 'bg-green-100 text-green-800';
      case 'student': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLogTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* System Stats with Hover Effects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">User Distribution</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Students:</span>
                        <span>{systemStats.activeStudents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Instructors:</span>
                        <span>{systemStats.instructors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Administrators:</span>
                        <span>{systemStats.admins}</span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{systemStats.activeStudents}</div>
                      <p className="text-xs text-muted-foreground">78.6% of total users</p>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Student Activity</h4>
                    <div className="space-y-1 text-sm">
                      <div>Last 24 hours: 245 active</div>
                      <div>This week: 756 active</div>
                      <div>Average daily logins: 312</div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Instructors</CardTitle>
                      <UserCog className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{systemStats.instructors}</div>
                      <p className="text-xs text-muted-foreground">12.5% of total users</p>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Instructor Details</h4>
                    <div className="space-y-1 text-sm">
                      <div>Full-time: 89</div>
                      <div>Part-time: 67</div>
                      <div>Average courses per instructor: 2.3</div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{systemStats.totalCourses}</div>
                      <p className="text-xs text-muted-foreground">+3 new this week</p>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Course Statistics</h4>
                    <div className="space-y-1 text-sm">
                      <div>Active courses: 42</div>
                      <div>Archived courses: 3</div>
                      <div>Average enrollment: 28 students</div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">System Health</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">98.5%</div>
                      <p className="text-xs text-muted-foreground">Uptime this month</p>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">System Status</h4>
                    <div className="space-y-1 text-sm">
                      <div>Server response time: 120ms</div>
                      <div>Database queries: 99.2% success</div>
                      <div>Last maintenance: 3 days ago</div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent System Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {systemLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{log.action}</h4>
                        <p className="text-sm text-gray-600">by {log.user}</p>
                        <p className="text-xs text-gray-500">{log.timestamp}</p>
                      </div>
                      <Badge className={getLogTypeColor(log.type)}>
                        {log.type}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button 
                      className="h-16 flex flex-col justify-center items-center space-y-2 p-4" 
                      variant="outline"
                      onClick={() => handleQuickAction('addUser')}
                    >
                      <Plus className="h-5 w-5" />
                      <span className="text-sm">Add User</span>
                    </Button>
                    <Button 
                      className="h-16 flex flex-col justify-center items-center space-y-2 p-4" 
                      variant="outline"
                      onClick={() => handleQuickAction('manageCourses')}
                    >
                      <BookOpen className="h-5 w-5" />
                      <span className="text-sm">Manage Courses</span>
                    </Button>
                    <Button 
                      className="h-16 flex flex-col justify-center items-center space-y-2 p-4" 
                      variant="outline"
                      onClick={() => handleQuickAction('systemSettings')}
                    >
                      <Settings className="h-5 w-5" />
                      <span className="text-sm">System Settings</span>
                    </Button>
                    <Button 
                      className="h-16 flex flex-col justify-center items-center space-y-2 p-4" 
                      variant="outline"
                      onClick={() => handleQuickAction('viewAnalytics')}
                    >
                      <BarChart3 className="h-5 w-5" />
                      <span className="text-sm">View Analytics</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case "users":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">User Management</h2>
              <Button onClick={() => setShowAddUser(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>Manage system users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">Last active: {user.lastActive}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "courses":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Course Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Course
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>All Courses</CardTitle>
                <CardDescription>Manage courses and enrollments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{course.name}</h4>
                          <p className="text-sm text-gray-600">{course.code}</p>
                          <p className="text-xs text-gray-500">Instructor: {course.instructor}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-semibold">{course.students}</div>
                          <div className="text-xs text-gray-500">students</div>
                        </div>
                        <Badge className={getStatusColor(course.status)}>
                          {course.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "system":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">System Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Course Creation</span>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Student Registration</span>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Exam System</span>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Email Notifications</span>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Two-Factor Authentication</span>
                    <Button variant="outline" size="sm">Required</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Password Policy</span>
                    <Button variant="outline" size="sm">Strict</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Session Timeout</span>
                    <Button variant="outline" size="sm">30 min</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Login Attempts</span>
                    <Button variant="outline" size="sm">5 max</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "logs":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Activity Logs</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>System Activity</CardTitle>
                <CardDescription>Monitor all system activities and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Activity className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{log.action}</h4>
                          <p className="text-sm text-gray-600">User: {log.user}</p>
                          <p className="text-xs text-gray-500">{log.timestamp}</p>
                        </div>
                      </div>
                      <Badge className={getLogTypeColor(log.type)}>
                        {log.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <Sidebar className="border-r">
            <SidebarHeader className="border-b px-6 py-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-purple-600" />
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
                  <p className="text-xs text-gray-500">System Administration</p>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.value}>
                        <SidebarMenuButton 
                          asChild
                          isActive={activeTab === item.value}
                          onClick={() => setActiveTab(item.value)}
                        >
                          <button className="w-full flex items-center">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <SidebarInset className="flex-1">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white shadow-sm border-b">
              <div className="flex justify-between items-center h-16 px-6">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger />
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900 capitalize">{activeTab.replace(/([A-Z])/g, ' $1')}</h1>
                    <p className="text-sm text-gray-500">Welcome back, {user.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowNotifications(true)}
                  >
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={onLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6">
              {renderTabContent()}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>

      {/* Add User Dialog */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
              <Label htmlFor="userName">Full Name</Label>
              <Input id="userName" placeholder="e.g., John Doe" required />
            </div>
            <div>
              <Label htmlFor="userEmail">Email</Label>
              <Input id="userEmail" type="email" placeholder="john@edu.com" required />
            </div>
            <div>
              <Label htmlFor="userRole">Role</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="instructor">Instructor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="initialPassword">Initial Password</Label>
              <Input id="initialPassword" type="password" placeholder="Temporary password" required />
            </div>
            <Button type="submit" className="w-full">Add User</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Notifications Dialog */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium">{notification.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                  </div>
                  <Badge className={getLogTypeColor(notification.type)}>
                    {notification.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
