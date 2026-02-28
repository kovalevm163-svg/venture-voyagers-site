# Venture Voyager Services -> Cloudflare Pages Publish Guide

This bundle contains the current production website files:
- index.html
- styles.css
- script.js
- assets/
- vercel.json (not required by Cloudflare, included only as project metadata)

## GitHub repo
- https://github.com/kovalevm163-svg/venture-voyagers-site.git

## Important deployment rule
If you want the public website to update automatically after future changes, do **not** rely on ZIP upload.

ZIP upload = manual deployment only.
GitHub-connected Cloudflare Pages = automatic deployments after every push to `main`.

## Recommended production path
1. Push the latest project files to GitHub.
2. Connect the GitHub repo to Cloudflare Pages.
3. Set the production branch to `main`.
4. Use static-site settings:
   - Framework preset: None
   - Build command: leave empty
   - Build output directory: `.`
   - Root directory: leave empty
5. Deploy.
6. Add the custom domain `venture-voyagers.com` in Cloudflare Pages.
7. Point the domain DNS to Cloudflare by switching nameservers in Squarespace.

## Ongoing update flow
Every future cycle is:
1. edit locally
2. git add -A
3. git commit -m "your message"
4. git push origin main
5. Cloudflare Pages deploys automatically

## Manual upload fallback
If you need a one-time manual deploy instead of GitHub deploy, upload the contents of this folder to Cloudflare Pages as a static site. That works, but future updates will still require another manual upload.
