import React from "react";
import Navbar from "./../../components/Navbar";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings.d";
import { GetStaticProps } from "next";

interface Props {
  post: Post;
}

const Post = ({ post }: Props) => {
  return (
    <div className="mt-20">
      <Navbar />
      <img
        className="w-full h-96 object-cover"
        src={urlFor(post.mainImage).url()!}
        alt="coverImage"
      />
      <div className="max-w-screen-xl mx-auto">
        <article className="w-full mx-auto p-5 bg-gray-100">
          <h1 className="font-medium text-[32px] text-primary border-b-[1px] border-gray-700 mt-10 mb-3">
            {post.title}
          </h1>
          <h2 className="text-[18px] text-gray-500 mb-2">{post.description}</h2>
          <div className="flex items-center gap-4">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={urlFor(post.author.image).url()!}
              alt="author"
            />
            <p className="text-base">
              Blog post by
              <span>{post.author.name}</span>- Published at{" "}
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
          slug{
          current
          }
       }`;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
            publishedAt,
            title,
            author ->{
                name,
                image,
            },
            description,
            mainImage,
            slug,
            body
    }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
