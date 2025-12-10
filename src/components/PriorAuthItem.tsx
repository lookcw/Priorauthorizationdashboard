import { CheckCircle2, Circle, Send } from 'lucide-react';
import { AuthItem } from './PriorAuthDashboard';

interface PriorAuthItemProps {
  item: AuthItem;
  onToggle: (id: string) => void;
  onRequest: (id: string) => void;
  isRequested: boolean;
}

export function PriorAuthItem({ item, onToggle, onRequest, isRequested }: PriorAuthItemProps) {
  const Icon = item.icon;

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(item.id)}
          className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          {item.completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400" />
          )}
        </button>

        {/* Icon */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
          item.completed ? 'bg-green-100' : 'bg-gray-100'
        }`}>
          <Icon className={`w-5 h-5 ${item.completed ? 'text-green-700' : 'text-gray-600'}`} />
        </div>

        {/* Label */}
        <div className="flex-1 min-w-0">
          <p className={`${
            item.completed ? 'text-gray-500 line-through' : 'text-gray-900'
          }`}>
            {item.label}
          </p>
        </div>

        {/* Request Button */}
        {item.hasRequestButton && (
          <button
            onClick={() => onRequest(item.id)}
            disabled={isRequested}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isRequested
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Send className="w-4 h-4" />
            {isRequested ? 'Requested' : 'Request'}
          </button>
        )}
      </div>
    </div>
  );
}
