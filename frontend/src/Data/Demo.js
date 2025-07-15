const demo = {
  firstName: "James",
  lastName: "Carter",
  jobTitle: "Full Stack Developer",
  address: "525 N Tryon Street, NC 28117",
  phone: "(123)-456-7890",
  email: "example@gmail.com",
  pincode: "625706",
  github: "https:localhost:5173/",
  linkedin: "https:localhost:5173/",
  portfolio: "https:localhost:5173/",
  themeColor: "#000000",
  summary:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  Experience: [
    {
      id: 1,
      title: "Full Stack Developer",
      companyName: "Amazon",
      city: "New York",
      state: "NY",
      startDate: "Jan 2021",
      endDate: "Jan 2021",
      currentlyWorking: false,
      workSummary: `
        Designed, developed, and maintained full-stack applications using React and Node.js.
        Implemented responsive user interfaces with React, ensuring seamless user experiences across various devices and browsers.
        Maintaining the React Native in-house organization application.
        Created RESTful APIs with Node.js and Express, facilitating data communication between the front-end and back-end systems.
      `,
    },
    {
      id: 2,
      title: "Frontend Developer",
      companyName: "Google",
      city: "Charlotte",
      state: "NC",
      startDate: "May 2019",
      endDate: "Jan 2021",
      currentlyWorking: false,
      workSummary: `
        Designed, developed, and maintained full-stack applications using React and Node.js.
        Implemented responsive user interfaces with React, ensuring seamless user experiences across various devices and browsers.
        Maintaining the React Native in-house organization application.
        Created RESTful APIs with Node.js and Express, facilitating data communication between the front-end and back-end systems.
      `,
    },
  ],
  project: [
    {
      projectId: 101,
      projectTitle: "E-Commerce Platform",
      company: "Amazon",
      duration: "Jan 2021 - Present",
      techStack: ["React", "Node.js", "MongoDB"],
      description:
        "Designed and developed a scalable full-stack e-commerce platform capable of handling millions of transactions efficiently. Implemented a microservices architecture with secure payment integrations, real-time order tracking, and an optimized recommendation engine using AI. Enhanced user experience with a responsive UI/UX, ensuring seamless navigation across devices. Leveraged caching mechanisms and database optimization techniques to improve performance and reduce latency. Integrated third-party APIs for logistics, payment gateways, and inventory management, resulting in a 40% increase in operational efficiency.",
    },
    {
      projectId: 102,
      projectTitle: "AI Chatbot",
      company: "Google",
      duration: "Jun 2020 - Dec 2020",
      techStack: ["React", "Python", "NLP"],
      description:
        "Developed an AI-powered chatbot for customer support, leveraging natural language processing (NLP) to improve response accuracy by 60%. Integrated the chatbot with various customer service channels, including live chat, email, and social media. Implemented machine learning models to enhance intent recognition and automate frequently asked queries, reducing support workload by 50%. Designed a user-friendly interface for seamless interactions, ensuring a smooth customer experience. Optimized the chatbot's performance using cloud-based deployment and real-time analytics, enabling proactive issue resolution and personalized customer engagement.",
    },
  ],
  Education: [
    {
      id: 1,
      institutionName: "Western Illinois University",
      location: "Macomb, Illinois, USA",
      degree: "Bachelor of Technology",
      fieldOfStudy: "Computer Science",
      yearOfPassout: 2019,
      cgpa: 3.8,
    },
    {
      id: 2,
      institutionName: "ABC Institute of Technology",
      location: "Chennai, India",
      degree: "Bachelor of Technology",
      fieldOfStudy: "Computer Science",
      yearOfPassout: 2020,
      cgpa: 8.7,
    },
  ],
  Course: [
    {
      id: 1,
      name: "HTML Basics",
      institute: "ABC Institute",
      location: "New York, USA",
      completed_date: "Jan -2021",
      description:
        "An introductory course covering the fundamentals of HTML, including tags, elements, forms, tables, and best practices.",
      tags: ["HTML", "Web Development", "Frontend", "Beginner"],
    },
    {
      id: 2,
      name: "CSS Fundamentals",
      institute: "XYZ Academy",
      location: "London, UK",
      completed_date: "Jan -2022",
      description:
        "A foundational course on CSS, covering styling, layouts, flexbox, grid, and responsive design.",
      tags: ["CSS", "Styling", "Web Design"],
    },
  ],

  skills: [
    {
      id: 1,
      name: "Angular",
      rating: 0,
    },
    {
      id: 2,
      name: "React",
      rating: 0,
    },
    {
      id: 3,
      name: "MySQL",
      rating: 0,
    },
    {
      id: 4,
      name: "React Native",
      rating: 0,
    },
  ],
  SoftSkills: [
    {
      id: 1,
      name: "Communication",
      rating: 0,
    },
    {
      id: 2,
      name: "Teamwork",
      rating: 0,
    },
    {
      id: 3,
      name: "Problem-Solving",
      rating: 0,
    },
    {
      id: 4,
      name: "Leadership",
      rating: 0,
    },
    {
      id: 5,
      name: "Time Management",
      rating: 0,
    },
    {
      id: 6,
      name: "Adaptability",
      rating: 0,
    },
  ],
};

export default demo;
