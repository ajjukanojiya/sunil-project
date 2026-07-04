'use client';
import React from 'react';

interface TopbarProps {
  toggleDrawer: () => void;
  onLogout: () => void;
  clientName?: string;
}

export default function Topbar({ toggleDrawer, onLogout, clientName }: TopbarProps) {
  return (
    <div className="mtopbar">
      <button className="mham" onClick={toggleDrawer} aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className="mtb-logo">
        <span className="mtli"><b>S</b></span> ScaleWin
      </div>
      <button className="mtb-out" onClick={onLogout} aria-label="Log out">
        <i className="ti ti-logout"></i>
      </button>
    </div>
  );
}
