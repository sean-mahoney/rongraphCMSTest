import request, { GraphQLClient } from "graphql-request";
import { gql } from "graphql-request";

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT);

//Gather all posts fromn GraphCMS
export const getPosts = async () => {
  const QUERY = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await graphcms.request(QUERY);

  return result.postsConnection.edges;
};

//Collects the latest/most recent 3 posts
export const getRecentWork = async () => {
  const QUERY = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last:3
      ){
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await graphcms.request(QUERY);

  return result.posts;
};

// Gathers 3 posts/work with the same categories as currenty selected
// but doesnt gather current url again.
export const getSimilarWork = async () => {
  const QUERY = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await graphcms.request(QUERY);

  return result.posts;
};

export const getCategories = async () => {
  const QUERY = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await graphcms.request(QUERY);

  return result.categories;
};
