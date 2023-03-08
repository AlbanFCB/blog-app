import type { NextPage } from "next";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "./../typings.d";
import Image from "next/image";
import Header from "./../components/Header";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(posts);
  return (
    <main className="bg-gray-50">
      <Header />
      <div className="max-w-screen-2xl mx-auto bg-white">
        {posts.map((post) => (
          <div>
            {post.title}
            <Image
              alt=""
              width={400}
              height={350}
              src={urlFor(post.mainImage).url()}
            />
          </div>
        ))}
      </div>
    </main>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
      name,
      image
    },
      description,
      mainImage,
      slug
  }`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
