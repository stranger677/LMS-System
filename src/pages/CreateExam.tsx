// File: pages/CreateExam.tsx
import React, { useState } from 'react';

export default function CreateExam() {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [cohort, setCohort] = useState('');
  const [questions, setQuestions] = useState([{ 
    type: 'mcq', 
    question: '', 
    options: ['', '', '', ''], 
    answer: '', 
    points: '', 
    shortAnswer: '' 
  }]);
  const [message, setMessage] = useState('');

  const addQuestion = () => {
    setQuestions([...questions, { type: 'mcq', question: '', options: ['', '', '', ''], answer: '', points: '', shortAnswer: '' }]);
  };

  const updateQuestion = (index: number, key: string, value: any) => {
    const newQuestions = [...questions];
    if (key === 'options') {
      newQuestions[index].options = value;
    } else {
      newQuestions[index][key] = value;
    }
    setQuestions(newQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`Exam "${title}" created for ${cohort} with ${questions.length} question(s).`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Create New Exam</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Exam Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Duration (minutes)" value={duration} onChange={e => setDuration(e.target.value)} className="w-full p-2 border rounded" />
        <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} className="w-full p-2 border rounded" />
        <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Assign to Cohort (e.g., Section A)" value={cohort} onChange={e => setCohort(e.target.value)} className="w-full p-2 border rounded" />

        <h3 className="text-lg font-semibold mt-6">Questions</h3>
        {questions.map((q, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded shadow-inner space-y-2">
            <select value={q.type} onChange={e => updateQuestion(index, 'type', e.target.value)} className="w-full p-2 border rounded">
              <option value="mcq">Multiple Choice</option>
              <option value="short">Short Answer</option>
            </select>
            <textarea placeholder={`Question ${index + 1}`} value={q.question} onChange={e => updateQuestion(index, 'question', e.target.value)} className="w-full p-2 border rounded" />
            {q.type === 'mcq' ? (
              <>
                {q.options.map((opt, i) => (
                  <input key={i} type="text" placeholder={`Option ${i + 1}`} value={opt} onChange={e => {
                    const newOpts = [...q.options];
                    newOpts[i] = e.target.value;
                    updateQuestion(index, 'options', newOpts);
                  }} className="w-full p-2 border rounded" />
                ))}
                <input type="text" placeholder="Correct Answer" value={q.answer} onChange={e => updateQuestion(index, 'answer', e.target.value)} className="w-full p-2 border rounded" />
              </>
            ) : (
              <textarea placeholder="Expected Answer (for manual grading)" value={q.shortAnswer} onChange={e => updateQuestion(index, 'shortAnswer', e.target.value)} className="w-full p-2 border rounded" />
            )}
            <input type="text" placeholder="Points" value={q.points} onChange={e => updateQuestion(index, 'points', e.target.value)} className="w-full p-2 border rounded" />
          </div>
        ))}

        <button type="button" onClick={addQuestion} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          ➕ Add Another Question
        </button>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Create Exam
        </button>

        {message && <p className="mt-2 text-green-600 font-medium">{message}</p>}
      </form>
    </div>
  );
}
