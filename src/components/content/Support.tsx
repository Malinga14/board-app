import React from 'react';
import { HelpCircle, Book, MessageCircle, Mail, Phone, ExternalLink } from 'lucide-react';

const Support = () => {
  const faqs = [
    {
      question: 'How do I create a new project board?',
      answer: 'Click on the "Boards" section in the sidebar, then click the "+" button to create a new board. You can customize the columns and add team members.'
    },
    {
      question: 'How can I invite team members to my workspace?',
      answer: 'Go to Team Members section and click "Add Member". Enter their email address and they will receive an invitation to join your workspace.'
    },
    {
      question: 'Can I customize the task card fields?',
      answer: 'Yes, you can customize task cards by clicking on any task and using the edit options to add custom fields, due dates, and priority levels.'
    },
    {
      question: 'How do I track project progress?',
      answer: 'Use the Dashboard to get an overview of all projects. You can also view detailed progress in each board and generate reports.'
    }
  ];

  const resources = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of using the board management system',
      icon: Book,
      link: '#'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step tutorials for advanced features',
      icon: ExternalLink,
      link: '#'
    },
    {
      title: 'Best Practices',
      description: 'Tips and tricks for effective project management',
      icon: HelpCircle,
      link: '#'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Support & Help</h1>
        <p className="text-gray-600">Get help and find answers to common questions</p>
      </div>

      {/* Contact Support */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
            <div className="p-3 bg-blue-500 rounded-full">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Live Chat</h3>
              <p className="text-sm text-gray-600">Get instant help from our support team</p>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700 mt-1">
                Start Chat
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
            <div className="p-3 bg-green-500 rounded-full">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Email Support</h3>
              <p className="text-sm text-gray-600">support@boardapp.com</p>
              <p className="text-sm text-gray-500 mt-1">Response within 24 hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <resource.icon className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="font-medium text-gray-900">{resource.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
              <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-900">All systems operational</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">Last updated: July 17, 2025 at 10:30 AM</p>
      </div>
    </div>
  );
};

export default Support;
