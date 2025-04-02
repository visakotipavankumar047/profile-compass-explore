
import React, { createContext, useContext, useEffect, useState } from "react";
import { Profile, SearchFilters } from "@/types";
import { MOCK_PROFILES } from "@/data/mockData";
import { toast } from "@/components/ui/sonner";

interface ProfileContextType {
  profiles: Profile[];
  isLoading: boolean;
  error: string | null;
  addProfile: (profile: Omit<Profile, "id">) => void;
  updateProfile: (id: string, profile: Partial<Profile>) => void;
  deleteProfile: (id: string) => void;
  getProfileById: (id: string) => Profile | undefined;
  filteredProfiles: Profile[];
  searchFilters: SearchFilters;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({ query: "" });

  useEffect(() => {
    // Simulate fetching profiles from an API
    const loadProfiles = async () => {
      try {
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfiles(MOCK_PROFILES);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load profiles. Please try again later.");
        setIsLoading(false);
        toast.error("Failed to load profiles", {
          description: "Please try again later"
        });
      }
    };

    loadProfiles();
  }, []);

  const addProfile = (profile: Omit<Profile, "id">) => {
    const newProfile = {
      ...profile,
      id: `profile-${Date.now()}`,
    };
    
    setProfiles(prev => [...prev, newProfile]);
    toast.success("Profile added", {
      description: `${profile.name}'s profile has been created successfully`,
    });
  };

  const updateProfile = (id: string, updatedProfile: Partial<Profile>) => {
    setProfiles(prev => 
      prev.map(profile => 
        profile.id === id ? { ...profile, ...updatedProfile } : profile
      )
    );
    toast.success("Profile updated", {
      description: "The profile has been updated successfully",
    });
  };

  const deleteProfile = (id: string) => {
    const profileToDelete = profiles.find(profile => profile.id === id);
    setProfiles(prev => prev.filter(profile => profile.id !== id));
    
    toast.success("Profile deleted", {
      description: profileToDelete 
        ? `${profileToDelete.name}'s profile has been removed` 
        : "The profile has been removed successfully",
    });
  };

  const getProfileById = (id: string) => {
    return profiles.find(profile => profile.id === id);
  };

  // Filter profiles based on search criteria
  const filteredProfiles = profiles.filter(profile => {
    const matchesQuery = searchFilters.query 
      ? profile.name.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
        profile.bio.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
        (profile.company && profile.company.toLowerCase().includes(searchFilters.query.toLowerCase()))
      : true;
      
    const matchesLocation = searchFilters.location
      ? profile.address.city.toLowerCase().includes(searchFilters.location.toLowerCase()) ||
        profile.address.state.toLowerCase().includes(searchFilters.location.toLowerCase()) ||
        profile.address.country.toLowerCase().includes(searchFilters.location.toLowerCase())
      : true;
      
    return matchesQuery && matchesLocation;
  });

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        isLoading,
        error,
        addProfile,
        updateProfile,
        deleteProfile,
        getProfileById,
        filteredProfiles,
        searchFilters,
        setSearchFilters,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfiles = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfiles must be used within a ProfileProvider");
  }
  return context;
};
