import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Bell, Calendar, Users, Edit, Trash2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnnouncementPageProps {
  onBack: () => void;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  course: string;
  priority: 'low' | 'medium' | 'high';
  targetAudience: string;
  createdAt: string;
  status: 'draft' | 'published';
}

const AnnouncementPage: React.FC<AnnouncementPageProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [showCreateAnnouncement, setShowCreateAnnouncement] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: "Midterm Exam Schedule",
      content: "The midterm examination for Advanced Mathematics will be held on June 20, 2024, at 2:00 PM in Room 301.",
      course: "MATH301",
      priority: "high",
      targetAudience: "all",
      createdAt: "2024-06-01",
      status: "published"
    },
    {
      id: 2,
      title: "Assignment Deadline Extension",
      content: "Due to technical issues, the deadline for Problem Set 5 has been extended to June 25, 2024.",
      course: "MATH301",
      priority: "medium",
      targetAudience: "section-a",
      createdAt: "2024-06-05",
      status: "published"
    },
    {
      id: 3,
      title: "New Course Materials Available",
      content: "Chapter 6 lecture notes and practice problems are now available in the course materials section.",
      course: "MATH201",
      priority: "low",
      targetAudience: "all",
      createdAt: "2024-06-08",
      status: "draft"
    }
  ]);

  const courses = [
    { value: 'MATH301', label: 'Advanced Mathematics (MATH301)' },
    { value: 'MATH201', label: 'Linear Algebra (MATH201)' },
    { value: 'MATH102', label: 'Calculus II (MATH102)' }
  ];

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newAnnouncement: Announcement = {
      id: Date.now(),
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      course: formData.get('course') as string,
      priority: formData.get('priority') as 'low' | 'medium' | 'high',
      targetAudience: formData.get('targetAudience') as string,
      createdAt: new Date().toISOString().split('T')[0],
      status: formData.get('status') as 'draft' | 'published'
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setShowCreateAnnouncement(false);
    
    toast({
      title: "Announcement Created",
      description: `Your announcement "${newAnnouncement.title}" has been ${newAnnouncement.status}.`
    });
  };

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
    toast({
      title: "Announcement Deleted",
      description: "The announcement has been removed."
    });
  };

  const toggleAnnouncementStatus = (id: number) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id 
        ? { ...announcement, status: announcement.status === 'published' ? 'draft' : 'published' }
        : announcement
    ));
    
    const announcement = announcements.find(a => a.id === id);
    toast({
      title: "Status Updated",
      description: `Announcement "${announcement?.title}" is now ${announcement?.status === 'published' ? 'draft' : 'published'}.`
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'published' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800';
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
                <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Announcements</h1>
                  <p className="text-xs sm:text-sm text-gray-500">Manage course announcements</p>
                </div>
              </div>
            </div>
            <Button onClick={() => setShowCreateAnnouncement(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              New Announcement
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{announcement.title}</h3>
                      <Badge className={getPriorityColor(announcement.priority)}>
                        {announcement.priority}
                      </Badge>
                      <Badge className={getStatusColor(announcement.status)}>
                        {announcement.status}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-3">{announcement.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Course: {announcement.course}</span>
                      <span>Target: {announcement.targetAudience}</span>
                      <span>Created: {announcement.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAnnouncementStatus(announcement.id)}
                    >
                      {announcement.status === 'published' ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Announcement Modal */}
      <Dialog open={showCreateAnnouncement} onOpenChange={setShowCreateAnnouncement}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Announcement</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateAnnouncement} className="space-y-4">
            <div>
              <Label htmlFor="title">Announcement Title</Label>
              <Input id="title" name="title" placeholder="e.g., Exam Schedule Update" required />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                name="content" 
                placeholder="Write your announcement here..." 
                rows={6}
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
                <Label htmlFor="priority">Priority</Label>
                <Select name="priority" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Select name="targetAudience" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="section-a">Section A Only</SelectItem>
                    <SelectItem value="section-b">Section B Only</SelectItem>
                    <SelectItem value="section-c">Section C Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select name="status" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Save as Draft</SelectItem>
                    <SelectItem value="published">Publish Now</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              <Send className="h-4 w-4 mr-2" />
              Create Announcement
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnnouncementPage;