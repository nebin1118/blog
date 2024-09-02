"use client";
import { useState } from "react";
import WritePost from "@/components/WritePost";

type Post = {
  id: number;
  title: string;
  content: string;
};

type Comment = {
  id: number;
  postId: number;
  content: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]); // 작성된 글 목록 상태
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 상태
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); // 선택된 글 상태
  const [activeTab, setActiveTab] = useState<"list" | "write" | "view">("list"); // 현재 활성화된 탭
  const [newComment, setNewComment] = useState<string>(""); // 새 댓글 입력 상태

  // 글 작성 완료 시 호출
  const handlePostSubmit = (title: string, content: string) => {
    const newPost: Post = {
      id: posts.length + 1,
      title,
      content,
    };
    setPosts([...posts, newPost]);
    setActiveTab("list"); // 작성 완료 후 글 목록으로 이동
  };

  // 글 클릭 시 상세 페이지로 이동
  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setActiveTab("view"); // 선택된 글의 상세 페이지로 이동
  };

  // 댓글 작성 핸들러
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPost && newComment.trim() !== "") {
      const newCommentObj: Comment = {
        id: comments.length + 1,
        postId: selectedPost.id,
        content: newComment,
      };
      setComments([...comments, newCommentObj]);
      setNewComment(""); // 댓글 작성 후 입력창 초기화
    }
  };

  // 탭 전환
  const renderContent = () => {
    switch (activeTab) {
      case "list":
        return (
          <div className="w-full p-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-4 mb-2 rounded shadow cursor-pointer hover:bg-gray-100"
                  onClick={() => handlePostClick(post)}
                >
                  <h2 className="text-lg font-bold">{post.title}</h2>
                  <p className="text-gray-700">
                    {post.content.substring(0, 50)}...
                  </p>
                </div>
              ))
            ) : (
              <p>작성된 글이 없습니다.</p>
            )}
          </div>
        );
      case "write":
        return (
          <WritePost
            onPostSubmit={handlePostSubmit}
            onCancel={() => setActiveTab("list")}
          />
        );
      case "view":
        return selectedPost ? (
          <div className="w-full p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold">{selectedPost.title}</h2>
            {/* 줄 바꿈 포함하여 글 내용 표시 */}
            <p className="mt-2 whitespace-pre-wrap">{selectedPost.content}</p>

            {/* 댓글 리스트 */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">댓글</h3>
              {comments.filter((c) => c.postId === selectedPost.id).length >
              0 ? (
                comments
                  .filter((c) => c.postId === selectedPost.id)
                  .map((comment) => (
                    <div
                      key={comment.id}
                      className="p-2 mb-1 border rounded bg-gray-100"
                    >
                      {comment.content}
                    </div>
                  ))
              ) : (
                <p>댓글이 없습니다.</p>
              )}

              {/* 댓글 작성 폼 */}
              <form onSubmit={handleCommentSubmit} className="mt-2">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글 작성"
                  className="w-full p-2 border rounded h-[100px] mb-2"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  댓글 추가
                </button>
              </form>
            </div>

            <button
              onClick={() => setActiveTab("list")}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              목록으로 돌아가기
            </button>
          </div>
        ) : (
          <p>선택된 글이 없습니다.</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-slate-100">
      <div className="w-1/2 h-[100%] flex flex-col items-center">
        {/* 탭 메뉴 */}
        <div className="w-full flex justify-around bg-gray-800 text-white py-2">
          <button
            className={`px-4 py-2 ${activeTab === "list" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            글 목록
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "write" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab("write")}
          >
            글 작성
          </button>
          {selectedPost && (
            <button
              className={`px-4 py-2 ${
                activeTab === "view" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveTab("view")}
            >
              글 보기
            </button>
          )}
        </div>

        {/* 탭 내용 */}
        {renderContent()}
      </div>
    </div>
  );
}
