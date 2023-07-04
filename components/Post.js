import { useEffect, useState } from "react";
import Image from "next/image";
import * as Vibrant from "node-vibrant";
import { remark } from "remark";
import html from "remark-html";

const Post = ({ post }) => {
  const { id, attributes } = post;
  const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const [renderedContent, setRenderedContent] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    const processContent = async () => {
      const processedContent = await remark().use(html).process(attributes.content);
      setRenderedContent(processedContent.toString());
    };

    processContent();
  }, [attributes.content]);

  useEffect(() => {
    const getDominantColor = async (imageUrl) => {
      try {
        const img = await Vibrant.from(imageUrl).getSwatches();
        const swatches = Object.values(img);
        const vibrantSwatch = swatches.find((swatch) => swatch?.population > 0);
        const dominantColor = vibrantSwatch?.hex || "";
        setBackgroundColor(dominantColor);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    if (attributes?.mainImage?.data?.attributes?.formats?.large) {
      const imageUrl = `${strapiApiUrl}${attributes.mainImage.data.attributes.formats.large.url}`;
      getDominantColor(imageUrl);
    }
  }, [attributes, strapiApiUrl]);

  return (
    <div key={id} className="flex flex-col sm:flex-row md:items-center lg:items-center" style={{ backgroundColor }}>
      <div className="w-full sm:w-auto md:w-2/3 md:h-screen">
        {attributes?.mainImage?.data?.attributes?.formats?.large && (
          <div className="h-[60vh] sm:h-auto md:h-full">
            <Image
              src={`${strapiApiUrl}${attributes.mainImage.data.attributes.formats.large.url}`}
              width={attributes.mainImage.data.attributes.formats.large.width}
              height={attributes.mainImage.data.attributes.formats.large.height}
              alt="Sunset in the mountains"
              className="md:w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      <div className="w-full sm:w-auto md:w-1/3 pl-6 py-12 post-content text-white">
        <div className="font-medium text-xl mb-2">{attributes.title}</div>
        <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
      </div>
    </div>
  );
};

export default Post;
