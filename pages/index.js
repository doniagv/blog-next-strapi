import styles from "../styles/Home.module.css";

import Posts from "../components/Posts";

export default function Home({ posts, meta }) {
  return (
    <div>
      <div className="m-8 md:m-20 grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        <Posts posts={posts} />
      </div>
      {/* <h3>Total amount of posts: {meta.pagination.total}</h3> */}
    </div>
  );
}

export async function getStaticProps() {
  // get  posts from our API

  const res = await fetch("http://localhost:1337/api/posts?populate=*", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
    },
  });
  const responseData = await res.json();
  const { data: posts, meta } = responseData;

  return {
    props: { posts, meta },
  };
}
