import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const Calendar = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const calendarDays = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Days of the current month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const events = [
    { day: 15, title: 'Design Review', time: '10:00 AM', color: 'bg-blue-100 text-blue-800' },
    { day: 18, title: 'Client Meeting', time: '2:00 PM', color: 'bg-green-100 text-green-800' },
    { day: 22, title: 'Sprint Planning', time: '9:00 AM', color: 'bg-purple-100 text-purple-800' }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{currentMonth}</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 bg-gray-50">
          {daysOfWeek.map((day) => (
            <div key={day} className="p-4 text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            const dayEvents = events.filter(event => event.day === day);
            const isToday = day === currentDate.getDate();
            
            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border-r border-b border-gray-100 ${
                  day ? 'hover:bg-gray-50 cursor-pointer' : ''
                }`}
              >
                {day && (
                  <>
                    <div className={`text-sm font-medium mb-2 ${
                      isToday 
                        ? 'w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center' 
                        : 'text-gray-900'
                    }`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`text-xs p-1 rounded ${event.color} truncate`}
                        >
                          <div className="font-medium">{event.title}</div>
                          <div className="opacity-75">{event.time}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {events.map((event, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100">
              <div className={`w-3 h-3 rounded-full ${event.color.includes('blue') ? 'bg-blue-500' : event.color.includes('green') ? 'bg-green-500' : 'bg-purple-500'}`}></div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{event.title}</div>
                <div className="text-sm text-gray-600">July {event.day}, {currentDate.getFullYear()} at {event.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
