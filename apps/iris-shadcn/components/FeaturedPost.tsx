import React from "react";
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



// Defining the prop types for the FeaturedPost component
interface FeaturedPostProps {
  featuredPost: PostNode;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ featuredPost }) => {
  return (
    <Card className="bg-transparent shadow-none border-none">
      <CardHeader className="h-auto px-6 pt-0 ">
        <Link href={`/${featuredPost.slug}/`}>
          <Image
            src={featuredPost.medium?.url?.proxy || ""}
            alt={featuredPost.medium?.alt_text || featuredPost.title}
            className="rounded-3xl w-full sm:h-[29rem] object-cover object-center"
            width={950}
            height={600}
          />
        </Link>
      </CardHeader>

      <CardContent>
        <div className="flex w-fit mb-2 gap-3">
          {featuredPost.categories?.map((category, idx) => (
            <Link href={`/category/${category.slug}`} key={`${category.name}-${idx}`}>
              <Badge text={category.name} className={"text-base font-medium px-5 py-1"} />
            </Link>
          ))}
        </div>
        <CardTitle className="text-4xl font-bold text-ellipsis line-clamp-3 w-[95%]">
          <Link href={`/${featuredPost.slug}/`}>{featuredPost.title}</Link>
        </CardTitle>
        <CardDescription className="text-xl text-gray-600 w-[90%]">
          {featuredPost.excerpt}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3 w-fit">
        {featuredPost.users?.[0] && (
          <Link href={`/author/${featuredPost.users[0].slug}/`} className="author-image">
            <Image
              width={40}
              height={40}
              src={featuredPost.users[0].medium?.url?.proxy || "https://static.vecteezy.com/system/resources/thumbnails/024/983/914/small/simple-user-default-icon-free-png.png"}
              alt={featuredPost.users[0].display_name}
            />
          </Link>
        )}
        <div>
          <p className="text-base text-gray-600 my-0 p-0 font-semibold">
            {featuredPost.users?.[0] && (
              <Link href={`/author/${featuredPost.users[0].slug}/`}>
                {featuredPost.users[0].display_name || featuredPost.users[0].first_name}
              </Link>
            )}
          </p>
          <p className="text-base text-gray-600 my-0 p-0">
            {parseDate(featuredPost.published_date)}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeaturedPost;
