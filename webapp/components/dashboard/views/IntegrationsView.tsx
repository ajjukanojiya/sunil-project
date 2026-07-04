'use client';
import React from 'react';

export default function IntegrationsView() {
  return (
    <div id="pg-int" className="page active">
      <div className="tb">
        <div><span className="bm">Integrations</span><span className="bs">Connected accounts</span></div>
      </div>
      <div className="ct">
        <div className="integ-card">
          <div className="integ-icon ii-meta"><i className="ti ti-brand-facebook"></i></div>
          <div className="integ-info"><div className="integ-name">Meta Business Manager</div><div className="integ-desc">Connected · Ad account: act_2277554765756319 · Last sync: 2 min ago</div></div>
          <span className="integ-status is-conn">Connected</span>
        </div>
        <div className="integ-card">
          <div className="integ-icon ii-google"><i className="ti ti-brand-google"></i></div>
          <div className="integ-info"><div className="integ-name">Google Ads</div><div className="integ-desc">Connected · Customer ID: 608-879-5791 · Last sync: 5 min ago</div></div>
          <span className="integ-status is-conn">Connected</span>
        </div>
        <div className="integ-card">
          <div className="integ-icon ii-search"><i className="ti ti-search"></i></div>
          <div className="integ-info"><div className="integ-name">Google Search Console</div><div className="integ-desc">Connected · SEO rankings &amp; sitemap sync · Last scan: 1 hour ago</div></div>
          <span className="integ-status is-conn">Connected</span>
        </div>
        <div className="integ-card">
          <div className="integ-icon ii-shopify"><i className="ti ti-shopping-bag"></i></div>
          <div className="integ-info"><div className="integ-name">Shopify Store</div><div className="integ-desc">Connected · Blog publishing enabled · sharmaorganics.in</div></div>
          <span className="integ-status is-conn">Connected</span>
        </div>
        <div className="integ-card">
          <div className="integ-icon" style={{ background: '#e6f9f1', color: '#027a48' }}><i className="ti ti-brand-google-drive"></i></div>
          <div className="integ-info"><div className="integ-name">Google Drive</div><div className="integ-desc">Connected · Creative sync · 24 files indexed</div></div>
          <span className="integ-status is-conn">Connected</span>
        </div>
        <div className="integ-card">
          <div className="integ-icon ii-pay"><i className="ti ti-credit-card"></i></div>
          <div className="integ-info"><div className="integ-name">Razorpay Billing</div><div className="integ-desc">Active subscription · Growth Plan · Next billing: 26 Jun 2026</div></div>
          <span className="integ-status is-conn">Active</span>
        </div>
      </div>
    </div>
  );
}
