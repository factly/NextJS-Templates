import { client } from '@/lib/client';
import gql from "graphql-tag";
import FeaturedPost from "@/components/FeaturedPost";
import SidePosts from "@/components/SidePosts";
import PostGrid from "@/components/PostGrid";
const fetchData = async (limit = 12, page = 1) => {
  'use server';
  const { data } = await client.query({
    query: gql`
      query Homepage {
        featuredCategories(featuredCount: 4, postLimit: 20) {
          nodes {
            name
            posts {
              nodes {
                users {
                  id
                  first_name
                  last_name
                  display_name
                  slug
                }
                categories {
                  slug
                  name
                }
                medium {
                  alt_text
                  url
                  dimensions
                }
                published_date
                id
                status
                subtitle
                title
                slug
                excerpt
              }
            }
          }
        }
        posts(limit: ${limit}, page: ${page}) {
          total
          nodes {
            users {
              id
              first_name
              last_name
              display_name
              slug
            }
            categories {
              slug
              name
            }
            medium {
              alt_text
              url
              dimensions
            }
            published_date
            id
            status
            subtitle
            title
            slug
            excerpt
          }
        }
        factchecks: posts(formats: { slugs: ["fact-check"] }) {
          total
          nodes {
            users {
              id
              first_name
              last_name
            }
            categories {
              slug
              name
            }
            medium {
              alt_text
              url
              dimensions
            }
            published_date
            id
            status
            subtitle
            title
            slug
          }
        }
      }
    `,
  });

  if (!data) {
    return {
      posts: [],
    };
  }

  return {
    posts: data.posts.nodes,
  };
}

export default async function Home() {

  const { posts } = await fetchData();
  const featuredPosts = posts.slice(0, 6);
  return (
    <>
      <h1 className="text-2xl mx-6 mb-3 sm:mx-16 md:mx-20 lg:mx-32 font-bold text-black">Featured Posts</h1>
      <div
        className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 px-4 sm:px-12 md:px-[4vw] lg:px-[6vw] lg:mt-6"
      >
        {/* Main story section */}
        <div >
          {<FeaturedPost featuredPost={featuredPosts[0]} />}
        </div>

        {/* Side story section */}
        <div
          className="pr-2"
        >
          {<SidePosts sidePosts={featuredPosts.slice(1)} />}
        </div>

        {/* Most recent posts */}
        <div className="col-span-1 lg:col-span-2">
          <h1 className="text-2xl font-bold text-black mt-10">Most Recent Posts</h1>
          {<PostGrid posts={posts} fetchPosts={fetchData} />}
        </div>
      </div>
    </>
  );
}
