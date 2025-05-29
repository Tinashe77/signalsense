import { useState, useEffect } from 'react';
import { 
  Radio,
  Tv,
  BarChart3,
  Users,
  TrendingUp,
  Search,
  Play,
  Pause,
  ArrowUp,
  ArrowDown,
  Globe,
  Volume2
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useTheme } from '../contexts/ThemeContext';
import { useSignalSenseData } from '../hooks/useSignalSenseData';
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function Dashboard() {
  const { colors } = useTheme();
  const { 
    dashboardData, 
    audienceHistory, 
    stationRankings, 
    topPrograms,
    isConnected,
    liveData 
  } = useSignalSenseData();

  const [isLive, setIsLive] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num?.toString() || '0';
  };

  const processAudienceHistory = () => {
    const processed = {};
    
    audienceHistory.forEach(entry => {
      const timeKey = new Date(entry.timestamp).toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
      
      if (!processed[timeKey]) {
        processed[timeKey] = { time: timeKey, radio: 0, tv: 0 };
      }
      
      if (entry.type === 'radio') {
        processed[timeKey].radio += entry.audience;
      } else {
        processed[timeKey].tv += entry.audience;
      }
    });
    
    return Object.values(processed).slice(-10);
  };

  if (dashboardData.loading) {
    return <Loading />;
  }

  if (dashboardData.error) {
    return <Error message={dashboardData.error} />;
  }

  const chartData = processAudienceHistory();

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                style={{ backgroundColor: colors.primary }}
              >
                <Radio className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SignalSense</h1>
                <p className="text-sm text-gray-500">AI-Powered Audience Measurement for Zimbabwe</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected && isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm font-medium text-gray-700">
                {isConnected && isLive ? 'LIVE' : 'DISCONNECTED'}
              </span>
              <button 
                onClick={() => setIsLive(!isLive)}
                className="ml-2 p-1 rounded-lg hover:bg-gray-100"
              >
                {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search stations..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={<Volume2 className="h-6 w-6" />}
          title="Radio Listeners"
          value={formatNumber(dashboardData.totalListeners)}
          change="+8.3%"
          positive={true}
          color={colors.secondary}
        />
        
        <MetricCard
          icon={<Tv className="h-6 w-6" />}
          title="TV Viewers"
          value={formatNumber(dashboardData.totalViewers)}
          change="+12.1%"
          positive={true}
          color={colors.accent}
        />
        
        <MetricCard
          icon={<Globe className="h-6 w-6" />}
          title="Active Stations"
          value={dashboardData.activeStations}
          change="All monitored"
          positive={true}
          color={colors.primary}
        />
        
        <MetricCard
          icon={<TrendingUp className="h-6 w-6" />}
          title="Trending Programs"
          value={dashboardData.trendingPrograms}
          change="High engagement"
          positive={true}
          color={colors.warning}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Audience Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Live Audience Tracking</h3>
              <p className="text-sm text-gray-500">Real-time radio and TV audience measurements</p>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="px-3 py-1 text-xs font-medium rounded-lg text-white" 
                style={{ backgroundColor: colors.primary }}
              >
                Live
              </button>
            </div>
          </div>
          <div className="h-80">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRadio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={colors.secondary} stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorTV" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.accent} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={colors.accent} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="radio" 
                    stroke={colors.secondary} 
                    strokeWidth={3}
                    fill="url(#colorRadio)" 
                    name="Radio Listeners"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="tv" 
                    stroke={colors.accent} 
                    strokeWidth={3}
                    fill="url(#colorTV)" 
                    name="TV Viewers"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p>Loading real-time data...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
              <p className="text-sm text-gray-500">Real-time analysis</p>
            </div>
          </div>
          
          <div 
            className="rounded-2xl p-6 text-white relative overflow-hidden mb-6"
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
            }}
          >
            <div className="relative z-10">
              <h4 className="text-lg font-semibold mb-2">Peak Hour Detected</h4>
              <p className="text-sm text-white/80 mb-4">
                Morning radio shows experiencing 23% higher engagement than usual
              </p>
              <div className="text-xs text-white/70">
                AI Confidence: 87%
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10"></div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Top Station</span>
                <span className="text-sm" style={{ color: colors.primary }}>ZBC Radio</span>
              </div>
              <div className="text-sm text-gray-600">67K listeners (+12%)</div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Trending</span>
                <span className="text-sm" style={{ color: colors.accent }}>Morning News</span>
              </div>
              <div className="text-sm text-gray-600">High social engagement</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// MetricCard Component
const MetricCard = ({ icon, title, value, change, positive, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
    <div className="flex items-center justify-between mb-4">
      <div 
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{title}</div>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center text-sm">
        {positive ? (
          <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
        )}
        <span className="text-gray-600">{change}</span>
      </div>
      <div 
        className="px-2 py-1 rounded-full text-xs font-medium text-white"
        style={{ backgroundColor: color }}
      >
        Live
      </div>
    </div>
  </div>
);