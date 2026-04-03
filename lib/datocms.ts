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
): Promise<T> {
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
      allPosts {
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