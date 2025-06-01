export interface Scholarship {
  id: string;
  title: string;
  description: string;
  financial_benefits: string;
  deadline: string;
  eligibility: string[];
  website_url: string;
  source_website: string;
  host_country: string;
  degree_level: string;
  number_of_scholarships: string;
  results_date: string;
  benefits: Record<string, any>;
  duration: Record<string, any>;
  study_programs: string[];
  required_documents: string[];
  application_process: string[];
  additional_info: Record<string, any>;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ScholarshipListResponse {
  scholarships: Scholarship[];
  total: number;
  page: number;
  pageSize: number;
} 