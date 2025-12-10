// app/page.tsx
import { db } from "@/lib/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";

// Shadcn UI 카드 컴포넌트 (없으면 기본 div로 해도 됨)
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  // DB에서 글 가져오기 (비동기)
  const allPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt)); // 최신순 정렬

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">🥓 Porkbellog</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.createdAt?.toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 line-clamp-3">{post.content}</p>
            </CardContent>
          </Card>
        ))}
        
        {allPosts.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            아직 작성된 글이 없습니다.
          </p>
        )}
      </div>
    </main>
  );
}