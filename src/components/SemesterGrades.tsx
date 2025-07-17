
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Award, BookOpen, Calendar, TrendingUp } from "lucide-react";

interface SemesterGradesProps {
  onBack: () => void;
  onNavigateToGradeBreakdown: (course: any) => void;
  darkMode?: boolean;
}

const SemesterGrades: React.FC<SemesterGradesProps> = ({ 
  onBack, 
  onNavigateToGradeBreakdown, 
  darkMode = false 
}) => {
  const [selectedSemester, setSelectedSemester] = useState("");

  // Sample semester data
  const semesters = [
    { id: "fall2024", name: "Fall 2024", status: "current" },
    { id: "summer2024", name: "Summer 2024", status: "completed" },
    { id: "spring2024", name: "Spring 2024", status: "completed" },
    { id: "fall2023", name: "Fall 2023", status: "completed" },
    { id: "summer2023", name: "Summer 2023", status: "completed" },
    { id: "spring2023", name: "Spring 2023", status: "completed" }
  ];

  // Sample grades data for different semesters
  const semesterResults = {
    "fall2024": {
      sgpa: 3.85,
      credits: 18,
      status: "ongoing",
      subjects: [
        { id: 1, name: "Advanced Mathematics", code: "MATH301", credits: 3, grade: "A", gpa: 4.0, instructor: "Dr. Smith" },
        { id: 2, name: "Computer Science Fundamentals", code: "CS101", credits: 3, grade: "B+", gpa: 3.5, instructor: "Prof. Johnson" },
        { id: 3, name: "Physics Laboratory", code: "PHYS201", credits: 2, grade: "A-", gpa: 3.7, instructor: "Dr. Wilson" },
        { id: 4, name: "Database Systems", code: "CS301", credits: 3, grade: "A", gpa: 4.0, instructor: "Dr. Brown" },
        { id: 5, name: "Linear Algebra", code: "MATH201", credits: 3, grade: "B", gpa: 3.0, instructor: "Prof. Davis" },
        { id: 6, name: "Technical Writing", code: "ENG201", credits: 2, grade: "A-", gpa: 3.7, instructor: "Ms. Taylor" }
      ]
    },
    "summer2024": {
      sgpa: 3.75,
      credits: 12,
      status: "completed",
      subjects: [
        { id: 7, name: "Data Structures", code: "CS201", credits: 3, grade: "A", gpa: 4.0, instructor: "Dr. Lee" },
        { id: 8, name: "Calculus II", code: "MATH102", credits: 3, grade: "B+", gpa: 3.5, instructor: "Prof. Miller" },
        { id: 9, name: "Computer Networks", code: "CS401", credits: 3, grade: "A-", gpa: 3.7, instructor: "Dr. Garcia" },
        { id: 10, name: "Statistics", code: "STAT101", credits: 3, grade: "B", gpa: 3.0, instructor: "Prof. Anderson" }
      ]
    },
    "spring2024": {
      sgpa: 3.90,
      credits: 15,
      status: "completed",
      subjects: [
        { id: 11, name: "Object Oriented Programming", code: "CS102", credits: 3, grade: "A", gpa: 4.0, instructor: "Dr. Wilson" },
        { id: 12, name: "Discrete Mathematics", code: "MATH201", credits: 3, grade: "A-", gpa: 3.7, instructor: "Prof. Johnson" },
        { id: 13, name: "Digital Logic Design", code: "CS301", credits: 3, grade: "A", gpa: 4.0, instructor: "Dr. Brown" },
        { id: 14, name: "Microeconomics", code: "ECON101", credits: 3, grade: "B+", gpa: 3.5, instructor: "Prof. Davis" },
        { id: 15, name: "English Composition", code: "ENG101", credits: 3, grade: "A", gpa: 4.0, instructor: "Ms. Taylor" }
      ]
    }
  };

  const getGradeColor = (grade: string) => {
    const gradePoints = {
      'A': 'bg-green-100 text-green-800',
      'A-': 'bg-green-100 text-green-700',
      'B+': 'bg-blue-100 text-blue-800',
      'B': 'bg-blue-100 text-blue-700',
      'B-': 'bg-yellow-100 text-yellow-800',
      'C+': 'bg-orange-100 text-orange-800',
      'C': 'bg-orange-100 text-orange-700',
      'D': 'bg-red-100 text-red-800',
      'F': 'bg-red-200 text-red-900'
    };
    return gradePoints[grade as keyof typeof gradePoints] || 'bg-gray-100 text-gray-800';
  };

  const handleSubjectClick = (subject: any) => {
    const courseData = {
      id: subject.id,
      name: subject.name,
      code: subject.code,
      finalGrade: subject.gpa * 25 // Convert GPA to percentage for breakdown
    };
    onNavigateToGradeBreakdown(courseData);
  };

  const selectedSemesterData = selectedSemester ? semesterResults[selectedSemester as keyof typeof semesterResults] : null;

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={onBack} className="mr-4 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="flex items-center space-x-4">
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Semester Grades</h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">View your academic performance by semester</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Semester Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Select Semester</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-full sm:w-64">
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a semester..." />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((semester) => (
                      <SelectItem key={semester.id} value={semester.id}>
                        <div className="flex items-center space-x-2">
                          <span>{semester.name}</span>
                          {semester.status === 'current' && (
                            <Badge variant="outline" className="text-xs">Current</Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedSemesterData && (
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">SGPA: {selectedSemesterData.sgpa}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4 text-green-600" />
                    <span>Credits: {selectedSemesterData.credits}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <Badge variant={selectedSemesterData.status === 'current' ? 'default' : 'secondary'}>
                      {selectedSemesterData.status === 'current' ? 'Ongoing' : 'Completed'}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Semester Results */}
        {selectedSemesterData ? (
          <div className="space-y-6">
            {/* Semester Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {semesters.find(s => s.id === selectedSemester)?.name} Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedSemesterData.sgpa}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Semester GPA</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedSemesterData.credits}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Credits</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{selectedSemesterData.subjects.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Subjects</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subject Grades */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Subject Grades</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">Click on any subject to view detailed grade breakdown</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {selectedSemesterData.subjects.map((subject) => (
                    <Card 
                      key={subject.id} 
                      className="hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/10"
                      onClick={() => handleSubjectClick(subject)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                          <div className="flex-1">
                            <h3 className="font-medium text-base">{subject.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{subject.code} • {subject.instructor}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-sm font-medium">Credits: {subject.credits}</div>
                              <div className="text-xs text-gray-500">GPA: {subject.gpa}</div>
                            </div>
                            <Badge className={`${getGradeColor(subject.grade)} font-bold text-base px-3 py-1`}>
                              {subject.grade}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Award className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a Semester</h3>
              <p className="text-gray-500 dark:text-gray-400">Choose a semester from the dropdown above to view your grades and academic performance.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SemesterGrades;
