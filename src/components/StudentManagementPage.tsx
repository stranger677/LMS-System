import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Plus, Search, Users, Edit, Trash2, Mail, Phone, UserPlus, UserMinus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentManagementPageProps {
  onBack: () => void;
}

interface Student {
  id: number;
  name: string;
  email: string;
  studentId: string;
  course: string;
  section: string;
  batch: string;
  enrolledDate: string;
  status: 'active' | 'inactive';
  phone?: string;
}

const StudentManagementPage: React.FC<StudentManagementPageProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showRemoveStudent, setShowRemoveStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@diu.edu.bd",
      studentId: "2021001234",
      course: "MATH301",
      section: "A",
      batch: "2021",
      enrolledDate: "2024-01-15",
      status: "active",
      phone: "+880 1234567890"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@diu.edu.bd",
      studentId: "2021001235",
      course: "MATH301",
      section: "B",
      batch: "2021",
      enrolledDate: "2024-01-15",
      status: "active",
      phone: "+880 1234567891"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@diu.edu.bd",
      studentId: "2022001236",
      course: "MATH201",
      section: "A",
      batch: "2022",
      enrolledDate: "2024-01-20",
      status: "inactive",
      phone: "+880 1234567892"
    }
  ]);

  const courses = [
    { value: 'MATH301', label: 'Advanced Mathematics (MATH301)' },
    { value: 'MATH201', label: 'Linear Algebra (MATH201)' },
    { value: 'MATH102', label: 'Calculus II (MATH102)' }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.includes(searchTerm);
    const matchesCourse = courseFilter === "all" || student.course === courseFilter;
    
    return matchesSearch && matchesCourse;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newStudent: Student = {
      id: Date.now(),
      name: formData.get('studentName') as string,
      email: formData.get('studentEmail') as string,
      studentId: formData.get('studentId') as string,
      course: formData.get('course') as string,
      section: formData.get('section') as string,
      batch: formData.get('batch') as string,
      enrolledDate: new Date().toISOString().split('T')[0],
      status: 'active',
      phone: formData.get('phone') as string
    };

    setStudents([...students, newStudent]);
    setShowAddStudent(false);
    
    toast({
      title: "Student Added",
      description: `${newStudent.name} has been successfully enrolled in ${newStudent.course}.`
    });
  };

  const handleRemoveStudent = () => {
    if (selectedStudent) {
      setStudents(students.filter(s => s.id !== selectedStudent.id));
      setShowRemoveStudent(false);
      setSelectedStudent(null);
      
      toast({
        title: "Student Removed",
        description: `${selectedStudent.name} has been removed from the course.`,
        variant: "destructive"
      });
    }
  };

  const toggleStudentStatus = (studentId: number) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, status: student.status === 'active' ? 'inactive' : 'active' }
        : student
    ));
    
    const student = students.find(s => s.id === studentId);
    toast({
      title: "Status Updated",
      description: `${student?.name}'s status has been updated.`
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

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
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Student Management</h1>
                  <p className="text-xs sm:text-sm text-gray-500">Manage course enrollments</p>
                </div>
              </div>
            </div>
            <Button onClick={() => setShowAddStudent(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search students by name, email, or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map((course) => (
                <SelectItem key={course.value} value={course.value}>
                  {course.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Students List */}
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Students ({filteredStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/api/placeholder/48/48?text=${student.name.split(' ').map(n => n[0]).join('')}`} />
                      <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.email}</p>
                      <p className="text-xs text-gray-500">ID: {student.studentId} • {student.course} • Section {student.section}</p>
                      <p className="text-xs text-gray-500">Batch: {student.batch} • Enrolled: {student.enrolledDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(student.status)}>
                      {student.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStudentStatus(student.id)}
                    >
                      {student.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowRemoveStudent(true);
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Student Modal */}
      <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddStudent} className="space-y-4">
            <div>
              <Label htmlFor="studentName">Full Name</Label>
              <Input id="studentName" name="studentName" placeholder="e.g., John Doe" required />
            </div>
            <div>
              <Label htmlFor="studentEmail">Email</Label>
              <Input id="studentEmail" name="studentEmail" type="email" placeholder="john.doe@diu.edu.bd" required />
            </div>
            <div>
              <Label htmlFor="studentId">Student ID</Label>
              <Input id="studentId" name="studentId" placeholder="e.g., 2021001234" required />
            </div>
            <div>
              <Label htmlFor="course">Course</Label>
              <Select name="course" required>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="section">Section</Label>
                <Select name="section" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="batch">Batch</Label>
                <Select name="batch" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input id="phone" name="phone" placeholder="+880 1234567890" />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Remove Student Confirmation Modal */}
      <Dialog open={showRemoveStudent} onOpenChange={setShowRemoveStudent}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Remove Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to remove <strong>{selectedStudent?.name}</strong> from the course?</p>
            <p className="text-sm text-gray-600">This action cannot be undone. The student will lose access to all course materials and assignments.</p>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setShowRemoveStudent(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleRemoveStudent} className="flex-1 bg-red-600 hover:bg-red-700">
                <UserMinus className="h-4 w-4 mr-2" />
                Remove Student
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentManagementPage;