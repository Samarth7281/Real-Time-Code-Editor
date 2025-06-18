// Simple script to help identify your Vercel domain
// Run this after deploying to Vercel to get your domain

console.log("To find your Vercel domain:");
console.log("1. Go to your Vercel dashboard");
console.log("2. Click on your project");
console.log("3. Look for the domain in the 'Domains' section");
console.log("4. It will be something like: https://your-app-name.vercel.app");
console.log("");
console.log("Then update the following files:");
console.log(
  "- server.js: Replace 'your-vercel-app.vercel.app' with your actual domain"
);
console.log("- Set VITE_BACKEND_URL environment variable in Vercel dashboard");
console.log("");
console.log("Example:");
console.log("If your domain is https://my-code-editor.vercel.app");
console.log("Update server.js to use 'my-code-editor.vercel.app'");
console.log("Set VITE_BACKEND_URL=https://my-code-editor.vercel.app");
