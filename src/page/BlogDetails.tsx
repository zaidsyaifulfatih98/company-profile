import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogStore } from "../lib/backendless";

type BlogPost = {
  objectId: string;
  title: string;
  author: string;
  content: string;
  published: string;
};

export default function BlogDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    BlogStore.findById(id!).then(setPost);
  }, [id]);

  if (!post) return <div className="text-center mt-10">Loading...</div>;
  return (
    <>
      <Navbar/>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
        <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
        <div className="text-sm text-gray-600 mb-2">By {post.author} | {new Date(post.published).toLocaleString()}</div>
        <div className="prose">{post.content}</div>
      </div>
    </>
  );
}