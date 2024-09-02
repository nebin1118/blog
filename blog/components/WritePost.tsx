"use client";
import { useState } from "react";

const WritePost: React.FC<{
  onPostSubmit?: (title: string, content: string) => void;
  onCancel?: () => void;
}> = ({ onPostSubmit, onCancel }) => {
  const [title, setTitle] = useState<string>(""); // 제목 상태
  const [content, setContent] = useState<string>(""); // 내용 상태

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }), // 제목과 내용을 JSON 형식으로 전송
      });

      if (res.ok) {
        if (onPostSubmit) onPostSubmit(title, content); // 부모 컴포넌트에 작성된 글 전달
      } else {
        alert("글 작성에 실패했습니다."); // 실패 메시지
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다."); // 서버 오류 처리
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-2xl p-6 bg-white rounded shadow-lg"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // 제목 변경 시 상태 업데이트
          placeholder="제목 입력"
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)} // 내용 변경 시 상태 업데이트
          placeholder="내용 입력"
          className="w-full p-2 mb-4 border rounded h-[200px]"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            작성하기
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default WritePost;
