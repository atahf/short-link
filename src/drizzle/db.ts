import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from "./schema"
import postgres from 'postgres';

const queryClient = postgres(process.env.PG_URI as string);
const db = drizzle(queryClient, { schema });

export default db;
