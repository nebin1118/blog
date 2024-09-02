// /app/api/posts/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();

    // 예: MongoDB에 데이터 저장하는 로직
    // const result = await db.collection('posts').insertOne({ title, content });

    // 성공 응답
    return NextResponse.json(
      { message: "글이 성공적으로 작성되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("글 작성 중 오류:", error);
    return NextResponse.json(
      { message: "글 작성에 실패했습니다." },
      { status: 500 }
    );
  }
}
