import React from "react";
import Navbar from "./../../components/Navbar";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings.d";
import { GetStaticProps } from "next";
import PortableText from "react-portable-text";

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
      <div className="max-w-screen-lg mx-auto shadow-2xl mb-10">
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
          <div className="mt-10">
            <PortableText
             dataset = {process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}
             projectId={
                process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "yqvtu0ee"
             }
             content={post.body}
             serializers={{
                h1: (props: any) => (
                    <h1
                        className="text-3xl font-bold my-5"
                        {...props}
                    />
                ),
                h2: (props: any) => (
                    <h2
                        className="text-2xl font-bold my-5"
                    />
                ),
                h3: (props: any) => (
                    <h3
                        className="text-2xl font-bold my-5"
                    />
                ),
                li: ({children}: any) => (
                    <li
                        className="ml-4 list-disc">{children}
                    </li>
                ),
                link: ({ href, children }: any) => (
                    <a href={href} className="text-blue-500 hover:underline">
                        {children}
                    </a>
                )
             }}
            />
          </div>
        </article>
        <hr className="max-w-lg my-5 mx-auto border[1px] border-gray-700 font-bold"/>
        <div>
            <p className="text-xs text-blue-700 uppercase">Enjoyed this article 😁</p>
            <h3 className="text-3xl font-bold">Leave a Comment below ✍️</h3>
            <hr className="py-3 mt-2"/>
            {/* Form */}
            <form className="mt-7 flex flex-col gap-6 p-4">
                <label className="flex flex-col">
                    <span className="font-semibold text-base">Name</span>
                    <input 
                    className="text-base placeholder:text-sm border-b-[1px] border-gray-400 py-1 px-4 outline-none focus-within:shadow-xl shadow-blue-700"
                    type="text"
                    placeholder="Enter your name"
                    />
                </label>
                <label className="flex flex-col">
                    <span className="font-semibold text-base">Email</span>
                    <input 
                    className="text-base placeholder:text-sm border-b-[1px] border-gray-400 py-1 px-4 outline-none focus-within:shadow-xl shadow-blue-700"
                    type="email"
                    placeholder="Enter your Email"
                    />
                </label>
                <label className="flex flex-col">
                    <span className="font-semibold text-base">Comment</span>
                    <textarea 
                    className="text-base placeholder:text-sm border-b-[1px] border-gray-400 py-1 px-4 outline-none focus-within:shadow-xl shadow-blue-700"
                    placeholder="Enter your Comments ..."
                    rows={6}
                    />
                </label>
                <button
                className="w-full bg-blue-700 text-white text-base font-semibold tracking-wider uppercase py-2 rounded-sm hover:bg-blue-900 duration-300" 
                type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
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
