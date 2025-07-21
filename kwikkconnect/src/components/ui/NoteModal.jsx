import React, { useState } from 'react';

const NoteModal = ({ open, onClose, onSave }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  if (!open) return null;

  const handleSave = () => {
    if (content.trim()) {
      onSave({
        id: Date.now(),
        author: author || 'Anonymous',
        content,
        timestamp: new Date().toISOString(),
      });
      setContent('');
      setAuthor('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add Note</h2>
        <input
          className="w-full mb-3 px-3 py-2 border rounded text-sm"
          placeholder="Your name (optional)"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <textarea
          className="w-full mb-3 px-3 py-2 border rounded text-sm"
          placeholder="Write your note here..."
          rows={4}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSave}
            disabled={!content.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal; 