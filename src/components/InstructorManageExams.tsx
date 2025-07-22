import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Edit, Trash2, Eye, Users, Clock, FileText, Search, Plus, Calendar, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InstructorManageExamsProps {
  onBack: () => void;
  onEditExam: (exam: any) => void;
}

const InstructorManageExams: React.FC<InstructorManageExamsProps> = ({ onBack, onEditExam }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [exams, setExams] = useState<any[]>([]);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Load exams from localStorage
  useEffect(() => {
    const storedExams = JSON.parse(localStorage.getItem('instructorExams') || '[]');
    setExams(storedExams);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-700">Published</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-700">Draft</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-700">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.course?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || exam.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDeleteExam = (examId: number) => {
    const updatedExams = exams.filter(exam => exam.id !== examId);
    setExams(updatedExams);
    localStorage.setItem('instructorExams', JSON.stringify(updatedExams));
    
    // Also remove from published exams if it was published
    const publishedExams = JSON.parse(localStorage.getItem('publishedExams') || '[]');
    const updatedPublished = publishedExams.filter((exam: any) => exam.id !== examId);
    localStorage.setItem('publishedExams', JSON.stringify(updatedPublished));
    
    toast({
      title: "Exam Deleted",
      description: "The exam has been deleted successfully."
    });
  };

  const handleViewDetails = (exam: any) => {
    setSelectedExam(exam);
    setShowDetails(true);
  };

  const handleTogglePublish = (exam: any) => {
    const updatedStatus = exam.status === 'published' ? 'draft' : 'published';
    const updatedExam = { 
      ...exam, 
      status: updatedStatus, 
      isPublished: updatedStatus === 'published',
      publishedAt: updatedStatus === 'published' ? new Date().toISOString() : null,
      eligibleStudents: updatedStatus === 'published' 
        ? calculateEligibleStudents(exam.sections || [], exam.batches || [], exam.maxStudents)
        : 0
    };
    
    const updatedExams = exams.map(e => e.id === exam.id ? updatedExam : e);
    setExams(updatedExams);
    localStorage.setItem('instructorExams', JSON.stringify(updatedExams));
    
    // Update published exams
    const publishedExams = JSON.parse(localStorage.getItem('publishedExams') || '[]');
    if (updatedStatus === 'published') {
      const existingIndex = publishedExams.findIndex((e: any) => e.id === exam.id);
      if (existingIndex >= 0) {
        publishedExams[existingIndex] = updatedExam;
      } else {
        publishedExams.push(updatedExam);
      }
      localStorage.setItem('publishedExams', JSON.stringify(publishedExams));
      
      // Trigger event to notify student portal
      window.dispatchEvent(new CustomEvent('examPublished', { detail: updatedExam }));
    } else {
      const filteredPublished = publishedExams.filter((e: any) => e.id !== exam.id);
      localStorage.setItem('publishedExams', JSON.stringify(filteredPublished));
      
      // Trigger event to notify student portal
      window.dispatchEvent(new CustomEvent('examUnpublished', { detail: { examId: exam.id } }));
    }
    
    toast({
      title: updatedStatus === 'published' ? "Exam Published" : "Exam Unpublished",
      description: updatedStatus === 'published' 
        ? "Students can now see and participate in this exam." 
        : "Exam has been moved to draft status."
    });
  };

  // Helper function to calculate eligible students
  const calculateEligibleStudents = (sections: string[], batches: string[], maxStudents: string) => {
    const studentsPerSection = 35;
    const sectionsCount = sections.length || 1;
    const estimatedTotal = sectionsCount * studentsPerSection;
    
    if (maxStudents && parseInt(maxStudents) > 0) {
      return Math.min(estimatedTotal, parseInt(maxStudents));
    }
    
    return estimatedTotal;
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
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Manage Exams</h1>
                  <p className="text-xs sm:text-sm text-gray-500">Your examinations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search exams..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold truncate">{exam.title}</CardTitle>
                    <p className="text-sm text-gray-600 truncate">
                      {exam.course}
                    </p>
                  </div>
                  {getStatusBadge(exam.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>{exam.startDate || 'Not set'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span>{exam.duration || 0} min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <span>{exam.questions?.length || 0} questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-orange-600" />
                    <span>{exam.questions?.reduce((sum: number, q: any) => sum + (q.maxPoints || 0), 0) || 0} pts</span>
                  </div>
                </div>

                {exam.sections?.length > 0 && (
                  <div className="text-xs text-gray-600">
                    <strong>Sections:</strong> {exam.sections.join(', ')}
                  </div>
                )}

                {exam.batches?.length > 0 && (
                  <div className="text-xs text-gray-600">
                    <strong>Batches:</strong> {exam.batches.join(', ')}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onEditExam(exam)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewDetails(exam)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant={exam.status === 'published' ? "secondary" : "default"}
                    size="sm"
                    onClick={() => handleTogglePublish(exam)}
                    className="flex-1"
                  >
                    {exam.status === 'published' ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteExam(exam.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No exams found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No exams match your current filters.'
                  : 'You haven\'t created any exams yet.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Exam Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedExam?.title} - Details
            </DialogTitle>
          </DialogHeader>
          {selectedExam && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Course:</strong> {selectedExam.course}</div>
                    <div><strong>Date:</strong> {selectedExam.startDate}</div>
                    <div><strong>Time:</strong> {selectedExam.startTime}</div>
                    <div><strong>Duration:</strong> {selectedExam.duration} minutes</div>
                    <div><strong>Status:</strong> {selectedExam.status}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Participation</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Sections:</strong> {selectedExam.sections?.join(', ') || 'None'}</div>
                    <div><strong>Batches:</strong> {selectedExam.batches?.join(', ') || 'None'}</div>
                    <div><strong>Max Students:</strong> {selectedExam.maxStudents || 'No limit'}</div>
                  </div>
                </div>
              </div>

              {selectedExam.instructions && (
                <div>
                  <h4 className="font-semibold mb-2">Instructions</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    {selectedExam.instructions}
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-2">Questions ({selectedExam.questions?.length || 0})</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {selectedExam.questions?.map((question: any, index: number) => (
                    <div key={question.id} className="border p-3 rounded">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">Q{index + 1}: {question.type.toUpperCase()}</h5>
                        <Badge variant="outline">{question.maxPoints} pts</Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{question.question}</p>
                      {question.type === 'mcq' && question.options && (
                        <div className="text-xs text-gray-600">
                          <strong>Options:</strong> {question.options.join(', ')}
                          <br />
                          <strong>Correct:</strong> {question.options[question.correctAnswer]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstructorManageExams;