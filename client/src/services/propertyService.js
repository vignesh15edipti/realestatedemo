import api from './api';

const propertyService = {
  getProperties: async (params = {}) => {
    const response = await api.get('/properties', { params });
    return response.data;
  },

  getPropertyBySlug: async (slug) => {
    const response = await api.get(`/properties/${slug}`);
    return response.data;
  },

  createProperty: async (formData) => {
    const response = await api.post('/properties', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateProperty: async (id, formData) => {
    const response = await api.put(`/properties/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteProperty: async (id) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  },

  toggleFeatured: async (id) => {
    const response = await api.patch(`/properties/${id}/featured`);
    return response.data;
  },
};

export default propertyService;
