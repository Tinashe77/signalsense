import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add request interceptor for auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication
  async login(email, password) {
    const response = await this.api.post('/auth/login', { email, password });
    return response.data;
  }

  async register(userData) {
    const response = await this.api.post('/auth/register', userData);
    return response.data;
  }

  async getCurrentUser() {
    const response = await this.api.get('/auth/me');
    return response.data;
  }

  // Dashboard data
  async getDashboardData() {
    const response = await this.api.get('/analytics/dashboard');
    return response.data;
  }

  async getLiveAudienceData() {
    const response = await this.api.get('/audience/live');
    return response.data;
  }

  // Stations
  async getStations() {
    const response = await this.api.get('/stations');
    return response.data;
  }

  async createStation(stationData) {
    const response = await this.api.post('/stations', stationData);
    return response.data;
  }

  async updateStation(id, stationData) {
    const response = await this.api.put(`/stations/${id}`, stationData);
    return response.data;
  }

  async deleteStation(id) {
    const response = await this.api.delete(`/stations/${id}`);
    return response.data;
  }

  // Programs
  async getPrograms(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await this.api.get(`/programs?${params}`);
    return response.data;
  }

  async createProgram(programData) {
    const response = await this.api.post('/programs', programData);
    return response.data;
  }

  async updateProgram(id, programData) {
    const response = await this.api.put(`/programs/${id}`, programData);
    return response.data;
  }

  async deleteProgram(id) {
    const response = await this.api.delete(`/programs/${id}`);
    return response.data;
  }

  // Audience data
  async getAudienceData(stationId, timeRange = '24h') {
    const response = await this.api.get(`/audience/${stationId}?range=${timeRange}`);
    return response.data;
  }

  async getAudienceAnalytics(filters) {
    const response = await this.api.post('/audience/analytics', filters);
    return response.data;
  }

  // AI predictions
  async getAudiencePredictions(stationId) {
    const response = await this.api.get(`/ai/predictions/${stationId}`);
    return response.data;
  }

  async analyzeAudienceSignals(signalData) {
    const response = await this.api.post('/ai/analyze', signalData);
    return response.data;
  }

  // Social media data
  async getSocialSignals(stationId, timeRange = '1h') {
    const response = await this.api.get(`/social/signals/${stationId}?range=${timeRange}`);
    return response.data;
  }

  // Reports
  async generateReport(reportConfig) {
    const response = await this.api.post('/analytics/reports', reportConfig);
    return response.data;
  }

  async exportData(exportConfig) {
    const response = await this.api.post('/analytics/export', exportConfig, {
      responseType: 'blob'
    });
    return response.data;
  }

  // Health check
  async healthCheck() {
    const response = await this.api.get('/health');
    return response.data;
  }
}

export default new ApiService();