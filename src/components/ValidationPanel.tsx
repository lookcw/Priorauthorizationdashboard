import { CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';
import { AuthItem } from './PriorAuthDashboard';

interface ValidationPanelProps {
  items: AuthItem[];
}

export function ValidationPanel({ items }: ValidationPanelProps) {
  const allCompleted = items.every(item => item.completed);
  
  // Validation logic
  const validationIssues: string[] = [];
  
  const schedulingOrtho = items.find(i => i.id === 'scheduling-ortho')?.completed;
  const schedulingFacility = items.find(i => i.id === 'scheduling-facility')?.completed;
  const surgeryDate = items.find(i => i.id === 'surgery-date')?.completed;
  const consent = items.find(i => i.id === 'consent')?.completed;
  const mriScan = items.find(i => i.id === 'mri-scan')?.completed;
  const ptEvidence = items.find(i => i.id === 'pt-evidence')?.completed;
  const icdCodes = items.find(i => i.id === 'icd-codes')?.completed;
  const insurance = items.find(i => i.id === 'insurance-card')?.completed;
  const demographics = items.find(i => i.id === 'demographics')?.completed;

  // Check logical dependencies
  if (surgeryDate && !schedulingOrtho) {
    validationIssues.push('Surgery date is scheduled but scheduling form from ortho clinic is missing');
  }

  if (surgeryDate && !schedulingFacility) {
    validationIssues.push('Surgery date is scheduled but scheduling form to facility is missing');
  }

  if (consent && !demographics) {
    validationIssues.push('Consent form is complete but patient demographic information is missing');
  }

  if (icdCodes && !mriScan && !ptEvidence) {
    validationIssues.push('ICD 10 codes are provided but supporting medical evidence (MRI scan or PT evidence) is missing');
  }

  if (surgeryDate && !consent) {
    validationIssues.push('Surgery date is scheduled but patient consent form is not yet obtained');
  }

  if (surgeryDate && !insurance) {
    validationIssues.push('Surgery date is scheduled but insurance verification is incomplete');
  }

  const hasWarnings = validationIssues.length > 0;
  const isValid = allCompleted && !hasWarnings;

  return (
    <div className={`rounded-lg shadow-sm border p-6 ${
      isValid 
        ? 'bg-green-50 border-green-200' 
        : hasWarnings 
        ? 'bg-yellow-50 border-yellow-200' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          {isValid ? (
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-700" />
            </div>
          ) : hasWarnings ? (
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-700" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-gray-600" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className={
              isValid 
                ? 'text-green-900' 
                : hasWarnings 
                ? 'text-yellow-900' 
                : 'text-gray-900'
            }>
              {isValid 
                ? 'All Items Complete & Valid' 
                : hasWarnings 
                ? 'Validation Issues Detected' 
                : 'Final Validation Check'}
            </h3>
            <p className={
              isValid 
                ? 'text-green-700' 
                : hasWarnings 
                ? 'text-yellow-700' 
                : 'text-gray-600'
            }>
              {isValid 
                ? 'All required items are complete and validated. Ready for prior authorization submission.' 
                : hasWarnings 
                ? 'Some items may be out of sequence or missing dependencies.' 
                : 'Complete all items above to validate the prior authorization request.'}
            </p>
          </div>

          {/* Validation Issues */}
          {hasWarnings && (
            <div className="space-y-2">
              <p className="text-yellow-900">Issues that need attention:</p>
              <ul className="space-y-2">
                {validationIssues.map((issue, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span className="text-yellow-800">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Incomplete Items Warning */}
          {!allCompleted && !hasWarnings && (
            <div className="text-gray-600">
              <p>
                Complete all {items.length} required items to proceed with validation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
