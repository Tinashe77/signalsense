import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Clock, 
  Calendar, 
  Users, 
  Radio as RadioIcon, 
  Tv as TvIcon,
  Plus,
  Edit,
  Trash2,
  Filter,
  Search,
  BarChart3,
  TrendingUp,
  Eye
} from 'lucide-react';

export default function Programs() {
  const [programs, setPrograms] = useState([
    {
      id: '1',
      name: 'Mangwanani (Good Morning Zimbabwe)',
      station: 'Radio Zimbabwe',
      frequency: '1287 AM / 97.4 FM',
      schedule: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        startTime: '06:00',
        endTime: '09:00'
      },
      host: 'John Mukamuri',
      category: 'News',
      isActive: true,
      currentAudience: 48700,
      avgAudience: 45000,
      rating: 8.7
    },
    {
      id: '2',
      name: 'The Ignition',
      station: 'Spot FM',
      frequency: '103.5 FM',
      schedule: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        startTime: '06:00',
        endTime: '10:00'
      },
      host: 'Chamvary & Sakhile',
      category: 'Entertainment',
      isActive: true,
      currentAudience: 34500,
      avgAudience: 32000,
      rating: 8.2
    },
    {
      id: '3',
      name: 'The Workzone',
      station: 'ZiFM Stereo',
      frequency: '106.4 FM',
      schedule: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        startTime: '10:00',
        endTime: '14:00'
      },
      host: 'Star Gee',
      category: 'Music',
      isActive: false,
      currentAudience: 0,
      avgAudience: 28000,
      rating: 7.8
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrograms = programs.filter(program => {
    const matchesCategory = selectedCategory === 'all' || program.category.toLowerCase() === selectedCategory;
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.host.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.station.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Program Management</h1>
            <p className="text-gray-600">Monitor and manage radio and TV programs</p>
          </div>
          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: colors.primary }}
          >
            <Plus className="h-4 w-4" />
            <span>Add Program</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">All Categories</option>
              <option value="news">News</option>
              <option value="music">Music</option>
              <option value="entertainment">Entertainment</option>
              <option value="sports">Sports</option>
              <option value="talk">Talk</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{filteredPrograms.length} programs</span>
            <span>•</span>
            <span>{filteredPrograms.filter(p => p.isActive).length} active</span>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  );
}

const ProgramCard = ({ program }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
          style={{ backgroundColor: program.isActive ? colors.primary : colors.danger }}
        >
          {program.station.includes('TV') ? <TvIcon className="h-6 w-6" /> : <RadioIcon className="h-6 w-6" />}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{program.name}</h3>
          <p className="text-sm text-gray-500">{program.station}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
          <Edit className="h-4 w-4" />
        </button>
        <button className={`p-2 rounded-lg ${program.isActive ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-50'}`}>
          {program.isActive ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>
    </div>

    <div className="space-y-3 mb-4">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Clock className="h-4 w-4" />
        <span>{program.schedule.startTime} - {program.schedule.endTime}</span>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Calendar className="h-4 w-4" />
        <span>Weekdays</span>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Users className="h-4 w-4" />
        <span>{program.host}</span>
      </div>
    </div>

    <div className="space-y-2 mb-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Current Audience</span>
        <span className="font-semibold text-gray-900">
          {program.isActive ? program.currentAudience.toLocaleString() : 'Off Air'}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Rating</span>
        <span className="text-yellow-600 font-semibold">{program.rating}★</span>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <div 
        className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
          program.isActive ? 'bg-green-500' : 'bg-gray-400'
        }`}
      >
        {program.isActive ? 'Live' : 'Off Air'}
      </div>
      <button 
        className="text-sm font-medium hover:underline"
        style={{ color: colors.primary }}
      >
        View Analytics
      </button>
    </div>
  </div>
);