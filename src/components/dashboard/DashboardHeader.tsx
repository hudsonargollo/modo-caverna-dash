import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  LogOut, 
  User, 
  RefreshCw,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logoCompleto from "@/assets/logo-completo.svg";

interface DashboardHeaderProps {
  onLogout?: () => void;
}

export function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  const { toast } = useToast();

  const handleRefresh = () => {
    toast({
      title: "Dados atualizados",
      description: "Dashboard atualizado com sucesso."
    });
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso."
    });
  };

  return (
    <header className="h-20 border-b border-primary/20 glass-effect px-6 flex items-center justify-between shadow-2xl backdrop-blur-xl bg-gradient-to-r from-zinc-900/90 to-zinc-800/90">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <img src={logoCompleto} alt="Modo Caverna" className="h-12 w-auto" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm text-foreground/80 font-medium">
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
          <Badge variant="secondary" className="hidden sm:flex glass-effect border-primary/30 bg-primary/10 text-primary">
            <div className="h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            Sistema Online
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="hidden sm:flex"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar
        </Button>

        <Button variant="outline" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs p-0 flex items-center justify-center">
            3
          </Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/api/placeholder/32/32" alt="Avatar" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@modocaverna.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>Notificações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}