import React, { useState, useEffect } from "react";
import moment from "moment";
import NextLink from "next/link";
import { getRecentWork } from "../services";
import { getSimilarWork } from "../services";

const PostWidget = ({ categories, slug }) => {
  const [relatedWork, setRelatedWork] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarWork(categories, slug).then((result) => setRelatedWork(result));
    } else {
      getRecentWork().then((result) => setRelatedWork(result));
    }
  }, [slug]);

  console.log(relatedWork);

  return (
    //PostWidget Background
    <div className="bg-white shadow-lg p-8 mb-8">
      {/* If no slug/url is present display Recent work else display related work */}
      <h3 className="text-xl mb-8 font-semibold pb-4">
        {slug ? "Related Work" : "Recent Work"}
      </h3>
      <div className="flex flex-wrap flex-row">
        {relatedWork.map((post) => (
          <div
            key={post.title}
            className="mb-4 basis-1/3 border-4 border-white "
          >
            <div className="max-h-60 overflow-hidden">
              <img
                className="w-full"
                alt={post.title}
                src={post.featuredImage.url}
              />
            </div>
            <div className="float-left">
              <p className="font-xs">
                {moment(post.createdAt).format("DD/MM/YYYY")}
              </p>
              <NextLink
                href={`post/$post.slug`}
                key={post.title}
                className="text-md"
              >
                {post.title}
              </NextLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostWidget;
