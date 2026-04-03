export type Homepage = {
    title: string;
    intro: string;
};
  
export type Post = {
    title: string;
    slug: string;
    excerpt: string;
};
  
export type PostDetail = {
    title: string;
    slug: string;
    content: string;
};
const API_URL = 'https://graphql.datocms.com/';
const API_TOKEN = process.env.DATOCMS_API_TOKEN!;

async function fetchAPI(query: string, variables?: Record<string, unknown>) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data from DatoCMS');
  }

  const json = await res.json();
  return json.data;
}

export async function getHomepage() {
  const query = `
    query HomepageQuery {
      homepage {
        title
        intro
      }
    }
  `;
  const data = await fetchAPI(query);
  return data.homepage;
}

export async function getPosts() {
  const query = `
    query PostsQuery {
      allPosts(orderBy: publishedAt_DESC) {
        title
        slug
        excerpt
      }
    }
  `;
  const data = await fetchAPI(query);
  return data.allPosts;
}

import { executeQuery } from '@datocms/cda-client';

export type Homepage = {
  title: string;
  intro: string;
};

export type Post = {
  title: string;
  slug: string;
  excerpt: string;
};

export type PostDetail = {
  title: string;
  slug: string;
  content: string;
};

export async function performRequest<T>(
  query: string,
  variables?: Record<string, unknown>
) {
  return executeQuery<T>(query, {
    token: process.env.DATOCMS_API_TOKEN!,
    variables,
  });
}

export async function getHomepage(): Promise<Homepage> {
  const query = `
    query HomePageQuery {
      homepage {
        title
        intro
      }
    }
  `;

  const data = await performRequest<{ homepage: Homepage }>(query);
  return data.homepage;
}

export async function getPosts(): Promise<Post[]> {
  const query = `
    query PostsQuery {
      allPosts(orderBy: publishedAt_DESC) {
        title
        slug
        excerpt
      }
    }
  `;

  const data = await performRequest<{ allPosts: Post[] }>(query);
  return data.allPosts;
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const query = `
    query PostBySlug($slug: String) {
      post(filter: { slug: { eq: $slug } }) {
        title
        slug
        content
      }
    }
  `;

  const data = await performRequest<{ post: PostDetail | null }>(query, { slug });
  return data.post;
}