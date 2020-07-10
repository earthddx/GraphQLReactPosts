import React from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import Post from "./components/Post";

const GET_POSTS = gql`
  {
    posts {
      id
      title
      body
      createdAt
    }
  }
`;

const Empty = () => (
  <div>
    <div>
      <h2>No posts yet. </h2>
    </div>
    <div>
      <Link to="/new">Create one? </Link>
    </div>
  </div>
);

function App() {
  const { data, loading, refetch } = useQuery(GET_POSTS, {
    fetchPolicy: "network-only",
  });

  if (loading) return <div>loading...</div>;
  console.log(data);

  return (
    <div>
      <header>
        <h2>All posts</h2>
        <Link to="/new">Create post</Link>
      </header>
      {data.posts.length === 0 && <Empty />}
      {data.posts.map((post) => (
        <Post key={post.id} post={post} refetch={refetch}/>
      ))}
    </div>
  );
}

export default App;
