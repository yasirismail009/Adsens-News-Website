export interface Scholarship {
  id: string;
  title: string;
  description: string;
  financial_benefits: string;
  deadline: string;
  degree_level: string;
  host_country: string;
  number_of_scholarships: number;
  source_website: string;
  website_url: string;
  updated_at: string;
  eligibility: string[];
  required_documents: string[];
  application_process: string[];
  additional_info?: {
    [key: string]: string | number | boolean;
  };
  tags?: string[];
  contact_info?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

export interface ScholarshipListResponse {
  scholarships: Scholarship[];
  total: number;
  page: number;
  pageSize: number;
} 