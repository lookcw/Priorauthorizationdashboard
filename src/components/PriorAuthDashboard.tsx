import { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle, FileText, Calendar, CreditCard, User, FileImage, Activity, Code, Send } from 'lucide-react';
import { PriorAuthItem } from './PriorAuthItem';
import { ValidationPanel } from './ValidationPanel';

export interface AuthItem {
  id: string;
  label: string;
  completed: boolean;
  hasRequestButton?: boolean;
  icon: any;
  category: 'forms' | 'scheduling' | 'documents' | 'medical';
}

export function PriorAuthDashboard() {
  const [items, setItems] = useState<AuthItem[]>([
    {
      id: 'scheduling-ortho',
      label: 'Scheduling form from ortho clinic',
      completed: false,
      icon: FileText,
      category: 'forms'
    },
    {
      id: 'scheduling-facility',
      label: 'Scheduling form to the facility',
      completed: false,
      icon: FileText,
      category: 'forms'
    },
    {
      id: 'consent',
      label: 'Consent form',
      completed: false,
      icon: FileText,
      category: 'forms'
    },
    {
      id: 'pre-admission',
      label: 'Redundant form for ordering pre admissions testing',
      completed: false,
      icon: FileText,
      category: 'forms'
    },
    {
      id: 'surgery-date',
      label: 'Schedule surgery date',
      completed: false,
      icon: Calendar,
      category: 'scheduling'
    },
    {
      id: 'insurance-card',
      label: 'Insurance card front back',
      completed: false,
      icon: CreditCard,
      category: 'documents'
    },
    {
      id: 'demographics',
      label: 'Demographic information of patient',
      completed: false,
      icon: User,
      category: 'documents'
    },
    {
      id: 'mri-scan',
      label: 'MRI scan',
      completed: false,
      hasRequestButton: true,
      icon: FileImage,
      category: 'medical'
    },
    {
      id: 'pt-evidence',
      label: 'Evidence of PT',
      completed: false,
      hasRequestButton: true,
      icon: Activity,
      category: 'medical'
    },
    {
      id: 'icd-codes',
      label: 'ICD 10 codes',
      completed: false,
      icon: Code,
      category: 'medical'
    }
  ]);

  const [requestedItems, setRequestedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleRequest = (id: string) => {
    setRequestedItems(prev => new Set(prev).add(id));
    // Simulate request being sent
    setTimeout(() => {
      alert(`Request sent for ${items.find(item => item.id === id)?.label}`);
    }, 100);
  };

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h1 className="text-gray-900 mb-2">Prior Authorization Dashboard</h1>
        <p className="text-gray-600 mb-4">
          Track all required items for prior authorization approval
        </p>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Progress</span>
            <span>{completedCount} of {totalCount} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900">Required Items Checklist</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <PriorAuthItem
              key={item.id}
              item={item}
              onToggle={toggleItem}
              onRequest={handleRequest}
              isRequested={requestedItems.has(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Validation Panel */}
      <ValidationPanel items={items} />
    </div>
  );
}
