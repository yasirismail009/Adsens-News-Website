import {
  PolicyViolation,
  ContentModerationResult,
  PolicyViolationResponse,
  ContentModerationRequest,
  POLICY_CATEGORIES,
  RESTRICTION_CATEGORIES,
  REGULATORY_CATEGORIES,
  PolicyComplianceStatus,
  PolicyEnforcement,
  PolicyReport,
  PublisherRestriction
} from '../types/policy';

class PolicyService {
  private violations: PolicyViolation[] = [];
  private enforcements: PolicyEnforcement[] = [];
  private reports: PolicyReport[] = [];
  private restrictions: PublisherRestriction[] = [];

  constructor() {
    this.initializeRestrictions();
  }

  private initializeRestrictions(): void {
    this.restrictions = [
      {
        id: 'tobacco_restriction',
        category: 'tobacco',
        description: 'Content promoting tobacco products is restricted from Google Ads',
        advertiserImpact: 'significant',
        googleAdsBlocked: true,
        otherSourcesAllowed: true,
        examples: ['Cigarette promotions', 'Vaping products', 'Tobacco accessories']
      },
      {
        id: 'drugs_restriction',
        category: 'recreational_drugs',
        description: 'Content promoting recreational drugs is restricted from Google Ads',
        advertiserImpact: 'complete',
        googleAdsBlocked: true,
        otherSourcesAllowed: false,
        examples: ['Marijuana sales', 'Drug paraphernalia', 'Recreational drug use']
      },
      {
        id: 'alcohol_restriction',
        category: 'alcohol',
        description: 'Content promoting alcohol sales or misuse is restricted',
        advertiserImpact: 'limited',
        googleAdsBlocked: true,
        otherSourcesAllowed: true,
        examples: ['Online alcohol sales', 'Binge drinking promotion']
      },
      {
        id: 'gambling_restriction',
        category: 'gambling',
        description: 'Online gambling content is restricted in certain regions',
        advertiserImpact: 'significant',
        googleAdsBlocked: true,
        otherSourcesAllowed: true,
        examples: ['Online casinos', 'Sports betting', 'Lottery sales']
      }
    ];
  }

  /**
   * Moderate content for policy violations and restrictions
   */
  public async moderateContent(request: ContentModerationRequest): Promise<ContentModerationResult> {
    const { content, url } = request;
    const violations: PolicyViolation[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];
    const flaggedContent: string[] = [];
    const safeContent: string[] = [];

    // Check for policy violations
    const policyViolations = this.checkPolicyViolations(content, url);
    violations.push(...policyViolations);

    // Check for publisher restrictions
    const restrictionViolations = this.checkPublisherRestrictions(content, url);
    violations.push(...restrictionViolations);

    // Check for regulatory issues
    const regulatoryIssues = this.checkRegulatoryIssues(content, url);
    violations.push(...regulatoryIssues);

    // Analyze content safety
    const contentAnalysis = this.analyzeContentSafety(content);
    flaggedContent.push(...contentAnalysis.flagged);
    safeContent.push(...contentAnalysis.safe);

    // Generate warnings and suggestions
    if (violations.length > 0) {
      warnings.push(`Found ${violations.length} policy violation(s)`);
      suggestions.push('Review and edit content to comply with policies');
    }

    if (contentAnalysis.flagged.length > 0) {
      warnings.push(`Found ${contentAnalysis.flagged.length} potentially problematic content sections`);
      suggestions.push('Consider reviewing flagged content for policy compliance');
    }

    // Calculate compliance score
    const complianceScore = this.calculateComplianceScore(content, violations);

    return {
      isCompliant: violations.length === 0,
      violations,
      warnings,
      suggestions,
      complianceScore,
      flaggedContent,
      safeContent
    };
  }

  /**
   * Check content for Google Publisher Policy violations
   */
  private checkPolicyViolations(content: string, url?: string): PolicyViolation[] {
    const violations: PolicyViolation[] = [];
    const lowerContent = content.toLowerCase();

    for (const category of POLICY_CATEGORIES) {
      const matches = this.findKeywordMatches(lowerContent, category.keywords);
      
      if (matches.length > 0) {
        const violation: PolicyViolation = {
          id: `violation_${Date.now()}_${Math.random()}`,
          type: 'policy',
          category,
          severity: category.severity,
          description: `Content contains ${category.name.toLowerCase()} keywords: ${matches.join(', ')}`,
          url,
          detectedAt: new Date(),
          status: 'active',
          content: matches.join(', '),
          lineNumbers: this.findLineNumbers(content, matches),
          adServingStatus: this.determineAdServingStatus('policy', category.severity)
        };
        violations.push(violation);
      }
    }

    return violations;
  }

  /**
   * Check content for Google Publisher Restrictions
   */
  private checkPublisherRestrictions(content: string, url?: string): PolicyViolation[] {
    const violations: PolicyViolation[] = [];
    const lowerContent = content.toLowerCase();

    for (const category of RESTRICTION_CATEGORIES) {
      const matches = this.findKeywordMatches(lowerContent, category.keywords);
      
      if (matches.length > 0) {
        const violation: PolicyViolation = {
          id: `restriction_${Date.now()}_${Math.random()}`,
          type: 'restriction',
          category,
          severity: category.severity,
          description: `Content contains ${category.name.toLowerCase()} keywords: ${matches.join(', ')}`,
          url,
          detectedAt: new Date(),
          status: 'active',
          content: matches.join(', '),
          lineNumbers: this.findLineNumbers(content, matches),
          adServingStatus: this.determineAdServingStatus('restriction', category.severity)
        };
        violations.push(violation);
      }
    }

    return violations;
  }

  /**
   * Check content for regulatory issues
   */
  private checkRegulatoryIssues(content: string, url?: string): PolicyViolation[] {
    const violations: PolicyViolation[] = [];
    const lowerContent = content.toLowerCase();

    for (const category of REGULATORY_CATEGORIES) {
      const matches = this.findKeywordMatches(lowerContent, category.keywords);
      if (matches.length > 0) {
        const violation: PolicyViolation = {
          id: `regulatory_${Date.now()}_${Math.random()}`,
          type: 'regulatory',
          category,
          severity: category.severity,
          description: `Content may have regulatory issue: ${category.name} (keywords: ${matches.join(', ')})`,
          url,
          detectedAt: new Date(),
          status: 'active',
          content: matches.join(', '),
          lineNumbers: this.findLineNumbers(content, matches),
          adServingStatus: this.determineAdServingStatus('regulatory', category.severity)
        };
        violations.push(violation);
      }
    }
    return violations;
  }

  /**
   * Find keyword matches in content
   */
  private findKeywordMatches(content: string, keywords: string[]): string[] {
    const matches: string[] = [];
    
    for (const keyword of keywords) {
      if (content.includes(keyword)) {
        matches.push(keyword);
      }
    }
    
    return matches;
  }

  /**
   * Find line numbers where keywords appear
   */
  private findLineNumbers(content: string, keywords: string[]): number[] {
    const lines = content.split('\n');
    const lineNumbers: number[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      for (const keyword of keywords) {
        if (line.includes(keyword)) {
          lineNumbers.push(i + 1);
          break;
        }
      }
    }
    
    return [...new Set(lineNumbers)]; // Remove duplicates
  }

  /**
   * Analyze content safety
   */
  private analyzeContentSafety(content: string): { flagged: string[]; safe: string[] } {
    const flagged: string[] = [];
    const safe: string[] = [];
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);

    for (const sentence of sentences) {
      const lowerSentence = sentence.toLowerCase();
      
      // Check for potentially problematic patterns
      const hasSuspiciousPatterns = this.hasSuspiciousPatterns(lowerSentence);
      
      if (hasSuspiciousPatterns) {
        flagged.push(sentence.trim());
      } else {
        safe.push(sentence.trim());
      }
    }

    return { flagged, safe };
  }

  /**
   * Check for suspicious patterns in content
   */
  private hasSuspiciousPatterns(content: string): boolean {
    const suspiciousPatterns = [
      /\b(free\s+money|get\s+rich|quick\s+cash|make\s+money\s+fast)\b/i,
      /\b(click\s+here|buy\s+now|limited\s+time|act\s+now)\b/i,
      /\b(guaranteed|100%\s+success|no\s+risk|easy\s+money)\b/i,
      /\b(weight\s+loss|diet\s+pills|miracle\s+cure|natural\s+remedy)\b/i,
      /\b(online\s+pharmacy|prescription\s+drugs|buy\s+medication)\b/i,
      /\b(casino|gambling|betting|lottery|poker)\b/i,
      /\b(alcohol|beer|wine|liquor|drunk)\b/i,
      /\b(tobacco|cigarette|cigar|vape|e-cigarette)\b/i
    ];

    return suspiciousPatterns.some(pattern => pattern.test(content));
  }

  /**
   * Calculate compliance score (0-100)
   */
  private calculateComplianceScore(content: string, violations: PolicyViolation[]): number {
    if (violations.length === 0) {
      return 100;
    }

    const totalWords = content.split(/\s+/).length;
    const violationWords = violations.reduce((count, violation) => {
      return count + (violation.content?.split(',').length || 0);
    }, 0);

    const violationRatio = violationWords / totalWords;
    const baseScore = Math.max(0, 100 - (violationRatio * 100));
    
    // Penalize based on violation severity
    const severityPenalty = violations.reduce((penalty, violation) => {
      switch (violation.severity) {
        case 'critical': return penalty + 30;
        case 'high': return penalty + 20;
        case 'medium': return penalty + 10;
        case 'low': return penalty + 5;
        default: return penalty;
      }
    }, 0);

    return Math.max(0, baseScore - severityPenalty);
  }

  /**
   * Report a policy violation
   */
  public async reportViolation(report: Omit<PolicyReport, 'id' | 'reportedAt'>): Promise<PolicyViolationResponse> {
    const newReport: PolicyReport = {
      ...report,
      id: `report_${Date.now()}_${Math.random()}`,
      reportedAt: new Date()
    };

    this.reports.push(newReport);

    // Analyze the reported content
    const moderationResult = await this.moderateContent({
      content: report.description,
      url: report.url,
      contentType: 'user_generated'
    });

    if (moderationResult.violations.length > 0) {
      return {
        success: true,
        violation: moderationResult.violations[0],
        suggestions: moderationResult.suggestions
      };
    }

    return {
      success: true,
      suggestions: ['Content appears to be compliant with policies']
    };
  }

  /**
   * Get compliance status
   */
  public getComplianceStatus(): PolicyComplianceStatus {
    const activeViolations = this.violations.filter(v => v.status === 'active' && v.type === 'policy');
    const activeRestrictions = this.violations.filter(v => v.status === 'active' && v.type === 'restriction');
    const activeRegulatory = this.violations.filter(v => v.status === 'active' && v.type === 'regulatory');

    let overallStatus: PolicyComplianceStatus['overallStatus'] = 'compliant';
    let complianceScore = 100;
    let adServingStatus: PolicyComplianceStatus['adServingStatus'] = 'normal';

    if (activeViolations.length > 0) {
      overallStatus = 'violation';
      complianceScore = Math.max(0, 100 - (activeViolations.length * 20));
      adServingStatus = 'disabled';
    } else if (activeRestrictions.length > 0) {
      overallStatus = 'restricted';
      complianceScore = Math.max(0, 100 - (activeRestrictions.length * 10));
      adServingStatus = 'restricted';
    } else if (activeRegulatory.length > 0) {
      overallStatus = 'warning';
      complianceScore = Math.max(0, 100 - (activeRegulatory.length * 10));
      adServingStatus = 'at_risk';
    }

    const recommendations: string[] = [];
    
    if (activeViolations.length > 0) {
      recommendations.push('Address policy violations to restore full ad serving');
    }
    
    if (activeRestrictions.length > 0) {
      recommendations.push('Consider content restrictions impact on advertising revenue');
    }
    if (activeRegulatory.length > 0) {
      recommendations.push('Review regulatory compliance (e.g., CMP, GDPR, CCPA) to avoid ad serving risk');
    }

    return {
      overallStatus,
      activeViolations,
      activeRestrictions,
      lastChecked: new Date(),
      complianceScore,
      recommendations,
      adServingStatus
    };
  }

  /**
   * Get policy center data
   */
  public getPolicyCenterData(): {
    enforcements: PolicyEnforcement[];
    violations: PolicyViolation[];
    restrictions: PublisherRestriction[];
    reports: PolicyReport[];
    complianceStatus: PolicyComplianceStatus;
  } {
    return {
      enforcements: this.enforcements,
      violations: this.violations,
      restrictions: this.restrictions,
      reports: this.reports,
      complianceStatus: this.getComplianceStatus()
    };
  }

  /**
   * Resolve a violation
   */
  public resolveViolation(violationId: string): boolean {
    const violation = this.violations.find(v => v.id === violationId);
    if (violation) {
      violation.status = 'resolved';
      return true;
    }
    return false;
  }

  /**
   * Get violation statistics
   */
  public getViolationStats(): {
    total: number;
    active: number;
    resolved: number;
    byType: Record<string, number>;
    bySeverity: Record<string, number>;
  } {
    const total = this.violations.length;
    const active = this.violations.filter(v => v.status === 'active').length;
    const resolved = this.violations.filter(v => v.status === 'resolved').length;

    const byType = this.violations.reduce((acc, violation) => {
      acc[violation.type] = (acc[violation.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const bySeverity = this.violations.reduce((acc, violation) => {
      acc[violation.severity] = (acc[violation.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, active, resolved, byType, bySeverity };
  }

  /**
   * Check if content is safe for AdSense
   */
  public async isContentSafeForAdSense(content: string): Promise<boolean> {
    const moderationResult = await this.moderateContent({
      content,
      contentType: 'article'
    });

    return moderationResult.isCompliant && moderationResult.complianceScore >= 80;
  }

  /**
   * Get content recommendations
   */
  public getContentRecommendations(content: string): string[] {
    const recommendations: string[] = [];
    const lowerContent = content.toLowerCase();

    // Check for common issues
    if (lowerContent.includes('click here')) {
      recommendations.push('Avoid "click here" links - use descriptive anchor text');
    }

    if (lowerContent.includes('buy now') || lowerContent.includes('act now')) {
      recommendations.push('Limit promotional language to maintain editorial integrity');
    }

    if (lowerContent.includes('free money') || lowerContent.includes('get rich quick')) {
      recommendations.push('Avoid misleading financial claims');
    }

    if (lowerContent.includes('weight loss') && lowerContent.includes('miracle')) {
      recommendations.push('Be cautious with health claims - ensure they are substantiated');
    }

    return recommendations;
  }

  /**
   * Attach a screenshot URL to a violation
   */
  public attachScreenshotToViolation(violationId: string, screenshotUrl: string): boolean {
    const violation = this.violations.find(v => v.id === violationId);
    if (violation) {
      violation.screenshotUrl = screenshotUrl;
      return true;
    }
    return false;
  }

  /**
   * Get screenshot URL for a violation
   */
  public getScreenshotForViolation(violationId: string): string | undefined {
    const violation = this.violations.find(v => v.id === violationId);
    return violation?.screenshotUrl;
  }

  /**
   * Request a review for a resolved violation
   */
  public requestReview(violationId: string, adminNote?: string): boolean {
    const violation = this.violations.find(v => v.id === violationId);
    if (violation && violation.status === 'resolved') {
      violation.reviewStatus = 'pending';
      if (!violation.reviewHistory) violation.reviewHistory = [];
      violation.reviewHistory.push({ status: 'pending', date: new Date(), adminNote });
      violation.status = 'reviewing';
      return true;
    }
    return false;
  }

  /**
   * Update review status (approve/reject)
   */
  public updateReviewStatus(violationId: string, status: 'approved' | 'rejected', adminNote?: string): boolean {
    const violation = this.violations.find(v => v.id === violationId);
    if (violation && violation.reviewStatus === 'pending') {
      violation.reviewStatus = status;
      if (!violation.reviewHistory) violation.reviewHistory = [];
      violation.reviewHistory.push({ status, date: new Date(), adminNote });
      violation.status = status === 'approved' ? 'resolved' : 'active';
      return true;
    }
    return false;
  }

  /**
   * Determine ad serving status based on violation type and severity
   */
  private determineAdServingStatus(type: 'policy' | 'restriction' | 'regulatory', severity: string): 'disabled' | 'restricted' | 'at_risk' | 'limited' | 'confirmed_click' | 'normal' {
    if (type === 'policy') {
      // Policy violations typically result in disabled or restricted ad serving
      if (severity === 'critical' || severity === 'high') {
        return 'disabled';
      } else {
        return 'restricted';
      }
    } else if (type === 'restriction') {
      // Publisher restrictions result in restricted ad serving
      return 'restricted';
    } else if (type === 'regulatory') {
      // Regulatory issues typically result in at-risk status
      return 'at_risk';
    }
    return 'normal';
  }
}

// Export singleton instance
export const policyService = new PolicyService();
export default policyService; 