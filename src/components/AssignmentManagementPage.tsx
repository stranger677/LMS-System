import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, FileText, Calendar, Clock, Edit, Trash2, Eye, Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AssignmentManagementPageProps {
  onBack: () => void;
}

interface Assignment {
  id: number;
  title: string;
  description: string;
  course: string;
  dueDate: string;
  maxPoints: number;
  status: 'active' | 'closed' | 'draft';
  submissions: number;
  totalStudents: number;
  createdAt: string;
  attachments?: string[];
}

interface Submission {
  id: number;
  studentName: string;
  studentId: string;
  submittedAt: string;
  status: 'submitted' | 'graded' | 'late';
  grade?: number;
  feedback?: string;
}

const AssignmentManagementPage: React.FC<AssignmentManagementPageProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("assignments");
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  const [showEditAssignment, setShowEditAssignment] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: "Problem Set 5",
      description: "Solve the differential equations problems from Chapter 5. Show all work and provide detailed explanations.",
      course: "MATH301",
      dueDate: "2024-06-20",
      maxPoints: 100,
      status: "active",
      submissions: 28,
      totalStudents: 45,
      createdAt: "2024-06-01",
      attachments: ["problem_set_5.pdf"]
    },
    {
      id: 2,
      title: "Linear Algebra Project",
      description: "Complete the matrix operations project using Python. Submit both code and report.",
      course: "MATH201",
      dueDate: "2024-06-25",
      maxPoints: 150,
      status: "active",
      submissions: 15,
      totalStudents: 38,
      createdAt: "2024-06-05",
      attachments: ["project_template.zip", "requirements.pdf"]
    },
    {
      id: 3,
      title: "Calculus Quiz 3",
      description: "Short quiz on integration techniques.",
      course: "MATH102",
      dueDate: "2024-06-15",
      maxPoints: 50,
      status: "closed",
      submissions: 52,
      totalStudents: 52,
      createdAt: "2024-05-28"
    }
  ]);

  const submissions: Submission[] = [
    {
      id: 1,
      studentName: "John Doe",
      studentId: "2021001234",
      submittedAt: "2024-06-18T14:30:00",
      status: "submitted",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      studentId: "2021001235",
      submittedAt: "2024-06-19T10:15:00",
      status: "graded",
      grade: 85,
      feedback: "Good work! Minor calculation error in problem 3."
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      studentId: "2021001236",
      submittedAt: "2024-06-21T09:00:00",
      status: "late",
    }
  ];

  const courses = [
    { value: 'MATH301', label: 'Advanced Mathematics (MATH301)' },
    { value: 'MATH201', label: 'Linear Algebra (MATH201)' },
    { value: 'MATH102', label: 'Calculus II (MATH102)' }
  ];

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newAssignment: Assignment = {
      id: Date.now(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      course: formData.get('course') as string,
      dueDate: formData.get('dueDate') as string,
      maxPoints: parseInt(formData.get('maxPoints') as string),
      status: formData.get('status') as 'active' | 'draft',
      submissions: 0,
      totalStudents: 45, // This would come from actual enrollment data
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAssignments([newAssignment, ...assignments]);
    setShowCreateAssignment(false);
    
    toast({
      title: "Assignment Created",
      description: `Assignment "${newAssignment.title}" has been created successfully.`
    });
  };

  const handleDeleteAssignment = (id: number) => {
    const assignment = assignments.find(a => a.id === id);
    setAssignments(assignments.filter(a => a.id !== id));
    
    toast({
      title: "Assignment Deleted",
      description: `Assignment "${assignment?.title}" has been deleted.`,
      variant: "destructive"
    });
  };

  const handleViewSubmissions = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmissions(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubmissionStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'graded': return 'bg-green-100 text-green-800';
      case 'late': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Assignment Management</h1>
                  <p className="text-xs sm:text-sm text-gray-500">Create and manage course assignments</p>
                </div>
              </div>
            </div>
            <Button onClick={() => setShowCreateAssignment(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assignments">My Assignments</TabsTrigger>
            <TabsTrigger value="submissions">Recent Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="assignments" className="space-y-4">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{assignment.title}</h3>
                        <Badge className={getStatusColor(assignment.status)}>
                          {assignment.status}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-3">{assignment.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {assignment.dueDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="h-4 w-4" />
                          <span>Course: {assignment.course}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{assignment.submissions}/{assignment.totalStudents} submitted</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{assignment.maxPoints} points</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewSubmissions(assignment)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Submissions
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedAssignment(assignment);
                          setShowEditAssignment(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAssignment(assignment.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="submissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{submission.studentName}</h4>
                        <p className="text-sm text-gray-600">ID: {submission.studentId}</p>
                        <p className="text-xs text-gray-500">
                          Submitted: {new Date(submission.submittedAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        {submission.grade && (
                          <div className="text-right">
                            <div className="font-semibold">{submission.grade}/100</div>
                            <div className="text-xs text-gray-500">Grade</div>
                          </div>
                        )}
                        <Badge className={getSubmissionStatusColor(submission.status)}>
                          {submission.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Assignment Modal */}
      <Dialog open={showCreateAssignment} onOpenChange={setShowCreateAssignment}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Assignment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateAssignment} className="space-y-4">
            <div>
              <Label htmlFor="title">Assignment Title</Label>
              <Input id="title" name="title" placeholder="e.g., Problem Set 6" required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                placeholder="Detailed assignment instructions..." 
                rows={4}
                required 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <Label htmlFor="maxPoints">Maximum Points</Label>
                <Input id="maxPoints" name="maxPoints" type="number" placeholder="100" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" name="dueDate" type="datetime-local" required />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select name="status" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Save as Draft</SelectItem>
                    <SelectItem value="active">Publish Now</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="attachments">Attachments (Optional)</Label>
              <Input id="attachments" name="attachments" type="file" multiple />
              <p className="text-xs text-gray-500 mt-1">Upload assignment files, templates, or resources</p>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              <FileText className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Submissions Modal */}
      <Dialog open={showSubmissions} onOpenChange={setShowSubmissions}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedAssignment?.title} - Submissions
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {selectedAssignment?.submissions} of {selectedAssignment?.totalStudents} students submitted
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export Grades
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Grade All
                </Button>
              </div>
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
                        {submission.feedback && (
                          <p className="text-xs text-blue-600 mt-1">Feedback: {submission.feedback}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        {submission.grade && (
                          <div className="text-right">
                            <div className="font-semibold text-lg">{submission.grade}/{selectedAssignment?.maxPoints}</div>
                            <div className="text-xs text-gray-500">Grade</div>
                          </div>
                        )}
                        <Badge className={getSubmissionStatusColor(submission.status)}>
                          {submission.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
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

export default AssignmentManagementPage;