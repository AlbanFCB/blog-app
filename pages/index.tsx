import { sanityClient, urlFor } from "../sanity";
import { Post } from "./../typings.d";
import Image from "next/image";
import Header from "./../components/Header";
import Link from "next/link";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(posts);
  return (
    <main className="bg-gray-50">
      <Header />
      <div className="max-w-screen-2xl mx-auto sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {posts.map((post) => (
          <Link href={`/post/${post.slug.current}`} key={post._id}>
            <div className="border-[1px] border-blue-700 border-opacity-40 h-[450px] group">
              <div className="h-3/5 w-full overflow-hidden">
                <Image
                  alt=""
                  className="w-full h-full object-cover brightness-75 group-hover:brightness-100 duration-300 group-hover:scale-110"
                  width={400}
                  height={350}
                  src={urlFor(post.mainImage).url()}
                />
              </div>
              <div className="h-2/5 w-full flex flex-col justify-center">
                <div className=" flex justify-between items-center px-4 py-1 border-b-[1px] border-b-blue-700">
                  <p>
                  {post.title}
                  </p>
                  <img 
                  className="w-12 h-12 rounded-full object-cover"
                  src={urlFor(post.author.image).url()!} 
                  alt="author" 
                  />
                  
                </div>
                <p className="py-2 px-4 text-base">
                  {post.description.substring(0, 60)}... by -{" "} 
                  <span className="font-semibold">{post.author.name}</span>
                </p>
              </div>
            </div>
          </Link>
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
