import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import { getCategories } from "../services";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-black-400 py-8">
        <div className="md:text-center block">
          <NextLink href="/">
            <span className="cursor-pointer text-black font-bold">
              RON O'DONNELL
            </span>
          </NextLink>
        </div>
        <div className="hidden md:contents ">
          <NextLink href="/">
            <span className="mt-2 text-black mr-4 cursor-pointer">Home</span>
          </NextLink>
          {categories.map((category) => (
            <NextLink key={category.slug} href={`/category/${category.slug}`}>
              <span className="mt-2 text-black mr-4 cursor-pointer ">
                {category.name}
              </span>
            </NextLink>
          ))}
        </div>
        <h1 className="float-right block text-black font-semi-bold">
          PROOF OF CONCEPT BY SEAN MAHONEY
        </h1>
      </div>
    </div>
  );
};

export default Header;
