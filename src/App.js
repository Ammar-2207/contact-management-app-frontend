import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import SuccessMessage from './components/SuccessMessage';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_URL}/contacts`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        console.error('Invalid response format:', data);
        setContacts([]);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]); // Set to empty array on error
    }
  };

  const handleContactSubmit = async (contactData) => {
    try {
      const response = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        const newContact = await response.json();
        // Ensure contacts is an array before spreading
        setContacts([newContact, ...(Array.isArray(contacts) ? contacts : [])]);
        setSuccessMessage('Contact added successfully!');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add contact');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      alert('Failed to add contact. Please try again.');
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const response = await fetch(`${API_URL}/contacts/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Ensure contacts is an array before filtering
          setContacts(Array.isArray(contacts) ? contacts.filter(contact => contact._id !== id) : []);
          setSuccessMessage('Contact deleted successfully!');
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        } else {
          const error = await response.json();
          alert(error.error || 'Failed to delete contact');
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Failed to delete contact. Please try again.');
      }
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Sort contacts based on selected option
  // Ensure contacts is always an array before sorting
  const sortedContacts = Array.isArray(contacts) ? [...contacts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  }) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Contact Management
          </h1>
          <p className="text-gray-600">Manage your contacts efficiently</p>
        </header>

        {showSuccess && (
          <SuccessMessage
            message={successMessage}
            onClose={() => setShowSuccess(false)}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Add New Contact
            </h2>
            <ContactForm onSubmit={handleContactSubmit} />
          </div>

          {/* Contact List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Contacts ({contacts.length})
              </h2>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
              </select>
            </div>
            <ContactList
              contacts={sortedContacts}
              onDelete={handleDeleteContact}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

