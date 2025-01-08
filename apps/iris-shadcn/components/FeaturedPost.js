import React from "react"
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

const FeaturedPost= ({featuredPost}) => {
	return (
		<Card className="bg-transparent shadow-none border-none">
		<CardHeader className="h-auto px-6 pt-0 ">
			<Link href={`/${featuredPost.slug}/`} className="post-img-wrap">
				<Image
					srcSet={`${featuredPost.medium?.url?.proxy}?rs:fill/w:320 300w,
									 ${featuredPost.medium?.url?.proxy}?rs:fill/w:640 720w,
									 ${featuredPost.medium?.url?.proxy}?rs:fill/w:720 960w,
									 ${featuredPost.medium?.url?.proxy}?rs:fill/w:960 1200w,
									 ${featuredPost.medium?.url?.proxy}?rs:fill/w:1200 2000w`}
					src={`${featuredPost.medium?.url?.proxy}`}
					alt={featuredPost.medium?.alt_text || featuredPost.title}
					className="rounded-3xl w-full h-[29rem] object-cover object-center"
					width={950}
					height={600}
				/>
			</Link>
		</CardHeader>

		<CardContent>
			<div key={featuredPost.id} className="flex w-fit mb-2 gap-3">
			{featuredPost.categories?.map((category) => (
				<Badge key={category.id} text={category.name} className={"text-base font-medium px-5 py-1 "} />
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
					{/* Uncomment below if user image is available */}
					<img
						src={featuredPost.users[0].medium?.url?.proxy}
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
					<time className="post-date" dateTime={featuredPost.published_date}>
						{new Date(featuredPost.published_date).toLocaleDateString(undefined, {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</time>
				</p>
			</div>
		</CardFooter>
	</Card>

	)
};

export default FeaturedPost;
