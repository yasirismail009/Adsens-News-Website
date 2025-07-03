import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import policyService from '../services/policyService';
import CSVExportService from '../services/csvExportService';
import Image from 'next/image';
import {
  PolicyViolation,
  PolicyEnforcement,
  PolicyReport,
  PublisherRestriction,
  PolicyComplianceStatus
} from '../types/policy';

interface PolicyCenterProps {
  className?: string;
}

interface Filters {
  type: string;
  severity: string;
  status: string;
  dateRange: string;
}

type TabId = 'overview' | 'violations' | 'restrictions' | 'reports' | 'settings';

// Helper functions - moved outside component for accessibility
const getStatusColor = (status: string) => {
  switch (status) {
    case 'compliant': return 'text-green-600 bg-green-100';
    case 'warning': return 'text-yellow-600 bg-yellow-100';
    case 'violation': return 'text-red-600 bg-red-100';
    case 'restricted': return 'text-orange-600 bg-orange-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'text-red-600 bg-red-100';
    case 'high': return 'text-orange-600 bg-orange-100';
    case 'medium': return 'text-yellow-600 bg-yellow-100';
    case 'low': return 'text-blue-600 bg-blue-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'policy': return 'text-red-600 bg-red-100';
    case 'restriction': return 'text-orange-600 bg-orange-100';
    case 'regulatory': return 'text-blue-600 bg-blue-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const getAdServingStatusColor = (status: string) => {
  switch (status) {
    case 'disabled': return 'text-red-600 bg-red-100';
    case 'restricted': return 'text-orange-600 bg-orange-100';
    case 'at_risk': return 'text-yellow-600 bg-yellow-100';
    case 'limited': return 'text-blue-600 bg-blue-100';
    case 'confirmed_click': return 'text-purple-600 bg-purple-100';
    case 'normal': return 'text-green-600 bg-green-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const getAdServingStatusLabel = (status: string) => {
  switch (status) {
    case 'disabled': return 'Disabled Ad Serving';
    case 'restricted': return 'Restricted Ad Serving';
    case 'at_risk': return 'Ad Serving At Risk';
    case 'limited': return 'Limited Ad Serving';
    case 'confirmed_click': return 'Confirmed Click On';
    case 'normal': return 'Normal Ad Serving';
    default: return 'Unknown Status';
  }
};

const PolicyCenter: React.FC<PolicyCenterProps> = ({ className = '' }) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [policyData, setPolicyData] = useState<{
    enforcements: PolicyEnforcement[];
    violations: PolicyViolation[];
    restrictions: PublisherRestriction[];
    reports: PolicyReport[];
    complianceStatus: PolicyComplianceStatus;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    type: 'all',
    severity: 'all',
    status: 'all',
    dateRange: 'all'
  });

  useEffect(() => {
    loadPolicyData();
  }, []);

  const loadPolicyData = async () => {
    try {
      const data = policyService.getPolicyCenterData();
      setPolicyData(data);
    } catch (error) {
      console.error('Error loading policy data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredViolations = (violations: PolicyViolation[]) => {
    return violations.filter(violation => {
      if (filters.type !== 'all' && violation.type !== filters.type) return false;
      if (filters.severity !== 'all' && violation.severity !== filters.severity) return false;
      if (filters.status !== 'all' && violation.status !== filters.status) return false;
      return true;
    });
  };

  const handleExportViolations = () => {
    if (policyData) {
      const filteredViolations = getFilteredViolations(policyData.violations);
      const csvContent = CSVExportService.exportViolations(filteredViolations);
      CSVExportService.downloadCSV(csvContent, `policy-violations-${new Date().toISOString().split('T')[0]}.csv`);
    }
  };

  const handleExportReports = () => {
    if (policyData) {
      const csvContent = CSVExportService.exportReports(policyData.reports);
      CSVExportService.downloadCSV(csvContent, `policy-reports-${new Date().toISOString().split('T')[0]}.csv`);
    }
  };

  if (loading) {
    return (
      <div className={`${className} ${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg shadow-md`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (!policyData) {
    return (
      <div className={`${className} ${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg shadow-md`}>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Unable to load policy data. Please try again later.
        </p>
      </div>
    );
  }

  const { complianceStatus, violations, restrictions, reports } = policyData;

  return (
    <div className={`${className} ${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Policy Center
        </h2>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
          Monitor and manage Google Publisher Policies and Restrictions
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'overview', label: 'Overview', count: null },
            { id: 'violations', label: 'Violations', count: violations.filter(v => v.status === 'active').length },
            { id: 'restrictions', label: 'Restrictions', count: restrictions.length },
            { id: 'reports', label: 'Reports', count: reports.length },
            { id: 'settings', label: 'Settings', count: null }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? `${isDarkMode ? 'border-blue-500 text-blue-400' : 'border-blue-500 text-blue-600'}`
                  : `${isDarkMode ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-500 hover:text-gray-700'}`
              }`}
            >
              {tab.label}
              {tab.count !== null && tab.count > 0 && (
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  isDarkMode ? 'bg-red-600 text-white' : 'bg-red-100 text-red-800'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <OverviewTab 
            complianceStatus={complianceStatus} 
            restrictions={restrictions}
            isDarkMode={isDarkMode}
          />
        )}
        
        {activeTab === 'violations' && (
          <ViolationsTab 
            violations={violations} 
            isDarkMode={isDarkMode}
            onResolveViolation={loadPolicyData}
            filters={filters}
            onFilterChange={(key, value) => setFilters({ ...filters, [key]: value })}
            onExport={handleExportViolations}
          />
        )}
        
        {activeTab === 'restrictions' && (
          <RestrictionsTab 
            restrictions={restrictions} 
            isDarkMode={isDarkMode}
          />
        )}
        
        {activeTab === 'reports' && (
          <ReportsTab 
            reports={reports} 
            isDarkMode={isDarkMode}
            onExport={handleExportReports}
          />
        )}
        
        {activeTab === 'settings' && (
          <SettingsTab isDarkMode={isDarkMode} />
        )}
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab: React.FC<{
  complianceStatus: PolicyComplianceStatus;
  restrictions: PublisherRestriction[];
  isDarkMode: boolean;
}> = ({ complianceStatus, restrictions, isDarkMode }) => {
  const stats = policyService.getViolationStats();

  return (
    <div className="space-y-6">
      {/* Compliance Status */}
      <div className={`p-6 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Compliance Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getStatusColor(complianceStatus.overallStatus)} px-3 py-2 rounded-lg`}>
              {complianceStatus.overallStatus.toUpperCase()}
            </div>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Overall Status</p>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${complianceStatus.complianceScore >= 80 ? 'text-green-600' : complianceStatus.complianceScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
              {complianceStatus.complianceScore}%
            </div>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Compliance Score</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.active}
            </div>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Issues</p>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getAdServingStatusColor(complianceStatus.adServingStatus)} px-3 py-2 rounded-lg`}>
              {getAdServingStatusLabel(complianceStatus.adServingStatus).split(' ')[0]}
            </div>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ad Serving</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className={`p-6 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Violation Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-600">{stats.total}</div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total</p>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-red-600">{stats.active}</div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active</p>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">{stats.resolved}</div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Resolved</p>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">{restrictions.length}</div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Restrictions</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {complianceStatus.recommendations.length > 0 && (
        <div className={`p-6 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Recommendations
          </h3>
          <ul className="space-y-2">
            {complianceStatus.recommendations.map((rec, index) => (
              <li key={index} className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <span className="text-blue-500 mr-2">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Violations Tab Component
const ViolationsTab: React.FC<{
  violations: PolicyViolation[];
  isDarkMode: boolean;
  onResolveViolation: () => void;
  filters: Filters;
  onFilterChange: (key: string, value: string) => void;
  onExport: () => void;
}> = ({ violations, isDarkMode, onResolveViolation, filters, onFilterChange, onExport }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleResolveViolation = async (violationId: string) => {
    const resolved = policyService.resolveViolation(violationId);
    if (resolved) {
      onResolveViolation();
    }
  };

  const handleScreenshotUpload = (violationId: string, file: File) => {
    const url = URL.createObjectURL(file);
    policyService.attachScreenshotToViolation(violationId, url);
    setPreviewUrl(url);
    setUploadingId(null);
    onResolveViolation();
  };

  const activeViolations = violations.filter(v => v.status === 'active');
  const filteredViolations = activeViolations.filter(violation => {
    if (filters.type !== 'all' && violation.type !== filters.type) return false;
    if (filters.severity !== 'all' && violation.severity !== filters.severity) return false;
    if (filters.status !== 'all' && violation.status !== filters.status) return false;
    return true;
  });
  const regulatoryLabel = (type: string) => type === 'regulatory' ? 'REGULATORY' : type.toUpperCase();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Policy Violations ({filteredViolations.length})
        </h3>
        <button
          onClick={onExport}
          className={`px-4 py-2 text-sm rounded ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
        >
          Export CSV
        </button>
      </div>

      {/* Filter Controls */}
      <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Filters</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => onFilterChange('type', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            >
              <option value="all">All Types</option>
              <option value="policy">Policy</option>
              <option value="restriction">Restriction</option>
              <option value="regulatory">Regulatory</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Severity
            </label>
            <select
              value={filters.severity}
              onChange={(e) => onFilterChange('severity', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
              <option value="reviewing">Reviewing</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => onFilterChange('type', 'all')}
              className={`px-3 py-2 text-sm rounded ${isDarkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {activeViolations.length === 0 ? (
        <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No active violations found. Your content is compliant with Google Publisher Policies.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredViolations.map((violation) => (
            <div
              key={violation.id}
              className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(violation.type)}`}>
                    {regulatoryLabel(violation.type)}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(violation.severity)}`}>
                    {violation.severity.toUpperCase()}
                  </span>
                  {violation.adServingStatus && (
                    <span className={`px-2 py-1 text-xs rounded-full ${getAdServingStatusColor(violation.adServingStatus)}`}>
                      {getAdServingStatusLabel(violation.adServingStatus).split(' ')[0]}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleResolveViolation(violation.id)}
                  className={`px-3 py-1 text-sm rounded ${isDarkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                >
                  Resolve
                </button>
              </div>
              
              <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {violation.category.name}
              </h4>
              
              <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {violation.description}
              </p>
              
              {violation.url && (
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  URL: <a href={violation.url} className="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                    {violation.url}
                  </a>
                </p>
              )}

              {/* Screenshot Section */}
              <div className="mb-2">
                {violation.screenshotUrl ? (
                  <div className="mb-2">
                    <Image 
                      src={violation.screenshotUrl} 
                      alt="Screenshot" 
                      width={320}
                      height={240}
                      className="max-w-xs rounded border" 
                    />
                  </div>
                ) : uploadingId === violation.id && previewUrl ? (
                  <div className="mb-2">
                    <Image 
                      src={previewUrl} 
                      alt="Preview" 
                      width={320}
                      height={240}
                      className="max-w-xs rounded border" 
                    />
                  </div>
                ) : null}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      handleScreenshotUpload(violation.id, e.target.files[0]);
                    }
                  }}
                />
                <button
                  onClick={() => {
                    setUploadingId(violation.id);
                    setPreviewUrl(null);
                    fileInputRef.current?.click();
                  }}
                  className={`mt-1 px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                >
                  {violation.screenshotUrl ? 'Replace Screenshot' : 'Upload Screenshot'}
                </button>
              </div>

              {/* Review Workflow Section */}
              {violation.status === 'resolved' && (!violation.reviewStatus || violation.reviewStatus === 'not_requested') && (
                <button
                  onClick={() => {
                    policyService.requestReview(violation.id, 'Requesting review after fix');
                    onResolveViolation();
                  }}
                  className={`mt-2 px-3 py-1 text-sm rounded ${isDarkMode ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                >
                  Request Review
                </button>
              )}
              {violation.reviewStatus && violation.reviewStatus !== 'not_requested' && (
                <div className="mt-2 flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    violation.reviewStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    violation.reviewStatus === 'approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    Review: {violation.reviewStatus.charAt(0).toUpperCase() + violation.reviewStatus.slice(1)}
                  </span>
                  {violation.reviewStatus === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          policyService.updateReviewStatus(violation.id, 'approved', 'Approved by admin');
                          onResolveViolation();
                        }}
                        className={`px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-green-700 text-white hover:bg-green-800' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          policyService.updateReviewStatus(violation.id, 'rejected', 'Rejected by admin');
                          onResolveViolation();
                        }}
                        className={`px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              )}

              <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Detected: {violation.detectedAt.toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Restrictions Tab Component
const RestrictionsTab: React.FC<{
  restrictions: PublisherRestriction[];
  isDarkMode: boolean;
}> = ({ restrictions, isDarkMode }) => {
  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        Publisher Restrictions ({restrictions.length})
      </h3>
      
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        These restrictions affect which advertisers can bid on your content. Google Ads will not serve on restricted content.
      </p>

      <div className="space-y-4">
        {restrictions.map((restriction) => (
          <div
            key={restriction.id}
            className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {restriction.category}
              </h4>
              <span className={`px-2 py-1 text-xs rounded-full ${
                restriction.advertiserImpact === 'complete' ? 'text-red-600 bg-red-100' :
                restriction.advertiserImpact === 'significant' ? 'text-orange-600 bg-orange-100' :
                restriction.advertiserImpact === 'limited' ? 'text-yellow-600 bg-yellow-100' :
                'text-green-600 bg-green-100'
              }`}>
                {restriction.advertiserImpact.toUpperCase()} IMPACT
              </span>
            </div>
            
            <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {restriction.description}
            </p>
            
            <div className="flex items-center space-x-4 text-sm">
              <span className={`${restriction.googleAdsBlocked ? 'text-red-600' : 'text-green-600'}`}>
                Google Ads: {restriction.googleAdsBlocked ? 'Blocked' : 'Allowed'}
              </span>
              <span className={`${restriction.otherSourcesAllowed ? 'text-green-600' : 'text-red-600'}`}>
                Other Sources: {restriction.otherSourcesAllowed ? 'Allowed' : 'Blocked'}
              </span>
            </div>
            
            {restriction.examples.length > 0 && (
              <div className="mt-3">
                <p className={`text-xs font-semibold mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Examples:
                </p>
                <div className="flex flex-wrap gap-1">
                  {restriction.examples.map((example, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs rounded ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Reports Tab Component
const ReportsTab: React.FC<{
  reports: PolicyReport[];
  isDarkMode: boolean;
  onExport: () => void;
}> = ({ reports, isDarkMode, onExport }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          User Reports ({reports.length})
        </h3>
        <button
          onClick={onExport}
          className={`px-4 py-2 text-sm rounded ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
        >
          Export CSV
        </button>
      </div>
      
      {reports.length === 0 ? (
        <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No user reports received.
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    report.status === 'pending' ? 'text-yellow-600 bg-yellow-100' :
                    report.status === 'investigating' ? 'text-blue-600 bg-blue-100' :
                    report.status === 'resolved' ? 'text-green-600 bg-green-100' :
                    'text-red-600 bg-red-100'
                  }`}>
                    {report.status.toUpperCase()}
                  </span>
                </div>
                <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {report.reportedAt.toLocaleDateString()}
                </span>
              </div>
              
              <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {report.violationType}
              </h4>
              
              <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {report.description}
              </p>
              
              <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Reporter: {report.reporterEmail}
              </p>
              
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                URL: <a href={report.url} className="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                  {report.url}
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Settings Tab Component
const SettingsTab: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <div className="space-y-6">
      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        Policy Settings
      </h3>
      
      <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Content Moderation
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Auto-moderation enabled
            </span>
            <div className={`w-12 h-6 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} relative`}>
              <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 left-0.5 transition-transform transform translate-x-6`}></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Content filtering enabled
            </span>
            <div className={`w-12 h-6 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} relative`}>
              <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 left-0.5 transition-transform transform translate-x-6`}></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              User reporting enabled
            </span>
            <div className={`w-12 h-6 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} relative`}>
              <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 left-0.5 transition-transform transform translate-x-6`}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Compliance Threshold
        </h4>
        
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="80"
            className="flex-1"
          />
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            80%
          </span>
        </div>
        
        <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Content below this threshold will be flagged for review
        </p>
      </div>
    </div>
  );
};

export default PolicyCenter; 