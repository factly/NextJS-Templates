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
import { log } from "console";
import Image from "next/image";
const MostRecentPosts = ({ posts }) => {
	log(posts);
	return posts.map((post,idx) => (
		<Card
		key={idx}
			className="bg-transparent shadow-none border-none h-max"
		>
			<CardHeader className="h-[60%] p-0 mb-4">
				<Link href={`/${post.slug}/`} className="post-img-wrap">
					<Image
						loading="lazy"
						srcSet={`${post.medium?.url?.proxy}?rs:fill/w:320 300w,
                    ${post.medium?.url?.proxy}?rs:fill/w:640 720w,
                    ${post.medium?.url?.proxy}?rs:fill/w:720 960w,
                    ${post.medium?.url?.proxy}?rs:fill/w:960 1200w,
                    ${post.medium?.url?.proxy}?rs:fill/w:1200 2000w`}
						sizes="(max-width: 1200px) 100vw, 1200px"
						src={`${post.medium?.url?.proxy}?rs:fill/w:1200`}
						alt={post.title}
						width={300}
						height={200}
						className="object-cover w-full h-full rounded-2xl"
					/>
				</Link>
			</CardHeader>
			<CardContent className="p-0">
				<div className="flex w-fit gap-3 gap-y-1 mb-2 max-w-full flex-wrap">
					{post.categories?.map((category) => (
						<Badge key={category.id} text={category.name} className={"text-sm font-semibold px-3 py-1 "}  />
					))}

				</div>
				<CardTitle className="text-lg font-bold line-clamp-2 text-ellipsis m-0 p-0">
					<Link href={`/${post.slug}/`}>{post.title}</Link>
				</CardTitle>
				<CardDescription className="text-sm my-3 text-ellipsis line-clamp-3 text-gray-600">
					{post.excerpt}
				</CardDescription>
			</CardContent>
			<CardFooter className="flex items-center px-0 justify-between gap-3 w-fit">
				{post.users?.[0] && (
					<Link href={`/author/${post.users[0].slug}/`} className="author-image">
						{/* Uncomment below if user image is available */}
						<Image
							src={post.users[0].medium?.url?.proxy}
							alt={post.users[0].display_name}
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
							{new Date(post.published_date).toLocaleDateString(undefined, {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</time>
					</p>
				</div>
			</CardFooter>
		</Card>
	))
};

export default MostRecentPosts;
