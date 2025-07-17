
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  Video, 
  Download,
  Calendar,
  Clock,
  User,
  Star,
  MessageSquare
} from "lucide-react";

interface CourseDetailsPageProps {
  course: any;
  onBack: () => void;
}

const CourseDetailsPage: React.FC<CourseDetailsPageProps> = ({ course, onBack }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const courseContent = {
    overview: {
      instructor: {
        name: "Dr. Sarah Wilson",
        image: "/api/placeholder/100/100",
        department: "Mathematics Department",
        email: "sarah.wilson@nu.ac.bd",
        introduction: "Dr. Wilson is a renowned mathematician with over 15 years of teaching experience. She specializes in advanced calculus and mathematical analysis."
      },
      description: "This course provides an in-depth understanding of advanced mathematical concepts including differential equations, linear algebra, and mathematical modeling. Students will develop strong analytical skills applicable to various fields.",
      objectives: [
        "Master advanced calculus techniques",
        "Solve complex differential equations",
        "Apply mathematical modeling to real-world problems",
        "Develop analytical thinking skills"
      ]
    },
    materials: [
      { id: 1, title: "Course Syllabus", type: "pdf", size: "2.3 MB" },
      { id: 2, title: "Chapter 1: Introduction to Advanced Calculus", type: "pdf", size: "5.1 MB" },
      { id: 3, title: "Lecture Notes - Week 1", type: "pdf", size: "3.7 MB" },
      { id: 4, title: "Reference Book: Advanced Mathematics", type: "pdf", size: "25.8 MB" }
    ],
    videos: [
      { id: 1, title: "Introduction to Differential Equations", duration: "45:30", thumbnail: "/api/placeholder/200/120" },
      { id: 2, title: "Linear Algebra Fundamentals", duration: "38:15", thumbnail: "/api/placeholder/200/120" },
      { id: 3, title: "Mathematical Modeling Techniques", duration: "52:20", thumbnail: "/api/placeholder/200/120" }
    ],
    assignments: [
      { id: 1, title: "Problem Set 1: Basic Derivatives", dueDate: "2024-06-15", status: "completed", grade: 85 },
      { id: 2, title: "Mathematical Modeling Project", dueDate: "2024-06-22", status: "pending", grade: null },
      { id: 3, title: "Differential Equations Assignment", dueDate: "2024-06-30", status: "upcoming", grade: null }
    ],
    tasks: [
      { id: 1, title: "Read Chapter 3", completed: true, dueDate: "2024-06-10" },
      { id: 2, title: "Complete Practice Problems", completed: false, dueDate: "2024-06-12" },
      { id: 3, title: "Prepare for Quiz", completed: false, dueDate: "2024-06-15" }
    ]
  };

  const handleFeedbackSubmit = () => {
    // In real app, this would submit to backend
    console.log('Feedback submitted:', { feedback, rating });
    setFeedback('');
    setRating(0);
    alert('Thank you for your feedback! It has been submitted anonymously.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{course?.name || "Advanced Mathematics"}</h1>
              <p className="text-sm text-gray-500">{course?.code || "MATH301"}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="hover-light-blue">Overview</TabsTrigger>
            <TabsTrigger value="materials" className="hover-light-blue">Materials</TabsTrigger>
            <TabsTrigger value="videos" className="hover-light-blue">Videos</TabsTrigger>
            <TabsTrigger value="assignments" className="hover-light-blue">Assignments</TabsTrigger>
            <TabsTrigger value="tasks" className="hover-light-blue">Tasks</TabsTrigger>
            <TabsTrigger value="feedback" className="hover-light-blue">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Instructor Information */}
            <Card>
              <CardHeader>
                <CardTitle>Course Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={courseContent.overview.instructor.image} />
                    <AvatarFallback>SW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{courseContent.overview.instructor.name}</h3>
                    <p className="text-gray-600">{courseContent.overview.instructor.department}</p>
                    <p className="text-sm text-gray-500 mb-3">{courseContent.overview.instructor.email}</p>
                    <p className="text-gray-700">{courseContent.overview.instructor.introduction}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Description */}
            <Card>
              <CardHeader>
                <CardTitle>Course Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{courseContent.overview.description}</p>
                <h4 className="font-semibold mb-3">Learning Objectives:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {courseContent.overview.objectives.map((objective, index) => (
                    <li key={index} className="text-gray-700">{objective}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Materials & PDFs</CardTitle>
                <CardDescription>Download course materials and reference books</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {courseContent.materials.map((material) => (
                    <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg hover-light-blue cursor-pointer transition-all">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-red-600" />
                        <div>
                          <h4 className="font-medium">{material.title}</h4>
                          <p className="text-sm text-gray-500">PDF • {material.size}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Lectures</CardTitle>
                <CardDescription>Watch recorded lectures and tutorials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courseContent.videos.map((video) => (
                    <div key={video.id} className="border rounded-lg overflow-hidden hover-light-blue cursor-pointer transition-all">
                      <div className="relative">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-32 object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black bg-opacity-50 rounded-full p-3">
                            <Video className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <Badge className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white">
                          {video.duration}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium">{video.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseContent.assignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium">{assignment.title}</h4>
                          <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {assignment.grade && (
                          <Badge variant="secondary">{assignment.grade}%</Badge>
                        )}
                        <Badge variant={assignment.status === 'completed' ? 'default' : assignment.status === 'pending' ? 'secondary' : 'outline'}>
                          {assignment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseContent.tasks.map((task) => (
                    <div key={task.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <input 
                        type="checkbox" 
                        checked={task.completed} 
                        className="h-4 w-4"
                        readOnly
                      />
                      <div className="flex-1">
                        <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </h4>
                        <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Anonymous Course Feedback</CardTitle>
                <CardDescription>Your feedback helps us improve the course experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="rating">Overall Rating</Label>
                  <div className="flex space-x-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 cursor-pointer ${
                          star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Please share your thoughts about the course content, teaching methods, and any suggestions for improvement..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="mt-2"
                    rows={6}
                  />
                </div>

                <Button onClick={handleFeedbackSubmit} disabled={!feedback || !rating}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Submit Anonymous Feedback
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
