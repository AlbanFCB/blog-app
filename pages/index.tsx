import type { NextPage } from 'next'
import {sanityClient,urlFor} from "../sanity";
import { Post } from './../typings.d';
import  Image  from 'next/image';
import Navbar from './../components/Navbar';

interface Props{
  posts: [Post]
}

export default function Home({posts}:Props) {
  console.log(posts);
  return(
    <div className="bg-gray-200">
      <Navbar/>
      <h1 className="text-4xl">Voci mes articles</h1>
      <div>
        {posts.map((post) => (
          <div>
            {post.title}
            <Image alt="" width={400} height={350} src={urlFor(post.mainImage).url()}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async ()=>{
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
  }`
  const posts = await sanityClient.fetch(query);
  return{
    props:{
      posts,
    }
  }
}
