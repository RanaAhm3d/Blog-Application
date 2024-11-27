import React from 'react'
import { useState } from 'react';
import { api } from '../utilis/axios';

export default function AddPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  return (
    <div className="container p-4">
      <h1>Add New Post</h1>
      <form onSubmit={(e) => {
        e.preventDefault(e);
        api.post('https://dummyjson.com/posts/add', {
          userId: 1,
          title,
          body,
        })
        .then(() => {
          setAdded(true);
          setTitle("");
          setBody("");
        });
      }}>
        <div className="mb-3">
          
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">Body</label>
          <textarea
            id="body"
            className="form-control"
            rows="5"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button
        className="btn btn-primary" 
        type='submit'>
          send
        </button>
      </form>
    </div>
  );
}
