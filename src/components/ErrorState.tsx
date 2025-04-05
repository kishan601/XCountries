import React from 'react';

interface ErrorStateProps {
  error: Error | unknown;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">Error Loading Countries</h2>
      <p className="error-message">
        {error instanceof Error ? error.message : 'An unknown error occurred'}
      </p>
      <button className="retry-button" onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}