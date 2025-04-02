
import React from "react";
import { useProfiles } from "@/context/ProfileContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Loader2,
  UserCircle,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";
import LoadingState from "@/components/LoadingState";
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
import { Profile } from "@/types";

const AdminDashboard: React.FC = () => {
  const { profiles, isLoading, error, deleteProfile, searchFilters, setSearchFilters } = useProfiles();
  const [profileToDelete, setProfileToDelete] = React.useState<Profile | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilters(prev => ({ ...prev, query: e.target.value }));
  };

  const handleDelete = (profile: Profile) => {
    setProfileToDelete(profile);
  };

  const confirmDelete = () => {
    if (profileToDelete) {
      deleteProfile(profileToDelete.id);
      setProfileToDelete(null);
    }
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
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Manage Profiles</h1>
        <Button asChild>
          <Link to="/admin/new">
            <Plus size={16} className="mr-2" />
            Add New Profile
          </Link>
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          className="pl-10"
          placeholder="Search profiles..."
          value={searchFilters.query}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="rounded-md border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No profiles found
                </TableCell>
              </TableRow>
            ) : (
              profiles
                .filter(profile => 
                  searchFilters.query
                    ? profile.name.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
                      profile.email.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
                      profile.address.city.toLowerCase().includes(searchFilters.query.toLowerCase())
                    : true
                )
                .map((profile, index) => (
                  <TableRow key={profile.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      {profile.avatar ? (
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "https://i.pravatar.cc/300";
                            }}
                          />
                        </div>
                      ) : (
                        <UserCircle className="h-8 w-8 text-muted-foreground" />
                      )}
                      <span>{profile.name}</span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{profile.email}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1 text-muted-foreground" />
                        {profile.address.city}, {profile.address.country}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/profile/${profile.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/admin/edit/${profile.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(profile)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <AlertDialog open={!!profileToDelete} onOpenChange={() => setProfileToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Profile</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {profileToDelete?.name}'s profile? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
