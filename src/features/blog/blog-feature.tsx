import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { type Blog } from 'contentlayer/generated';

const H1 = (props: any) => <h1 style={{ backgroundColor: 'red' }} {...props} />;

const components = {
  h1: H1,
};

export function BlogFeature({ post }: { post: Blog }) {
  const PostBody = useMDXComponent(post.body.code);

  return (
    <div>
      <h1>{post.title}</h1>
      <small>{post.readingTime.minutes} min</small>
      <Image
        src={`/articles/${post.cover}`}
        alt={post.altCover}
        width={800}
        height={600}
      />
      <PostBody components={components} />
    </div>
  );
}
