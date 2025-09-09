// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export async function updateUser(data) {
//   const { userId } = await auth();
//   if (!userId) throw new Error("Unauthorized");

//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//   });
//   if (!user) throw new Error("User not found!");

//   try {
//     const result = await db.$transaction(
//       async (tx) => {
//         // Check if industry exists
//         let industryInsight = await tx.industryInsight.findUnique({
//           where: { industry: data.industry },
//         });

//         // If not, create it
//         if (!industryInsight) {
//           industryInsight = await tx.industryInsight.create({
//             data: {
//               industry: data.industry,
//               salaryRanges: [],
//               growthRate: 0,
//               demandLevel: "MEDIUM",
//               topSkills: [],
//               marketOutlook: "NEUTRAL",
//               keyTrends: [],
//               recommendedSkills: [],
//               nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//             },
//           });
//         }

//         // Update the user and connect to industry
//         const updateUser= await tx.user.update({
//           where: { id: user.id },
//           data: {
//             industry: data.industry,
//             experience: data.experience,
//             bio:data.bio,
//             skills:data.skills
//           },
//         });
//     return {updateUser,industryInsight};

//       },
//       { timeout: 10000 }
//     );
// return result.updateUser;
//   } catch (error) {
//     console.error(error.message);
//     throw new Error("Failed to update profile"+ error.message);
//   }
// }

// export async function getUserOnboardingStatus() {
//   const { userId } = await auth();
//   if (!userId) throw new Error("Unauthorized");

//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//   });
//   if (!user) throw new Error("User not found!");

//   try {
//     const user=await db.user.findUnique({
//           where: { clerkUserId: userId },
//           select:{
//             industry:true
//           }
//     })
//     return  {
//         isOnboarded: !!user?.industry,
//     };
//   } catch (error) {
//     console.log("Onboarding Error",error.message);
//     throw new Error("Failed to check Onboarding status"+error.message)
//   }
// }




"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { success } from "zod";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found!");

  try {
    const result = await db.$transaction(
      async (tx) => {
        // Check if industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: { industry: data.industry },
        });

        // If not, create it
        if (!industryInsight) {
          industryInsight = await tx.industryInsight.create({
            data: {
              industry: data.industry,
              salaryRanges: [],
              growthRate: 0,
              demandLevel: "MEDIUM",
              topSkills: [],
              marketOutlook: "NEUTRAL",
              keyTrends: [],
              recommendedSkills: [],
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        // Update the user and connect to industry
        const updatedUser = await tx.user.update({
          where: { id: user.id },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      { timeout: 10000 }
    );

    // return result.updatedUser;
    return {success:true,...result};

  } catch (error) {
    console.error(error.message);
    throw new Error("Failed to update profile: " + error.message);
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Onboarding Error:", error.message);
    throw new Error("Failed to check onboarding status: " + error.message);
  }
}

