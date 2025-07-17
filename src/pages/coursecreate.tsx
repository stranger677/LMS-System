import React, { useState } from 'react';

export default function CourseCreate() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && desc && code) {
      setMessage(`Course "${title}" created successfully!`);
      setTitle(''); setDesc(''); setCode('');
    } else {
      setMessage('All fields are required.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Create a New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Course Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Unique Course Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Course
        </button>
        {message && <p className="mt-2 text-sm text-green-700">{message}</p>}
      </form>
    </div>
  );
}
