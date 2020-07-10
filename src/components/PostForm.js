import React, { useState } from "react";

export default function PostForm({ loading, error, post, savePost }) {
  const [title, setTitle] = useState(post?.title);
  const [body, setBody] = useState(post?.body);

  const onSubmit = (e) => {
    e.preventDefault();
    savePost({ title, body });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title</label>
          <input
            required
            name="title"
            placeholder="..."
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={title}
          />
        </div>
        <div>
          <label>Body</label>
          <textarea
            required
            name="body"
            placeholder="..."
            onChange={(e) => setBody(e.target.value)}
            defaultValue={body}
          />
        </div>
        <div>
          <button disabled={loading}>Submit</button>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}
