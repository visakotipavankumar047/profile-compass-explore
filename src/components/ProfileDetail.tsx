import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProfiles } from "@/context/ProfileContext";
import { MapContainer, TileLayer, Marker, Popup } from "@/components/Map";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Building,
  Briefcase,
  ArrowLeft,
  Edit,
  Trash2,
  AlertTriangle
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import LoadingState from "@/components/LoadingState";
import { Separator } from "@/components/ui/separator";

const ProfileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProfileById, deleteProfile } = useProfiles();
  const [profile, setProfile] = useState(id ? getProfileById(id) : undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating API fetch delay
    const timer = setTimeout(() => {
      setProfile(id ? getProfileById(id) : undefined);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id, getProfileById]);

  const handleDelete = () => {
    if (id) {
      deleteProfile(id);
      navigate("/");
    }
  };

  if (loading) {
    return <LoadingState message="Loading profile..." />;
  }

  if (!profile) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 text-destructive" />
              Profile Not Found
            </CardTitle>
            <CardDescription>
              The profile you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link to="/">
                <ArrowLeft size={16} className="mr-2" />
                Back to Profiles
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/">
            <ArrowLeft size={16} className="mr-2" />
            Back to Profiles
          </Link>
        </Button>
        
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link to={`/admin/edit/${profile.id}`}>
              <Edit size={16} className="mr-2" />
              Edit
            </Link>
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 size={16} className="mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Profile</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {profile.name}'s profile? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-background shadow-md">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://i.pravatar.cc/300";
                    }}
                  />
                </div>
                <CardTitle>{profile.name}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Briefcase size={14} className="mr-1" />
                  {profile.jobTitle || "Professional"}
                </CardDescription>
                {profile.company && (
                  <span className="text-sm text-muted-foreground flex items-center mt-1">
                    <Building size={14} className="mr-1" />
                    {profile.company}
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mt-1 mr-2 text-muted-foreground" />
                  <div className="text-sm">
                    <div>{profile.address.street}</div>
                    <div>
                      {profile.address.city}, {profile.address.state} {profile.address.postalCode}
                    </div>
                    <div>{profile.address.country}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                  <a href={`mailto:${profile.email}`} className="text-sm hover:underline">
                    {profile.email}
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                  <a href={`tel:${profile.phone}`} className="text-sm hover:underline">
                    {profile.phone}
                  </a>
                </div>
                
                {profile.website && (
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                    <a 
                      href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline truncate"
                    >
                      {profile.website}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {(profile.skills && profile.skills.length > 0) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {(profile.interests && profile.interests.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <Badge key={index} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{profile.bio}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md overflow-hidden">
                <MapContainer
                  center={[profile.address.latitude, profile.address.longitude]}
                  zoom={13}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[profile.address.latitude, profile.address.longitude]}>
                    <Popup>
                      <div className="p-1">
                        <h3 className="font-medium">{profile.name}</h3>
                        <p className="text-sm">{profile.address.street}</p>
                        <p className="text-sm">
                          {profile.address.city}, {profile.address.state}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
