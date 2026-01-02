import React from 'react';
import ContactItem from './ContactItem';

const ContactList = ({ contacts, onDelete }) => {
  if (contacts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📇</div>
        <p className="text-gray-500 text-lg">No contacts yet. Add your first contact!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto">
      {contacts.map((contact) => (
        <ContactItem
          key={contact._id}
          contact={contact}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ContactList;

