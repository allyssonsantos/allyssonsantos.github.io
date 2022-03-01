import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

import { useAuth } from '@contexts/AuthContext';
import useTransition from '@utils/useTransition';
import Comments from '@components/Comments';
import Statistics from '@components/Statistics';
import { Title, Img, Description, Hr } from '@components/Elements';
import { TableOfContents, SEO } from '@components/Layout';
import { db } from '@services/firebase';
import { listenLikes } from '@services/likes';

function Post({ data: { mdx: post }, transitionStatus }) {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (post.slug) {
      const getComments = async () => {
        const q = query(
          collection(db, 'comments'),
          where('slug', '==', post.slug),
          orderBy('date', 'desc')
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const posts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setComments(posts);
        });

        return () => unsubscribe();
      };

      listenLikes(post.slug, (likes) => {
        setLikes(likes.data());
      });

      getComments();
    }
  }, [post.slug]);

  const liked = Boolean(
    likes?.userIds.some((user) => user === currentUser?.uid)
  );

  const animation = useTransition(transitionStatus);
  return (
    <div animation={animation}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <Title>{post.frontmatter.title}</Title>
      <Description>{post.frontmatter.description}</Description>
      <time>Publicado em {post.frontmatter.date}</time>
      {post.frontmatter.img && <Img src={`/${post.frontmatter.img}`} />}

      <TableOfContents headings={post.headings} />

      <MDXRenderer>{post.body}</MDXRenderer>
      <Hr style={{ marginTop: 40 }} />
      <Statistics
        slug={post.slug}
        comments={comments.length}
        liked={liked}
        likes={likes?.count || 0}
      />
      <Comments slug={post.slug} comments={comments} />
    </div>
  );
}

export default Post;

export const pageQuery = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      slug
      frontmatter {
        title
        date(formatString: "DD/MM/YYYY", locale: "pt-BR")
        description
        img
      }
      body
      headings(depth: h2) {
        depth
        value
      }
    }
  }
`;

Post.propTypes = {
  transitionStatus: PropTypes.oneOf([
    'entering',
    'entered',
    'exiting',
    'exited',
  ]),
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string,
        img: PropTypes.string,
      }),
      slug: PropTypes.string,
      excerpt: PropTypes.string,
      headings: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
        })
      ).isRequired,
      body: PropTypes.string,
    }),
    excerpt: PropTypes.string,
  }).isRequired,
};

Post.defaultProps = {
  transitionStatus: undefined,
};
