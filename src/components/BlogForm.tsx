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

  const inputBase =
    "w-full px-4 py-3 rounded-lg border bg-gray-50 text-gray-800 placeholder-gray-400 transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400";
  const inputError = "border-red-400 focus:ring-red-400 focus:border-red-400";
  const inputNormal = "border-gray-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitError && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {submitError}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          id="title"
          name="title"
          className={`${inputBase} ${errors.title ? inputError : inputNormal}`}
          placeholder="Enter blog title..."
          value={values.title}
          onChange={e => setValues(v => ({ ...v, title: e.target.value }))}
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Author <span className="text-red-400">*</span>
        </label>
        <input
          id="author"
          name="author"
          className={`${inputBase} ${errors.author ? inputError : inputNormal}`}
          placeholder="Author name..."
          value={values.author}
          onChange={e => setValues(v => ({ ...v, author: e.target.value }))}
        />
        {errors.author && <p className="mt-1 text-sm text-red-500">{errors.author}</p>}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Content <span className="text-red-400">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          className={`${inputBase} min-h-[220px] resize-y ${errors.content ? inputError : inputNormal}`}
          placeholder="Write your blog content here..."
          rows={10}
          value={values.content}
          onChange={e => setValues(v => ({ ...v, content: e.target.value }))}
        />
        {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
      </div>

      <button
        type="submit"
        disabled={busy}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {busy ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Saving...
          </>
        ) : initial ? "Update Post" : "Publish Post"}
      </button>
    </form>
  );
}