
import React from "react";

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 h-64">
      <div className="mb-4">
        <span className="loading-dot"></span>
        <span className="loading-dot mx-2"></span>
        <span className="loading-dot"></span>
      </div>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};

export default LoadingState;
