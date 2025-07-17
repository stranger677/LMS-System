
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Clock, FileText, AlertTriangle, CheckCircle, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "assignment",
      title: "Assignment Due Tomorrow",
      message: "Your Calculus Problem Set 5 is due tomorrow at 11:59 PM",
      time: "2 hours ago",
      priority: "high",
      read: false,
      course: "MATH301"
    },
    {
      id: 2,
      type: "exam",
      title: "Exam Schedule Updated",
      message: "Midterm exam for Advanced Mathematics has been rescheduled to June 22",
      time: "5 hours ago",
      priority: "medium",
      read: false,
      course: "MATH301"
    },
    {
      id: 3,
      type: "grade",
      title: "Grade Posted",
      message: "Your grade for Programming Assignment 3 has been posted: 85/100",
      time: "1 day ago",
      priority: "low",
      read: true,
      course: "CS101"
    },
    {
      id: 4,
      type: "announcement",
      title: "Class Cancelled",
      message: "Tomorrow's Physics Lab class is cancelled due to equipment maintenance",
      time: "1 day ago",
      priority: "medium",
      read: true,
      course: "PHYS201"
    },
    {
      id: 5,
      type: "system",
      title: "System Maintenance",
      message: "The LMS will be under maintenance on Sunday 2:00-4:00 AM",
      time: "2 days ago",
      priority: "low",
      read: true,
      course: "System"
    },
    {
      id: 6,
      type: "reminder",
      title: "Payment Reminder",
      message: "Your semester fee payment is due on June 30th",
      time: "3 days ago",
      priority: "high",
      read: false,
      course: "Finance"
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <FileText className="h-5 w-5" />;
      case 'exam': return <Clock className="h-5 w-5" />;
      case 'grade': return <CheckCircle className="h-5 w-5" />;
      case 'announcement': return <Bell className="h-5 w-5" />;
      case 'system': return <AlertTriangle className="h-5 w-5" />;
      case 'reminder': return <Calendar className="h-5 w-5" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getIconColor = (type: string, priority: string) => {
    if (priority === 'high') return 'text-red-500';
    if (priority === 'medium') return 'text-yellow-500';
    switch (type) {
      case 'assignment': return 'text-blue-500';
      case 'exam': return 'text-purple-500';
      case 'grade': return 'text-green-500';
      case 'announcement': return 'text-orange-500';
      case 'system': return 'text-gray-500';
      case 'reminder': return 'text-indigo-500';
      default: return 'text-gray-500';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">High</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-xs">Low</Badge>;
      default:
        return null;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "Your notifications have been updated",
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`transition-all hover:shadow-md cursor-pointer ${
                !notification.read ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : 'bg-white dark:bg-gray-800'
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`${getIconColor(notification.type, notification.priority)} mt-1`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{notification.message}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        {getPriorityBadge(notification.priority)}
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{notification.course}</span>
                      <span>{notification.time}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center pt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark All as Read
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
