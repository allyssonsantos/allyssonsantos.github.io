import { allBlogs, Blog } from 'contentlayer/generated';

export function BlogFeature() {
  const posts = allBlogs.reduce((acc, post) => {
    acc[post.category] = [...(acc[post.category] || []), post];

    return acc;
  }, {} as Record<string, Blog[]>);

  return (
    <section>
      <h1>Blog</h1>
      <ul>
        {Object.entries(posts).map(([category, post]) => (
          <li key={category}>
            <h2>{category}</h2>
            <ul>
              {post.map((post) => (
                <li key={post.slug}>
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
