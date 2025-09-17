// API service for communicating with the backend
const API_BASE_URL = 'http://localhost:3002';

export interface LogEntry {
  id: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  logText: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // GET /logs - Fetch all logs
  async getLogs(): Promise<ApiResponse<LogEntry[]>> {
    return this.request<LogEntry[]>('/logs');
  }

  // POST /logs - Create a new log
  async createLog(owner: string, logText: string): Promise<ApiResponse<LogEntry>> {
    return this.request<LogEntry>('/logs', {
      method: 'POST',
      body: JSON.stringify({ owner, logText }),
    });
  }

  // PUT /logs/:id - Update a log
  async updateLog(id: string, owner: string, logText: string): Promise<ApiResponse<LogEntry>> {
    return this.request<LogEntry>(`/logs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ owner, logText }),
    });
  }

  // DELETE /logs/:id - Delete a log
  async deleteLog(id: string): Promise<ApiResponse<LogEntry>> {
    return this.request<LogEntry>(`/logs/${id}`, {
      method: 'DELETE',
    });
  }

  // GET /health - Health check
  async healthCheck(): Promise<ApiResponse<{ message: string; timestamp: string }>> {
    return this.request<{ message: string; timestamp: string }>('/health');
  }
}

export const apiService = new ApiService();
