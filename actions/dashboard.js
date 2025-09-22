// "use server"

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI(
//   {
//     apiKey: 
//   process.env.GEMINI_API_KEY}
// );


// export const generateAIInsights = async (industry) => {
//   try {
//     const prompt = `
//       Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
//       {
//         "salaryRanges": [
//           { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
//         ],
//         "growthRate": number,
//         "demandLevel": "High" | "Medium" | "Low",
//         "topSkills": ["skill1", "skill2"],
//         "marketOutlook": "Positive" | "Neutral" | "Negative",
//         "keyTrends": ["trend1", "trend2"],
//         "recommendedSkills": ["skill1", "skill2"]
//       }

//       IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
//       Include at least 5 common roles for salary ranges.
//       Growth rate should be a percentage.
//       Include at least 5 skills and trends.
//     `;

//     const response = await ai.models.generateContent({
//      // pick the model you want
//       contents: prompt,
//       config: {
//         responseMimeType: "application/json"
//         // optionally: responseSchema: { ... } for stricter schema
//       }
//     });


//       // const response= result.response;
//   const text = response.text;
   
//  if (!text) {
//       throw new Error("Empty response from AI");
//     }


//     const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

//     // Add validation before parsing
//     if (!cleanedText) {
//       throw new Error("Empty response from AI");
//     }

//     return JSON.parse(cleanedText);
  
//   }
  
  
  
  
//   catch (error) {
//     console.log("Error generating AI insights:", error);
    
//     // More specific error messages
//     if (error instanceof SyntaxError) {
//       return { error: "Invalid JSON response from AI. Please try again." };
//     }
    
//     return { error: "Failed to generate insights. Please try again." };
//   }
// };


// export async function getIndustryInsights() {
//   const { userId } = await auth();
//   if (!userId) throw new Error("Unauthorized");

//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//     include: {
//       industryInsight: true,
//     },
//   });

//   if (!user) throw new Error("User Not Found!");

//   // Check if user has an industry set
//   if (!user.industry) {
//     throw new Error("User industry not specified. Please update your profile.");
//   }

//   // If user has existing insights, check if they need updating
//   if (user.industryInsight) {
//     const now = new Date();
//     const nextUpdate = new Date(user.industryInsight.nextUpdate);
    
//     // If insights are still fresh, return them
//     if (now < nextUpdate) {
//       return user.industryInsight;
//     }
    
//     // Insights are stale, regenerate them
//     try {
//       const insights = await generateAIInsights(user.industry);
      
//       if (!insights || insights.error) {
//         // If generation fails, extend the current insights by 1 day and return them
//         await db.industryInsight.update({
//           where: { id: user.industryInsight.id },
//           data: {
//             nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Try again tomorrow
//           }
//         });
//         return user.industryInsight;
//       }

//       // Update existing insights with new data
//       const updatedInsights = await db.industryInsight.update({
//         where: { id: user.industryInsight.id },
//         data: {
//           growthRate: insights.growthRate ?? user.industryInsight.growthRate ?? 0,
//           demandLevel: insights.demandLevel ?? user.industryInsight.demandLevel ?? "Unknown",
//           topSkills: insights.topSkills ?? user.industryInsight.topSkills ?? [],
//           marketOutlook: insights.marketOutlook ?? user.industryInsight.marketOutlook ?? "Neutral",
//           keyTrends: insights.keyTrends ?? user.industryInsight.keyTrends ?? [],
//           recommendedSkills: insights.recommendedSkills ?? user.industryInsight.recommendedSkills ?? [],
//           nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
//           lastUpdated: new Date(),
//         }
//       });

//       return updatedInsights;
//     } catch (error) {
//       console.error("Failed to update industry insights:", error);
//       // Return existing insights if update fails
//       return user.industryInsight;
//     }
//   }

//   // No existing insights, create new ones
//   try {
//     const insights = await generateAIInsights(user.industry);

//     if (!insights || insights.error) {
//       throw new Error(insights?.error || "Failed to generate insights.");
//     }

//     const industryInsight = await db.industryInsight.create({
//       data: {
//       industry: user.industry,
//         growthRate: insights.growthRate ?? 0,
//         demandLevel: insights.demandLevel ?? "Unknown",
//         topSkills: insights.topSkills ?? [],
//         marketOutlook: insights.marketOutlook ?? "Neutral",
//         keyTrends: insights.keyTrends ?? [],
//         recommendedSkills: insights.recommendedSkills ?? [],
//         nextUpdate: new Date(Date.now() + 7*24*60*60*1000),
//         lastUpdated: new Date(),
//       }
//     });

//     // Link the insight to the user
//     await db.user.update({
//       where: { clerkUserId: userId },
//       data: {
//         industryInsightId: industryInsight.id,
//       }
//     });

//     return industryInsight;
//   } catch (error) {
//     console.error("Failed to create industry insights:", error);
//     throw new Error("Unable to generate industry insights at this time. Please try again later.");
//   }
// }



// export async function getIndustryInsights() {
//       const { userId } = await auth();
//       if (!userId) throw new Error("Unauthorized");

//         const user = await db.user.findUnique({
//           where: { clerkUserId: userId },
//           include: {
//       industryInsight: true,
//     },
//         });
    
//         if(!user) throw new Error("User Not Found!")
    
//             if(!user.industryInsight){
// const insights =await generateAIInsights(user.industry); 

// if (!insights || insights.error) {
//       throw new Error(insights?.error || "Failed to generate insights.");
//     }

// const industryInsight = await db.industryInsight.create({
//     data:{
//           industry: user.industry,
//     growthRate: insights.growthRate ?? 0,
//     demandLevel: insights.demandLevel ?? "Unknown",
//     topSkills: insights.topSkills ?? [],
//     marketOutlook: insights.marketOutlook ?? "Neutral",
//     keyTrends: insights.keyTrends ?? [],
//     recommendedSkills: insights.recommendedSkills ?? [],
//     nextUpdate: new Date(Date.now() + 7*24*60*60*1000),
//     lastUpdated: new Date(),
//     }
// })
//         return industryInsight;

//             }
//             return user.industryInsight;
// }


"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export const generateAIInsights = async (industry) => {
  try {
    const prompt = `
      Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
      {
        "salaryRanges": [
          { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
        ],
        "growthRate": number,
        "demandLevel": "High" | "Medium" | "Low",
        "topSkills": ["skill1", "skill2"],
        "marketOutlook": "Positive" | "Neutral" | "Negative",
        "keyTrends": ["trend1", "trend2"],
        "recommendedSkills": ["skill1", "skill2"]
      }

      IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
      Include at least 5 common roles for salary ranges.
      Growth rate should be a percentage.
      Include at least 5 skills and trends.
    `;

    const response = await ai.models.generateContent({
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
   
    if (!text) {
      throw new Error("Empty response from AI");
    }

    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    if (!cleanedText) {
      throw new Error("Empty response from AI");
    }

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error generating AI insights:", error);
    
    // Return null instead of an object with error property
    // This prevents accidentally spreading the error into Prisma
    return null;
  }
};

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User Not Found!");

  // Check if user has an industry set
  if (!user.industry) {
    throw new Error("User industry not specified. Please update your profile.");
  }

  // If user has existing insights, check if they need updating
  if (user.industryInsight) {
    const now = new Date();
    const nextUpdate = new Date(user.industryInsight.nextUpdate);
    
    // If insights are still fresh, return them
    if (now < nextUpdate) {
      return user.industryInsight;
    }
    
    // Insights are stale, regenerate them
    try {
      const insights = await generateAIInsights(user.industry);
      
      if (!insights) {
        // If generation fails, extend the current insights by 1 day and return them
        await db.industryInsight.update({
          where: { id: user.industryInsight.id },
          data: {
            nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Try again tomorrow
          }
        });
        return user.industryInsight;
      }

      // Update existing insights with new data
      const updatedInsights = await db.industryInsight.update({
        where: { id: user.industryInsight.id },
        data: {
          salaryRanges: insights.salaryRanges ?? user.industryInsight.salaryRanges ?? [],
          growthRate: insights.growthRate ?? user.industryInsight.growthRate ?? 0,
          demandLevel: insights.demandLevel ?? user.industryInsight.demandLevel ?? "Unknown",
          topSkills: insights.topSkills ?? user.industryInsight.topSkills ?? [],
          marketOutlook: insights.marketOutlook ?? user.industryInsight.marketOutlook ?? "Neutral",
          keyTrends: insights.keyTrends ?? user.industryInsight.keyTrends ?? [],
          recommendedSkills: insights.recommendedSkills ?? user.industryInsight.recommendedSkills ?? [],
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          lastUpdated: new Date(),
        }
      });

      return updatedInsights;
    } catch (error) {
      console.error("Failed to update industry insights:", error);
      // Return existing insights if update fails
      return user.industryInsight;
    }
  }

  // No existing insights, create new ones
  try {
    const insights = await generateAIInsights(user.industry);

    if (!insights) {
      throw new Error("Failed to generate insights. Please try again later.");
    }

    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        salaryRanges: insights.salaryRanges ?? [],
        growthRate: insights.growthRate ?? 0,
        demandLevel: insights.demandLevel ?? "Unknown",
        topSkills: insights.topSkills ?? [],
        marketOutlook: insights.marketOutlook ?? "Neutral",
        keyTrends: insights.keyTrends ?? [],
        recommendedSkills: insights.recommendedSkills ?? [],
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        lastUpdated: new Date(),
      }
    });

    // Link the insight to the user
    await db.user.update({
      where: { clerkUserId: userId },
      data: {
        industryInsightId: industryInsight.id,
      }
    });

    return industryInsight;
  } catch (error) {
    console.error("Failed to create industry insights:", error);
    throw new Error("Unable to generate industry insights at this time. Please try again later.");
  }
}