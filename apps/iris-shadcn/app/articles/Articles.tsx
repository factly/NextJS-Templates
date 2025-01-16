"use client";
import PostGrid from "@/components/PostGrid";
import { useSearchParams } from "next/navigation";
import { PostNode } from "@/types";

function Articles({ posts }: { posts: PostNode[] }) {
	const searchParams = useSearchParams();
	const query = searchParams.get("query");
	return (
		<>
			{query && (
				<div className="flex gap-5 items-center mx-28 mt-4">
					<div className="h-full w-1 bg-red-600">&nbsp;</div>
					<h2 className="text-2xl font-semibold text-gray-800">
						Search results for: {query}
					</h2>
				</div>
			)}
      <div className="px-4 sm:px-12 md:px-[4vw] lg:px-[6vw] ">
				<PostGrid posts={posts} />
      </div>
		</>
	);
}

export default Articles
