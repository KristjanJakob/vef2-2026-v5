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

export async function getPostBySlug(slug: string) {
  const query = `
    query PostBySlug($slug: String) {
      post(filter: { slug: { eq: $slug } }) {
        title
        content
        slug
      }
    }
  `;
  const data = await fetchAPI(query, { slug });
  return data.post;
}