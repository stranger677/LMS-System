
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, User, Bell, Shield, Palette, Globe, Save } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, darkMode, setDarkMode }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    assignments: true,
    grades: true,
    exams: true
  });
  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState("dhaka");

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 bg-blue-50 dark:bg-blue-900/20 border-b sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Settings</span>
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6 w-full">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">System</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="john.doe@diu.edu.bd" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+880 1234567890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="Dhaka, Bangladesh" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentId">Student ID</Label>
                      <Input id="studentId" defaultValue="2021001234" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" defaultValue="Computer Science" disabled />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="batch">Batch</Label>
                      <Input id="batch" defaultValue="2021" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="semester">Current Semester</Label>
                      <Input id="semester" defaultValue="7th" disabled />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Delivery Methods</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Receive push notifications in browser</p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={notifications.push}
                          onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sms-notifications">SMS Notifications</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via SMS</p>
                        </div>
                        <Switch
                          id="sms-notifications"
                          checked={notifications.sms}
                          onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Content Types</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="assignment-notifications">Assignment Updates</Label>
                        <Switch
                          id="assignment-notifications"
                          checked={notifications.assignments}
                          onCheckedChange={(checked) => setNotifications({...notifications, assignments: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="grade-notifications">Grade Updates</Label>
                        <Switch
                          id="grade-notifications"
                          checked={notifications.grades}
                          onCheckedChange={(checked) => setNotifications({...notifications, grades: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="exam-notifications">Exam Announcements</Label>
                        <Switch
                          id="exam-notifications"
                          checked={notifications.exams}
                          onCheckedChange={(checked) => setNotifications({...notifications, exams: checked})}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Display Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred theme</p>
                      <div className="flex space-x-4">
                        <Button 
                          variant={!darkMode ? "default" : "outline"}
                          onClick={() => setDarkMode(false)}
                          className="flex-1"
                        >
                          Light Mode
                        </Button>
                        <Button 
                          variant={darkMode ? "default" : "outline"}
                          onClick={() => setDarkMode(true)}
                          className="flex-1"
                        >
                          Dark Mode
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="font-size">Font Size</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sidebar-position">Sidebar Position</Label>
                      <Select defaultValue="left">
                        <SelectTrigger>
                          <SelectValue placeholder="Select sidebar position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="system" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="bangla">বাংলা</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dhaka">Dhaka (GMT+6)</SelectItem>
                          <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                          <SelectItem value="newyork">New York (GMT-5)</SelectItem>
                          <SelectItem value="london">London (GMT+0)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue="dd-mm-yyyy">
                        <SelectTrigger>
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="auto-logout">Auto Logout</Label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue placeholder="Select auto logout time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
