import React from "react";
import './error-boundary.css';

export const ErrorBoundary = () => {
    return (
        <div className="error-notice">
            <div className="onerror danger">
                <strong>Error</strong>- Place not found. Please write the correct place name and try again.
            </div>
        </div>)
}