export interface PolicyViolation {
  id: string;
  type: 'policy' | 'restriction' | 'regulatory';
  category: PolicyCategory;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  url?: string;
  detectedAt: Date;
  status: 'active' | 'resolved' | 'reviewing';
  content?: string;
  lineNumbers?: number[];
  screenshotUrl?: string;
  reviewStatus?: 'not_requested' | 'pending' | 'approved' | 'rejected';
  reviewHistory?: Array<{
    status: 'pending' | 'approved' | 'rejected';
    date: Date;
    adminNote?: string;
  }>;
  adServingStatus?: 'disabled' | 'restricted' | 'at_risk' | 'limited' | 'confirmed_click' | 'normal';
}

export interface PolicyCategory {
  id: string;
  name: string;
  description: string;
  type: 'policy' | 'restriction' | 'regulatory';
  examples: string[];
  keywords: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface ContentFilter {
  id: string;
  name: string;
  description: string;
  patterns: RegExp[];
  replacement?: string;
  action: 'block' | 'replace' | 'flag' | 'warn';
  categories: string[];
}

export interface PolicyEnforcement {
  id: string;
  type: 'ad_serving_disabled' | 'restricted_ad_serving' | 'warning';
  reason: string;
  affectedUrls: string[];
  issuedAt: Date;
  expiresAt?: Date;
  status: 'active' | 'resolved' | 'appealed';
}

export interface PolicyReport {
  id: string;
  reporterEmail: string;
  reporterName?: string;
  violationType: string;
  description: string;
  url: string;
  evidence?: string;
  reportedAt: Date;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  adminNotes?: string;
}

export interface PolicyComplianceStatus {
  overallStatus: 'compliant' | 'warning' | 'violation' | 'restricted';
  activeViolations: PolicyViolation[];
  activeRestrictions: PolicyViolation[];
  lastChecked: Date;
  complianceScore: number; // 0-100
  recommendations: string[];
  adServingStatus: 'disabled' | 'restricted' | 'at_risk' | 'limited' | 'confirmed_click' | 'normal';
}

export interface PublisherRestriction {
  id: string;
  category: string;
  description: string;
  advertiserImpact: 'none' | 'limited' | 'significant' | 'complete';
  googleAdsBlocked: boolean;
  otherSourcesAllowed: boolean;
  examples: string[];
}

export interface PolicySettings {
  autoModeration: boolean;
  contentFiltering: boolean;
  userReporting: boolean;
  emailNotifications: boolean;
  complianceThreshold: number;
  restrictedCategories: string[];
  blockedKeywords: string[];
  allowedDomains: string[];
  moderationQueue: boolean;
}

export interface ContentModerationResult {
  isCompliant: boolean;
  violations: PolicyViolation[];
  warnings: string[];
  suggestions: string[];
  complianceScore: number;
  flaggedContent: string[];
  safeContent: string[];
}

export interface PolicyCenterData {
  enforcements: PolicyEnforcement[];
  violations: PolicyViolation[];
  restrictions: PublisherRestriction[];
  reports: PolicyReport[];
  complianceStatus: PolicyComplianceStatus;
  settings: PolicySettings;
}

// Google Publisher Policy Categories
export const POLICY_CATEGORIES: PolicyCategory[] = [
  {
    id: 'illegal_content',
    name: 'Illegal Content',
    description: 'Content that violates laws or regulations',
    type: 'policy',
    examples: ['Copyright infringement', 'Defamation', 'Fraudulent schemes'],
    keywords: ['illegal', 'fraud', 'scam', 'copyright', 'defamation'],
    severity: 'critical'
  },
  {
    id: 'dangerous_content',
    name: 'Dangerous Content',
    description: 'Content that promotes harmful activities',
    type: 'policy',
    examples: ['Violence', 'Self-harm', 'Dangerous activities'],
    keywords: ['violence', 'harm', 'dangerous', 'weapon', 'bomb'],
    severity: 'critical'
  },
  {
    id: 'derogatory_content',
    name: 'Derogatory Content',
    description: 'Content that discriminates or promotes hate',
    type: 'policy',
    examples: ['Hate speech', 'Discrimination', 'Harassment'],
    keywords: ['hate', 'discrimination', 'harassment', 'racist', 'sexist'],
    severity: 'high'
  },
  {
    id: 'sexual_content',
    name: 'Sexual Content',
    description: 'Explicit or inappropriate sexual content',
    type: 'policy',
    examples: ['Pornography', 'Sexual exploitation', 'Adult content'],
    keywords: ['porn', 'sexual', 'adult', 'nude', 'explicit'],
    severity: 'high'
  },
  {
    id: 'shocking_content',
    name: 'Shocking Content',
    description: 'Graphic or disturbing content',
    type: 'policy',
    examples: ['Gore', 'Violence', 'Disturbing imagery'],
    keywords: ['gore', 'blood', 'violence', 'disturbing', 'graphic'],
    severity: 'medium'
  }
];

// Google Publisher Restrictions Categories
export const RESTRICTION_CATEGORIES: PolicyCategory[] = [
  {
    id: 'tobacco',
    name: 'Tobacco',
    description: 'Content promoting tobacco products',
    type: 'restriction',
    examples: ['Cigarettes', 'Cigars', 'E-cigarettes', 'Tobacco pipes'],
    keywords: ['cigarette', 'cigar', 'tobacco', 'vape', 'e-cigarette'],
    severity: 'medium'
  },
  {
    id: 'recreational_drugs',
    name: 'Recreational Drugs',
    description: 'Content promoting recreational drug use',
    type: 'restriction',
    examples: ['Marijuana', 'Cocaine', 'Heroin', 'Drug paraphernalia'],
    keywords: ['marijuana', 'cocaine', 'heroin', 'drug', 'weed'],
    severity: 'high'
  },
  {
    id: 'alcohol',
    name: 'Alcohol Sale or Misuse',
    description: 'Content promoting alcohol sales or misuse',
    type: 'restriction',
    examples: ['Online alcohol sales', 'Binge drinking', 'Alcohol promotion'],
    keywords: ['alcohol', 'beer', 'wine', 'liquor', 'drunk'],
    severity: 'medium'
  },
  {
    id: 'gambling',
    name: 'Online Gambling',
    description: 'Content promoting online gambling',
    type: 'restriction',
    examples: ['Online casinos', 'Sports betting', 'Lottery tickets'],
    keywords: ['casino', 'gambling', 'betting', 'lottery', 'poker'],
    severity: 'medium'
  },
  {
    id: 'prescription_drugs',
    name: 'Prescription Drugs',
    description: 'Content promoting prescription drug sales',
    type: 'restriction',
    examples: ['Online pharmacies', 'Prescription drug sales'],
    keywords: ['prescription', 'pharmacy', 'medication', 'drug'],
    severity: 'high'
  },
  {
    id: 'unapproved_pharmaceuticals',
    name: 'Unapproved Pharmaceuticals',
    description: 'Content promoting unapproved drugs or supplements',
    type: 'restriction',
    examples: ['Unapproved supplements', 'Dangerous pharmaceuticals'],
    keywords: ['supplement', 'pharmaceutical', 'unapproved', 'dangerous'],
    severity: 'high'
  }
];

// Regulatory Issue Categories
export const REGULATORY_CATEGORIES: PolicyCategory[] = [
  {
    id: 'cmp_missing',
    name: 'Consent Management Platform (CMP) Missing',
    description: 'No certified CMP detected for users in EEA, UK, or Switzerland.',
    type: 'regulatory',
    examples: ['No consent banner for EU users', 'No TCF string present'],
    keywords: ['cmp', 'consent', 'gdpr', 'tcf', 'cookie banner'],
    severity: 'high',
  },
  {
    id: 'gdpr_noncompliance',
    name: 'GDPR Non-Compliance',
    description: 'Site does not comply with GDPR requirements for data collection and user rights.',
    type: 'regulatory',
    examples: ['No privacy policy', 'No data access request option'],
    keywords: ['gdpr', 'data protection', 'privacy', 'eu'],
    severity: 'high',
  },
  {
    id: 'ccpa_noncompliance',
    name: 'CCPA Non-Compliance',
    description: 'Site does not comply with CCPA requirements for California users.',
    type: 'regulatory',
    examples: ['No opt-out for California users', 'No "Do Not Sell My Info" link'],
    keywords: ['ccpa', 'california', 'privacy', 'do not sell'],
    severity: 'medium',
  },
];

export interface PolicyViolationResponse {
  success: boolean;
  violation?: PolicyViolation;
  error?: string;
  suggestions?: string[];
}

export interface ContentModerationRequest {
  content: string;
  url?: string;
  contentType: 'article' | 'comment' | 'user_generated' | 'ad';
  userId?: string;
  context?: Record<string, string | number | boolean>;
}

export interface PolicyViolationReport {
  violationId: string;
  reporterId: string;
  reason: string;
  evidence?: string;
  timestamp: Date;
} 