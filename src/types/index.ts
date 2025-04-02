
export interface Profile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    latitude: number;
    longitude: number;
  };
  email: string;
  phone: string;
  website?: string;
  company?: string;
  jobTitle?: string;
  skills?: string[];
  interests?: string[];
}

export interface SearchFilters {
  query: string;
  location?: string;
}
