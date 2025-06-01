import axios from 'axios';
import { Scholarship } from '../types/scholarship';

const API_BASE_URL = 'http://localhost:8000/api'; // Update with your backend URL

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface ScholarshipFilters {
  search?: string;
  source_website?: string;
  is_active?: boolean;
  ordering?: string;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const scholarshipService = {
  // Get all scholarships with optional filters
  getAllScholarships: async (filters: ScholarshipFilters = {}): Promise<ApiResponse<Scholarship[]>> => {
    try {
      const response = await axios.get<PaginatedResponse<Scholarship>>(`${API_BASE_URL}/scholarships/`, {
        params: filters
      });
      return {
        data: response.data.results,
        status: response.status,
        message: `Total scholarships: ${response.data.count}`
      };
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      throw error;
    }
  },

  // Get a single scholarship by ID
  getScholarshipById: async (id: string): Promise<ApiResponse<Scholarship>> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/scholarships/${id}/`);
      return {
        data: response.data,
        status: response.status
      };
    } catch (error) {
      console.error('Error fetching scholarship:', error);
      throw error;
    }
  },

  // Search scholarships
  searchScholarships: async (query: string): Promise<ApiResponse<Scholarship[]>> => {
    try {
      const response = await axios.get<PaginatedResponse<Scholarship>>(`${API_BASE_URL}/scholarships/`, {
        params: { search: query }
      });
      return {
        data: response.data.results,
        status: response.status,
        message: `Found ${response.data.count} scholarships`
      };
    } catch (error) {
      console.error('Error searching scholarships:', error);
      throw error;
    }
  },

  // Get scholarships by country
  getScholarshipsByCountry: async (country: string): Promise<ApiResponse<Scholarship[]>> => {
    try {
      const response = await axios.get<PaginatedResponse<Scholarship>>(`${API_BASE_URL}/scholarships/by_country/`, {
        params: { country }
      });
      return {
        data: response.data.results,
        status: response.status,
        message: `Found ${response.data.count} scholarships in ${country}`
      };
    } catch (error) {
      console.error('Error fetching scholarships by country:', error);
      throw error;
    }
  },

  // Get scholarships by degree level
  getScholarshipsByDegree: async (degree: string): Promise<ApiResponse<Scholarship[]>> => {
    try {
      const response = await axios.get<PaginatedResponse<Scholarship>>(`${API_BASE_URL}/scholarships/by_degree/`, {
        params: { degree }
      });
      return {
        data: response.data.results,
        status: response.status,
        message: `Found ${response.data.count} ${degree} scholarships`
      };
    } catch (error) {
      console.error('Error fetching scholarships by degree:', error);
      throw error;
    }
  }
}; 