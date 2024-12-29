import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import withAuth from '../utils/withAuth';

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data: session } = await supabase.auth.getSession();

      if (!session?.session?.user) {
        setError("You must be logged in to create a post.");
        return;
      }

      const { error: postError } = await supabase.from("posts").insert([
        {
          user_id: session.session.user.id,
          content,
        },
      ]);

      if (postError) {
        setError(postError.message);
        return;
      }

      alert("Post created successfully!");
      setContent("");
      router.push("/feed");
    } catch (error) {
      console.error("Error creating post:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Create a Post</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleCreatePost}>
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-40 p-4 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default withAuth(CreatePost);
