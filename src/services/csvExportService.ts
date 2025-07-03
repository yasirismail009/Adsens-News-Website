import { PolicyViolation, PolicyReport, PublisherRestriction } from '../types/policy';

interface CSVData {
  [key: string]: string | number | boolean;
}

export class CSVExportService {
  /**
   * Convert array of objects to CSV string
   */
  private static arrayToCSV(data: CSVData[], headers: string[]): string {
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header] || '';
          // Escape quotes and wrap in quotes if contains comma or quote
          const escaped = String(value).replace(/"/g, '""');
          return escaped.includes(',') || escaped.includes('"') || escaped.includes('\n') 
            ? `"${escaped}"` 
            : escaped;
        }).join(',')
      )
    ].join('\n');
    
    return csvContent;
  }

  /**
   * Export violations to CSV
   */
  static exportViolations(violations: PolicyViolation[]): string {
    const headers = [
      'ID',
      'Type',
      'Category',
      'Severity',
      'Description',
      'URL',
      'Status',
      'Ad Serving Status',
      'Detected Date',
      'Review Status',
      'Content'
    ];

    const data = violations.map(violation => ({
      'ID': violation.id,
      'Type': violation.type,
      'Category': violation.category.name,
      'Severity': violation.severity,
      'Description': violation.description,
      'URL': violation.url || '',
      'Status': violation.status,
      'Ad Serving Status': violation.adServingStatus || '',
      'Detected Date': violation.detectedAt.toISOString(),
      'Review Status': violation.reviewStatus || 'not_requested',
      'Content': violation.content || ''
    }));

    return this.arrayToCSV(data, headers);
  }

  /**
   * Export reports to CSV
   */
  static exportReports(reports: PolicyReport[]): string {
    const headers = [
      'ID',
      'Reporter Email',
      'Reporter Name',
      'Violation Type',
      'Description',
      'URL',
      'Status',
      'Reported Date',
      'Evidence'
    ];

    const data = reports.map(report => ({
      'ID': report.id,
      'Reporter Email': report.reporterEmail,
      'Reporter Name': report.reporterName || '',
      'Violation Type': report.violationType,
      'Description': report.description,
      'URL': report.url,
      'Status': report.status,
      'Reported Date': report.reportedAt.toISOString(),
      'Evidence': report.evidence || ''
    }));

    return this.arrayToCSV(data, headers);
  }

  /**
   * Export restrictions to CSV
   */
  static exportRestrictions(restrictions: PublisherRestriction[]): string {
    const headers = [
      'ID',
      'Category',
      'Description',
      'Advertiser Impact',
      'Google Ads Blocked',
      'Other Sources Allowed',
      'Examples'
    ];

    const data = restrictions.map(restriction => ({
      'ID': restriction.id,
      'Category': restriction.category,
      'Description': restriction.description,
      'Advertiser Impact': restriction.advertiserImpact,
      'Google Ads Blocked': restriction.googleAdsBlocked ? 'Yes' : 'No',
      'Other Sources Allowed': restriction.otherSourcesAllowed ? 'Yes' : 'No',
      'Examples': restriction.examples.join('; ')
    }));

    return this.arrayToCSV(data, headers);
  }

  /**
   * Download CSV file
   */
  static downloadCSV(csvContent: string, filename: string): void {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  /**
   * Export all policy data
   */
  static exportAllPolicyData(
    violations: PolicyViolation[],
    reports: PolicyReport[],
    restrictions: PublisherRestriction[]
  ): void {
    const timestamp = new Date().toISOString().split('T')[0];
    
    // Export violations
    const violationsCSV = this.exportViolations(violations);
    this.downloadCSV(violationsCSV, `policy-violations-${timestamp}.csv`);
    
    // Export reports
    const reportsCSV = this.exportReports(reports);
    this.downloadCSV(reportsCSV, `policy-reports-${timestamp}.csv`);
    
    // Export restrictions
    const restrictionsCSV = this.exportRestrictions(restrictions);
    this.downloadCSV(restrictionsCSV, `policy-restrictions-${timestamp}.csv`);
  }
}

export default CSVExportService; 