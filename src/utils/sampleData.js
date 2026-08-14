// Sample data for first-time users

export const sampleLetters = [
  {
    id: 'sample-1',
    name: 'Frontend Developer — TechCorp',
    status: 'draft',
    template: 'modern',
    personalInfo: {
      fullName: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'https://linkedin.com/in/alexjohnson',
      portfolio: 'https://alexjohnson.dev'
    },
    jobInfo: {
      jobTitle: 'Frontend Developer',
      company: 'TechCorp',
      hiringManager: 'Sarah Chen',
      jobUrl: 'https://techcorp.com/careers/frontend-developer',
      location: 'San Francisco, CA',
      employmentType: 'full-time'
    },
    content: {
      opening: 'I am excited to apply for the Frontend Developer position at TechCorp. With my passion for creating intuitive user interfaces and my experience with modern web technologies, I believe I would be a valuable addition to your team.',
      background: 'I have over 5 years of experience in frontend development, specializing in React and modern JavaScript. I have successfully delivered multiple projects for e-commerce platforms and SaaS applications, consistently improving user engagement and performance metrics.',
      skills: ['React', 'JavaScript', 'TypeScript', 'CSS3', 'HTML5', 'Git', 'REST APIs'],
      achievements: [
        {
          id: 'ach-1',
          title: 'Performance Optimization',
          description: 'Reduced page load time by 40% through code optimization and lazy loading implementation.'
        },
        {
          id: 'ach-2',
          title: 'Component Library',
          description: 'Built a reusable component library that reduced development time by 30% across teams.'
        }
      ],
      whyCompany: 'TechCorp has established itself as a leader in innovative technology solutions. I am particularly impressed by your commitment to user-centered design and your recent work in the fintech space. The opportunity to contribute to projects that impact millions of users is incredibly motivating.',
      whyFit: 'My experience with React and modern frontend frameworks aligns perfectly with your tech stack. I have a strong track record of collaborating with design teams to translate wireframes into pixel-perfect implementations. My problem-solving skills and attention to detail would enable me to contribute immediately to your development efforts.',
      closing: 'Thank you for considering my application. I would welcome the opportunity to discuss how my skills and experience align with TechCorp needs. I look forward to hearing from you.'
    },
    createdAt: '2026-08-10T10:00:00.000Z',
    updatedAt: '2026-08-14T10:00:00.000Z'
  },
  {
    id: 'sample-2',
    name: 'UI Developer — DesignStudio',
    status: 'ready',
    template: 'classic',
    personalInfo: {
      fullName: 'Jordan Smith',
      email: 'jordan.smith@email.com',
      phone: '(555) 987-6543',
      location: 'New York, NY',
      linkedin: 'https://linkedin.com/in/jordansmith',
      portfolio: 'https://jordansmith.design'
    },
    jobInfo: {
      jobTitle: 'UI Developer',
      company: 'DesignStudio',
      hiringManager: 'Michael Brown',
      jobUrl: 'https://designstudio.com/careers/ui-developer',
      location: 'New York, NY',
      employmentType: 'full-time'
    },
    content: {
      opening: 'I am writing to express my strong interest in the UI Developer position at DesignStudio. As a developer with a keen eye for design and extensive experience in creating beautiful, functional interfaces, I am confident in my ability to contribute to your award-winning projects.',
      background: 'Throughout my career, I have focused on bridging the gap between design and development. I have worked closely with UX designers to bring their visions to life while ensuring technical feasibility and optimal performance. My background includes work with various industries, from healthcare to entertainment.',
      skills: ['React', 'Vue.js', 'CSS/SASS', 'Figma', 'Adobe XD', 'Animation', 'Responsive Design'],
      achievements: [
        {
          id: 'ach-3',
          title: 'Design System Implementation',
          description: 'Implemented a comprehensive design system that ensured consistency across 15+ products.'
        },
        {
          id: 'ach-4',
          title: 'Accessibility Improvements',
          description: 'Improved WCAG compliance from 60% to 95% across all company products.'
        }
      ],
      whyCompany: 'DesignStudio reputation for creating visually stunning and highly functional user interfaces is well-known in the industry. I am drawn to your collaborative approach to design and development, and I admire how you push creative boundaries while maintaining usability standards.',
      whyFit: 'My dual expertise in design and development makes me uniquely qualified for this role. I understand design principles deeply while also possessing the technical skills to implement them efficiently. My experience with design tools like Figma, combined with my React expertise, allows me to work seamlessly with both design and development teams.',
      closing: 'I am eager to bring my passion for creating exceptional user experiences to DesignStudio. Thank you for your time and consideration. I would appreciate the opportunity to discuss how I can contribute to your continued success.'
    },
    createdAt: '2026-08-05T10:00:00.000Z',
    updatedAt: '2026-08-12T10:00:00.000Z'
  }
];

export const sampleProfile = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  portfolio: ''
};

export const sampleSettings = {
  defaultTemplate: 'classic',
  defaultEmploymentType: 'full-time'
};
