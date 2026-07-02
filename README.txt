ScaleWin — Website (scalewin.ai)  •  Full deploy bundle
========================================================
Plain self-contained HTML (inline CSS + JS), mobile-responsive.
Design matches the final home page. Backend logic was NOT changed.

DEPLOY
------
Upload ALL files to the web root (public_html) of scalewin.ai.
The site opens at index.html automatically.

PAGES
-----
index.html         Home / landing (finalized design)
blog.html          Blog listing  ->  opens blog-article.html
blog-article.html  Blog article (sample)
login.html         Login
signup.html        Onboarding (Account -> Goal -> Services -> Payment)
setup.html         Post-payment "Complete your setup" checklist
dashboard.html     Client dashboard (sidebar, settings, AI views)
settings.html      Settings & Billing
assistant.html     AI Assistant chat

LEGAL PAGES (for Razorpay activation) — linked in every footer
--------------------------------------------------------------
privacy.html       Privacy Policy
terms.html         Terms & Conditions
refund.html        Refund & Cancellation Policy
cookies.html       Cookie Policy
contact.html       Contact Us (with email/phone/address + form)

>> FILL THESE BEFORE GOING LIVE (search for [ ... ] placeholders):
   - Legal entity / proprietor name (currently: Giftyard)
   - GSTIN
   - Registered business address (India)
   - Support phone number
   - Support email (default used: support@scalewin.ai)
   - City for jurisdiction (in terms.html)
   IMPORTANT for Razorpay: the business/legal name + address on these pages
   should match your Razorpay KYC details.

STILL TO WIRE (backend — unchanged, same as before)
---------------------------------------------------
- Connect / pay buttons are demo-simulated -> wire to real OAuth / Razorpay / Supabase.
- assistant.html: route AI via a backend proxy (never expose an API key on the page).
- index.html: paste your YouTube demo link in the video section (data-yt="").
- (Optional) wire home "Start free trial" / a "Login" link to signup.html / login.html.

Notes: uses only dummy/test product names (no real client data).
These policy texts are standard templates — please review and adapt to your business.
