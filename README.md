1. User Roles & Permissions
Role	Permissions
Admin	Full access to all user accounts, billing data, and site management. Can impersonate users.
User	Manage their own sites, billing, profile, and MFA.
Guest	Limited access (view marketing pages, sign up/login).
2. Core User Flows
A. Homepage
Primary Audience: Logged-in Users
Components:

Welcome Banner:

Dynamic text: "Welcome back, [Name]!" (pull from Zoho account data).

Quick Actions:

"Add a Site" (redirects to Sites page).

"View Billing" (redirects to Billing page).

"Contact Support" (redirects to Support page).

Visitor Analytics Graph:

Displays total visitors per site (last 30 days) via WPE API (cPanel data).

Interactive: Hover for daily stats; toggle between sites.

Data Source: WPE API endpoint /analytics/visitors/{site_id}.

Recent Sites:

List of 3 most recently updated sites with quick links to cPanel, analytics, and settings.

Navigation:

Header: Links to Home, Sites, Billing, Support, and User Profile.

Sidebar (Admin-only): "Admin Dashboard" with user management and global analytics.

B. Sites Page
Primary Audience: Users
Components:

Sites List:

Grid/list view of all sites owned by the user.

Each entry includes:

Site name + domain

Status (Active/Suspended)

"Manage" button (opens modal with options: Edit Settings, View Analytics, Delete).

Add Site Button:

Triggers a modal with steps:

Template Selection: Pull templates from WPE API.

Domain Configuration: Connect custom domain or assign subdomain.

Deploy: Calls WPE API /sites/create to provision the site.

API Integration:

Fetch sites: GET /users/{user_id}/sites (WPE API).

Delete site: DELETE /sites/{site_id} (WPE API).

C. Billing Page
Primary Audience: Users
Components:

Subscription Overview:

Current plan (e.g., "Pro Plan - $29.99/month").

Usage metrics (sites allowed vs. used).

Renewal date.

Plan Management:

"Upgrade/Downgrade" button: Opens plan comparison table.

"Cancel/Pause Subscription" button: Confirmation modal with options.

Payment Methods:

Display saved cards (masked numbers).

"Edit Billing Info" button: Integrates Zoho’s payment gateway form.

API Integration:

Fetch billing data: GET /subscriptions/{user_id} (Zoho API).

Update plan: POST /subscriptions/upgrade (Zoho API).

D. Support Page
Primary Audience: Users/Guests
Components:

Contact Form:

Fields: Subject, Description, Priority (Low/Medium/High).

Attachments: Allow file upload (max 5 files, 10MB each).

Submission sends ticket to Zoho Desk API.

FAQ Section:

Common topics (e.g., "How to connect a domain?", "Downgrading plans").

Ticket History (Logged-in Users):

List of past support requests with status (Open/Closed).

E. User Profile Page
Primary Audience: Users
Components:

Profile Settings:

Edit name, email, and password (form submits to Zoho API).

Validation: Password strength meter; confirm email changes via Zoho.

MFA Setup:

Toggle to enable/disable MFA.

QR code generation (Zoho API) for authenticator apps.

Backup codes displayed once.

3. Guest Experience
Homepage: Marketing content (features, pricing, testimonials).

CTAs: "Sign Up" (redirects to Zoho signup) / "Login".

Restrictions: Block access to Sites/Billing/Profile until authenticated.

4. Technical Specifications
Next.js Structure
Pages:

/ (Homepage)

/sites

/billing

/support

/profile

API Routes:

/api/zoho/* (Proxy for Zoho API calls).

/api/wpe/* (Proxy for WPE API calls).

State Management
Use React Context or Redux for:

User session (JWT from Zoho).

Sites data (cache WPE responses).

Security
HTTPS enforced.

Sanitize all inputs (e.g., support form, site creation).

Store JWT tokens in HTTP-only cookies.

Performance
Lazy-load analytics graphs.

Cache static assets (e.g., WPE templates).

5. Dependencies
Zoho API:

Required endpoints: Subscription management, MFA, user profile.

API keys must be stored in environment variables.

WPE API:

Required endpoints: Site creation, analytics, cPanel integration.

Webhooks for site deployment status updates.

6. Success Metrics
User engagement: Time spent on Sites page, number of sites created.

Support efficiency: Reduced ticket volume via FAQ utilization.

Billing: Upgrade/downgrade rate post-launch.