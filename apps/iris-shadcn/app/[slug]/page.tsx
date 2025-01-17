import ProseMirrorRenderer from "@/components/ui/ProseMirrorRenderer";
import { client } from "@/lib/client";
import gql from 'graphql-tag';
import Link from "next/link";
import React from "react";
import Badge from "@/components/ui/Badge";
import Image from "next/image";
import "@/styles/global.css";
import faceBook_icon from "@/public/facebook.svg";
import twitter_icon from "@/public/twitter.svg";
import linkedIn_icon from "@/public/linkedin.svg";
import pintrest_icon from "@/public/pinterest.svg";
import whatapp_icon from "@/public/whatsapp.svg";
import email_icon from "@/public/email.svg";
import TagsSection from "@/components/TagsSection";

interface Post {
  id: string;
  title: string;
  slug: string;
  published_date: string;
  description_html: string;
  description: string;
  medium?: {
    url?: {
      proxy: string;
    };
    alt_text?: string;
  };
  categories?: Array<{ id: string; name: string; slug: string }>;
  users?: Array<{
    display_name: string;
    first_name: string;
    last_name: string;
    slug: string;
    medium?: {
      url?: {
        proxy: string;
      };
      alt_text?: string;
    };
    description?: string;
  }>;
  tags?: Array<{ id: string; name: string; slug: string }>;
  format?: { name: string };
}

interface Props {
  params: {
    slug: string;
  };
}

const POST_QUERY = gql`
query PostQuery($slug: String) {
  post(slug: $slug, include_pages: true) {
    published_date
    is_page
    description
    description_html
    excerpt
    id
    schemas
    slug
    status
    subtitle
    title
    updated_at
    users {
      email
      first_name
      last_name
      display_name
      slug
      id
    }
    tags {
      id
      name
      slug
      description
    }
    medium {
      alt_text
      id
      url
      dimensions
    }
    format {
      name
      slug
      id
      description
    }
    claims {
      checked_date
      claim_date
      claim_sources
      claimant {
        description
        id
        name
        slug
        tag_line
      }
      description
      id
      fact
      review_sources
      slug
      claim
      rating {
        description
        id
        name
        numeric_value
        slug
        medium {
          alt_text
          id
          url
          dimensions
        }
      }
    }
    categories {
      description
      created_at
      id
      name
      slug
      medium {
        alt_text
        id
        url
        dimensions
      }
    }
  }
  posts {
    nodes {
      published_date
      description
      excerpt
      id
      slug
      status
      subtitle
      title
      updated_at
      users {
        email
        first_name
        last_name
        display_name
        slug
        id
      }
      tags {
        id
        name
        slug
        description
      }
      medium {
        alt_text
        id
        url
        dimensions
      }
      format {
        name
        slug
        id
        description
      }
    }
  }
  recentPosts:posts{
    nodes{
    id
    title
    slug
    published_date
    excerpt
    users {
      email
      first_name
      last_name
      display_name
      slug
      id
    }
    medium{
    url
    }
   }
  }
}
`

async function fetchData(slug: string) {
  try {
    const { data } = await client.query({
      query: POST_QUERY,
      variables: {
        slug: slug,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

const Page = async ({ params }: Props) => {
  const data = await fetchData(params.slug);
  const { post, recentPosts } = data;
  return (
    <div className="w-full max-w-[90%] lg:max-w-[70%] xl:max-w-[55vw] mx-auto flex flex-col gap-6">
      {/* Categories */}
      <div className="flex flex-wrap gap-2 items-center">
        {post.categories?.map((category: { id: string; name: string; slug: string }) => (
          <Link href={`/category/${category.slug}`} key={category.id}>
            <Badge text={category.name} className="text-sm lg:text-base font-medium px-3 lg:px-5 py-1" />
          </Link>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center lg:text-left">
        {post.title}
      </h1>

      {/* Author Information */}
      {post.users?.[0] && (
        <Link
          href={`/author/${post.users[0].slug}/`}
          className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <Image
            width={40}
            height={40}
            src={
              post.users[0].medium?.url?.proxy ||
              "https://static.vecteezy.com/system/resources/thumbnails/024/983/914/small/simple-user-default-icon-free-png.png"
            }
            alt={post.users[0].display_name}
            className="rounded-full"
          />
          <div>
            <p className="text-sm sm:text-base text-gray-600 my-0 font-semibold">
              {post.users[0].display_name || post.users[0].first_name}
            </p>
            <p className="text-sm sm:text-base text-gray-600 my-0">
              <time className="post-date" dateTime={post.published_date}>
                {new Date(post.published_date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </p>
          </div>
        </Link>
      )}

      {/* Featured Image */}
      <div>
        <Image
          src={`${post.medium?.url?.proxy || ''}`}
          alt={post.medium?.alt_text || post.title}
          className="rounded-3xl w-full h-auto object-cover object-center"
          width={950}
          height={700}
        />
      </div>

      {/* Post Content */}
      <div>
        <ProseMirrorRenderer content={post.description_html} />
      </div>

     <TagsSection tags={post.tags} />

      {/* Post Footer */}
      <PostFooter post={post} />

      <div className="border-t-2 border-t-zinc-200 py-4 mt-16">
        <h3 className="text-xl text-center mb-6 font-bold">Recent Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentPosts.nodes
            .filter((recentPost: Post) => recentPost.id !== post.id)
            .slice(0, 6)
            .map((recentPost: Post) => (
              <div key={recentPost.id} className="p-3">
                <Link href={`/${recentPost.slug}`} className="flex gap-4">
                  <div>
                    <Image
                      src={recentPost.medium?.url?.proxy || ''}
                      alt={recentPost.title}
                      width={400}
                      height={250}
                      className="rounded-2xl !w-[153px] !h-[110px]"
                    />
                  </div>
                  <div className="max-w-[60%]">
                    <h2 className="text-lg font-semibold text-ellipsis line-clamp-2">{recentPost.title}</h2>
                    <p className="text-base text-gray-600 my-0 p-0">
                      <time className="post-date" dateTime={recentPost.published_date}>
                        {new Date(recentPost.published_date).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

const socials = [
  {
    name: 'Facebook',
    url: (postUrl: string) => `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`,
    icon: faceBook_icon,
  },
  {
    name: 'Twitter',
    url: (postUrl: string, title: string) => `https://twitter.com/share?text=${title}&url=${postUrl}`,
    icon: twitter_icon,
  },
  {
    name: 'LinkedIn',
    url: (postUrl: string, title: string) => `http://www.linkedin.com/shareArticle?mini=true&url=${postUrl}&title=${title}`,
    icon: linkedIn_icon,
  },
  {
    name: 'pinterest',
    url: (postUrl: string, title: string) => `http://pinterest.com/pin/create/button/?url=${postUrl}&amp;media=https://inros.gbjsolution.com/content/images/2021/09/image-2.jpg&amp;description=${title}`,
    icon: pintrest_icon,
  },
  {
    name: 'whatsapp',
    url: (postUrl: string) => `whatsapp://send?text=${postUrl}`,
    icon: whatapp_icon,
  },
  {
    name: "email",
    url: (postUrl: string, title: string) => `mailto:?subject=${title}&body=${postUrl}`,
    icon: email_icon,
  }
];

const PostFooter = ({ post }: { post: Post }) => {
  const postUrl = encodeURIComponent(`https://yourwebsite.com/${post.slug}`);
  const postTitle = encodeURIComponent(post.title);

  return (
    <div>
      <div>
        <div className="text-2xl font-semibold text-center mb-4">Share this article:</div>
        <div className="flex gap-6 justify-center">
          {socials.map((social, index) => (
            <Link
              key={index}
              href={social.url(postUrl, postTitle)}
              target="_blank"
              rel="noopener noreferrer"
              className={"flex p-4 items-center justify-center rounded-full"}
              title={`Share on ${social.name}`}
            >
              <Image src={social.icon} alt={social.name} width={20} height={20} className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </div>

      <h3 className="h4 about-author-section-title my-8 text-2xl font-bold">Written by</h3>
      <div className="about-author flex items-center gap-4 mt-4 p-8 rounded-3xl">
        {post.users?.[0] && (
          <>
            <div className="avatar-wrap">
              <Link href={`/author/${post.users[0].slug}`}>
                <Image
                  className="h-28 w-28 rounded-full bg-black"
                  src={post.users[0].medium?.url?.proxy || "https://static.vecteezy.com/system/resources/thumbnails/024/983/914/small/simple-user-default-icon-free-png.png"}
                  alt={post.users[0].display_name}
                  loading="lazy"
                  width={112}
                  height={112}
                />
              </Link>
            </div>
            <div className="my-auto h-fit">
              <h3 className="name h4 text-2xl font-semibold">
                <Link href={`/author/${post.users[0].slug}`}>{post.users[0].display_name}</Link>
              </h3>
              <div className="text-sm text-gray-500">2 min read</div>
              {post.users[0].description && (
                <div className="bio text-gray-700">{post.users[0].description}</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
