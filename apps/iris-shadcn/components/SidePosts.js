import React from "react"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Badge from "@/components/ui/Badge";
import Image from "next/image";
import Link from "next/link";
import { log } from "console";

const SidePosts = ({ sidePosts }) => {
	log(sidePosts);
	return sidePosts.map((post) => (
		<Card
			key={post.id} // Add a unique key here
			className="bg-transparent shadow-none border-none flex mb-4"
		>
			<CardHeader className="m-0 p-0 w-[40%]">
				<Link href={`/${post.slug}/`} className="post-img-wrap">
					<Image
						srcSet={`${post.medium?.url?.proxy}?rs:fill/w:320 300w,
                    ${post.medium?.url?.proxy}?rs:fill/w:640 720w,
                    ${post.medium?.url?.proxy}?rs:fill/w:720 960w,
                    ${post.medium?.url?.proxy}?rs:fill/w:960 1200w,
                    ${post.medium?.url?.proxy}?rs:fill/w:1200 2000w`}
						sizes="(max-width: 1200px) 100vw, 1200px"
						src={`${post.medium?.url?.proxy}`}
						alt={post.title}
						width={250}
						height={150}
						className="rounded-3xl w-full h-40 object-cover object-center"
					/>
				</Link>
			</CardHeader>
			<CardContent className="w-[60%]">
				{/* <Badge /> */}
				<div className="flex w-fit gap-3 mb-2 max-w-[95%] flex-wrap ">
					{post.categories?.map((category) => (
						<Badge key={category.id} text={category.name} className={"text-sm font-semibold px-3 py-1 "} />
					))}
				</div>
				<CardTitle className="text-lg font-bold text-ellipsis line-clamp-3 m-0"> <Link href={`/${post.slug}/`}>{post.title}</Link></CardTitle>
			</CardContent>
		</Card>
	))
};

export default SidePosts;
