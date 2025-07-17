
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone, X, User, BookOpen, Award, Clock, GraduationCap } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface FacultiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FacultiesModal: React.FC<FacultiesModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("cse");
  
  // Dummy faculty data by department
  const facultiesByDept = {
    cse: [
      {
        id: 1,
        name: "Dr. Ahmed Rahman",
        title: "Professor & Head",
        department: "Computer Science & Engineering",
        email: "ahmed.rahman@diu.edu.bd",
        phone: "+880 1712-345678",
        image: "/api/placeholder/100/100?text=AR",
        education: "Ph.D in Computer Science, MIT",
        specialization: "Artificial Intelligence, Machine Learning",
        office: "Room 502, Building A",
        officeHours: "Sunday, Tuesday: 2:00 PM - 4:00 PM",
        courses: ["Data Structures", "Algorithm Design", "AI Fundamentals"]
      },
      {
        id: 2,
        name: "Dr. Fatima Khan",
        title: "Associate Professor",
        department: "Computer Science & Engineering",
        email: "fatima.khan@diu.edu.bd",
        phone: "+880 1723-456789",
        image: "/api/placeholder/100/100?text=FK",
        education: "Ph.D in Software Engineering, Stanford University",
        specialization: "Software Engineering, Database Systems",
        office: "Room 503, Building A",
        officeHours: "Monday, Wednesday: 1:00 PM - 3:00 PM",
        courses: ["Database Systems", "Software Engineering", "Web Technologies"]
      },
      {
        id: 3,
        name: "Mohammad Hasan",
        title: "Assistant Professor",
        department: "Computer Science & Engineering",
        email: "mohammad.hasan@diu.edu.bd",
        phone: "+880 1734-567890",
        image: "/api/placeholder/100/100?text=MH",
        education: "Ph.D in Computer Networks, University of Toronto",
        specialization: "Computer Networks, Cybersecurity",
        office: "Room 505, Building A",
        officeHours: "Tuesday, Thursday: 11:00 AM - 1:00 PM",
        courses: ["Computer Networks", "Network Security", "Operating Systems"]
      },
    ],
    eee: [
      {
        id: 4,
        name: "Dr. Kabir Uddin",
        title: "Professor & Head",
        department: "Electrical & Electronic Engineering",
        email: "kabir.uddin@diu.edu.bd",
        phone: "+880 1745-678901",
        image: "/api/placeholder/100/100?text=KU",
        education: "Ph.D in Electrical Engineering, Imperial College London",
        specialization: "Power Systems, Renewable Energy",
        office: "Room 402, Building B",
        officeHours: "Sunday, Wednesday: 10:00 AM - 12:00 PM",
        courses: ["Power Systems", "Renewable Energy", "Electrical Machines"]
      },
      {
        id: 5,
        name: "Tahmina Akhter",
        title: "Associate Professor",
        department: "Electrical & Electronic Engineering",
        email: "tahmina.akhter@diu.edu.bd",
        phone: "+880 1756-789012",
        image: "/api/placeholder/100/100?text=TA",
        education: "Ph.D in Electronics, Tokyo University",
        specialization: "Electronic Circuits, Microprocessors",
        office: "Room 403, Building B",
        officeHours: "Monday, Thursday: 2:00 PM - 4:00 PM",
        courses: ["Electronic Circuits", "Digital Electronics", "Microprocessors"]
      },
    ],
    bba: [
      {
        id: 6,
        name: "Dr. Saiful Islam",
        title: "Professor & Dean",
        department: "Business Administration",
        email: "saiful.islam@diu.edu.bd",
        phone: "+880 1767-890123",
        image: "/api/placeholder/100/100?text=SI",
        education: "Ph.D in Business Administration, Harvard University",
        specialization: "Marketing, Strategic Management",
        office: "Room 302, Building C",
        officeHours: "Sunday, Tuesday: 11:00 AM - 1:00 PM",
        courses: ["Principles of Marketing", "Strategic Management", "Business Ethics"]
      },
      {
        id: 7,
        name: "Dr. Nusrat Jahan",
        title: "Associate Professor",
        department: "Business Administration",
        email: "nusrat.jahan@diu.edu.bd",
        phone: "+880 1778-901234",
        image: "/api/placeholder/100/100?text=NJ",
        education: "Ph.D in Accounting, University of Manchester",
        specialization: "Accounting, Finance",
        office: "Room 303, Building C",
        officeHours: "Monday, Wednesday: 10:00 AM - 12:00 PM",
        courses: ["Financial Accounting", "Management Accounting", "Corporate Finance"]
      },
    ],
    english: [
      {
        id: 8,
        name: "Dr. Mahmud Hasan",
        title: "Professor & Head",
        department: "English",
        email: "mahmud.hasan@diu.edu.bd",
        phone: "+880 1789-012345",
        image: "/api/placeholder/100/100?text=MH",
        education: "Ph.D in English Literature, Oxford University",
        specialization: "English Literature, Linguistics",
        office: "Room 202, Building D",
        officeHours: "Sunday, Tuesday: 9:00 AM - 11:00 AM",
        courses: ["English Literature", "Academic Writing", "Communication Skills"]
      },
    ]
  };

  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);

  const scheduleAppointment = () => {
    toast({
      title: "Successfully fixed appointment",
      description: `Your appointment request with ${selectedFaculty?.name} has been sent.`,
    });
    setSelectedFaculty(null);
  };

  const departments = [
    { id: "cse", name: "CSE" },
    { id: "eee", name: "EEE" },
    { id: "bba", name: "BBA" },
    { id: "english", name: "English" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-bold flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>Faculty Directory</span>
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="p-4">
          {selectedFaculty ? (
            <div className="space-y-6">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedFaculty(null)}
                className="mb-4"
              >
                ← Back to faculty list
              </Button>
              
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
                    <Avatar className="h-32 w-32 mx-auto mb-4">
                      <AvatarImage src={selectedFaculty.image} />
                      <AvatarFallback>{selectedFaculty.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold">{selectedFaculty.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400">{selectedFaculty.title}</p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{selectedFaculty.department}</p>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-center space-x-2 text-sm">
                        <Mail className="h-4 w-4" />
                        <span className="break-all">{selectedFaculty.email}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm">
                        <Phone className="h-4 w-4" />
                        <span>{selectedFaculty.phone}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="mt-6 w-full"
                      onClick={scheduleAppointment}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Appointment
                    </Button>
                  </div>
                </div>
                
                <div className="lg:w-2/3 space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold flex items-center mb-3">
                        <User className="h-5 w-5 mr-2 text-blue-600" />
                        Professional Information
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start">
                          <div className="w-32 font-medium shrink-0">Education:</div>
                          <div className="break-words">{selectedFaculty.education}</div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-32 font-medium shrink-0">Specialization:</div>
                          <div className="break-words">{selectedFaculty.specialization}</div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-32 font-medium shrink-0">Office:</div>
                          <div className="break-words">{selectedFaculty.office}</div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-32 font-medium shrink-0">Office Hours:</div>
                          <div className="break-words">{selectedFaculty.officeHours}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold flex items-center mb-3">
                        <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                        Courses Teaching
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedFaculty.courses.map((course: string, index: number) => (
                          <Badge key={index} variant="outline" className="py-1">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6 w-full">
                {departments.map(dept => (
                  <TabsTrigger key={dept.id} value={dept.id} className="text-xs sm:text-sm">
                    {dept.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {departments.map(dept => (
                <TabsContent key={dept.id} value={dept.id} className="space-y-4">
                  {facultiesByDept[dept.id as keyof typeof facultiesByDept].map((faculty) => (
                    <Card 
                      key={faculty.id} 
                      className="hover:shadow-md transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer"
                      onClick={() => setSelectedFaculty(faculty)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                          <Avatar className="h-16 w-16 shrink-0">
                            <AvatarImage src={faculty.image} />
                            <AvatarFallback>{faculty.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg break-words">{faculty.name}</h3>
                            <p className="text-blue-600 dark:text-blue-400 break-words">{faculty.title}</p>
                            <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center">
                                <Mail className="h-3 w-3 mr-1 shrink-0" />
                                <span className="break-all">{faculty.email}</span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-3 w-3 mr-1 shrink-0" />
                                <span>{faculty.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FacultiesModal;
