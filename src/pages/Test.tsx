// File: pages/TakeExam.tsx
import React, { useEffect, useState } from 'react';

// Dummy exam data for frontend demo
const examData = {
  title: 'Web Engineering Midterm',
  duration: 10, // in minutes
  questions: [
    {
      id: 1,
      type: 'mcq',
      question: 'What does HTML stand for?',
      options: ['Hyper Trainer Marking Language', 'Hyper Text Markup Language', 'Hyper Text Marketing Language', 'None of the above'],
      answer: 'Hyper Text Markup Language',
      points: 2
    },
    {
      id: 2,
      type: 'short',
      question: 'Explain the difference between GET and POST methods.',
      expected: '',
      points: 5
    }
  ]
};

export default function Test() {
  const [timeLeft, setTimeLeft] = useState(examData.duration * 60);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0 && !submitted) {
      handleSubmit();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, submitted]);

  const handleChange = (qid: number, value: string) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = () => {
    let total = 0;
    examData.questions.forEach(q => {
      if (q.type === 'mcq' && answers[q.id] === q.answer) {
        total += q.points;
      }
    });
    setScore(total);
    setSubmitted(true);
  };

  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${('0' + seconds % 60).slice(-2)}`;

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Exam Submitted</h2>
        <p className="text-lg">✅ Your score (MCQ only): <strong>{score}</strong></p>
        <p className="mt-2">📌 Your short answers have been submitted for manual review.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">{examData.title}</h1>
      <div className="mb-4 text-right font-mono text-red-600">⏰ Time Left: {formatTime(timeLeft)}</div>

      {examData.questions.map((q, idx) => (
        <div key={q.id} className="mb-6 border p-4 rounded bg-gray-50">
          <p className="font-semibold mb-2">{idx + 1}. {q.question}</p>
          {q.type === 'mcq' ? (
            q.options.map((opt, i) => (
              <div key={i} className="mb-1">
                <label className="flex items-center space-x-2">
                  <input type="radio" name={`q${q.id}`} value={opt} onChange={() => handleChange(q.id, opt)} />
                  <span>{opt}</span>
                </label>
              </div>
            ))
          ) : (
            <textarea className="w-full p-2 border rounded" rows={3} placeholder="Your answer..." onChange={(e) => handleChange(q.id, e.target.value)}></textarea>
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Submit Exam
      </button>
    </div>
  );
}
