
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, User, Mail, Phone, ExternalLink, Building } from "lucide-react";
import { Profile } from "@/types";
import { Link } from "react-router-dom";

interface ProfileCardProps {
  profile: Profile;
  onShowLocation: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onShowLocation }) => {
  return (
    <Card className="profile-card h-full flex flex-col">
      <CardHeader className="pb-2 flex flex-row items-center space-x-4">
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={profile.avatar}
            alt={`${profile.name}'s avatar`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://i.pravatar.cc/300";
            }}
          />
        </div>
        <div className="space-y-1 flex-grow min-w-0">
          <h3 className="font-semibold text-lg truncate">{profile.name}</h3>
          <div className="flex items-center text-muted-foreground text-sm">
            <Building size={14} className="mr-1" />
            <span className="truncate">{profile.jobTitle || "Professional"}</span>
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin size={14} className="mr-1" />
            <span className="truncate">{profile.address.city}, {profile.address.country}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="py-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {profile.bio}
        </p>
        
        {profile.skills && profile.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {profile.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {profile.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{profile.skills.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1"
          onClick={onShowLocation}
        >
          <MapPin size={16} className="mr-1" /> Location
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1"
          asChild
        >
          <Link to={`/profile/${profile.id}`}>
            <User size={16} className="mr-1" /> Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
