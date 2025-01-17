import React from "react"

const Badge = ({ text  , className="text-base font-medium px-5 py-1" }: {text: string, className: string}) => {
	return (
		<div className={` mt-0 w-fit rounded-full border border-blue-500 bg-transparent hover:text-white text-black hover:bg-blue-500 transition-colors ease ${className} `}
		>
			<span className="badge text-nowrap" >{text}</span>
		</div>
	)
};

export default Badge;
