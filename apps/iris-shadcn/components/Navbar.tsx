"use client";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation"; // useRouter from 'next/navigation'
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/articles?query=${encodeURIComponent(searchQuery.trim())}`);
			setSearchQuery("");
    }
  };

  return (
    <div className="flex items-center px-6 py-5 min-w-full h-fit mb-3">
      {/* Logo Section */}
      <h1 className="text-5xl font-bold hover:text-blue-600 transition ease-linear">
        <Link href="/">IRIS</Link>
      </h1>

      {/* Navigation Links */}
      <nav className="hidden md:flex w-full ml-11">
        <ul className="flex items-center gap-9">
          <li className="text-xl leading-6 font-semibold hover:text-blue-600 transition ease-linear">
            <Link href="/">Home</Link>
          </li>
          <li className="text-xl leading-6 font-semibold hover:text-blue-600 transition ease-linear">
            <Link href="/articles">Articles</Link>
          </li>
        </ul>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center border border-gray-300 rounded-lg justify-between gap-3 ml-auto px-4"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none bg-transparent py-2 text-lg"
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </nav>

      {/* Mobile Menu */}
      <Popover>
        <PopoverTrigger className="md:hidden ml-auto">
          <GiHamburgerMenu className="text-3xl" />
        </PopoverTrigger>
        <PopoverContent className="md:hidden mr-6">
          <ul className="flex flex-col w-full items-center gap-5">
            <li className="text-xl font-medium hover:text-blue-600 transition ease-linear">
              <Link href="/">Home</Link>
            </li>
            <li className="text-xl font-medium hover:text-blue-600 transition ease-linear">
              <Link href="/articles">Articles</Link>
            </li>
          </ul>

          {/* Mobile Search Form */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-transparent border border-gray-300 rounded-lg justify-between gap-3 ml-auto mt-4 px-4"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none py-2 text-lg"
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Navbar;