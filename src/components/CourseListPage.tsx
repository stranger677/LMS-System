
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, ChevronLeft, GraduationCap } from "lucide-react";

interface CourseListPageProps {
  user: { role: string; name: string };
  onBack: () => void;
  onEnterCourse?: (course: any) => void;
}

const CourseListPage: React.FC<CourseListPageProps> = ({ user, onBack, onEnterCourse }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  const courses = [
    {
      id: 1,
      name: "Advanced Mathematics",
      code: "MATH301",
      instructor: "Dr. Smith",
      department: "Mathematics",
      credits: 4,
      semester: "Fall 2024",
      description: "A comprehensive study of advanced mathematical concepts including calculus, differential equations, and linear algebra.",
      progress: 75,
      nextClass: "Tomorrow 2:00 PM",
      studentsEnrolled: 42,
      image: "/api/placeholder/400/200?text=Mathematics",
      isFuture: false
    },
    {
      id: 2,
      name: "Computer Science Fundamentals",
      code: "CS101",
      instructor: "Prof. Johnson",
      department: "Computer Science",
      credits: 3,
      semester: "Fall 2024",
      description: "Introduction to core computer science concepts, data structures, and basic programming paradigms.",
      progress: 60,
      nextClass: "Wednesday 10:00 AM",
      studentsEnrolled: 68,
      image: "/api/placeholder/400/200?text=CS",
      isFuture: false
    },
    {
      id: 3,
      name: "Physics Laboratory",
      code: "PHYS201",
      instructor: "Dr. Wilson",
      department: "Physics",
      credits: 2,
      semester: "Fall 2024",
      description: "Practical laboratory course covering fundamental physics experiments and data analysis techniques.",
      progress: 90,
      nextClass: "Friday 1:00 PM",
      studentsEnrolled: 35,
      image: "/api/placeholder/400/200?text=Physics",
      isFuture: false
    },
    {
      id: 4,
      name: "Introduction to Psychology",
      code: "PSYC101",
      instructor: "Dr. Miller",
      department: "Psychology",
      credits: 3,
      semester: "Fall 2024",
      description: "Survey of major topics in modern psychology with emphasis on human behavior and cognitive processes.",
      progress: 45,
      nextClass: "Monday 11:00 AM",
      studentsEnrolled: 120,
      image: "/api/placeholder/400/200?text=Psychology",
      isFuture: false
    },
    {
      id: 5,
      name: "Advanced Database Systems",
      code: "CS405",
      instructor: "Dr. Rahman",
      department: "Computer Science",
      credits: 4,
      semester: "Spring 2025",
      description: "In-depth exploration of database design, implementation, and optimization with focus on real-world applications.",
      progress: 0,
      nextClass: "N/A",
      studentsEnrolled: 0,
      image: "/api/placeholder/400/200?text=Database",
      isFuture: true
    },
    {
      id: 6,
      name: "Machine Learning",
      code: "CS410",
      instructor: "Dr. Khan",
      department: "Computer Science",
      credits: 4,
      semester: "Spring 2025",
      description: "Comprehensive introduction to machine learning algorithms, neural networks, and artificial intelligence concepts.",
      progress: 0,
      nextClass: "N/A",
      studentsEnrolled: 0,
      image: "/api/placeholder/400/200?text=ML",
      isFuture: true
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterBy === "all") return matchesSearch;
    if (filterBy === "active") return matchesSearch && !course.isFuture;
    if (filterBy === "future") return matchesSearch && course.isFuture;
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-blue-50 dark:bg-blue-900/30 shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="hover:bg-blue-100 dark:hover:bg-blue-900/20"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back
              </Button>
              <div className="hidden md:flex items-center space-x-3">
                <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">My Courses</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Browse all your enrolled courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search courses by name, code, instructor..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="active">Active Courses</SelectItem>
                <SelectItem value="future">Future Courses</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Card 
                key={course.id} 
                className={`overflow-hidden transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] ${
                  course.isFuture ? 'bg-gray-100 dark:bg-gray-800/50 opacity-75' : 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }`}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{course.name}</CardTitle>
                      <CardDescription>{course.code}</CardDescription>
                    </div>
                    {course.isFuture ? (
                      <Badge variant="outline" className="bg-gray-200 dark:bg-gray-700">Future Course</Badge>
                    ) : (
                      <Badge variant="secondary">{course.progress}%</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{course.instructor.split(' ')[0][0]}{course.instructor.split(' ')[1]?.[0] || ''}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{course.instructor}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{course.department}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{course.description}</p>
                    <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
                      <div>Credits: {course.credits}</div>
                      <div>Semester: {course.semester}</div>
                      {!course.isFuture && (
                        <>
                          <div>Students: {course.studentsEnrolled}</div>
                          <div>Next class: {course.nextClass}</div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {!course.isFuture ? (
                    <>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      
                      <Button 
                        className="w-full" 
                        variant="default" 
                        onClick={() => onEnterCourse && onEnterCourse(course)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Enter Course
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="text-sm text-amber-600 dark:text-amber-400">
                        This course will be available in the next semester.
                      </div>
                      
                      <Button 
                        className="w-full" 
                        variant="outline" 
                        disabled
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Not Available
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No courses found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </main>

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
    </div>
  );
};

export default CourseListPage;
