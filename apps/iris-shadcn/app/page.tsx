import { client } from '@/lib/client';
import gql from "graphql-tag";
import FeaturedPost from "@/components/FeaturedPost";
import SidePosts from "@/components/SidePosts";
import MostRecentPosts from "@/components/MostRecentPosts";
const fetchData = async () => {
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
        posts {
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
      notFound: true,
    };
  }

  return {
    posts: data.posts.nodes,
  };
}

export default async function Home() {
  const { posts } = await fetchData();
  const featuredPosts = posts.slice(0, 6);
  const recentPosts = posts.slice(6);
  return (
    <>
      <h1 className="text-2xl mx-8 sm:mx-16 md:mx-20 lg:mx-32 font-bold text-black">Featured Posts</h1>
      <div
        className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 px-8 sm:px-12 md:px-[4vw] lg:px-[6vw] lg:mt-6"
      >
        {/* Main story section */}
        <div className="">
          {<FeaturedPost featuredPost={featuredPosts[0]} />}
        </div>

        {/* Side story section */}
        <div
          className="lg:block pr-2"
        >
          {<SidePosts sidePosts={featuredPosts.slice(1)} />}
        </div>

        {/* Most recent posts */}
        <div className="col-span-1 lg:col-span-2">
          <h1 className="text-2xl font-bold text-black mt-10">Most Recent Posts</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {<MostRecentPosts posts={recentPosts} />}
          </div>
        </div>
      </div>
    </>


  );
}
