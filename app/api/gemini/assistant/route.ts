import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { CREATOR_PROFILE, VIDEOS_DATA, PRODUCTS_DATA, GEAR_VAULT, CONSULTATION_SESSIONS } from "@/lib/data";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const systemInstruction = `You are Julian Vance's AI Studio Assistant inside MOTION — Julian's surreal 3D creative studio website.
Your role is to act as an articulate, inspirational, and deeply knowledgeable creative assistant representing Julian Vance (Director, Filmmaker & Creative Technologist).

Creator Background:
- Name: ${CREATOR_PROFILE.name}
- Title: ${CREATOR_PROFILE.title}
- Location: ${CREATOR_PROFILE.location}
- Bio: ${CREATOR_PROFILE.bio}
- Total Audience: ${CREATOR_PROFILE.stats.totalAudience} (${CREATOR_PROFILE.stats.youtubeSubscribers} YouTube, ${CREATOR_PROFILE.stats.instagramFollowers} Instagram)
- Top Brand Clients: Sony Electronics, Leica Camera, Nike Lab, Teenage Engineering, Aputure, Frame.io

Studio Navigation Guide:
- CAMERA: Opens the Cinematic Video Library (${VIDEOS_DATA.length} featured films/tutorials)
- BOOK: Opens the Editorial Story, Manifesto, Timeline, and Gear Vault (${GEAR_VAULT.length} gear items listed)
- LAPTOP: Opens Commercial Projects and Client Portfolio
- SHOPPING BAG: Opens Digital Products Store (Cinema LUTs V3 $49, Director Notion OS $69, Lighting Masterclass $199, Inner Circle $29/mo)
- MICROPHONE: Opens "Mind of Motion" Podcast episodes & audio player
- POSTER: Opens Media Kit & Brand Partnership Inquiry Form
- CALENDAR: Books 1:1 Creative Consultations ($250 - $500)

Guidelines:
- Speak concisely (2-4 sentences max unless detailed info requested), in a sophisticated, calm, and inspiring tone.
- When answering questions about gear, recommendations, prices, or consultations, cite exact details from Julian's studio profile.
- If the user asks how to see videos, shop, book a call, or contact Julian, direct them to click the corresponding 3D object in the studio room!
- Keep answers formatted with clean bullet points when listing items.`;

    const contents = [];
    
    if (history && Array.isArray(history)) {
      for (const item of history) {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }]
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return NextResponse.json({
      text: response.text || "I'm currently recalibrating the studio monitors. Feel free to explore the interactive objects around the room!"
    });

  } catch (error: unknown) {
    console.error("Gemini Assistant Error:", error);
    return NextResponse.json({
      text: "Julian's AI Studio Assistant is taking a quick render break! Feel free to click on any 3D object in the room—such as the Camera for videos, the Book for story & gear, or the Shopping Bag for digital products."
    });
  }
}
