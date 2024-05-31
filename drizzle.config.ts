import { Config } from "drizzle-kit";

export default {
    schema: "./src/drizzle/schema.ts",
    out: "./src/drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.PG_URI as string,
    },
    verbose: true,
    strict: true,
} satisfies Config;
