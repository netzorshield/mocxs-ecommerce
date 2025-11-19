# Fix Vercel Git Integration

## Issue
Vercel keeps building from old commit (2cd7020) instead of latest (47615cd)

## Solution Steps

1. Go to Vercel Project → Settings → Git
2. Click "Disconnect" to disconnect the repository
3. Click "Connect Git Repository" 
4. Select your repository: `netzorshield/mocxs-ecommerce`
5. Authorize if needed
6. This should trigger an automatic deployment from the latest commit

## Alternative: Push a new commit to trigger auto-deploy

If reconnecting doesn't work, we can push a small change to trigger automatic deployment.


