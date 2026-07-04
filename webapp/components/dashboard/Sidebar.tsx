'use client';
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  return (
    <div className="sb">
      <div className="logo">
        <div className="lr">
          <div className="li"><b>S</b></div>
          <div>
            <div className="ln">ScaleWin</div>
            <div className="lb">Growth Plan</div>
          </div>
        </div>
      </div>
      
      <div className="nav">
        <div className="ng">Overview</div>
        <div className={`ni ${activeTab === 'pg-dash' ? 'on' : ''}`} onClick={() => setActiveTab('pg-dash')}>
          <i className="ti ti-home"></i> Dashboard
        </div>
        
        <div className="ng">Meta Ads</div>
        <div className={`ni ${activeTab === 'pg-meta' ? 'on' : ''}`} onClick={() => setActiveTab('pg-meta')}>
          <i className="ti ti-brand-facebook"></i> Campaigns <span className="nb nb-w">1</span>
        </div>
        
        <div className="ng">Google Ads</div>
        <div className={`ni ${activeTab === 'pg-gcamp' ? 'on' : ''}`} onClick={() => setActiveTab('pg-gcamp')}>
          <i className="ti ti-brand-google"></i> Campaigns
        </div>
        <div className={`ni ${activeTab === 'pg-kw' ? 'on' : ''}`} onClick={() => setActiveTab('pg-kw')}>
          <i className="ti ti-key"></i> Keywords
        </div>
        
        <div className="ng">SEO</div>
        <div className={`ni ${activeTab === 'pg-seo' ? 'on' : ''}`} onClick={() => setActiveTab('pg-seo')}>
          <i className="ti ti-search"></i> Page health
        </div>
        <div className={`ni ${activeTab === 'pg-blog' ? 'on' : ''}`} onClick={() => setActiveTab('pg-blog')}>
          <i className="ti ti-pencil"></i> Blog manager <span className="nb nb-p">3</span>
        </div>
        
        <div className="ng">Tools</div>
        <div className={`ni ${activeTab === 'pg-media' ? 'on' : ''}`} onClick={() => setActiveTab('pg-media')}>
          <i className="ti ti-photo"></i> Media library
        </div>
        <div className={`ni ${activeTab === 'pg-new' ? 'on' : ''}`} onClick={() => setActiveTab('pg-new')}>
          <i className="ti ti-circle-plus"></i> New campaign
        </div>
        <div className={`ni ${activeTab === 'pg-ai' ? 'on' : ''}`} onClick={() => setActiveTab('pg-ai')}>
          <i className="ti ti-sparkles"></i> AI assistant <span className="nb nb-p">New</span>
        </div>
        <div className={`ni ${activeTab === 'pg-rep' ? 'on' : ''}`} onClick={() => setActiveTab('pg-rep')}>
          <i className="ti ti-file-analytics"></i> Reports
        </div>
        
        <div className="ng">Account</div>
        <div className={`ni ${activeTab === 'pg-int' ? 'on' : ''}`} onClick={() => setActiveTab('pg-int')}>
          <i className="ti ti-plug-connected"></i> Integrations
        </div>
        <div className={`ni ${activeTab === 'pg-set' ? 'on' : ''}`} onClick={() => setActiveTab('pg-set')}>
          <i className="ti ti-settings"></i> Settings
        </div>
        <div className="ni ni-out" onClick={onLogout}>
          <i className="ti ti-logout"></i> Log out
        </div>
      </div>
      
      <div className="ua">
        <div className="ur">
          <div className="uav">SO</div>
          <div>
            <div className="un">Sharma Organics</div>
            <div className="ue">sharma@organics.in</div>
          </div>
        </div>
        <button className="ua-out" onClick={onLogout} title="Log out">
          <i className="ti ti-logout"></i>
        </button>
      </div>
    </div>
  );
}
