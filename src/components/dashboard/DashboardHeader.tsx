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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Bell, 
  LogOut, 
  User, 
  ChevronDown,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardHeaderProps {
  onLogout?: () => void;
}

export function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Exportando dados",
      description: "Download iniciado com sucesso."
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
        <Select defaultValue="7-days">
          <SelectTrigger className="w-[180px] bg-transparent border-primary/20 text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-primary/20">
            <SelectItem value="today">Hoje</SelectItem>
            <SelectItem value="7-days">Últimos 7 dias</SelectItem>
            <SelectItem value="30-days">Últimos 30 dias</SelectItem>
            <SelectItem value="90-days">Últimos 90 dias</SelectItem>
            <SelectItem value="year">Este ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="hidden sm:flex"
        >
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>

        <Button variant="outline" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
            3
          </span>
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
          <DropdownMenuContent className="w-56 bg-zinc-900 border-primary/20" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@modocaverna.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-primary/20" />
            <DropdownMenuItem className="hover:bg-zinc-800">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-zinc-800">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notificações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-primary/20" />
            <DropdownMenuItem onClick={handleLogout} className="hover:bg-zinc-800">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}