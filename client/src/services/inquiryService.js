import api from './api';

const inquiryService = {
  createInquiry: async (inquiryData) => {
    const response = await api.post('/inquiries', inquiryData);
    return response.data;
  },

  getInquiries: async () => {
    const response = await api.get('/inquiries');
    return response.data;
  },

  updateInquiryStatus: async (id, status) => {
    const response = await api.patch(`/inquiries/${id}`, { status });
    return response.data;
  },

  deleteInquiry: async (id) => {
    const response = await api.delete(`/inquiries/${id}`);
    return response.data;
  },
};

export default inquiryService;
