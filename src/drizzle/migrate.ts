import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

async function main() {
    const migrationClient = postgres(process.env.PG_URI as string, { max: 1 });

    await migrate(drizzle(migrationClient), {
        migrationsFolder: "./src/drizzle/migrations",
    });

    await migrationClient.end();
};

main();
