import { writeFileSync } from 'fs';
import RSS from 'rss';
import { allBlogs } from '../.contentlayer/generated/Blog/_index.mjs';

async function generate() {
  const feed = new RSS({
    title: 'Allysson Santos',
    site_url: 'https://allysson.me',
    feed_url: 'https://allysson.me/feed.xml',
  });

  allBlogs.map((post) => {
    feed.item({
      title: post.title,
      url: `https://allysson.me/blog/${post.slug}`,
      date: post.publishedAt,
      description: post.description,
    });
  });

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
