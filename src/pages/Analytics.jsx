import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Target,
  MapPin,
  Radio,
  Tv
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Area,
  AreaChart
} from 'recharts';

// SignalSense Colors
const colors = {
  primary: '#283eae',
  secondary: '#5371e9',
  accent: '#36c1ce',
  warning: '#f5a135',
  success: '#10b981',
  danger: '#ef4444'
};

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedStation, setSelectedStation] = useState('all');
  const [loading, setLoading] = useState(false);

  // Sample analytics data
  const audienceTrends = [
    { date: '2024-01-08', radio: 245000, tv: 87000, total: 332000 },
    { date: '2024-01-09', radio: 267000, tv: 92000, total: 359000 },
    { date: '2024-01-10', radio: 289000, tv: 89000, total: 378000 },
    { date: '2024-01-11', radio: 298000, tv: 95000, total: 393000 },
    { date: '2024-01-12', radio: 312000, tv: 98000, total: 410000 },
    { date: '2024-01-13', radio: 356000, tv: 102000, total: 458000 },
    { date: '2024-01-14', radio: 378000, tv: 108000, total: 486000 }
  ];

  const stationComparison = [
    { station: 'Radio Zimbabwe', audience: 85000, share: 22.5, growth: 15 },
    { station: 'Spot FM', audience: 67000, share: 17.7, growth: 8 },
    { station: 'ZiFM Stereo', audience: 45000, share: 11.9, growth: -3 },
    { station: 'Power FM', audience: 55000, share: 14.5, growth: 12 },
    { station: 'ZBC TV', audience: 108000, share: 28.6, growth: 18 }
  ];

  const demographicData = [
    { name: '18-24', value: 18, color: colors.accent },
    { name: '25-34', value: 32, color: colors.primary },
    { name: '35-44', value: 25, color: colors.secondary },
    { name: '45-54', value: 15, color: colors.warning },
    { name: '55+', value: 10, color: colors.danger }
  ];

  const geographicData = [
    { region: 'Harare', audience: 185000, percentage: 38.1 },
    { region: 'Bulawayo', audience: 98000, percentage: 20.2 },
    { region: 'Chitungwiza', audience: 67000, percentage: 13.8 },
    { region: 'Mutare', audience: 45000, percentage: 9.3 },
    { region: 'Gweru', audience: 34000, percentage: 7.0 },
    { region: 'Other', audience: 57000, percentage: 11.7 }
  ];

  const refreshData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Comprehensive audience insights and performance metrics</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <select 
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">All Stations</option>
              <option value="radio-zimbabwe">Radio Zimbabwe</option>
              <option value="spot-fm">Spot FM</option>
              <option value="zifm">ZiFM Stereo</option>
              <option value="power-fm">Power FM</option>
            </select>
            <button
              onClick={refreshData}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: colors.primary }}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={<Users className="h-6 w-6" />}
          title="Total Audience"
          value="486K"
          change="+18.2%"
          period="vs last week"
          color={colors.primary}
        />
        <MetricCard
          icon={<TrendingUp className="h-6 w-6" />}
          title="Growth Rate"
          value="12.5%"
          change="+2.1%"
          period="monthly average"
          color={colors.success}
        />
        <MetricCard
          icon={<Target className="h-6 w-6" />}
          title="Engagement"
          value="87.3%"
          change="+5.4%"
          period="audience retention"
          color={colors.accent}
        />
        <MetricCard
          icon={<Clock className="h-6 w-6" />}
          title="Peak Time"
          value="08:15"
          change="Morning Drive"
          period="highest audience"
          color={colors.warning}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audience Trends */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Audience Trends</h3>
              <p className="text-sm text-gray-500">Radio vs TV viewership over time</p>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={audienceTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value) => [value.toLocaleString(), '']}
                />
                <Bar dataKey="radio" fill={colors.secondary} name="Radio Listeners" />
                <Bar dataKey="tv" fill={colors.accent} name="TV Viewers" />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke={colors.primary} 
                  strokeWidth={3}
                  name="Total Audience"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demographics */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Age Demographics</h3>
              <p className="text-sm text-gray-500">Audience breakdown by age group</p>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {demographicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {demographicData.map((item, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-4 h-4 rounded-full mx-auto mb-1"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                <div className="text-xs text-gray-500">{item.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Station Comparison & Geographic Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Station Performance */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Station Performance</h3>
              <p className="text-sm text-gray-500">Audience share and growth comparison</p>
            </div>
          </div>
          <div className="space-y-4">
            {stationComparison.map((station, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: index < 2 ? colors.primary : colors.secondary }}
                  >
                    {station.station.includes('TV') ? <Tv className="h-5 w-5" /> : <Radio className="h-5 w-5" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{station.station}</h4>
                    <p className="text-sm text-gray-500">{station.audience.toLocaleString()} audience</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">{station.share}%</div>
                  <div className={`text-sm ${station.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {station.growth >= 0 ? '+' : ''}{station.growth}% growth
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Geographic Reach</h3>
              <p className="text-sm text-gray-500">Audience by region</p>
            </div>
          </div>
          <div className="space-y-3">
            {geographicData.map((region, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{region.region}</span>
                  </div>
                  <span className="text-gray-600">{region.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: colors.primary,
                      width: `${region.percentage}%`
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {region.audience.toLocaleString()} listeners
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const MetricCard = ({ icon, title, value, change, period, color }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <div className="flex items-center justify-between mb-4">
      <div 
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
    </div>
    <div className="space-y-1">
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-green-600">{change}</div>
        <div className="text-xs text-gray-400">{period}</div>
      </div>
    </div>
  </div>
);
