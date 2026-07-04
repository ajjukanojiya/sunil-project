'use client';
import React from 'react';

export default function AIAssistantView() {
  return (
    <div id="pg-ai" className="page active">
      <div className="tb">
        <div><span className="bm">AI Assistant</span><span className="bs">Connected to your live data</span></div>
      </div>
      <div className="ct">
        <div className="chat-wrap">
          <div className="ctx-bar"><i className="ti ti-database"></i><span className="ctx-txt">Sharma Organics — Meta Ads, Google Ads aur SEO data connected</span></div>
          <div className="sugg">
            <div className="sg">Best campaign today?</div>
            <div className="sg">Which keyword has issues?</div>
            <div className="sg">SEO priority kya hai?</div>
            <div className="sg">Blog ideas for Glow Cover Stick</div>
            <div className="sg">Total spend this week?</div>
          </div>
          <div className="chatbox">
            <div className="chat-msgs">
              <div className="bbl bbl-ai">Namaste! Main <strong>Sharma Organics</strong> ka AI assistant hoon. <strong>Meta Ads, Google Ads aur SEO</strong> — teeno ka live data mere paas hai. Kuch bhi poochho.</div>
              <div className="bbl bbl-usr">Best campaign today?</div>
              <div className="bbl bbl-ai"><strong>Google PMax — Velvet Brow Gel</strong> aaj best hai — <strong>3.6x ROAS</strong> pe ₹1,800 spend aur ₹6,480 revenue. Meta pe bhi Velvet Brow Gel 3.1x strong hai. Dono milake iska budget aaj scale karna sahi rahega — main automatically ₹500 daily badha sakta hoon agar tum bolo.</div>
              <div className="bbl bbl-usr">Nova Lip Tint kyun fail ho raha hai?</div>
              <div className="bbl bbl-ai">3 reasons hain — <strong>1)</strong> Frequency 4.2 — same audience baar baar dekh raha hai ad. <strong>2)</strong> CTR sirf 1.1% (industry avg 2%+). <strong>3)</strong> Creative 18 din purani hai, fatigue ho gaya. Solution — nayi creative upload karo, AI naya angle suggest karega.</div>
            </div>
            <div className="chat-foot">
              <input className="cinp" placeholder="Apne ads ke baare mein kuch bhi poochho..." />
              <button className="csend"><i className="ti ti-send"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
