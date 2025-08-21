import { useState, useEffect } from 'react';
import { 
  profileAPI, 
  projectsAPI, 
  skillsAPI, 
  testimonialsAPI, 
  servicesAPI,
  contactAPI 
} from '../services/api';

// Custom hook for profile data
export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await profileAPI.getProfile();
        setProfile(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error, refetch: () => fetchProfile() };
};

// Custom hook for projects data
export const useProjects = (filters = {}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsAPI.getProjects(filters);
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [JSON.stringify(filters)]);

  return { projects, loading, error, refetch: () => fetchProjects() };
};

// Custom hook for featured projects
export const useFeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsAPI.getFeaturedProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching featured projects:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return { projects, loading, error, refetch: () => fetchFeaturedProjects() };
};

// Custom hook for skills data
export const useSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const data = await skillsAPI.getSkills();
        setSkills(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching skills:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return { 
    skills, 
    skillsByCategory, 
    loading, 
    error, 
    refetch: () => fetchSkills() 
  };
};

// Custom hook for testimonials data
export const useTestimonials = (filters = {}) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const data = await testimonialsAPI.getTestimonials(filters);
        setTestimonials(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [JSON.stringify(filters)]);

  return { testimonials, loading, error, refetch: () => fetchTestimonials() };
};

// Custom hook for featured testimonials
export const useFeaturedTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedTestimonials = async () => {
      try {
        setLoading(true);
        const data = await testimonialsAPI.getFeaturedTestimonials();
        setTestimonials(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching featured testimonials:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTestimonials();
  }, []);

  return { testimonials, loading, error, refetch: () => fetchFeaturedTestimonials() };
};

// Custom hook for services data
export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await servicesAPI.getServices();
        setServices(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error, refetch: () => fetchServices() };
};

// Custom hook for contact form
export const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendMessage = async (messageData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      await contactAPI.sendMessage(messageData);
      setSuccess(true);
      
      // Reset success after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
      
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error, success };
};

// Generic loading component helper
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
  </div>
);

// Generic error component helper
export const ErrorMessage = ({ error, onRetry }) => (
  <div className="text-center p-8">
    <p className="text-red-600 dark:text-red-400 mb-4">
      Erreur : {error}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
      >
        Réessayer
      </button>
    )}
  </div>
);