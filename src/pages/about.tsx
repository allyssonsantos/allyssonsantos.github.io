import type { NextPage } from 'next';

import styles from '../../styles/about.module.css';

const Home: NextPage = () => {
  return (
    <section>
      <h1 className={styles.about__title}>Hi! I&apos;m Allysson Santos</h1>
      <p>
        This space is where I test new things that I want to learn and write
        about thoughts and technology in general but mainly about front-end
        stuff.
      </p>
      <hr className={styles.about__divider} />
      <p>
        I&apos;ve worked with several front-end tools since the basics until the
        most recent frameworks and libraries, such as: (click to open)
      </p>
      <details className={styles.about__details}>
        <summary className={styles['about__details--summary']}>HTML</summary>
        <ul className={styles.about__list}>
          <li>Semantic HTML</li>
          <li>SEO</li>
          <li>Accessibility</li>
          <li>
            <a
              href="https://www.w3.org/WAI/standards-guidelines/aria/"
              target="_blank"
              rel="noreferrer"
            >
              WAI-ARIA
            </a>
          </li>
        </ul>
      </details>
      <details className={styles.about__details}>
        <summary className={styles.about__details}>CSS</summary>
        <ul className={styles.about__list}>
          <li>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries"
              target="_blank"
              rel="noreferrer"
            >
              Responsive layout (media queries)
            </a>
          </li>
          <li>Pseudo elements</li>
          <li>Pseudo classes</li>
          <li>Flexbox</li>
          <li>CSS Grid</li>
          <li>Animations and transitions</li>
          <li>Custom properties</li>
          <li>
            Preprocessors:
            <ul className={styles.about__list}>
              <li>
                <a href="https://lesscss.org/" target="_blank" rel="noreferrer">
                  LESS
                </a>
              </li>
              <li>
                <a
                  href="https://sass-lang.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  SASS
                </a>
              </li>
              <li>
                <a
                  href="https://stylus-lang.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Stylus
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="https://getbootstrap.com/"
              target="_blank"
              rel="noreferrer"
            >
              Bootstrap
            </a>
          </li>
          <li>
            <a
              href="https://github.com/css-modules/css-modules"
              target="_blank"
              rel="noreferrer"
            >
              CSS Modules
            </a>
          </li>
          <li>
            <a
              href="https://styled-components.com/"
              target="_blank"
              rel="noreferrer"
            >
              Styled-components
            </a>
          </li>
          <li>
            <a
              href="https://emotion.sh/docs/introduction"
              target="_blank"
              rel="noreferrer"
            >
              Emotion
            </a>
          </li>
          <li>
            Architectures:
            <ul className={styles.about__list}>
              <li>
                <a href="http://smacss.com/" target="_blank" rel="noreferrer">
                  SMACSS
                </a>
              </li>
              <li>
                <a href="https://itcss.io/" target="_blank" rel="noreferrer">
                  ITCSS
                </a>
              </li>
              <li>
                <a href="https://getbem.com/" target="_blank" rel="noreferrer">
                  BEM
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </details>
      <details className={styles.about__details}>
        <summary className={styles.about__details}>Javascript</summary>
        <ul className={styles.about__list}>
          <li>Vanilla Javascript</li>
          <li>jQuery</li>
          <li>
            React
            <ul className={styles.about__list}>
              <li>
                State management
                <ul className={styles.about__list}>
                  <li>Context API</li>
                  <li>Redux</li>
                  <li>TanStack Query (react query)</li>
                </ul>
              </li>
              <li>
                Server side rendering & static site generators:
                <ul className={styles.about__list}>
                  <li>Gatsby</li>
                  <li>NextJS</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>React Native</li>
          <li>PWA</li>
          <li>Web components</li>
          <li>Shadow DOM</li>
          <li>Typescript</li>
          <li>GraphQL</li>
          <li>Apollo GraphQL</li>
          <li>Webpack</li>
          <li>Babel</li>
          <li>NPM Libraries</li>
        </ul>
      </details>
      <p>
        Today I&apos;m working with design-systems and microfrontend
        implementations.
      </p>
      <hr className={styles.about__divider} />
      <h2 className={styles.about__subtitle}>My previous experiences:</h2>
      <p>Worked in these companies:</p>
      <ul className={styles.about__list}>
        <li>
          Olist{' '}
          <small>
            <em>2021 - present</em>
          </small>
          <blockquote>
            Here I&apos;m working with the development of the Olist Design
            System and also splitting the front-end of the company in small
            microfrontend applications. (where makes sense)
          </blockquote>
        </li>
        <li>
          Gympass{' '}
          <small>
            <em>2019 - 2021</em>
          </small>
        </li>
        <li>
          Catho{' '}
          <small>
            <em>2015 - 2019</em>
          </small>
        </li>
        <li>
          Encontra Brasil{' '}
          <small>
            <em>2014 - 2015</em>
          </small>
        </li>
      </ul>
    </section>
  );
};

export default Home;
