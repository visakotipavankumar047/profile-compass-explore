
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProfiles } from "@/context/ProfileContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Badge } from "@/components/ui/badge";
import LoadingState from "@/components/LoadingState";
import { Profile } from "@/types";

interface LocationMarkerProps {
  position: [number, number];
  setPosition: (position: [number, number]) => void;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return <Marker position={position} />;
};

const ProfileForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addProfile, getProfileById, updateProfile } = useProfiles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  
  const isEditMode = id !== undefined;
  const existingProfile = id ? getProfileById(id) : undefined;
  
  const [profileData, setProfileData] = useState<Omit<Profile, "id">>({
    name: "",
    bio: "",
    avatar: "",
    email: "",
    phone: "",
    website: "",
    company: "",
    jobTitle: "",
    skills: [],
    interests: [],
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      latitude: 40.7128,
      longitude: -74.0060,
    },
  });

  useEffect(() => {
    if (isEditMode && existingProfile) {
      setProfileData({ ...existingProfile });
    }
    
    // Simulate API loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [existingProfile, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setProfileData({
        ...profileData,
        address: {
          ...profileData.address,
          [addressField]: value,
        },
      });
    } else {
      setProfileData({
        ...profileData,
        [name]: value,
      });
    }
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault();
      if (!profileData.skills) {
        setProfileData({ ...profileData, skills: [newSkill.trim()] });
      } else {
        setProfileData({ 
          ...profileData, 
          skills: [...profileData.skills, newSkill.trim()] 
        });
      }
      setNewSkill("");
    }
  };

  const handleAddInterest = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newInterest.trim()) {
      e.preventDefault();
      if (!profileData.interests) {
        setProfileData({ ...profileData, interests: [newInterest.trim()] });
      } else {
        setProfileData({ 
          ...profileData, 
          interests: [...profileData.interests, newInterest.trim()] 
        });
      }
      setNewInterest("");
    }
  };

  const handleRemoveSkill = (indexToRemove: number) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills?.filter((_, index) => index !== indexToRemove) || [],
    });
  };

  const handleRemoveInterest = (indexToRemove: number) => {
    setProfileData({
      ...profileData,
      interests: profileData.interests?.filter((_, index) => index !== indexToRemove) || [],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Simple validation
      if (!profileData.name || !profileData.email || !profileData.address.street) {
        toast.error("Please fill in all required fields", {
          description: "Name, email and address are required"
        });
        setSaving(false);
        return;
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isEditMode && id) {
        updateProfile(id, profileData);
        toast.success("Profile updated", {
          description: "The profile has been updated successfully"
        });
      } else {
        addProfile(profileData);
        toast.success("Profile created", {
          description: `${profileData.name}'s profile has been created successfully`
        });
      }
      
      navigate(id ? `/profile/${id}` : "/");
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again"
      });
    } finally {
      setSaving(false);
    }
  };

  const setMapPosition = (position: [number, number]) => {
    setProfileData({
      ...profileData,
      address: {
        ...profileData.address,
        latitude: position[0],
        longitude: position[1],
      },
    });
  };

  if (loading) {
    return <LoadingState message={isEditMode ? "Loading profile..." : "Preparing form..."} />;
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">
          {isEditMode ? "Edit Profile" : "Create New Profile"}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="admin-form-group">
                <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input
                  id="avatar"
                  name="avatar"
                  value={profileData.avatar}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                />
                {profileData.avatar && (
                  <div className="mt-2">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={profileData.avatar}
                        alt="Avatar preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://i.pravatar.cc/300";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="admin-form-group">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="admin-form-group">
                <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="admin-form-group">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={profileData.website || ""}
                  onChange={handleChange}
                  placeholder="www.example.com"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="admin-form-group">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={profileData.jobTitle || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="admin-form-group">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={profileData.company || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="admin-form-group">
                <Label htmlFor="skills">Skills (Press enter to add)</Label>
                <Input
                  id="skills"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleAddSkill}
                  placeholder="Add a skill and press Enter"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {profileData.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveSkill(index)}>
                      {skill} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="admin-form-group">
                <Label htmlFor="interests">Interests (Press enter to add)</Label>
                <Input
                  id="interests"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyDown={handleAddInterest}
                  placeholder="Add an interest and press Enter"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {profileData.interests?.map((interest, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer" onClick={() => handleRemoveInterest(index)}>
                      {interest} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="admin-form-group">
                <Label htmlFor="address.street">Street <span className="text-destructive">*</span></Label>
                <Input
                  id="address.street"
                  name="address.street"
                  value={profileData.address.street}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <Label htmlFor="address.city">City</Label>
                <Input
                  id="address.city"
                  name="address.city"
                  value={profileData.address.city}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="admin-form-group">
                  <Label htmlFor="address.state">State</Label>
                  <Input
                    id="address.state"
                    name="address.state"
                    value={profileData.address.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="admin-form-group">
                  <Label htmlFor="address.postalCode">Postal Code</Label>
                  <Input
                    id="address.postalCode"
                    name="address.postalCode"
                    value={profileData.address.postalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <Label htmlFor="address.country">Country</Label>
                <Input
                  id="address.country"
                  name="address.country"
                  value={profileData.address.country}
                  onChange={handleChange}
                />
              </div>
              
              <div className="admin-form-group">
                <Label>Map Location (Click to set)</Label>
                <div className="h-[200px] w-full rounded-md overflow-hidden mt-1 border">
                  <MapContainer
                    center={[profileData.address.latitude, profileData.address.longitude]}
                    zoom={13}
                    className="h-full w-full"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker
                      position={[profileData.address.latitude, profileData.address.longitude]}
                      setPosition={setMapPosition}
                    />
                  </MapContainer>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Click on the map to set the location coordinates
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardFooter className="flex justify-end gap-2 py-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              {isEditMode ? "Update Profile" : "Create Profile"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ProfileForm;
