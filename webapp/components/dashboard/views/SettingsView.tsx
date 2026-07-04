'use client';
import React from 'react';

export default function SettingsView() {
  return (
    <div id="pg-set" className="page active">
      <div className="tb">
        <div><span className="bm">Settings</span><span className="bs">Account preferences</span></div>
      </div>
      <div className="ct">
        <div className="card" style={{ marginBottom: '18px' }}>
          <div className="ch"><div className="ct2"><i className="ti ti-user"></i> Business Profile</div></div>
          <div className="fgrid">
            <div className="form-row"><label>Business name</label><input defaultValue="Sharma Organics" /></div>
            <div className="form-row"><label>Email</label><input defaultValue="sharma@organics.in" /></div>
          </div>
          <div className="fgrid">
            <div className="form-row"><label>Phone</label><input defaultValue="+91 98XXX XXXXX" /></div>
            <div className="form-row">
              <label>Industry</label>
              <select>
                <option>Beauty &amp; Skincare</option>
                <option>Fashion</option>
                <option>Wellness</option>
              </select>
            </div>
          </div>
          <button className="btn btn-p" style={{ marginTop: '6px' }}>Save changes</button>
        </div>

        <div className="card" style={{ marginBottom: '18px' }}>
          <div className="ch"><div className="ct2"><i className="ti ti-bell"></i> Notifications</div></div>
          <div className="settings-row">
            <div className="sr-info"><div className="sr-title">Daily report email</div><div className="sr-desc">Get a summary email every morning at 9 AM</div></div>
            <button className="tog on"></button>
          </div>
          <div className="settings-row">
            <div className="sr-info"><div className="sr-title">Alert notifications</div><div className="sr-desc">Email when AI detects an issue with your campaigns</div></div>
            <button className="tog on"></button>
          </div>
          <div className="settings-row">
            <div className="sr-info"><div className="sr-title">Auto-optimization</div><div className="sr-desc">Let AI automatically pause underperforming campaigns</div></div>
            <button className="tog on"></button>
          </div>
          <div className="settings-row">
            <div className="sr-info"><div className="sr-title">Blog publish approval</div><div className="sr-desc">Manually approve each AI-written blog before publishing</div></div>
            <button className="tog on"></button>
          </div>
        </div>

        <div className="card">
          <div className="ch"><div className="ct2"><i className="ti ti-credit-card"></i> Billing</div></div>
          <div className="settings-row">
            <div className="sr-info"><div className="sr-title">Current plan: Growth</div><div className="sr-desc">₹5,999/month · Next billing 26 Jun 2026 · GST included</div></div>
            <button className="btn">Change plan</button>
          </div>
          <div className="settings-row">
            <div className="sr-info"><div className="sr-title">Payment method</div><div className="sr-desc">HDFC Bank · Card ending 4242</div></div>
            <button className="btn">Update</button>
          </div>
          <div className="settings-row">
            <div className="sr-info"><div className="sr-title">Billing history</div><div className="sr-desc">View past invoices with GST</div></div>
            <button className="btn">View invoices</button>
          </div>
        </div>
      </div>
    </div>
  );
}
