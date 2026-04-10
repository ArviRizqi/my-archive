# Deploying your Vite React App to Vercel

Deploying a React + Vite application to Vercel is incredibly seamless. Vercel automatically detects the Vite framework and configures the build steps for you. 

Here is your straightforward, step-by-step guide to getting your literary archive live!

## Prerequisite: Push to GitHub
The easiest and most powerful way to use Vercel is to link it to a GitHub repository, enabling automatic deployments whenever you push new code.

1. Ensure your code is committed:
   ```bash
   git add .
   git commit -m "Ready for production"
   ```
2. Push your `my-archive` project to a repository on your GitHub account.

> [!IMPORTANT]
> Since this project uses Supabase, your local `.env` file containing your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` is purposefully ignored by Git and will **not** be pushed to GitHub. This is for security. You will add these variables manually in Vercel.

---

## Step 1: Import Project in Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click the **"Add New..."** button and select **"Project"**.
3. Under the "Import Git Repository" section, locate the GitHub repository you just pushed your code to and click **"Import"**.

## Step 2: Configure the Build
Vercel's brilliant auto-detection should automatically select the **Vite** framework preset. It will automatically populate the:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

You shouldn't need to change any of these settings.

## Step 3: Add Environment Variables
> [!WARNING]
> If you skip this step, your production app will crash because it won't know how to connect to Supabase!

Before clicking deploy, locate the **"Environment Variables"** dropdown panel. You must copy the values from your local `.env` file into Vercel exactly:

1. **Name**: `VITE_SUPABASE_URL`
   **Value**: `https://<YOUR-PROJECT-ID>.supabase.co`
   Click **Add**

2. **Name**: `VITE_SUPABASE_ANON_KEY`
   **Value**: `<YOUR-ANON-KEY>`
   Click **Add**

## Step 4: Deploy!
Once your environment variables are added, hit the blue **Deploy** button.

Vercel will begin running your install and build commands. After a few minutes, you will see a cheerful completion screen with your new live production URL!

---

### Troubleshooting (Client-Side Routing)
Because you are using React Router (`react-router-dom`), Vercel's Vite preset automatically maps all generic paths back to `index.html`. If for any reason pulling up a sub-page directly (like `your-url.vercel.app/archive`) gives you a 404 error, you can force the redirect by adding a `vercel.json` file to the root of your project:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
*(Push this file to GitHub, and Vercel will automatically re-deploy and fix the 404s).*
