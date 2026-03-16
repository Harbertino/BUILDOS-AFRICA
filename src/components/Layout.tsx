import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { LayoutDashboard, PlusCircle, FolderKanban, FileText, Settings, LogOut, Menu, X, Building2, TrendingUp, ShoppingCart, BrainCircuit, Banknote, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-gold to-brand-orange rounded-lg flex items-center justify-center">
              <Building2 className="text-black w-6 h-6" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tighter text-white">
              BuildOS <span className="text-brand-gold">Africa</span>
            </span>
          </Link>

          <div className="hidden lg:block ml-8 pl-8 border-l border-white/10">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
              AI-Powered Construction Intelligence Platform
            </span>
          </div>

          <div className="flex-1" />

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Home</Link>
            <Link to="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</Link>
            <Link to="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</Link>
            <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Login</Link>
            <Link to="/new-project" className="btn-primary py-2 px-4 text-sm">Start a Project</Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/10 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white">Home</Link>
            <Link to="/pricing" className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white">Pricing</Link>
            <Link to="/about" className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white">About</Link>
            <Link to="/login" className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white">Login</Link>
            <Link to="/new-project" className="block px-3 py-2 text-base font-medium text-brand-gold">Start a Project</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'New Project', icon: PlusCircle, path: '/new-project' },
    { name: 'My Projects', icon: FolderKanban, path: '/projects' },
    { name: 'Marketplace', icon: ShoppingCart, path: '/marketplace' },
    { name: 'AI Advisor', icon: BrainCircuit, path: '/procurement-advisor' },
    { name: 'Financing', icon: Banknote, path: '/financing' },
    { name: 'Smart City', icon: Globe, path: '/smart-city' },
    { name: 'Reports', icon: FileText, path: '/reports' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="w-72 glass border-r border-white/5 h-screen sticky top-0 hidden lg:flex flex-col p-8">
      <div className="flex items-center space-x-3 mb-16">
        <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-brand-orange rounded-2xl flex items-center justify-center shadow-lg shadow-brand-gold/20">
          <Building2 className="text-black w-7 h-7" />
        </div>
        <div>
          <span className="text-2xl font-display font-bold tracking-tighter text-white block leading-none">
            BuildOS
          </span>
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">Africa</span>
        </div>
      </div>

      <nav className="flex-1 space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
              location.pathname === item.path 
                ? "bg-brand-gold/10 text-brand-gold" 
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            {location.pathname === item.path && (
              <motion.div 
                layoutId="sidebar-active"
                className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold"
              />
            )}
            <item.icon className={cn("w-5 h-5 transition-colors", location.pathname === item.path ? "text-brand-gold" : "text-slate-500 group-hover:text-slate-300")} />
            <span className="font-semibold tracking-tight">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/5 space-y-6">
        <button className="flex items-center space-x-4 px-5 py-4 w-full rounded-2xl text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all group">
          <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-400" />
          <span className="font-semibold">Logout</span>
        </button>

        <div className="px-5 py-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-3">Designed & Built By</p>
          <p className="text-xs font-bold text-white mb-2">Embassey Digital & Tech Services</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <MapPin className="w-3 h-3" /> 133 Oshodi Road, Lagos
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <Phone className="w-3 h-3" /> 08086288488
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <Mail className="w-3 h-3" /> eekonsult@gmail.com
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export const Card = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("glass-card rounded-3xl p-8", className)} {...props}>
    {children}
  </div>
);

export const MetricCard = ({ label, value, icon: Icon, trend, color = 'text-brand-gold' }: { label: string, value: string, icon: any, trend?: string, color?: string }) => (
  <Card className="relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon className={cn("w-24 h-24", color)} />
    </div>
    <div className="relative z-10">
      <div className={cn("w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5", color)}>
        <Icon className="w-7 h-7" />
      </div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">{label}</p>
      <div className="flex items-end gap-3">
        <p className="text-3xl font-display font-bold text-white leading-none">{value}</p>
        {trend && (
          <span className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {trend}
          </span>
        )}
      </div>
    </div>
  </Card>
);

export const SectionHeader = ({ title, subtitle, action }: { title: string, subtitle?: string, action?: React.ReactNode }) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
    <div>
      <h2 className="text-3xl lg:text-4xl font-display font-bold mb-3">{title}</h2>
      {subtitle && <p className="text-slate-400 max-w-xl">{subtitle}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

export const Badge = ({ children, variant = 'default', className }: { children: React.ReactNode, variant?: 'default' | 'gold' | 'blue' | 'emerald', className?: string }) => {
  const variants = {
    default: 'bg-white/5 text-slate-400 border-white/10',
    gold: 'bg-brand-gold/10 text-brand-gold border-brand-gold/20',
    blue: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    emerald: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
  };
  return (
    <span className={cn("px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border", variants[variant], className)}>
      {children}
    </span>
  );
};
