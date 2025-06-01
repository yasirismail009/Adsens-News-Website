import { Scholarship } from '../types/scholarship';

export const mockScholarships: Scholarship[] = [
  {
    id: '1',
    title: 'Global Excellence Scholarship',
    description: 'The Global Excellence Scholarship is awarded to outstanding international students who have demonstrated exceptional academic achievement and leadership potential. This scholarship covers full tuition and provides a generous stipend for living expenses.',
    financial_benefits: 'Full Tuition + $15,000 Stipend',
    deadline: 'December 15, 2024',
    eligibility: [
      'International students from any country',
      'Minimum GPA of 3.8 or equivalent',
      'Demonstrated leadership experience',
      'English proficiency (TOEFL 100+ or IELTS 7.5+)'
    ],
    website_url: 'https://example.com/global-excellence-scholarship',
    source_website: 'International University Foundation',
    host_country: 'USA',
    degree_level: 'Undergraduate',
    number_of_scholarships: '5',
    results_date: 'January 15, 2025',
    benefits: {
      'tuition': 'Full tuition coverage',
      'stipend': '$15,000 per year',
      'health_insurance': 'Comprehensive health insurance'
    },
    duration: {
      'years': '4',
      'renewable': true
    },
    study_programs: ['All undergraduate programs'],
    required_documents: [
      'Academic transcripts',
      'Two letters of recommendation',
      'Personal statement (1000 words)',
      'Resume/CV',
      'Proof of English proficiency'
    ],
    application_process: [
      'Submit online application',
      'Upload required documents',
      'Interview (if shortlisted)',
      'Final decision'
    ],
    additional_info: {
      'contact_email': 'scholarships@iuf.edu',
      'application_fee': 'None'
    },
    created_at: '2024-01-15T12:00:00Z',
    updated_at: '2024-02-01T12:00:00Z',
    is_active: true
  },
  {
    id: '2',
    title: 'Future Leaders Undergraduate Scholarship',
    description: 'The Future Leaders Scholarship identifies and supports the next generation of changemakers. This merit-based scholarship is awarded to undergraduate students who have shown exceptional promise and commitment to making a positive impact in their communities.',
    financial_benefits: '$10,000 per year (renewable)',
    deadline: 'March 31, 2024',
    eligibility: [
      'High school seniors or current undergraduate students',
      'Minimum GPA of 3.5',
      'US citizen or permanent resident',
      'Demonstrated community involvement'
    ],
    website_url: 'https://example.com/future-leaders-scholarship',
    source_website: 'National Education Trust',
    host_country: 'USA',
    degree_level: 'Undergraduate',
    number_of_scholarships: '10',
    results_date: 'April 30, 2024',
    benefits: {
      'stipend': '$10,000 per year',
      'mentorship': 'Professional mentorship program',
      'networking': 'Access to leadership events'
    },
    duration: {
      'years': '4',
      'renewable': true
    },
    study_programs: ['All undergraduate programs'],
    required_documents: [
      'High school or college transcripts',
      'One letter of recommendation',
      'Essay on leadership vision (750 words)',
      'List of extracurricular activities'
    ],
    application_process: [
      'Complete online application',
      'Submit required documents',
      'Interview (if selected)',
      'Final selection'
    ],
    additional_info: {
      'contact_email': 'scholarships@net.org',
      'application_fee': '$25'
    },
    created_at: '2024-01-20T12:00:00Z',
    updated_at: '2024-01-25T12:00:00Z',
    is_active: true
  },
  {
    id: '3',
    title: 'STEM Innovators Graduate Fellowship',
    organization: 'Tech Forward Foundation',
    description: 'The STEM Innovators Fellowship supports graduate students pursuing advanced degrees in science, technology, engineering, and mathematics. The program aims to foster innovation and research excellence in STEM fields.',
    amount: '$25,000 per year + Research Funding',
    deadline: 'February 1, 2024',
    category: 'graduate',
    country: 'uk',
    eligibility: [
      'Admitted to or enrolled in a graduate program in STEM',
      'Excellent academic record',
      'Research proposal in STEM fields',
      'Available to UK and EU students'
    ],
    requirements: [
      'Graduate school admission letter or proof of enrollment',
      'Research proposal (2000 words)',
      'Academic CV',
      'Two academic references',
      'Statement of purpose'
    ],
    applicationUrl: 'https://example.com/stem-innovators-fellowship',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    createdAt: '2024-01-10T12:00:00Z',
    updatedAt: '2024-01-20T12:00:00Z'
  },
  {
    id: '4',
    title: 'Arts & Humanities Merit Scholarship',
    organization: 'Cultural Heritage Foundation',
    description: 'The Arts & Humanities Merit Scholarship celebrates and supports students pursuing degrees in arts, humanities, and social sciences. Recipients demonstrate academic excellence and creative potential in their chosen fields.',
    amount: '$7,500 per year',
    deadline: 'April 15, 2024',
    category: 'merit-based',
    country: 'canada',
    eligibility: [
      'Undergraduate or graduate students in arts, humanities, or social sciences',
      'Minimum GPA of 3.6',
      'Canadian citizen or permanent resident',
      'Full-time enrollment'
    ],
    requirements: [
      'Academic transcripts',
      'Creative portfolio or writing sample',
      'Essay on career goals (500 words)',
      'One letter of recommendation'
    ],
    applicationUrl: 'https://example.com/arts-humanities-scholarship',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    createdAt: '2024-01-22T12:00:00Z',
    updatedAt: '2024-01-30T12:00:00Z'
  },
  {
    id: '5',
    title: 'First Generation College Student Scholarship',
    organization: 'Educational Opportunity Fund',
    description: 'This scholarship supports first-generation college students who are the first in their families to attend college. The program provides financial assistance and mentorship to help students navigate higher education successfully.',
    amount: '$5,000 per year (renewable)',
    deadline: 'May 1, 2024',
    category: 'need-based',
    country: 'usa',
    eligibility: [
      'First-generation college student',
      'Demonstrated financial need',
      'Minimum GPA of 3.0',
      'US citizen or eligible non-citizen'
    ],
    requirements: [
      'FAFSA completion',
      'High school or college transcripts',
      'Personal statement about being a first-generation student',
      'One letter of recommendation'
    ],
    applicationUrl: 'https://example.com/first-gen-scholarship',
    imageUrl: 'https://images.unsplash.com/photo-1620662736427-72a18197d2f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    createdAt: '2024-01-05T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z'
  },
  {
    id: '6',
    title: 'Global Health Research Fellowship',
    organization: 'International Health Initiative',
    description: 'The Global Health Research Fellowship supports graduate students and early career professionals dedicated to improving health outcomes worldwide. Fellows conduct research in public health, medicine, or related fields with a focus on global health challenges.',
    amount: '$30,000 + Research Grant',
    deadline: 'January 31, 2024',
    category: 'graduate',
    country: 'australia',
    eligibility: [
      'Graduate students or early career professionals in health-related fields',
      'Research focus on global health',
      'Strong academic background',
      'Commitment to international development'
    ],
    requirements: [
      'Research proposal (3000 words)',
      'Academic CV',
      'Two academic references',
      'Personal statement',
      'Budget proposal for research grant'
    ],
    applicationUrl: 'https://example.com/global-health-fellowship',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    createdAt: '2024-01-03T12:00:00Z',
    updatedAt: '2024-01-10T12:00:00Z'
  },
  {
    id: '7',
    title: 'Engineering Excellence Scholarship',
    organization: 'Future Engineers Foundation',
    description: 'The Engineering Excellence Scholarship recognizes outstanding students pursuing degrees in various engineering disciplines. Recipients demonstrate academic achievement, technical aptitude, and potential to make significant contributions to the field of engineering.',
    amount: '$12,500 per year',
    deadline: 'March 15, 2024',
    category: 'undergraduate',
    country: 'germany',
    eligibility: [
      'Undergraduate students majoring in engineering',
      'Minimum GPA of 3.7 or equivalent',
      'Demonstrated interest in engineering through projects or activities',
      'EU citizens or international students with German residence permit'
    ],
    requirements: [
      'Academic transcripts',
      'Engineering project portfolio',
      'Essay on engineering interests (600 words)',
      'Two letters of recommendation'
    ],
    applicationUrl: 'https://example.com/engineering-excellence-scholarship',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89f12e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    createdAt: '2024-01-17T12:00:00Z',
    updatedAt: '2024-01-25T12:00:00Z'
  },
  {
    id: '8',
    title: 'Women in Technology Scholarship',
    organization: 'Digital Futures Initiative',
    description: 'The Women in Technology Scholarship aims to increase gender diversity in tech fields by supporting women pursuing degrees in computer science, information technology, and related disciplines. The program includes mentorship and internship opportunities.',
    amount: '$15,000 per year',
    deadline: 'April 30, 2024',
    category: 'merit-based',
    country: 'uk',
    eligibility: [
      'Female students pursuing undergraduate or graduate degrees in technology-related fields',
      'Minimum GPA of 3.4 or equivalent',
      'Demonstrated passion for technology',
      'UK resident or eligible to study in the UK'
    ],
    requirements: [
      'Academic transcripts',
      'Personal statement',
      'Resume/CV highlighting technical skills or projects',
      'One letter of recommendation'
    ],
    applicationUrl: 'https://example.com/women-in-tech-scholarship',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    createdAt: '2024-01-08T12:00:00Z',
    updatedAt: '2024-01-16T12:00:00Z'
  }
]; 