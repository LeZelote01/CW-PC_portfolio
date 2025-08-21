import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE_URL = `${BACKEND_URL}/api`;

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle common error cases
    if (error.response?.status === 404) {
      console.warn('Resource not found');
    } else if (error.response?.status >= 500) {
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

// Profile API
export const profileAPI = {
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
  
  updateProfile: async (profileData) => {
    const response = await api.put('/profile', profileData);
    return response.data;
  },
};

// Projects API
export const projectsAPI = {
  getProjects: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.featured !== undefined) params.append('featured', filters.featured);
    
    const response = await api.get(`/projects?${params.toString()}`);
    return response.data;
  },
  
  getFeaturedProjects: async () => {
    const response = await api.get('/projects/featured');
    return response.data;
  },
  
  getProject: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
  
  createProject: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },
  
  updateProject: async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },
  
  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};

// Skills API
export const skillsAPI = {
  getSkills: async () => {
    const response = await api.get('/skills');
    return response.data;
  },
  
  createSkill: async (skillData) => {
    const response = await api.post('/skills', skillData);
    return response.data;
  },
  
  updateSkill: async (id, skillData) => {
    const response = await api.put(`/skills/${id}`, skillData);
    return response.data;
  },
  
  deleteSkill: async (id) => {
    const response = await api.delete(`/skills/${id}`);
    return response.data;
  },
};

// Testimonials API
export const testimonialsAPI = {
  getTestimonials: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.featured !== undefined) params.append('featured', filters.featured);
    
    const response = await api.get(`/testimonials?${params.toString()}`);
    return response.data;
  },
  
  getFeaturedTestimonials: async () => {
    const response = await api.get('/testimonials/featured');
    return response.data;
  },
  
  createTestimonial: async (testimonialData) => {
    const response = await api.post('/testimonials', testimonialData);
    return response.data;
  },
  
  updateTestimonial: async (id, testimonialData) => {
    const response = await api.put(`/testimonials/${id}`, testimonialData);
    return response.data;
  },
  
  deleteTestimonial: async (id) => {
    const response = await api.delete(`/testimonials/${id}`);
    return response.data;
  },
};

// Services API
export const servicesAPI = {
  getServices: async () => {
    const response = await api.get('/services');
    return response.data;
  },
  
  createService: async (serviceData) => {
    const response = await api.post('/services', serviceData);
    return response.data;
  },
  
  updateService: async (id, serviceData) => {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  },
  
  deleteService: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },
};

// Contact/Messages API
export const contactAPI = {
  sendMessage: async (messageData) => {
    const response = await api.post('/contact', messageData);
    return response.data;
  },
  
  getMessages: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    
    const response = await api.get(`/messages?${params.toString()}`);
    return response.data;
  },
  
  updateMessageStatus: async (id, status) => {
    const response = await api.put(`/messages/${id}/status`, { status });
    return response.data;
  },
  
  deleteMessage: async (id) => {
    const response = await api.delete(`/messages/${id}`);
    return response.data;
  },
};

// Health check
export const healthAPI = {
  checkHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;