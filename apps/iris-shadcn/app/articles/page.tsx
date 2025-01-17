import { client } from "@/lib/client";
import gql from "graphql-tag";
import Articles from "./Articles";

const fetchData = async () => {
  const { data } = await client.query({
    query: gql`
      query ($slug: [String!]) {
        posts(formats: { slugs: $slug }) {
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
            format {
              name
              slug
            }
            published_date
            id
            excerpt
            status
            subtitle
            title
            slug
          }
        }
      }
    `,
    variables: {
      slug: ["fact-check", "article"],
    },
  });

  return data.posts.nodes;
};

export default async function Page() {
  const posts = await fetchData();

  return <Articles posts={posts} />;
}
