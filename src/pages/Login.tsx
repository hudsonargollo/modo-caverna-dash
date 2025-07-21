import { LoginForm } from "@/components/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (email: string, password: string) => {
    // Here you would normally validate credentials
    // For demo purposes, we'll accept any email/password
    
    // Store login state (in a real app, you'd use proper auth management)
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return <LoginForm onLogin={handleLogin} />;
}