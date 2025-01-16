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
import { PostNode } from "@/types";


const SidePosts = ({ sidePosts } : {sidePosts: PostNode[]} ) => {
	return sidePosts.map((post) => (
		<Card
			key={post.id} // Add a unique key here
			className="bg-transparent shadow-none border-none flex mb-4"
		>
			<CardHeader className="m-0 p-0 w-[40%]">
				<Link href={`/${post.slug}/`} >
					<Image
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
					{post.categories?.map((category,idx) => (
						<Link key={idx} href={`/category/${category.slug}/`}>
						<Badge text={category.name} className={"text-sm font-semibold px-3 py-1 "} />
						</Link>
					))}
				</div>
				<CardTitle className="text-lg font-bold text-ellipsis line-clamp-3 m-0"> <Link href={`/${post.slug}/`}>{post.title}</Link></CardTitle>
			</CardContent>
		</Card>
	))
};

export default SidePosts;
