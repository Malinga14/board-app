import React from 'react';
import { Mail, Phone, MoreVertical, UserPlus } from 'lucide-react';

const TeamMembers = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Product Manager',
      email: 'john.smith@company.com',
      phone: '+1 (555) 123-4567',
      avatar: 'JS',
      status: 'online',
      projects: ['Sport Xi Project', 'Design System']
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'UI/UX Designer',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 234-5678',
      avatar: 'SJ',
      status: 'away',
      projects: ['Sport Xi Project', 'Wireframe']
    },
    {
      id: 3,
      name: 'Mike Chen',
      role: 'Frontend Developer',
      email: 'mike.chen@company.com',
      phone: '+1 (555) 345-6789',
      avatar: 'MC',
      status: 'online',
      projects: ['Development React App', 'Filter sorting']
    },
    {
      id: 4,
      name: 'Emily Davis',
      role: 'Backend Developer',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 456-7890',
      avatar: 'ED',
      status: 'offline',
      projects: ['API Development', 'Database Design']
    },
    {
      id: 5,
      name: 'Alex Rodriguez',
      role: 'UX Researcher',
      email: 'alex.rodriguez@company.com',
      phone: '+1 (555) 567-8901',
      avatar: 'AR',
      status: 'online',
      projects: ['User interview', 'UX Research']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
            <p className="text-gray-600">Manage your team and their roles</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <UserPlus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Online Now</p>
              <p className="text-2xl font-bold text-gray-900">
                {teamMembers.filter(member => member.status === 'online').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <div className="w-6 h-6 bg-purple-500 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Members</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {teamMembers.map((member) => (
            <div key={member.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{member.avatar}</span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                      <span className="text-sm text-gray-500 capitalize">({member.status})</span>
                    </div>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Mail className="w-4 h-4" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Phone className="w-4 h-4" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        Projects: {member.projects.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Mail className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
