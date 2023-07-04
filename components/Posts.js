import CardPost from "./CardPost";

const Posts = ({ posts }) => {
  return posts && posts.map((post) => <CardPost key={post.id} post={post} />);
};

export default Posts;
