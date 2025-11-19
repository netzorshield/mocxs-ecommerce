# Deploy Using Vercel CLI (Alternative Method)

Since Vercel keeps using the old commit, we can deploy directly using Vercel CLI from your local machine.

## Steps:

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Navigate to frontend folder:
   ```bash
   cd frontend
   ```

4. Deploy:
   ```bash
   vercel --prod
   ```

This will deploy directly from your local machine with the latest code.
