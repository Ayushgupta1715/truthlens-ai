const API_BASE = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('truthlens_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export const api = {
  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to login');
    }
    return res.json();
  },

  async register(name, email, password, role = 'user') {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to register');
    }
    return res.json();
  },

  async getProfile() {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Failed to fetch user profile');
    return res.json();
  },

  // Detection Modules
  async detectNews(headline, article_text) {
    const res = await fetch(`${API_BASE}/detect/news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ headline, article_text })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'News detection failed');
    }
    return res.json();
  },

  async detectImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/detect/image`, {
      method: 'POST',
      headers: { ...getAuthHeader() },
      body: formData
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Image detection failed');
    }
    return res.json();
  },

  async detectVideo(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/detect/video`, {
      method: 'POST',
      headers: { ...getAuthHeader() },
      body: formData
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Video detection failed');
    }
    return res.json();
  },

  async verifyClaim(claim) {
    const res = await fetch(`${API_BASE}/verify/claim`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ claim })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Claim verification failed');
    }
    return res.json();
  },

  // Dashboard & History
  async getDashboardStats() {
    const res = await fetch(`${API_BASE}/dashboard/stats`, {
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Failed to fetch dashboard statistics');
    return res.json();
  },

  async getScans(contentType = '', search = '') {
    const params = new URLSearchParams();
    if (contentType) params.append('content_type', contentType);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE}/scans?${params.toString()}`, {
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Failed to fetch scans');
    return res.json();
  },

  async getScan(scanId) {
    const res = await fetch(`${API_BASE}/scans/${scanId}`, {
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Failed to fetch scan detail');
    return res.json();
  },

  async deleteScan(scanId) {
    const res = await fetch(`${API_BASE}/scans/${scanId}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Failed to delete scan');
    return true;
  },

  // Reports
  getReportUrl(scanId) {
    return `${API_BASE}/reports/${scanId}`;
  },

  // AI Chatbot
  async sendChatMessage(message, history = []) {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ message, history })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Chatbot service error');
    }
    return res.json();
  },

  // Admin
  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('Failed to fetch admin stats');
    return res.json();
  }
};
