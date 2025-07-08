import api from './api';

const causeService = {
  // GET /api/causes
  async getCauses(params = {}) {
    try {
      const response = await api.get('/causes', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching causes:', error);
      throw error;
    }
  },

  // GET /api/causes/:id
  async getCause(id) {
    try {
      const response = await api.get(`/causes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching cause ${id}:`, error);
      throw error;
    }
  },

  // GET /api/organizers/:orgId/causes
  async getOrganizerCampaigns(orgId) {
    try {
      // Assuming the backend has an endpoint like this
      const response = await api.get(`/organizers/${orgId}/causes`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching campaigns for organizer ${orgId}:`, error);
      throw error;
    }
  },

  // POST /api/causes
  async createCause(causeData) {
    try {
      // Assuming causeData is FormData if it includes a file
      const headers = causeData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
      const response = await api.post('/causes', causeData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating cause:', error);
      throw error;
    }
  },

  // PUT /api/causes/:id
  async updateCause(id, causeData) {
    try {
      const headers = causeData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
      const response = await api.put(`/causes/${id}`, causeData, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error updating cause ${id}:`, error);
      throw error;
    }
  },

  // DELETE /api/causes/:id
  async deleteCause(id) {
    try {
      const response = await api.delete(`/causes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting cause ${id}:`, error);
      throw error;
    }
  },
};

export const { getCauses } = causeService;
export default causeService;

