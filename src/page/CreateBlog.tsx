import { useEffect, useState } from "react";
import BlogForm from "../components/BlogForm";
import { BlogStore } from "../lib/backendless";
import Navbar from "../components/Navbar";

function Notification({ message }: { message: string }) {
  return (
    <div className="bg-green-100 text-green-700 px-4 py-2 rounded my-2">
      {message}
    </div>
  );
}


type BlogPost = {
  objectId?: string;  // Backendless uses objectId for PK
  title: string;
  author: string;
  content: string;
  published?: string;
};

export default function CreateBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [notif, setNotif] = useState<string | null>(null);

  const load = async () => {
    const result = (await BlogStore.find()) as BlogPost[];
    setPosts(result);
  };

  useEffect(() => { load(); }, []);

  async function createOrUpdate(values: BlogPost) {
  try {
    if (editing) {
      await BlogStore.save({ ...editing, ...values });
      setNotif("Blog post updated!");
    } else {
      await BlogStore.save({ ...values, published: new Date().toISOString() });
      setNotif("Blog post created!");
    }
    setEditing(null);
    load();
  } catch (err:any) {
    setNotif("Error: " + (err.message || err.toString()));
  }
}

  async function deletePost(pid: string) {
    await BlogStore.remove(pid);
    setNotif("Deleted!");
    load();
  }

  return (
    <>
      <Navbar/>
      <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <BlogForm initial={editing || undefined} onSubmit={createOrUpdate} />
        {notif && <Notification message={notif} />}
        <div className="mt-8">
          <ul>
            {posts.map(p => (
              <li key={p.objectId} className="border-b py-2 flex justify-between">
                <div>
                  <strong>{p.title}</strong> by {p.author}
                  <div className="text-gray-500 text-sm">{new Date(p.published || "").toLocaleString()}</div>
                </div>
                <div>
                  <button onClick={() => setEditing(p)} className="btn mr-2">Edit</button>
                  <button onClick={() => deletePost(p.objectId!)} className="btn bg-red-500">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}