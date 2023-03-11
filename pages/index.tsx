import { sanityClient, urlFor } from "../sanity";
import { Categorie, Post } from "./../typings.d";
import Image from "next/image";
import Header from "./../components/Header";
import Link from "next/link";
import Footer from "./../components/Footer";
import Navbar from "./../components/Navbar";
import { useState } from "react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import { PowerIcon } from "@heroicons/react/24/outline";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { TrophyIcon } from "@heroicons/react/24/outline";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(posts);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Fonction pour filtrer les articles selon la catégorie sélectionnée
  const filteredPosts = posts.filter((post) => {
    if (selectedCategory === "All") {
      return true; // Afficher tous les articles
    } else {
      return post.category.some(
        (cat: { title: string }) => cat.title === selectedCategory
      );
    }
  });

  // Fonction pour changer la catégorie sélectionnée
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Tableau des catégories uniques
  const categories = Array.from(
    new Set(
      posts.flatMap((post) =>
        post.category.map((cat: { title: any }) => cat.title)
      )
    )
  );

  return (
    <main className="bg-gray-50">
      <Header />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      ></link>
      <div className="">
      <div className="flex items-center text-lg justify-center  py-6  shadow-2xl bg-primaryColor">
          {/* Bouton "All" */}
          <button
            className={`flex  px-6 py-4 mx-4 rounded-lg font-medium shadow-2xl font-titleFont ${
              selectedCategory === "All"
                ? "bg-green-400 text-black"
                : "bg-white text-gray-800"
            }`}
            onClick={() => handleCategoryChange("All")}
          >
            <GlobeAltIcon className="h-6 w-6 mr-2 text-gray-500" />
            All
          </button>
          {/* Boutons pour chaque catégorie unique */}
          {categories.map((category) => (
            <button
              key={category}
              className={`flex px-6 py-4 mx-4 rounded-lg font-medium shadow-2xl font-titleFont ${
                selectedCategory === category
                  ? "bg-green-400 text-black"
                  : "bg-white text-gray-800"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category === "Sport" && <TrophyIcon className="w-6 h-6 mr-2" />}
              {category === "Manga" && <BookOpenIcon className="w-6 h-6 mr-2" />}
              {category === "Technology" && <CodeBracketIcon className="w-6 h-6 mr-2" />}
              {category === "Games" && <PowerIcon className="w-6 h-6 mr-2" />}
              {category}
            </button>
          ))}
        </div>
      <div className="my-20 max-w-screen-2xl mx-auto sm:grid grid-cols-1 p-4 md:grid-cols-2 md:gap-4 md:p-6 lg:grid-cols-3 lg:gap-6 lg:p-8 2xl:grid-cols-4 2xl:gap-8">
        
        {filteredPosts.map((post) => (
          <Link href={`/post/${post.slug.current}`} key={post._id}>
            <div className="mb-8 md:mb-0 border-[1px] border-primaryColor border-opacity-40 h-[450px] group shadow-2xl ">
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
                <div className=" flex justify-between items-center px-4 py-1 border-b-[1px] border-b-primaryColor">
                  <p className="font-titleFont font-bold text-xl">
                    {post.title}
                  </p>
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={urlFor(post.author.image).url()!}
                    alt="author"
                  />
                </div>
                <p className="py-2 px-4 text-md font-bodyFont">
                  {post.description.substring(0, 60)}... by -{" "}
                  <span className="font-semibold">{post.author.name}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      </div>
      
      <Footer />
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
    slug,
    "category": *[_type == "category" && _id in ^.categories[]._ref] {
      _id,
      title,
      description
    }
  }`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
