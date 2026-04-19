import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = {
  // Submit application
  submitApplication: async (data) => {
    const response = await axios.post(`${API_URL}/applications/submit`, data);
    return response.data;
  },
  
  // Upload file
  uploadFile: async (formData, type) => {
    const response = await axios.post(`${API_URL}/upload/${type}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  
  // Admin login
  adminLogin: async (email, password) => {
    const response = await axios.post(`${API_URL}/admin/login`, { email, password });
    return response.data;
  },
  
  // Get all applications (admin)
  getApplications: async (token, filters = {}) => {
    const response = await axios.get(`${API_URL}/admin/applications`, {
      headers: { Authorization: `Bearer ${token}` },
      params: filters
    });
    return response.data;
  },
  
  // Update application status
  updateStatus: async (token, id, status) => {
    const response = await axios.put(`${API_URL}/admin/applications/${id}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  // Update admin notes
  updateNotes: async (token, id, notes) => {
    const response = await axios.put(`${API_URL}/admin/applications/${id}/notes`, { notes }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  // Get dashboard stats
  getStats: async (token) => {
    const response = await axios.get(`${API_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  // Export applications
  exportApplications: async (token) => {
    const response = await axios.get(`${API_URL}/admin/export`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Get chart data for analytics dashboard
  getChartData: async (token) => {
    const response = await axios.get(`${API_URL}/admin/chart-data`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default api;
