// import { db } from "@/config/db";
// import { openai } from "@/config/OpenAiModel";
// import { SessionChatTable } from "@/config/schema";
// import { NextRequest, NextResponse } from "next/server";

// const REPORT_GEN_PROMPT =`You are an Al Medical Voice Agent that just finished a voice conversation with a user. Based on doctor AI agent info and Conversation between AI medical agent and user,generate a structured report with the following fields:

// 1. sessionid, a unique session identifier

// 2. agent: the medical specialist name (e.g., "General Physician Al" 3. user name of the patient or "Anony us" if not provided

// timestamp: current date and time in ISO format

// 5. chief Complaint: one-sentence summary of the main health concern

// 6 summary: a 2-3 sentence summary of the conversation, symptoms, and recommandations

// 7. symptoms: list of symptoms mentioned by the user 8. duration how long the user has experienced the symptoms

// 9. severity: mild, moderate, or severe

// 18 medications Mentioned: list of any medicines mentioned

// 11 recommendations: list of Al suggestions ons: list of Al suggestions (eg, rest, see a doctor)

// Return the result in this JSON format:
// {
// "sessionid": "string",

// "agent": "string", "user": "string"

// Timestamp": "ISO Date string",

// "chief Complaint": "string", "summary" "string"

// "symptoms": ["symptom1", "symptom2"],

// "duration": "string".

// "severity" :"string" "medicationsMentioned" ["med1", "med2"],

// "recommendations" : ["rect", "rec2"]
// }
// Only include valid fields. Respond with nothing else.
// `

// export async function POST(req:NextRequest) {
//     const {sessionId,sessionDetail,messages} = await req.json()

//     try {
//         const userInput ="AI Doctor Agent Info: "+JSON.stringify(sessionDetail)+", : Conversation: "+JSON.stringify(messages)
//         const completion = await openai.chat.completions.create({
//             model:"google/gemini-2.5-flash-lite-preview-06-17",
//                         messages:[
//                             {role:'system',content:REPORT_GEN_PROMPT},
//                             {role:"user",content:userInput}
//                         ],
//         });
//         const rawResp = completion.choices[0].message?.content || "";
        
//                   // Clean up response
//                 const cleanedResp = rawResp
//                     .trim()
//                     .replace(/^```json\s*/i, "")
//                     .replace(/```$/, "");
                    
//                      const JSONResp = JSON.parse(cleanedResp);
        
//                 return NextResponse.json(JSONResp);

//                 //save to db
//                 const result= await db.update(SessionChatTable).set({
//                     report:JSONResp,
//                     conversation:messages
//                     //@ts-ignore
//                 }).where(eq(SessionChatTable.sessionId,sessionId))

//     } catch (e) {
//         return NextResponse.json(e)
//     }
// }

import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModel";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm"; // Make sure you have this import
import { NextRequest, NextResponse } from "next/server";

const REPORT_GEN_PROMPT = `You are an AI Medical Voice Agent that just finished a voice conversation with a user. Based on doctor AI agent info and the conversation between AI medical agent and user, generate a structured report with the following fields:

1. sessionid: a unique session identifier
2. agent: the medical specialist name (e.g., "General Physician AI")
3. user: name of the patient or "Anonymous" if not provided
4. timestamp: current date and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate, or severe
10. medicationsMentioned: list of any medicines mentioned. If none, return ["None mentioned"].
11. recommendations: list of AI suggestions (e.g., rest, see a doctor). If none, provide at least one basic recommendation like ["Consult a doctor if symptoms persist"].

Return the result in this exact JSON format:
{
  "sessionid": "string",
  "agent": "string",
  "user": "string",
  "timestamp": "ISO Date string",
  "chiefComplaint": "string",
  "summary": "string",
  "symptoms": ["symptom1", "symptom2"],
  "duration": "string",
  "severity": "string",
  "medicationsMentioned": ["med1", "med2"],
  "recommendations": ["rec1", "rec2"]
}
Only include valid fields. Respond with nothing else.
`;

export async function POST(req: NextRequest) {
  try {
    const { sessionId, sessionDetail, messages } = await req.json();

    // Prepare the user input for AI
    const userInput =
      "AI Doctor Agent Info: " +
      JSON.stringify(sessionDetail) +
      ", Conversation: " +
      JSON.stringify(messages);

    // Call the AI model
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-lite-preview-06-17",
      messages: [
        { role: "system", content: REPORT_GEN_PROMPT },
        { role: "user", content: userInput },
      ],
    });

    // Get raw response
    const rawResp = completion.choices[0].message?.content || "";

    // Clean up the AI JSON output
    const cleanedResp = rawResp
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/```$/, "");

    let JSONResp;
    try {
      JSONResp = JSON.parse(cleanedResp);
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to parse AI response", raw: cleanedResp },
        { status: 500 }
      );
    }

    // Save report & conversation to DB BEFORE returning
    await db
      .update(SessionChatTable)
      .set({
        report: JSONResp,
        conversation: messages,
      })
      .where(eq(SessionChatTable.sessionId, sessionId));

    // Return the generated report
    return NextResponse.json(JSONResp);
  } catch (e: any) {
    console.error("Error generating report:", e);
    return NextResponse.json(
      { error: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}


// 10. medicationsMentioned: list of any medicines mentioned
// 11. recommendations: list of AI suggestions (e.g., rest, see a doctor)