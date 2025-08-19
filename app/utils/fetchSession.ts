// utils/fetchSession.ts
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { SessionChatTable } from "@/config/schema";

export async function getSessionData(sessionId: string) {
  try {
    const result = await db
      .select()
      .from(SessionChatTable)
      .where(eq(SessionChatTable.sessionId, sessionId))
      .execute();
    
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching session data:", error);
    return null;
  }
}