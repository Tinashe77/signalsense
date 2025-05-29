import { useState, useEffect } from 'react';
import ApiService from '../services/api';
import { useWebSocket } from './useWebSocket';

export const useSignalSenseData = () => {
  const [dashboardData, setDashboardData] = useState({
    totalListeners: 0,
    totalViewers: 0,
    activeStations: 0,
    trendingPrograms: 0,
    loading: true,
    error: null
  });

  const [audienceHistory, setAudienceHistory] = useState([]);
  const [stationRankings, setStationRankings] = useState([]);
  const [topPrograms, setTopPrograms] = useState([]);
  
  const { liveData, isConnected } = useWebSocket();

  // Fetch initial dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await ApiService.getDashboardData();
        setDashboardData({
          ...response.data,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setDashboardData(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    fetchDashboardData();
  }, []);

  // Fetch audience history
  useEffect(() => {
    const fetchAudienceHistory = async () => {
      try {
        const response = await ApiService.getLiveAudienceData();
        setAudienceHistory(response.data);
      } catch (error) {
        console.error('Error fetching audience history:', error);
      }
    };

    fetchAudienceHistory();
    
    // Update every 30 seconds
    const interval = setInterval(fetchAudienceHistory, 30000);
    return () => clearInterval(interval);
  }, []);

  // Update data with live WebSocket updates
  useEffect(() => {
    if (liveData && Object.keys(liveData).length > 0) {
      // Update audience history with live data
      setAudienceHistory(prev => {
        const newHistory = [...prev];
        Object.keys(liveData).forEach(stationId => {
          if (stationId !== 'stationStatus') {
            const stationData = liveData[stationId];
            newHistory.push({
              timestamp: new Date(),
              stationId,
              audience: stationData.audience,
              type: stationData.type
            });
          }
        });
        return newHistory.slice(-50); // Keep last 50 data points
      });

      // Update total metrics
      setDashboardData(prev => ({
        ...prev,
        totalListeners: Object.values(liveData)
          .filter(data => data.type === 'radio')
          .reduce((sum, data) => sum + (data.audience || 0), 0),
        totalViewers: Object.values(liveData)
          .filter(data => data.type === 'tv')
          .reduce((sum, data) => sum + (data.audience || 0), 0)
      }));
    }
  }, [liveData]);

  return {
    dashboardData,
    audienceHistory,
    stationRankings,
    topPrograms,
    isConnected,
    liveData
  };
};