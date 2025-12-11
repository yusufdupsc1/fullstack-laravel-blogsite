'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Blog Posts</h1>
      <Link href="/create" style={{ display: 'inline-block', marginBottom: '1rem', padding: '0.5rem 1rem', background: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
        Create New Post
      </Link>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {posts.map((post: any) => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>Created at: {new Date(post.created_at).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
