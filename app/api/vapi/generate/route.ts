import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET() {
    return Response.json({ success: true, data: "THANK YOU!" }, { status: 200 });
}

export async function POST(request: Request) {
    const { type, role, level, techstack, amount, userid, interviewStyle } =
        await request.json();

    try {
        const { text: questions } = await generateText({
            model: google("gemini-2.0-flash-001"),
            prompt: `
You are an AI interview generator with agent-like behavior.

### USER SETTINGS
Interview style: **${interviewStyle}**
Role: **${role}**
Level: **${level}**
Tech Stack: **${techstack}**
Question count: **${amount}**
Tone preference: fast / detailed / friendly → user's choice: **${interviewStyle}**

### RULES FOR QUESTION GENERATION
1. Tailor questions to the user's role, level, and tech stack.
2. Modify your tone based on interviewStyle:
   - FAST → concise, direct questions. No extra chatter.
   - DETAILED → deeper multi-layered questions & follow-up hints.
   - FRIENDLY → conversational, supportive tone.
3. Add *agentic behavior* by:
   - Slightly adjusting difficulty based on question order.
   - Gradually increasing depth for detailed mode.
   - Being softer in tone for friendly mode.
4. Do NOT add any explanation text.
5. Return ONLY a clean JSON list, like this:
[
  "Question 1...",
  "Question 2...",
  "Question 3..."
]

Now generate exactly **${amount}** interview questions.
            `
        });

        const interview = {
            role,
            type,
            level,
            techstack: techstack.split(","),
            questions: JSON.parse(questions),
            interviewStyle,
            userID: userid,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString()
        };

        await db.collection("interviews").add(interview);

        return Response.json({ success: true, status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ success: false, error }, { status: 500 });
    }
}
