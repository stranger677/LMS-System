
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Lock, GraduationCap, UserCog } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole: string;
  onLogin: (userData: {role: string, name: string}) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, selectedRole, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(selectedRole);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple simulation - in real app this would validate against backend
    if (email && password && role) {
      onLogin({
        role,
        name: role === 'student' ? 'John Doe' : role === 'instructor' ? 'Dr. Sarah Wilson' : 'Admin User'
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return <User className="h-5 w-5" />;
      case 'instructor': return <GraduationCap className="h-5 w-5" />;
      case 'admin': return <UserCog className="h-5 w-5" />;
      default: return <User className="h-5 w-5" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'bg-nu-secondary hover:bg-blue-700';
      case 'instructor': return 'bg-green-600 hover:bg-green-700';
      case 'admin': return 'bg-nu-primary hover:bg-orange-600';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-nu-primary">Login to EduFlow LMS</DialogTitle>
        </DialogHeader>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-nu-primary">Enter Credentials</CardTitle>
            <CardDescription>
              Please enter your login credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Student</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="instructor">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>Instructor</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center space-x-2">
                        <UserCog className="h-4 w-4" />
                        <span>Admin</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className={`w-full ${getRoleColor(role)} text-white`}
                disabled={!email || !password || !role}
              >
                <div className="flex items-center space-x-2">
                  {getRoleIcon(role)}
                  <span>Login as {role?.charAt(0).toUpperCase() + role?.slice(1)}</span>
                </div>
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
