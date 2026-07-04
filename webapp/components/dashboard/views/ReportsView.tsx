'use client';
import React from 'react';

export default function ReportsView() {
  return (
    <div id="pg-rep" className="page active">
      <div className="tb">
        <div><span className="bm">Reports</span><span className="bs">Daily summaries — Meta + Google + SEO combined</span></div>
        <div className="tr"><button className="btn"><i className="ti ti-download"></i> Export all (PDF)</button></div>
      </div>
      <div className="ct">
        <div className="card">
          <div className="ch"><div className="ct2"><i className="ti ti-calendar"></i> Daily Reports</div></div>
          <div className="tscroll"><table className="dtable">
            <thead><tr><th>Date</th><th style={{ textAlign: 'right' }}>Meta spend</th><th style={{ textAlign: 'right' }}>Google spend</th><th style={{ textAlign: 'right' }}>Revenue</th><th style={{ textAlign: 'right' }}>ROAS</th><th style={{ textAlign: 'right' }}>SEO visits</th><th style={{ textAlign: 'center' }}>Download</th></tr></thead>
            <tbody>
              <tr><td>26 May 2026</td><td style={{ textAlign: 'right' }}>₹5,200</td><td style={{ textAlign: 'right' }}>₹3,440</td><td style={{ textAlign: 'right', fontWeight: 600, color: '#1a1d23' }}>₹25,056</td><td style={{ textAlign: 'right' }} className="rg">2.9x</td><td style={{ textAlign: 'right' }} className="rg">2,116</td><td style={{ textAlign: 'center' }}><button className="btn" style={{ padding: '4px 10px', fontSize: '11px' }}><i className="ti ti-file-text"></i> PDF</button></td></tr>
              <tr><td>25 May 2026</td><td style={{ textAlign: 'right' }}>₹4,800</td><td style={{ textAlign: 'right' }}>₹3,100</td><td style={{ textAlign: 'right', fontWeight: 600, color: '#1a1d23' }}>₹22,880</td><td style={{ textAlign: 'right' }} className="rg">2.9x</td><td style={{ textAlign: 'right' }} className="rg">1,980</td><td style={{ textAlign: 'center' }}><button className="btn" style={{ padding: '4px 10px', fontSize: '11px' }}><i className="ti ti-file-text"></i> PDF</button></td></tr>
              <tr><td>24 May 2026</td><td style={{ textAlign: 'right' }}>₹5,100</td><td style={{ textAlign: 'right' }}>₹2,900</td><td style={{ textAlign: 'right', fontWeight: 600, color: '#1a1d23' }}>₹23,200</td><td style={{ textAlign: 'right' }} className="rg">2.9x</td><td style={{ textAlign: 'right' }} className="rg">1,754</td><td style={{ textAlign: 'center' }}><button className="btn" style={{ padding: '4px 10px', fontSize: '11px' }}><i className="ti ti-file-text"></i> PDF</button></td></tr>
              <tr><td>23 May 2026</td><td style={{ textAlign: 'right' }}>₹4,600</td><td style={{ textAlign: 'right' }}>₹3,200</td><td style={{ textAlign: 'right', fontWeight: 600, color: '#1a1d23' }}>₹21,840</td><td style={{ textAlign: 'right' }} className="rg">2.8x</td><td style={{ textAlign: 'right' }} className="rg">1,890</td><td style={{ textAlign: 'center' }}><button className="btn" style={{ padding: '4px 10px', fontSize: '11px' }}><i className="ti ti-file-text"></i> PDF</button></td></tr>
              <tr><td>22 May 2026</td><td style={{ textAlign: 'right' }}>₹4,200</td><td style={{ textAlign: 'right' }}>₹3,400</td><td style={{ textAlign: 'right', fontWeight: 600, color: '#1a1d23' }}>₹19,760</td><td style={{ textAlign: 'right' }} className="rg">2.6x</td><td style={{ textAlign: 'right' }} className="rg">1,820</td><td style={{ textAlign: 'center' }}><button className="btn" style={{ padding: '4px 10px', fontSize: '11px' }}><i className="ti ti-file-text"></i> PDF</button></td></tr>
              <tr><td>21 May 2026</td><td style={{ textAlign: 'right' }}>₹4,400</td><td style={{ textAlign: 'right' }}>₹3,580</td><td style={{ textAlign: 'right', fontWeight: 600, color: '#1a1d23' }}>₹20,748</td><td style={{ textAlign: 'right' }} className="rg">2.6x</td><td style={{ textAlign: 'right' }} className="rg">1,910</td><td style={{ textAlign: 'center' }}><button className="btn" style={{ padding: '4px 10px', fontSize: '11px' }}><i className="ti ti-file-text"></i> PDF</button></td></tr>
              <tr><td>20 May 2026</td><td style={{ textAlign: 'right' }}>₹4,800</td><td style={{ textAlign: 'right' }}>₹3,180</td><td style={{ textAlign: 'right', fontWeight: 600, color: '#1a1d23' }}>₹19,344</td><td style={{ textAlign: 'right' }} className="rg">2.4x</td><td style={{ textAlign: 'right' }} className="rg">1,950</td><td style={{ textAlign: 'center' }}><button className="btn" style={{ padding: '4px 10px', fontSize: '11px' }}><i className="ti ti-file-text"></i> PDF</button></td></tr>
            </tbody>
          </table></div>
        </div>
      </div>
    </div>
  );
}
