import getConfig from "next/config";
import Post from "../../components/Post";

const PostPage = ({ post }) => {
  return <Post post={post} />;
};

export async function getStaticPaths() {
  const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const res = await fetch(`${strapiApiUrl}/posts?populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
    },
  });
  const responseData = await res.json();
  const { data: posts, meta } = responseData;

  const paths = posts.map((post) => ({
    params: { slug: post.attributes.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  console.log("🚀 ~ file: [slug].js:32 ~ getStaticProps ~ slug:", slug);
  const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  //http://localhost:1337/api/posts?[filters][slug][$eq]=architecture-project&populate=*
  const res = await fetch(`${strapiApiUrl}/posts?[filters][slug][$eq]=${slug}&populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
    },
  });

  const resObject = await res.json();

  const post = resObject.data[0];

  return {
    props: { post },
  };
}

export default PostPage;
