// COMPONENTS
import { Card } from '@/components/atoms/card';

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="group cursor-pointer">
    <Card className="h-full border-slate-700/50 bg-slate-900/70 p-8 backdrop-blur-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/10 hover:border-slate-600/50">
      <div className="relative">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
          <div className="text-white">{icon}</div>
        </div>
        <h3 className="mb-4 text-xl font-bold text-white">{title}</h3>
        <p className="leading-relaxed text-slate-400">{description}</p>
      </div>
    </Card>
  </div>
);

export default FeatureCard;
