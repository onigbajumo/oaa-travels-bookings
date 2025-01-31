const courses = [
  {
    title: "Frontend Web Development",
    rating: "4.5",
    slug: "frontend-web-development",
    category: "development",
    description: `Learn to build dynamic, responsive websites and applications
                    from scratch. This course offers an in-depth exploration of both
                    front-end and back-end development, equipping you with the
                    skills to create robust and scalable web applications`,
    duration: "6 months",
    tag: "Beginner",
    mode: ["Onsite", "Virtual"],
    image: "https://placehold.co/500.png",
    highlights: [
      "Comprehensive Curriculum",
      "Hands-On Projects",
      "Beginner Friendly",
      "Flexible Learning Modes",
    ],
    skills: ["html", "css", "javascript", "react", "nodejs", "mongodb"],
    instructor: {
      name: "John Doe",
      image: "https://placehold.co/500.png",
      bio: "John is a seasoned full-stack developer with over 10 years of experience in building web applications. He has worked with several startups and tech companies, helping them build scalable and robust web applications.",
      experience: "Senior Fullstack Developer | 10+ Years of Experience",
    },
    curriculum: [
      {
        module: "Module 1: Introduction to Web Development",
        topics: [
          "Introduction to Web Development",
          "HTML Basics",
          "CSS Basics",
          "JavaScript Basics",
        ],
      },
      {
        module: "Module 2: Front-End Development",
        topics: [
          "Advanced CSS",
          "Responsive Layouts",
          "JavaScript DOM Manipulation",
          "Frameworks (React, Vue, or Angular)",
        ],
      },
      {
        module: "Module 3: Back-End & Database",
        topics: [
          "Node.js & Express",
          "APIs & RESTful Services",
          "Database (MongoDB, SQL)",
          "Authentication & Security",
        ],
      },
    ],
    payments: [
        { mode: "Virtual", plan: "One-time", price: "₦200,000" },
        { mode: "Onsite", plan: "One-time", price: "₦250,000" },
        { mode: "Virtual", plan: "Monthly", price: "₦200,000" },
        { mode: "Onsite", plan: "Monthly", price: "₦250,000" },
      ],
  },
  {
    title: "Full-Stack Web Development",
    rating: "1.5",
    slug: "full-stack-web-development",
    category: "development",
    description: `Learn to build dynamic, responsive websites and applications
                    from scratch. This course offers an in-depth exploration of both
                    front-end and back-end development, equipping you with the
                    skills to create robust and scalable web applications`,
    duration: "7 months",
    tag: "Advanced",
    mode: ["Onsite", "Virtual"],
    image: "https://placehold.co/500.png",
    highlights: [
      "Comprehensive Curriculum",
      "Hands-On Projects",
      "Beginner Friendly",
      "Flexible Learning Modes",
    ],
    skills: ["html", "css", "javascript", "react", "nodejs", "mongodb"],
    instructor: {
      name: "John Doe",
      image: "https://placehold.co/500.png",
      bio: "John is a seasoned full-stack developer with over 10 years of experience in building web applications. He has worked with several startups and tech companies, helping them build scalable and robust web applications.",
      experience: "Senior Fullstack Developer | 10+ Years of Experience",
    },
    curriculum: [
      {
        module: "Module 1: Introduction to Web Development",
        topics: [
          "Introduction to Web Development",
          "HTML Basics",
          "CSS Basics",
          "JavaScript Basics",
        ],
      },
      {
        module: "Module 2: Front-End Development",
        topics: [
          "Advanced CSS",
          "Responsive Layouts",
          "JavaScript DOM Manipulation",
          "Frameworks (React, Vue, or Angular)",
        ],
      },
      {
        module: "Module 3: Back-End & Database",
        topics: [
          "Node.js & Express",
          "APIs & RESTful Services",
          "Database (MongoDB, SQL)",
          "Authentication & Security",
        ],
      },
    ],
    payments: [
        { mode: "Virtual", plan: "One-time", price: "₦200,000" },
        { mode: "Onsite", plan: "One-time", price: "₦250,000" },
      ],
  },
  {
    title: "Full-Stack Web Development",
    rating: "3.5",
    slug: "full-stack-web-development",
    category: "development",
    description: `Learn to build dynamic, responsive websites and applications
                    from scratch. This course offers an in-depth exploration of both
                    front-end and back-end development, equipping you with the
                    skills to create robust and scalable web applications`,
    duration: "2 months",
    tag: "Intermediate",
    mode: ["Onsite", "Virtual"],
    image: "https://placehold.co/500.png",
    highlights: [
      "Comprehensive Curriculum",
      "Hands-On Projects",
      "Beginner Friendly",
      "Flexible Learning Modes",
    ],
    skills: ["html", "css", "javascript", "react", "nodejs", "mongodb"],
    instructor: {
      name: "John Doe",
      image: "https://placehold.co/500.png",
      bio: "John is a seasoned full-stack developer with over 10 years of experience in building web applications. He has worked with several startups and tech companies, helping them build scalable and robust web applications.",
      experience: "Senior Fullstack Developer | 10+ Years of Experience",
    },
    curriculum: [
      {
        module: "Module 1: Introduction to Web Development",
        topics: [
          "Introduction to Web Development",
          "HTML Basics",
          "CSS Basics",
          "JavaScript Basics",
        ],
      },
      {
        module: "Module 2: Front-End Development",
        topics: [
          "Advanced CSS",
          "Responsive Layouts",
          "JavaScript DOM Manipulation",
          "Frameworks (React, Vue, or Angular)",
        ],
      },
      {
        module: "Module 3: Back-End & Database",
        topics: [
          "Node.js & Express",
          "APIs & RESTful Services",
          "Database (MongoDB, SQL)",
          "Authentication & Security",
        ],
      },
    ],
    payments: [
        { mode: "Virtual", plan: "One-time", price: "₦200,000" },
        { mode: "Onsite", plan: "One-time", price: "₦250,000" },
      ],
  },
  {
    title: "UI UX design",
    rating: "4.5",
    slug: "ui-ux-design",
    category: "design",
    description: `Learn to build dynamic, responsive websites and applications
                    from scratch. This course offers an in-depth exploration of both
                    front-end and back-end development, equipping you with the
                    skills to create robust and scalable web applications`,
    duration: "3 months",
    tag: "Beginner",
    mode: ["Onsite", "Virtual"],
    image: "https://placehold.co/500.png",
    highlights: [
      "Comprehensive Curriculum",
      "Hands-On Projects",
      "Beginner Friendly",
      "Flexible Learning Modes",
    ],
    skills: ["html", "css", "javascript", "react", "nodejs", "mongodb"],
    instructor: {
      name: "John Doe",
      image: "https://placehold.co/500.png",
      bio: "John is a seasoned full-stack developer with over 10 years of experience in building web applications. He has worked with several startups and tech companies, helping them build scalable and robust web applications.",
      experience: "Senior Fullstack Developer | 10+ Years of Experience",
    },
    curriculum: [
      {
        module: "Module 1: Introduction to Web Development",
        topics: [
          "Introduction to Web Development",
          "HTML Basics",
          "CSS Basics",
          "JavaScript Basics",
        ],
      },
      {
        module: "Module 2: Front-End Development",
        topics: [
          "Advanced CSS",
          "Responsive Layouts",
          "JavaScript DOM Manipulation",
          "Frameworks (React, Vue, or Angular)",
        ],
      },
      {
        module: "Module 3: Back-End & Database",
        topics: [
          "Node.js & Express",
          "APIs & RESTful Services",
          "Database (MongoDB, SQL)",
          "Authentication & Security",
        ],
      },
    ],
    payments: [
        { mode: "Virtual", plan: "One-time", price: "₦200,000" },
        { mode: "Onsite", plan: "One-time", price: "₦250,000" },
      ],
  },
];

export default courses;
