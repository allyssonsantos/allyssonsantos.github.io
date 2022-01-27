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

import useTransition from '@utils/useTransition';
import { Title, Img, Description, Hr } from '@components/Elements';
import { TableOfContents, SEO } from '@components/Layout';
import { CommentsSection } from '@components/Posts';

import { db } from '../services/firebase';

function Post({ data: { mdx: post }, transitionStatus }) {
  const [comments, setComments] = useState([]);

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

      getComments();
    }
  }, [post.slug]);

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
      <CommentsSection slug={post.slug} comments={comments} />
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
