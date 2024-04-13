import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const CourseId = params.courseId.split(',');


    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    } 
    console.log(CourseId[2])
    const userpurchase = await db.purchase.upsert({
      where: {
        userId_courseId: {
          userId,
          courseId:CourseId[2].toString(),
        }
      },
      update: {
        courseId:CourseId[2].toString(),
      },
      create: {
        userId,
        courseId:CourseId[2].toString(),
      }
    })

    return NextResponse.json(userpurchase);
  } catch (error) {
    console.log("[ADD_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}