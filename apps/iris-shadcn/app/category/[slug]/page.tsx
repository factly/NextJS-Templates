import PostGrid from "@/components/PostGrid";
import { client } from "@/lib/client";
import gql from "graphql-tag";
import { notFound } from "next/navigation";
import { PostQueryData } from "@/types";

const POST_QUERY = gql`
  query ($slug: String!) {
    category(slug: $slug) {
      description
      id
      medium {
        alt_text
        url
        dimensions
      }
      name
      slug
    }
    formats {
      nodes {
        id
        slug
        name
      }
    }
    posts(categories: { slugs: [$slug] }) {
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
`;

async function fetchData(slug: string): Promise<PostQueryData | null> {
  try {
    const { data } = await client.query<PostQueryData>({
      query: POST_QUERY,
      variables: { slug },
    });

    if (!data || !data.category) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await fetchData(params.slug);

  if (!data) {
    notFound();
  }

  const { posts } = data;

  return (
    <div className="px-4 sm:px-12 md:px-[4vw] lg:px-[6vw]">
      <PostGrid posts={posts.nodes} />
    </div>
  );
}
