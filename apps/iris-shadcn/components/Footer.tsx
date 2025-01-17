import Link from "next/link";
import React from "react"
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa"
const Footer = () => {
	return (
		<div className="w-full h-fit p-8 mt-8  bg-blue-50/85 border  flex flex-col items-center justify-center gap-8 ">
			<h1 className="text-5xl font-bold hover:text-blue-600 transition ease-linear">
				<Link href="/">IRIS</Link>
			</h1>
			<p className="text-center" >Iris is a modern classic blog theme. Use this theme for company blog, magazine, niche or personal blog</p>
			<div className="flex w-fit h-fit gap-4" >
				<FaTwitter size={24} />
				<FaFacebook size={24} />
				<FaInstagram size={24} />
				<FaGithub size={24} />
			</div>
			<p className="text-center" >© 2025 Iris Theme - Created and maintained by Factly Media and Researc</p>
		</div>
	)
};

export default Footer;

