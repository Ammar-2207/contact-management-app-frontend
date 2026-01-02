import React from 'react';

const ContactItem = ({ contact, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {contact.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{contact.name}</h3>
              <p className="text-sm text-gray-500">{formatDate(contact.createdAt)}</p>
            </div>
          </div>
          
          <div className="ml-16 space-y-1">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-gray-500">📧</span>
              <a
                href={`mailto:${contact.email}`}
                className="text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                {contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-gray-500">📞</span>
              <a
                href={`tel:${contact.phone}`}
                className="text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                {contact.phone}
              </a>
            </div>
            {contact.message && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-sm text-gray-600 italic">
                  "{contact.message}"
                </p>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={() => onDelete(contact._id)}
          className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete contact"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ContactItem;

