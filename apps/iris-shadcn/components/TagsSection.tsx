"use client";
import { useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";

const TagsSection = ({ tags }: { tags: { id: string; name: string; slug: string }[]  }) => {
  const [showAllTags, setShowAllTags] = useState(false);
  const maxVisibleTags = 3;

  const toggleTags = () => {
    setShowAllTags((prev) => !prev);
  };

  const visibleTags = showAllTags ? tags : tags?.slice(0, maxVisibleTags);
  const remainingTagsCount = tags?.length ? tags.length - maxVisibleTags : 0;

  return (
    <div className="mb-7 w-full">
      <h3 className="mb-7 text-2xl font-semibold">Tags</h3>
      <div className="flex flex-wrap gap-2 items-center max-w-[60%]">
        {visibleTags?.map((tag) => (
          <Link href={`/articles?query=${tag.slug}`} key={tag.id}>
            <Badge text={tag.name} className="text-sm font-semibold px-3 lg:px-5 py-2" />
          </Link>
        ))}
        {remainingTagsCount > 0 && (
					<button onClick={toggleTags}>
						<Badge
						text={showAllTags ? "Show Less" : `+${remainingTagsCount}`}
							className={`text-sm font-medium px-3 lg:px-5 py-1 leading-5 ${showAllTags ? 'border-none hover:bg-transparent hover:text-black ': ''} `}
						/>
					</button>
        )}
      </div>
    </div>
  );
};

export default TagsSection;
