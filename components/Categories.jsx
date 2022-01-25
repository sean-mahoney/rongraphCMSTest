import React, { useState, useEffect } from "react";
import Link from "next/Link";
import { getCategories } from "../services";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <div className="bg-black h-20 shadow-lg p-6 mb-8">
      <h3 className="text-xl text-white mb-8 font-semibold pb-4 float-left">
        Categories
      </h3>
      {categories.map((category) => (
        <Link key={category.slug} href={`category/${category.slug}`}>
          <span className="text-white cursor-pointer float-left ml-5 mt-1">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
