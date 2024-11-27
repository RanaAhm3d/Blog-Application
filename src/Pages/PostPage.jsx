import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const PostPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, loading] = useFetch(params.id);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setBody(data.body);
      setTags(data.tags);
    }
  }, [data]);

  const handleSave = async () => {
    try {
      await axios.put(`https://dummyjson.com/posts/${params.id}`, {
        title,
        body,
        tags,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update post", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://dummyjson.com/posts/${params.id}`);
        window.alert("Post deleted successfully!");
        navigate('/');
      } catch (error) {
        console.error("Failed to delete post", error);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <h1 className="text-4xl">Edit Post</h1>
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
          <div className="flex items-center gap-2 my-2">
            {tags.map((tag, index) => (
              <input
                key={index}
                type="text"
                className="my-1 p-2 border"
                value={tag}
                onChange={(e) => {
                  const newTags = [...tags];
                  newTags[index] = e.target.value;
                  setTags(newTags);
                }}
              />
            ))}
          </div>
          <button type="button" className="btn btn-primary p-1 my-3" onClick={handleSave}>
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary p-1 my-3 m-5"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl">{data.title}</h1>
          <p className="my-4">{data.body}</p>
          <h4 className="mb-2">Tags</h4>
          <div className="flex items-center gap-2">
            {data.tags.map((e, i) => (
              <span className="bg-primary text-white p-1 mx-1 rounded-pill" key={i}>
                {e}
              </span>
            ))}
          </div>
          <button type="button" className="btn btn-primary p-1 my-3"  onClick={() => setIsEditing(true)}>

            Edit Post

          </button>

          <button type="button" className="btn btn-danger p-1 my-3 m-5" onClick={handleDelete}>
            Delete Post
          </button>
        </div>
      )}
    </div>
  );
};

export default PostPage;
