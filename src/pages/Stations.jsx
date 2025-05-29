import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, MapPin, Radio as RadioIcon, Tv as TvIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ApiService from '../services/api';
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function Stations() {
  const { colors } = useTheme();
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getStations();
      setStations(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Station Management</h1>
            <p className="text-sm text-gray-500">Manage radio and TV stations in your monitoring network</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: colors.primary }}
          >
            <Plus className="h-4 w-4" />
            <span>Add Station</span>
          </button>
        </div>
      </div>

      {/* Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stations.map(station => (
          <StationCard key={station._id} station={station} colors={colors} />
        ))}
      </div>
    </div>
  );
}

const StationCard = ({ station, colors }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
    <div className="flex items-center justify-between mb-4">
      <div 
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
        style={{ backgroundColor: station.type === 'radio' ? colors.secondary : colors.accent }}
      >
        {station.type === 'radio' ? <RadioIcon className="h-6 w-6" /> : <TvIcon className="h-6 w-6" />}
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
          <Edit className="h-4 w-4" />
        </button>
        <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-50">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
    
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{station.name}</h3>
    <div className="flex items-center text-sm text-gray-500 mb-2">
      <MapPin className="h-4 w-4 mr-1" />
      <span>{station.location?.city}, {station.location?.region}</span>
    </div>
    
    <div className="flex items-center justify-between">
      <div className="text-sm">
        <span className="text-gray-600">
          {station.type === 'radio' ? station.frequency : `Ch ${station.channel}`}
        </span>
      </div>
      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
        station.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {station.isActive ? 'Active' : 'Inactive'}
      </div>
    </div>
  </div>
);