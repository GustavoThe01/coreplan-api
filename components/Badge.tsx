import React from 'react';
import { TaskPriority, TaskStatus } from '../types';

interface BadgeProps {
  type: 'status' | 'priority';
  value: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, value }) => {
  let colorClass = 'bg-gray-100 text-gray-800';

  if (type === 'status') {
    switch (value) {
      case TaskStatus.PENDENTE:
        colorClass = 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        break;
      case TaskStatus.CONCLUIDA:
        colorClass = 'bg-green-100 text-green-800 border border-green-200';
        break;
    }
  } else if (type === 'priority') {
    switch (value) {
      case TaskPriority.BAIXA:
        colorClass = 'bg-blue-50 text-blue-700 border border-blue-200';
        break;
      case TaskPriority.MEDIA:
        colorClass = 'bg-orange-50 text-orange-700 border border-orange-200';
        break;
      case TaskPriority.ALTA:
        colorClass = 'bg-red-50 text-red-700 border border-red-200';
        break;
    }
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {value}
    </span>
  );
};