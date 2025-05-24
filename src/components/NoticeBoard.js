import React, { useState, useEffect } from 'react';

const mockNotices = [
    {
      id: 1,
      title: 'Critical Security Patch',
      content: 'A zero-day vulnerability in the authentication system has been detected. Apply the latest security patch immediately.',
      date: '2025-05-15',
      category: 'Security',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Phishing Alert',
      content: 'New phishing emails impersonating IT support are circulating. Do not click on suspicious links or share credentials.',
      date: '2025-05-12',
      category: 'Threat',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Ransomware Warning',
      content: 'Increased ransomware attacks targeting financial systems. Ensure backups are up-to-date and endpoints are secured.',
      date: '2025-05-10',
      category: 'Malware',
      priority: 'high'
    },
    {
      id: 4,
      title: 'Crypto Scam Advisory',
      content: 'Fake investment schemes promising high returns in cryptocurrency are spreading. Verify before engaging in transactions.',
      date: '2025-05-08',
      category: 'Scam',
      priority: 'medium'
    },
    {
      id: 5,
      title: 'Multi-Factor Authentication (MFA) Enforcement',
      content: 'MFA will be mandatory for all accounts starting next week. Ensure your devices are configured in advance.',
      date: '2025-05-05',
      category: 'Security',
      priority: 'medium'
    },
    {
      id: 6,
      title: 'Dark Web Monitoring Alert',
      content: 'Company credentials found on dark web markets. Reset passwords and report suspicious activity.',
      date: '2025-05-03',
      category: 'Threat',
      priority: 'high'
    }
  ];

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotices, setFilteredNotices] = useState([]);

  useEffect(() => {
    // call API here
    setNotices(mockNotices);
  }, []);

  useEffect(() => {
    const filtered = notices.filter(notice => {
      const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;
      
      const matchesSearch = (() => {
        if (!searchTerm.trim()) return true;
        
        const keywords = searchTerm.toLowerCase().split(/\s+/).filter(keyword => keyword.length > 0);
        
        if (keywords.length === 0) return true;
        
        const titleLower = notice.title.toLowerCase();
        const contentLower = notice.content.toLowerCase();
        const combinedText = `${titleLower} ${contentLower}`;
        
        return keywords.some(keyword => combinedText.includes(keyword));
      })();
      
      return matchesCategory && matchesSearch;
    });
    
    setFilteredNotices(filtered);
  }, [searchTerm, selectedCategory, notices]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const categories = ['All', ...new Set(mockNotices.map(notice => notice.category))];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const highlightMatch = (text, searchTerm) => {
    if (!searchTerm.trim()) return text;
    
    const keywords = searchTerm.split(/\s+/).filter(keyword => keyword.length > 0);
    
    if (keywords.length === 0) return text;
    
    const regexPattern = keywords.map(keyword => 
      keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') 
    ).join('|');
    
    const regex = new RegExp(`(${regexPattern})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="bg-yellow-200">{part}</span> : 
        <span key={index}>{part}</span>
    );
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Notice Board
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Latest announcements and updates.
        </p>
      </div>
      
      <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search notices... (use spaces to separate keywords)"
              className="shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-200 rounded-md p-2"
              value={searchTerm}
              onChange={handleSearchChange}
              autoComplete="on"
            />
          </div>
          <div className="w-full md:w-1/3">
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        {searchTerm && (
          <div className="mt-2 text-sm text-gray-500">
            Found {filteredNotices.length} matching result{filteredNotices.length !== 1 ? 's' : ''} for keywords: "{searchTerm}"
          </div>
        )}
      </div>

      <ul className="divide-y divide-gray-200 border-t border-gray-200">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <li key={notice.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {highlightMatch(notice.title, searchTerm)}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(notice.priority)}`}>
                    {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {highlightMatch(notice.content, searchTerm)}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>
                    {new Date(notice.date).toLocaleDateString()}
                  </p>
                  <p className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {notice.category}
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="px-4 py-8 sm:px-6 text-center text-gray-500">
            No notices found matching your criteria.
          </li>
        )}
      </ul>
    </div>
  );
}