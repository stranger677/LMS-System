# 🎓 ExamVerse LMS — Course & Exam Management System

**ExamVerse** is a responsive, user-friendly Learning Management System (LMS) built using React, TypeScript, Tailwind CSS, and Vite. Designed as a course project for academic purposes, the platform supports seamless management of courses, assignments, and online exams for both instructors and students.

---

## 📚 Features

### 👩‍🏫 Instructor Dashboard
- Create and manage courses
- Post announcements and share learning materials
- Design timed online exams (MCQ + short answer)
- Assign exams to specific student cohorts
- View and grade student submissions

### 👨‍🎓 Student Dashboard
- Enroll in courses using course codes
- View course announcements and learning materials
- Submit assignments
- Take online exams with timer and auto-submission
- Access grades and instructor feedback

### ⚙️ Admin Capabilities
- Manage users (instructors, students)
- Oversee system-wide course and exam management

---

## 🚀 Tech Stack

| Technology     | Purpose                          |
|----------------|----------------------------------|
| React + Vite   | Frontend framework and dev server |
| TypeScript     | Typed JavaScript                 |
| Tailwind CSS   | Responsive UI styling            |
| npm            | Package management               |

---

## 📁 Project Structure
exam-verse-lms-main/
├── public/ # Static assets (favicon, etc.)
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page components (Exam, Dashboard, etc.)
│ ├── App.tsx # App entry point
│ └── main.tsx # ReactDOM render
├── package.json # Project metadata
├── vite.config.ts # Dev/build config
└── tailwind.config.ts # Tailwind CSS config


---

## 🧪 Getting Started (Dev Setup)

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/exam-verse-lms.git
cd exam-verse-lms

🛡 Security & Integrity
Exams auto-submit when time ends

MCQs are graded instantly

Short answers are stored for manual review

Students cannot revisit expired exams

✍️ Author & Acknowledgments
This project was developed as part of a university course in Web Engineering.
All code was written and customized by the 
## 👥 Contributors
 
🔹 👩‍🎨 Developer 1: UI/Component Developer
✅ Tasks:
Build reusable UI components:

Buttons, Modals, Cards, Alerts, Input fields

Implement layout components:

Navbar, Sidebar, Footer, PageWrapper

Apply Tailwind CSS for styling

Ensure mobile responsiveness

Work in components/, index.css, App.css

Handle public/ assets like icons and logos

✨ Deliverables:
Well-designed and styled components

Fully responsive layouts

Component props configured for reusability


🔹 👨‍💻 Developer 2: Page Logic & State Manager
✅ Tasks:
Handle routing and navigation in App.tsx

Implement each pages/ file (e.g., Dashboard, Login, Results)

Create and use hooks/ (e.g., useAuth, useForm)

Use utilities from lib/ for API calls, auth tokens, etc.

Bind form input and handle submission logic

Connect components from Developer 1 with page logic

✨ Deliverables:
Fully functional pages with connected logic

State management using React hooks

Dynamic routing 

, using modern frontend technologies and best practices.


---


