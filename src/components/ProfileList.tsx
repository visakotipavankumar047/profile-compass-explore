import React, { useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import { useProfiles } from "@/context/ProfileContext";
import { Profile } from "@/types";
import { MapContainer, TileLayer, Marker, Popup } from "@/components/Map";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, X, Search } from "lucide-react";
import LoadingState from "@/components/LoadingState";

const ProfileList: React.FC = () => {
  const { filteredProfiles, isLoading, error, setSearchFilters, searchFilters } = useProfiles();
  const [showMap, setShowMap] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([39.8283, -98.5795]); // US center
  const [mapZoom, setMapZoom] = useState(4);

  const handleShowLocation = (profile: Profile) => {
    setSelectedProfile(profile);
    setMapCenter([profile.address.latitude, profile.address.longitude]);
    setMapZoom(13);
    setShowMap(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseMap = () => {
    setShowMap(false);
    setSelectedProfile(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilters(prev => ({ ...prev, query: e.target.value }));
  };

  if (isLoading) {
    return <LoadingState message="Loading profiles..." />;
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-destructive">Error: {error}</p>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="mt-2"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          className="pl-10"
          placeholder="Search profiles by name, bio or company..."
          value={searchFilters.query}
          onChange={handleSearchChange}
        />
      </div>
      
      {showMap && (
        <Card className="map-container relative">
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 z-[1000]"
            onClick={handleCloseMap}
          >
            <X size={16} />
          </Button>
          
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            className="h-full w-full rounded-md"
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {selectedProfile && (
              <Marker position={[selectedProfile.address.latitude, selectedProfile.address.longitude]}>
                <Popup>
                  <div className="p-1">
                    <h3 className="font-medium">{selectedProfile.name}</h3>
                    <p className="text-sm">{selectedProfile.address.street}</p>
                    <p className="text-sm">
                      {selectedProfile.address.city}, {selectedProfile.address.state}
                    </p>
                    <p className="text-sm">{selectedProfile.address.country}</p>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
          
          {selectedProfile && (
            <div className="absolute bottom-4 left-4 right-4 bg-background p-3 rounded-md shadow-md border z-[1000] max-w-md mx-auto">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img
                    src={selectedProfile.avatar}
                    alt={selectedProfile.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{selectedProfile.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin size={14} className="mr-1" />
                    {selectedProfile.address.city}, {selectedProfile.address.country}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      )}

      {filteredProfiles.length === 0 ? (
        <div className="text-center p-8">
          <h3 className="font-medium text-lg">No profiles found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="profile-grid">
          {filteredProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onShowLocation={() => handleShowLocation(profile)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileList;
