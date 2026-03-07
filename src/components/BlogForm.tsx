import { useEffect, useState } from "react";

type BlogPost = {
  objectId?: string;
  title: string;
  author: string;
  content: string;
  published?: string;
};

type Props = {
  initial?: BlogPost;
  onSubmit: (values: BlogPost) => Promise<void>;
}

export default function BlogForm({ initial, onSubmit }: Props) {
  const emptyValues: BlogPost = {
    title: "",
    author: "",
    content: "",
  };

  const [values, setValues] = useState<BlogPost>(initial || emptyValues);
  const [errors, setErrors] = useState<{[k:string]:string}>({});
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setValues(initial || emptyValues);
    setErrors({});
    setSubmitError(null);
  }, [initial]);

  const validate = () => {
    const errs: {[k:string]:string} = {};
    if (!values.title) errs.title = "Title required";
    if (!values.content) errs.content = "Content required";
    if (!values.author) errs.author = "Author required";
    return errs;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    setSubmitError(null);
    try {
      await onSubmit(values);
      if (!initial) {
        setValues(emptyValues);
      }
    } catch (error: any) {
      setSubmitError(error?.message || "Failed to save blog post");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitError && <div className="text-red-500">{submitError}</div>}
      <div>
        <input
          name="title"
          className="input"
          placeholder="Title"
          value={values.title}
          onChange={e => setValues(v => ({...v, title: e.target.value}))}
        />
        {errors.title && <div className="text-red-500">{errors.title}</div>}
      </div>
      <div>
        <input
          name="author"
          className="input"
          placeholder="Author"
          value={values.author}
          onChange={e => setValues(v => ({...v, author: e.target.value}))}
        />
        {errors.author && <div className="text-red-500">{errors.author}</div>}
      </div>
      <div>
        <textarea
          name="content"
          className="input min-h-[220px] resize-y"
          placeholder="Content"
          rows={10}
          value={values.content}
          onChange={e => setValues(v => ({...v, content: e.target.value}))}
        />
        {errors.content && <div className="text-red-500">{errors.content}</div>}
      </div>
      <button type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={busy}>
        {busy ? "Saving..." : "Save"}
      </button>
    </form>
  );
}