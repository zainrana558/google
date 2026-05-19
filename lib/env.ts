import { z } from "zod";

// Environment variable validation schema
const envSchema = z.object({
  // Required for production
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET must be at least 32 characters"),
  
  // Auth providers (at least one required)
  AUTH_GOOGLE_ID: z.string().optional(),
  AUTH_GOOGLE_SECRET: z.string().optional(),
  
  // Site config
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().or(z.string()),
  
  // Video CDNs
  NEXT_PUBLIC_PRIMARY_CDN_URL: z.string().optional(),
  NEXT_PUBLIC_BACKUP_CDN_URL: z.string().optional(),
  
  // External APIs
  TMDB_API_KEY: z.string().optional(),
  NEXSTREAM_API_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
});

// Parse and validate environment variables
function getEnv() {
  const result = envSchema.safeParse(process.env);
  
  if (!result.success) {
    console.error("❌ Invalid environment variables:");
    result.error.issues.forEach((issue) => {
      console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
    });
    throw new Error("Environment validation failed");
  }
  
  return result.data;
}

// Export validated environment
export const env = getEnv();

// Export individual variables for convenience
export const {
  DATABASE_URL,
  AUTH_SECRET,
  AUTH_GOOGLE_ID,
  AUTH_GOOGLE_SECRET,
  NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_PRIMARY_CDN_URL,
  NEXT_PUBLIC_BACKUP_CDN_URL,
  TMDB_API_KEY,
  NEXSTREAM_API_KEY,
  GEMINI_API_KEY,
} = env;