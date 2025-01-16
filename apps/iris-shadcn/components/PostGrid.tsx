"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import Image from "next/image";
import { PostNode } from "@/types";
import { parseDate } from "@/lib/dateutils";

interface PostGridProps {
  posts: PostNode[];
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allPosts, setAllPosts] = useState<PostNode[]>(posts);
  // const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Fetch more posts dynamically
  const fetchMorePosts = useCallback(() => {
    if (loading) return;
    setLoading(true);

    // Simulate a delay to mimic fetching
    setTimeout(() => {
      console.log("Fetching more posts...");
      setLoading(false);
    }, 1000);
  }, [loading]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loading) {
          fetchMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [fetchMorePosts, loading]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 mx-auto w-full">
        {allPosts.map((post) => (
          <Card key={post.slug} className="bg-transparent shadow-none border-none h-max">
            <CardHeader className="h-[60%] p-0 mb-4">
              <Link href={`/${post.slug}/`}>
                <Image
                  loading="lazy"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  src={post.medium?.url?.proxy || "/fallback-image.jpg"}
                  alt={post.title || "Untitled"}
                  width={300}
                  height={200}
                  className="object-cover w-full h-full rounded-2xl"
                />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex w-fit gap-3 gap-y-1 mb-2 max-w-full flex-wrap">
                {post.categories?.map((category, idx: number) => (
                  <Link href={`/category/${category.slug}`} key={idx}>
                    <Badge
                      text={category.name}
                      className={"text-sm font-semibold px-3 py-1 "}
                    />
                  </Link>
                ))}
              </div>
              <CardTitle className="text-lg font-bold line-clamp-2 text-ellipsis m-0 p-0">
                <Link href={`/${post.slug}/`}>{post.title || "Untitled"}</Link>
              </CardTitle>
              <CardDescription className="text-sm my-3 text-ellipsis line-clamp-3 text-gray-600">
                {post.excerpt}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center px-0 justify-between gap-3 w-fit">
              {post.users?.[0] && (
                <Link href={`/author/${post.users[0].slug}/`} className="author-image">
                  <Image
                    src={
                      post.users[0].medium?.url?.proxy ||
                      "https://static.vecteezy.com/system/resources/thumbnails/024/983/914/small/simple-user-default-icon-free-png.png"
                    }
                    alt={post.users[0].display_name || "Author"}
                    width={50}
                    height={50}
                    className="rounded-full w-12 h-12 bg-slate-300"
                  />
                </Link>
              )}
              <div>
                <p className="text-base text-gray-600 my-0 p-0 font-semibold">
                  {post.users?.[0] && (
                    <Link href={`/author/${post.users[0].slug}/`}>
                      {post.users[0].display_name || post.users[0].first_name}
                    </Link>
                  )}
                </p>
                <p className="text-base text-gray-600 my-0 p-0">
                  <time className="post-date" dateTime={post.published_date}>
                    {parseDate(post.published_date)}
                  </time>
                </p>
              </div>
            </CardFooter>
          </Card>
        ))}

      </div>
      {/* Bottom ref for Intersection Observer */}

      <div ref={bottomRef} className="h-10" ></div>
    </>
  );
};

export default PostGrid;
