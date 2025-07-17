
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, Calendar, Clock, AlertTriangle } from "lucide-react";

interface AssignmentListPageProps {
  user: { role: string; name: string };
  onBack: () => void;
}

const AssignmentListPage: React.FC<AssignmentListPageProps> = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState("all");

  const allAssignments = [
    { 
      id: 1, 
      title: "Calculus Problem Set 5", 
      course: "MATH301", 
      courseName: "Advanced Mathematics",
      dueDate: "2024-06-15", 
      status: "pending", 
      grade: null,
      submittedAt: null,
      maxPoints: 100,
      type: "problem-set"
    },
    { 
      id: 2, 
      title: "Programming Assignment 3", 
      course: "CS101", 
      courseName: "Computer Science Fundamentals",
      dueDate: "2024-06-12", 
      status: "submitted", 
      grade: 85,
      submittedAt: "2024-06-10",
      maxPoints: 100,
      type: "coding"
    },
    { 
      id: 3, 
      title: "Lab Report - Wave Mechanics", 
      course: "PHYS201", 
      courseName: "Physics Laboratory",
      dueDate: "2024-01-18", 
      status: "graded", 
      grade: 92,
      submittedAt: "2024-01-15",
      maxPoints: 100,
      type: "report"
    },
    { 
      id: 4, 
      title: "Research Paper Draft", 
      course: "MATH301", 
      courseName: "Advanced Mathematics",
      dueDate: "2024-07-20", 
      status: "future", 
      grade: null,
      submittedAt: null,
      maxPoints: 150,
      type: "research"
    },
    { 
      id: 5, 
      title: "Database Design Project", 
      course: "CS101", 
      courseName: "Computer Science Fundamentals",
      dueDate: "2024-01-05", 
      status: "overdue", 
      grade: 0,
      submittedAt: null,
      maxPoints: 200,
      type: "project"
    }
  ];

  const filterAssignments = (status: string) => {
    if (status === "all") return allAssignments;
    
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    
    switch (status) {
      case "past":
        return allAssignments.filter(assignment => 
          assignment.dueDate < currentDate && (assignment.status === "graded" || assignment.status === "overdue")
        );
      case "present":
        return allAssignments.filter(assignment => 
          assignment.status === "pending" || assignment.status === "submitted"
        );
      case "future":
        return allAssignments.filter(assignment => 
          assignment.status === "future"
        );
      default:
        return allAssignments;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'graded': return 'bg-green-100 text-green-800';
      case 'future': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'submitted': return <FileText className="h-4 w-4" />;
      case 'graded': return <FileText className="h-4 w-4" />;
      case 'future': return <Calendar className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={onBack} className="mr-4 hover-light-blue">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-4">
              <FileText className="h-8 w-8 text-nu-primary" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">My Assignments</h1>
                <p className="text-sm text-gray-500">{user.name}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="hover-light-blue">All Assignments</TabsTrigger>
            <TabsTrigger value="present" className="hover-light-blue">Current</TabsTrigger>
            <TabsTrigger value="past" className="hover-light-blue">Past</TabsTrigger>
            <TabsTrigger value="future" className="hover-light-blue">Future</TabsTrigger>
          </TabsList>

          {["all", "present", "past", "future"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {filterAssignments(tab).map((assignment) => (
                <Card key={assignment.id} className="hover:shadow-md transition-shadow hover-light-blue">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-nu-accent rounded-full flex items-center justify-center">
                          {getStatusIcon(assignment.status)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{assignment.title}</h3>
                          <p className="text-sm text-gray-600">{assignment.courseName} ({assignment.course})</p>
                          <div className="flex items-center mt-1">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              Due: {formatDate(assignment.dueDate)}
                              {assignment.status === 'pending' && (
                                <span className={`ml-2 ${getDaysUntilDue(assignment.dueDate) < 3 ? 'text-red-600' : 'text-blue-600'}`}>
                                  ({getDaysUntilDue(assignment.dueDate)} days left)
                                </span>
                              )}
                            </span>
                          </div>
                          {assignment.submittedAt && (
                            <p className="text-xs text-gray-500 mt-1">
                              Submitted: {formatDate(assignment.submittedAt)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {assignment.grade !== null && (
                          <div className="text-right">
                            <div className={`font-semibold text-lg ${assignment.grade >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                              {assignment.grade}/{assignment.maxPoints}
                            </div>
                            <div className="text-xs text-gray-500">Grade</div>
                          </div>
                        )}
                        <Badge className={getStatusColor(assignment.status)}>
                          {assignment.status}
                        </Badge>
                        {assignment.status === 'pending' && (
                          <Button size="sm" className="bg-nu-secondary hover:bg-blue-700">
                            Submit
                          </Button>
                        )}
                        {assignment.status === 'future' && (
                          <Button size="sm" variant="outline" disabled>
                            Not Available
                          </Button>
                        )}
                        {(assignment.status === 'submitted' || assignment.status === 'graded') && (
                          <Button size="sm" variant="outline" className="hover-light-blue">
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filterAssignments(tab).length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No assignments found in this category</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default AssignmentListPage;
