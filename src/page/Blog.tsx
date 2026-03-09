import { useEffect, useState } from "react";
import { BlogStore } from "../lib/backendless";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type BlogPost = {
  objectId: string;
  title: string;
  author: string;
  content: string;
  published: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  useEffect(() => {
    BlogStore.find().then((data) => setPosts(data as BlogPost[]));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F2]">
      <Navbar />

      {/* Page Header */}
      <div className="bg-[#77100f] py-14 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide mb-2">Our Blog</h1>
        <p className="text-white/70 text-base md:text-lg">Stories, tips, and updates from Anomali Coffee</p>
        <div className="w-20 h-1 bg-white/40 rounded-full mx-auto mt-4"></div>
      </div>

      {/* Blog Cards */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        {posts.length === 0 ? (
          <div className="text-center text-gray-400 text-lg py-20">Loading posts...</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.objectId}
                to={`/blog/${post.objectId}`}
                className="group bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                {/* Colored accent top bar */}
                <div className="h-2 bg-[#77100f] w-full"></div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Meta */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <span className="bg-[#f5e6e6] text-[#77100f] font-semibold px-2 py-0.5 rounded-full">
                      {post.author}
                    </span>
                    <span>•</span>
                    <span>{new Date(post.published).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-[#2d1a1a] mb-3 group-hover:text-[#77100f] transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">
                    {post.content.slice(0, 150)}...
                  </p>

                  {/* Read More */}
                  <div className="mt-5 flex items-center gap-1 text-[#77100f] font-semibold text-sm group-hover:gap-3 transition-all">
                    Baca Selengkapnya
                    <span className="text-lg leading-none">&#8594;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}