'use client';

import React, { useState } from 'react';
import './dashboard.css';

import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';

import OverviewView from '@/components/dashboard/views/OverviewView';
import MetaAdsView from '@/components/dashboard/views/MetaAdsView';
import GoogleAdsView from '@/components/dashboard/views/GoogleAdsView';
import KeywordsView from '@/components/dashboard/views/KeywordsView';
import SEOView from '@/components/dashboard/views/SEOView';
import BlogView from '@/components/dashboard/views/BlogView';
import MediaLibraryView from '@/components/dashboard/views/MediaLibraryView';
import LaunchCampaignView from '@/components/dashboard/views/LaunchCampaignView';
import AIAssistantView from '@/components/dashboard/views/AIAssistantView';
import ReportsView from '@/components/dashboard/views/ReportsView';
import IntegrationsView from '@/components/dashboard/views/IntegrationsView';
import SettingsView from '@/components/dashboard/views/SettingsView';

interface DashboardClientProps {
  clientData: any;
  statsData: any;
}

export default function DashboardClient({ clientData, statsData }: DashboardClientProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pg-dash');

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleLogout = () => {
    if (confirm('Log out of ScaleWin?')) {
      window.location.href = '/'; // Redirect to home or login
    }
  };

  return (
    <div className={`app ${isDrawerOpen ? 'drawer-open' : ''}`}>
      <Topbar toggleDrawer={toggleDrawer} onLogout={handleLogout} clientName={clientData?.business_name || 'ScaleWin Client'} />
      
      {isDrawerOpen && <div className="sb-overlay" onClick={closeDrawer}></div>}
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      
      <div className="main">
        {activeTab === 'pg-dash' && <OverviewView setActiveTab={setActiveTab} clientData={clientData} statsData={statsData} />}
        {activeTab === 'pg-meta' && <MetaAdsView setActiveTab={setActiveTab} />}
        {activeTab === 'pg-gcamp' && <GoogleAdsView />}
        {activeTab === 'pg-kw' && <KeywordsView />}
        {activeTab === 'pg-seo' && <SEOView setActiveTab={setActiveTab} />}
        {activeTab === 'pg-blog' && <BlogView />}
        {activeTab === 'pg-media' && <MediaLibraryView />}
        {activeTab === 'pg-new' && <LaunchCampaignView />}
        {activeTab === 'pg-ai' && <AIAssistantView />}
        {activeTab === 'pg-rep' && <ReportsView />}
        {activeTab === 'pg-int' && <IntegrationsView />}
        {activeTab === 'pg-set' && <SettingsView />}
      </div>
    </div>
  );
}
