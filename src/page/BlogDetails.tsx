import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

  if (!post)
    return (
      <div className="min-h-screen flex flex-col bg-[#FFF9F2]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-[#77100f] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500">Memuat artikel...</p>
          </div>
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F2]">
      <Navbar />

      {/* Page Header */}
      <div className="bg-[#77100f] py-10 px-4 text-center">
        <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Anomali Coffee Blog</p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white max-w-3xl mx-auto leading-tight">
          {post.title}
        </h1>
      </div>

      {/* Article */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Top accent */}
          <div className="h-2 bg-[#77100f]"></div>

          <div className="p-8 md:p-12">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#77100f] flex items-center justify-center text-white font-bold text-lg">
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2d1a1a]">{post.author}</p>
                  <p className="text-xs text-gray-400 ">
                    {new Date(post.published).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="ml-auto">
                <span className="bg-[#f5e6e6] text-[#77100f] text-xs font-semibold px-3 py-1 rounded-full">
                  Artikel
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mb-8"></div>

            {/* Content */}
            <div className="text-gray-700 text-base leading-8 whitespace-pre-line text-justify">
              {post.content}
            </div>

            {/* Back Button */}
            <div className="mt-12 pt-6 border-t border-gray-100">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 bg-[#77100f] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#5a0b0b] transition-colors"
              >
                <span>&#8592;</span> Kembali ke Blog
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}