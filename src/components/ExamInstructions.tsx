
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, AlertTriangle, CheckCircle, FileText } from "lucide-react";

interface ExamInstructionsProps {
  exam: any;
  isOpen: boolean;
  onClose: () => void;
  onStartExam: () => void;
}

const ExamInstructions: React.FC<ExamInstructionsProps> = ({ 
  exam, 
  isOpen, 
  onClose, 
  onStartExam 
}) => {
  const instructions = [
    "Read all questions carefully before answering",
    "You cannot return to previous questions once submitted",
    "Auto-save feature is enabled - your progress is saved automatically",
    "The exam will auto-submit when time expires",
    "Ensure stable internet connection throughout the exam",
    "Do not refresh the browser or navigate away from the page",
    "Any suspicious activity may result in exam termination",
    "Contact support immediately if you face technical issues"
  ];

  const examRules = [
    "No external materials or devices allowed",
    "Keep your webcam and microphone enabled",
    "Take the exam in a quiet, well-lit environment",
    "Only one browser tab should be open",
    "Violation of rules may lead to disqualification"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Exam Instructions & Information
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Exam Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Exam Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg">{exam?.title || "Midterm Examination"}</h3>
                  <p className="text-gray-600">{exam?.course || "Advanced Mathematics"}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>Date: {exam?.date || "June 20, 2024"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span>Time: {exam?.time || "2:00 PM"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span>Duration: {exam?.duration || "2 hours"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Exam Instructions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1 text-xs">
                      {index + 1}
                    </Badge>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Rules & Regulations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span>Rules & Regulations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {examRules.map((rule, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-red-600 mt-1">•</span>
                    <span className="text-gray-700">{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* System Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>System Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Recommended Browser</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Chrome (latest version)</li>
                    <li>• Firefox (latest version)</li>
                    <li>• Safari (latest version)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Required</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Stable internet connection</li>
                    <li>• Webcam access</li>
                    <li>• Microphone access</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-600">
              <p>By clicking "Start Exam", you agree to follow all rules and regulations.</p>
            </div>
            <div className="space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onStartExam} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Start Exam
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExamInstructions;
