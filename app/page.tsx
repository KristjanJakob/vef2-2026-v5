import { getHomepage, getPosts } from '@/lib/datocms';
import Link from 'next/link';

export default async function HomePage() {
  const homepage = await getHomepage();
  const posts = await getPosts();

  return (
    <main>
      <section>
        <h1>{homepage.title}</h1>
        <p>{homepage.intro}</p>
      </section>

      <section>
        <h2>Nýjustu fréttir</h2>
        <ul>
          {posts.slice(0, 3).map((post) => (
            <li key={post.slug}>
              <Link href={`/frettir/${post.slug}`}>{post.title}</Link>
              <p>{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}