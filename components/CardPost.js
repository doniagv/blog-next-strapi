import Image from "next/image";
import Link from "next/link";

const CardPost = ({ post }) => {
  const { id, attributes } = post;
  const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  return (
    <div key={id} className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image
        className="w-full"
        src={attributes?.mainImage?.data?.attributes?.formats?.medium?.url ? `${strapiApiUrl}${attributes.mainImage.data.attributes.formats.medium.url}` : ""}
        width={attributes?.mainImage?.data?.attributes?.formats?.medium?.width ?? 750}
        height={attributes?.mainImage?.data?.attributes?.formats?.medium?.width ?? 422}
        alt="Sunset in the mountains"
      />
      <div className="px-3 md:px-6 py-4">
        <div className="font-bold text-xl mb-2">{attributes.title}</div>
        <p className="text-gray-700 text-base">{attributes.description}</p>
        <Link href={"/posts/[slug]"} as={`/posts/${attributes.slug}`}>
          <p className="mt-5 text-violet-500">Read more...</p>
        </Link>
      </div>
      <div className="px-3 md:px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
      </div>
    </div>
  );
};

export default CardPost;
