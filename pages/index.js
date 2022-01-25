import Head from "next/head";
import { PostCard, Categories, PostWidget } from "../components";
import { getPosts } from "../services";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="w-full relative top-8">
        <PostWidget />
        <Categories />
      </div>
      <div className="w-full float-left">
        <div className="flex flex-row flex-wrap">
          <h3 className="w-full text-xl mb-4 mt-4 font-semibold pt-4 pb-4">
            All Projects
          </h3>
          {posts.map((post) => (
            <PostCard post={post.node} key={post.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}
