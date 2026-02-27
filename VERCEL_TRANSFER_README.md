# Venture Voyager -> Cloudflare Transfer Guide (GitHub Auto-Deploy)

This file is the launch path from local project to public production on Cloudflare + Squarespace domain.

## 1) Production Files In This Project
- `index.html`
- `styles.css`
- `script.js`
- `assets/`

## 2) Push To GitHub (Required For Auto-Updates)
Repository:
- `https://github.com/kovalevm163-svg/venture-voyagers-site.git`

Run in terminal:
```bash
cd "/Users/bigbossfamily/Documents/New project"
git add -A
git commit -m "Launch prep: button fixes and Cloudflare deployment sync"
git push origin main
```

After this, every future `git push origin main` becomes auto-deploy trigger in Cloudflare Pages.

## 3) Cloudflare Pages Setup (Path-by-Path)
1. Cloudflare Dashboard -> `Workers & Pages`
2. Click `Create application`
3. Choose `Pages` -> `Connect to Git`
4. Authorize GitHub and select repo:
   - `kovalevm163-svg/venture-voyagers-site`
5. Build settings:
   - Framework preset: `None` (static)
   - Build command: *(empty)*
   - Build output directory: `.`
   - Root directory: `/`
6. Click `Save and Deploy`

Cloudflare gives default public URL like:
- `https://<project>.pages.dev`

## 4) Connect Domain venture-voyagers.com (Squarespace Registrar)
If domain DNS is still managed by Squarespace:
1. In Cloudflare -> `Websites` -> `Add a site` -> `venture-voyagers.com`
2. Cloudflare gives 2 nameservers
3. In Squarespace domain settings:
   - Replace current nameservers with Cloudflare nameservers
4. Wait for Cloudflare zone to become `Active`

Then connect Pages custom domain:
1. Cloudflare -> `Workers & Pages` -> your project -> `Custom domains`
2. Add:
   - `venture-voyagers.com`
   - `www.venture-voyagers.com`

Cloudflare will create/validate DNS records automatically in that zone.

## 5) Keep Email Working
Keep existing Google Workspace records:
- MX
- SPF TXT
- DKIM TXT
- (any DMARC TXT if present)

Do not remove mail records while switching nameservers.

## 6) Publish Checklist
- `pages.dev` URL loads
- Custom domain `venture-voyagers.com` loads
- `www.venture-voyagers.com` redirects or resolves correctly
- SSL status in Cloudflare is active
- Buttons tested (Home, Services, Membership, Contact, Account, Submit Service, Instagram)

## 7) Ongoing Update Flow
1. Change code locally
2. `git add -A && git commit -m "<msg>" && git push origin main`
3. Cloudflare Pages auto-builds and publishes
