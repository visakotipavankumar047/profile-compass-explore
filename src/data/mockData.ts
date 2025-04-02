
import { Profile } from "@/types";

export const MOCK_PROFILES: Profile[] = [
  {
    id: "profile-1",
    name: "Emma Johnson",
    avatar: "https://i.pravatar.cc/300?img=1",
    bio: "UX/UI Designer with 5 years of experience in creating user-friendly interfaces for web and mobile applications.",
    address: {
      street: "123 Design Avenue",
      city: "San Francisco",
      state: "California",
      country: "USA",
      postalCode: "94105",
      latitude: 37.7749,
      longitude: -122.4194
    },
    email: "emma.johnson@example.com",
    phone: "(555) 123-4567",
    website: "www.emmajohnson.design",
    company: "CreativeTech Solutions",
    jobTitle: "Senior UX Designer",
    skills: ["UI Design", "User Research", "Prototyping", "Figma", "Adobe XD"],
    interests: ["Art", "Photography", "Travel"]
  },
  {
    id: "profile-2",
    name: "David Chen",
    avatar: "https://i.pravatar.cc/300?img=8",
    bio: "Full Stack Developer specializing in React, Node.js, and cloud infrastructure with AWS.",
    address: {
      street: "456 Tech Boulevard",
      city: "Seattle",
      state: "Washington",
      country: "USA",
      postalCode: "98101",
      latitude: 47.6062,
      longitude: -122.3321
    },
    email: "david.chen@example.com",
    phone: "(555) 987-6543",
    website: "www.davidchendev.com",
    company: "TechNova",
    jobTitle: "Senior Developer",
    skills: ["JavaScript", "React", "Node.js", "AWS", "TypeScript"],
    interests: ["Coding", "Hiking", "Gaming"]
  },
  {
    id: "profile-3",
    name: "Sophia Patel",
    avatar: "https://i.pravatar.cc/300?img=5",
    bio: "Product Manager with a background in marketing and a passion for bringing innovative products to market.",
    address: {
      street: "789 Innovation Drive",
      city: "Austin",
      state: "Texas",
      country: "USA",
      postalCode: "78701",
      latitude: 30.2672,
      longitude: -97.7431
    },
    email: "sophia.patel@example.com",
    phone: "(555) 246-8135",
    website: "www.sophiapatel.pro",
    company: "ProductPulse",
    jobTitle: "Product Manager",
    skills: ["Product Strategy", "Market Research", "Agile", "Data Analysis"],
    interests: ["Reading", "Yoga", "Cooking"]
  },
  {
    id: "profile-4",
    name: "Michael Rodriguez",
    avatar: "https://i.pravatar.cc/300?img=11",
    bio: "Data Scientist with expertise in machine learning algorithms and predictive modeling.",
    address: {
      street: "101 Data Lane",
      city: "Boston",
      state: "Massachusetts",
      country: "USA",
      postalCode: "02110",
      latitude: 42.3601,
      longitude: -71.0589
    },
    email: "michael.rodriguez@example.com",
    phone: "(555) 369-2580",
    company: "DataDriven Analytics",
    jobTitle: "Lead Data Scientist",
    skills: ["Python", "Machine Learning", "Statistical Analysis", "TensorFlow"],
    interests: ["Chess", "Running", "Science Fiction"]
  },
  {
    id: "profile-5",
    name: "Olivia Thompson",
    avatar: "https://i.pravatar.cc/300?img=9",
    bio: "Marketing Director with over 10 years of experience in digital marketing and brand strategy.",
    address: {
      street: "456 Marketing Street",
      city: "Chicago",
      state: "Illinois",
      country: "USA",
      postalCode: "60601",
      latitude: 41.8781,
      longitude: -87.6298
    },
    email: "olivia.thompson@example.com",
    phone: "(555) 741-9630",
    website: "www.oliviathompson.marketing",
    company: "BrandForward",
    jobTitle: "Marketing Director",
    skills: ["Digital Marketing", "Brand Strategy", "Content Creation", "Analytics"],
    interests: ["Fashion", "Music", "Fine Dining"]
  },
  {
    id: "profile-6",
    name: "James Wilson",
    avatar: "https://i.pravatar.cc/300?img=15",
    bio: "Cybersecurity Specialist focusing on network security and penetration testing.",
    address: {
      street: "212 Security Road",
      city: "New York",
      state: "New York",
      country: "USA",
      postalCode: "10001",
      latitude: 40.7128,
      longitude: -74.0060
    },
    email: "james.wilson@example.com",
    phone: "(555) 852-9631",
    company: "SecureShield",
    jobTitle: "Security Lead",
    skills: ["Network Security", "Penetration Testing", "Risk Assessment", "Encryption"],
    interests: ["Puzzles", "Martial Arts", "Cybersecurity Conferences"]
  }
];
