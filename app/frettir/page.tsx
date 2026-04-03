import { getPosts } from '@/lib/datocms';
import Link from 'next/link';

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <main>
      <h1>Fréttir</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/frettir/${post.slug}`}>{post.title}</Link>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}