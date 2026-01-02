# Vercel Deployment Guide

## Fixed Issues

The permission error with `react-scripts` has been fixed by:
1. Using `npx` in the build command to bypass permission issues
2. Adding `CI=false` to prevent build failures on warnings
3. Created `vercel.json` with proper configuration

## Deployment Steps

### 1. Push Changes to GitHub
```bash
git add .
git commit -m "Fix Vercel deployment permissions"
git push origin main
```

### 2. Vercel Settings

If deploying via Vercel Dashboard, ensure these settings:

**Build & Development Settings:**
- **Framework Preset:** Create React App
- **Root Directory:** `frontend` (if your repo has frontend in a subfolder, otherwise leave empty)
- **Build Command:** `CI=false npx react-scripts build`
- **Output Directory:** `build`
- **Install Command:** `npm install`

**Environment Variables:**
- `REACT_APP_API_URL` = Your backend API URL (e.g., `https://your-backend.vercel.app/api` or your deployed backend URL)

### 3. Alternative: Deploy via Vercel CLI

```bash
cd frontend
npm install -g vercel
vercel
```

Follow the prompts and it will automatically detect the settings.

## Troubleshooting

### If permission error persists:

1. **Check Node.js version in Vercel:**
   - Go to Project Settings → General → Node.js Version
   - Use Node.js 18.x or 20.x

2. **Clear build cache:**
   - In Vercel Dashboard → Settings → Build & Development Settings
   - Clear build cache and redeploy

3. **Alternative build command:**
   If `npx` doesn't work, try:
   ```
   CI=false npm run build
   ```

4. **Check package.json:**
   Ensure `react-scripts` is in `dependencies` (not `devDependencies`)

## Backend Deployment

Remember to also deploy your backend separately:
- Use services like Render, Railway, or Heroku
- Or deploy backend to Vercel as a serverless function
- Update `REACT_APP_API_URL` in frontend environment variables

