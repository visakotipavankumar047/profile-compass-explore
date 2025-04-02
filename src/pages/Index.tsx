
import React from "react";
import Layout from "@/components/Layout";
import ProfileList from "@/components/ProfileList";

const Index: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Profile Directory</h1>
          <p className="text-muted-foreground">
            Browse and explore profiles from our community. View their details and locations on the map.
          </p>
        </div>
        
        <ProfileList />
      </div>
    </Layout>
  );
};

export default Index;
