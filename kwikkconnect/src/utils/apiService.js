const API_BASE_URL = 'http://localhost:4000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Expert management
  async registerExpert(email, name) {
    return this.request('/register-expert', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    });
  }

  async getExperts() {
    return this.request('/experts');
  }

  // Case management
  async createCase(caseData) {
    return this.request('/create-case', {
      method: 'POST',
      body: JSON.stringify(caseData),
    });
  }

  async getCases() {
    return this.request('/cases');
  }

  async getExpertCases(email) {
    return this.request(`/expert/${email}/cases`);
  }

  async updateCaseStatus(caseId, status) {
    return this.request(`/cases/${caseId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }
}

export default new ApiService(); 