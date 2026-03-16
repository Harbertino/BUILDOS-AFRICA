import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Plus, 
  Building2, 
  FileText, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  MapPin, 
  ArrowRight, 
  FolderKanban, 
  Users 
} from 'lucide-react';
import { Sidebar, Card, Badge, MetricCard, SectionHeader } from './components/Layout';
import { SAMPLE_PROJECTS, calculateEstimate } from './constants';
import { ProjectInput } from './types';

const Dashboard = () => {
  const [projects, setProjects] = React.useState<ProjectInput[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const storedProjects: ProjectInput[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key?.startsWith('project_')) {
          const data = sessionStorage.getItem(key);
          if (data) {
            storedProjects.push(JSON.parse(data));
          }
        }
      }
      
      const allProjects = [...storedProjects, ...SAMPLE_PROJECTS].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      setProjects(allProjects);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const totalValue = projects.reduce((acc, p) => acc + calculateEstimate(p).totalCost, 0);

  return (
    <div className="flex min-h-screen bg-ink">
      <Sidebar />
      
      <main className="flex-1 p-8 lg:p-16 overflow-y-auto">
        <SectionHeader 
          title="Welcome back."
          subtitle="Create a new project to generate an AI construction estimate or review your existing project plans."
          action={
            <Link to="/new-project" className="btn-primary">
              <Plus className="w-5 h-5" /> New Project
            </Link>
          }
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <MetricCard 
            label="Active Projects" 
            value={projects.length.toString()} 
            icon={Building2} 
            trend="+2 this month"
          />
          <MetricCard 
            label="Saved Reports" 
            value={projects.length.toString()} 
            icon={FileText} 
            color="text-brand-blue"
          />
          <MetricCard 
            label="Portfolio Value" 
            value={`₦${(totalValue / 1e9).toFixed(2)}B`} 
            icon={TrendingUp} 
            color="text-emerald-400"
            trend="+12.4%"
          />
          <MetricCard 
            label="Avg. Construction" 
            value="8.4 mo" 
            icon={Clock} 
            color="text-orange-400"
          />
        </div>

        {/* Recent Projects */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-bold">Recent Projects</h2>
            <Link to="/projects" className="btn-ghost text-sm">
              View All Projects <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-card rounded-3xl h-64 shimmer" />
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link key={project.id} to={`/results/${project.id}`}>
                  <Card className="glass-hover group h-full flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <Badge variant={project.finishLevel === 'Luxury' ? 'gold' : project.finishLevel === 'Premium' ? 'blue' : 'default'}>
                        {project.finishLevel}
                      </Badge>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-2xl mb-2 group-hover:text-brand-gold transition-colors line-clamp-1">{project.name}</h3>
                    <p className="text-sm text-slate-500 mb-8 flex items-center gap-2">
                      <MapPin className="w-3 h-3" /> {project.location} • {project.buildingType}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Building2 className="w-4 h-4 text-slate-600" />
                        <span className="text-xs font-bold">{project.builtUpArea} SQM</span>
                      </div>
                      <div className="flex items-center gap-2 text-brand-gold">
                        <span className="text-xs font-bold uppercase tracking-widest">View Report</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center py-20 text-center border-dashed border-white/10">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <FolderKanban className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-xl mb-2">You have not created any projects yet.</h3>
              <p className="text-slate-500 max-w-xs mb-8">Start your first project to estimate construction costs, materials, and timelines.</p>
              <Link to="/new-project" className="btn-primary">
                Create Project
              </Link>
            </Card>
          )}
        </div>

        {/* Account Summary / Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <h3 className="text-xl font-display font-bold mb-8">Portfolio Activity</h3>
            <div className="space-y-8">
              {[
                { action: 'Report Generated', project: 'Lekki Premium Duplex', time: '2 hours ago', icon: FileText },
                { action: 'New Estimate Created', project: 'Enugu Commercial Hub', time: '5 hours ago', icon: TrendingUp },
                { action: 'Project Shared', project: 'Abuja Luxury Residence', time: 'Yesterday', icon: Users },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-brand-gold/30 transition-colors">
                      <activity.icon className="w-5 h-5 text-slate-400 group-hover:text-brand-gold transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-white font-bold mb-1">{activity.action}</p>
                      <p className="text-xs text-slate-500 font-medium">{activity.project}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="bg-gradient-to-br from-brand-gold/10 to-transparent border-brand-gold/20">
            <h3 className="text-xl font-display font-bold mb-8">Enterprise Access</h3>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 mb-8">
              <p className="text-[10px] text-brand-gold uppercase font-bold tracking-widest mb-2">Current Plan</p>
              <p className="text-3xl font-display font-bold text-white">Professional</p>
            </div>
            <ul className="space-y-4 mb-10">
              {[
                '12/20 Projects Used',
                'Unlimited PDF Downloads',
                'Priority Support Active',
                'Multi-user Access'
              ].map((item, i) => (
                <li key={i} className="text-sm text-slate-400 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/50" /> {item}
                </li>
              ))}
            </ul>
            <button className="btn-primary w-full text-sm py-3">Upgrade to Developer</button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
