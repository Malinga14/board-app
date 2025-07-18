export const getTypeColor = (type: string): string => {
  switch (type) {
    case 'Research':
      return 'bg-green-100 text-green-700';
    case 'Design':
      return 'bg-red-100 text-red-700';
    case 'Development':
      return 'bg-orange-100 text-orange-700';
    case 'Feedback':
      return 'bg-blue-100 text-blue-700';
    case 'UX Research':
      return 'bg-orange-100 text-orange-700';
    case 'Interface':
      return 'bg-blue-100 text-blue-700';
    case 'Other':
      return 'bg-gray-100 text-gray-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const getColumnHeaderStyle = (columnId: string): string => {
  switch (columnId) {
    case 'todo':
      return 'bg-gray-500 text-white';
    case 'progress':
      return 'bg-orange-400 text-white';
    case 'approved':
      return 'bg-green-500 text-white';
    case 'reject':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};
