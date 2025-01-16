import React from 'react';
import { gql } from '@apollo/client';
import { client } from '@/lib/client';
// import Link from 'next/link';
import "@/styles/global.css"
import {
	FaEnvelope,
	FaFacebookSquare,
	FaInstagramSquare,
	FaLink,
	FaLinkedin,
	FaTwitterSquare,
} from 'react-icons/fa';
import PostGrid from '@/components/PostGrid';
import Image from 'next/image';
import { notFound } from "next/navigation";


const POST_QUERY = gql`
query ($author: String!) {
	user(slug: $author) {
		id
		first_name
		last_name
		email
		display_name
		slug
		social_media_urls
		description
		medium {
			url
			dimensions
		}
	}
	formats {
		nodes {
			id
			slug
			name
		}
	}
	posts(users: { slugs: [$author] }) {
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
			format {
				name
				slug
			}
			medium {
				alt_text
				url
				dimensions
			}
			published_date
			id
			status
			subtitle
			title
			excerpt
			slug
		}
	}
}
`
const fecthcAuthor = async (author: string) => {
	try {
    const { data } = await client.query({
      query: POST_QUERY,
      variables: { author },
    });


    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
export default async function Page({ params }: { params: { author: string } }) {
	const data  = await fecthcAuthor(params.author);

	if (!data) {
    notFound();
  }

	const { posts, user } = data;
	return (
		<>
			<div className="mx-auto py-8 px-4 sm:px-12 md:px-[4vw] lg:px-[6vw]">
				<div className="w-full md:w-1/3 mx-auto ">
					<div className="flex flex-col gap-3 items-center">
						<Image
							width={128}
							height={128}
							src={user.medium?.url || "https://static.vecteezy.com/system/resources/thumbnails/024/983/914/small/simple-user-default-icon-free-png.png"}
							alt={user.display_name}
							className="rounded-full w-32 h-32 bg-slate-300"
						/>
						<h1 className="text-3xl font-semibold mt-4">{user.display_name}</h1>
						<p className='text-xl font-semibold'>{`${posts.nodes.length} Posts`}</p>
						<p className="text-gray-600 text-lg text-center">{user.description || '	Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto eum rerum, facilis dicta alias repellat odit sed veniam minus, necessitatibus inventore '} </p>
						<div className="flex gap-4 mt-4">
						{/* {user?.social_media_urls &&
            user.social_media_urls.map((name) => (
              <a
                key={name}
                title={name}
                href={user.social_media_urls[name]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getIcon(name)}
              </a>
            ))} */}
          <a href={`mailto:${user?.email}`} title="email">
            {getIcon('email')}
          </a>
						</div>
					</div>
				</div>
					<PostGrid posts={posts.nodes} />
			</div>
		</>
	);

}


const getIcon = (name: string) => {
	switch (name) {
		case 'twitter':
			return <FaTwitterSquare color="#1da1f2" size="1.75rem" />;
		case 'facebook':
			return <FaFacebookSquare color="#3b5998" size="1.75rem" />;
		case 'instagram':
			return <FaInstagramSquare color="#e1306c" size="1.75rem" />;
		case 'linkedin':
			return <FaLinkedin size="1.75rem" color="#0077b5" />;
		case 'email':
			return <FaEnvelope size="1.75rem" color="#172b4d" />;
		default:
			return <FaLink size="1.75rem" />;
	}
};



