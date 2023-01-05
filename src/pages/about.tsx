import type { NextPage } from 'next';

import { ProjectCard } from 'src/components/About';
import styles from '../../styles/about.module.css';

const Home: NextPage = () => {
  return (
    <section>
      <h1 className={styles.about__title}>Hi! I&apos;m Allysson Santos</h1>
      <p>
        This space is where I test new things I want to learn and write about
        thoughts and technology in general but mainly about front-end stuff.
      </p>
      <hr className={styles.about__divider} />
      <p>
        I&apos;ve worked with several front-end tools, from the basics to the
        most recent frameworks and libraries, such as: (click in the language to
        open)
      </p>
      <details className={styles.about__details}>
        <summary className={styles['about__details-summary']}>HTML</summary>
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
        <summary className={styles['about__details-summary']}>CSS</summary>
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
        <summary className={styles['about__details-summary']}>
          Javascript
        </summary>
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
              <li>
                UI Libraries:
                <ul className={styles.about__list}>
                  <li>Material UI</li>
                  <li>Yoga (built by me)</li>
                  <li>Quantum (built by me)</li>
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
        Today I&apos;m working with design-systems and micro frontends
        implementations.
      </p>
      <hr className={styles.about__divider} />
      <h2 className={styles.about__subtitle}>My previous experiences</h2>
      <p>Worked in these companies:</p>
      <ul className={styles.about__list}>
        <li>
          Olist{' '}
          <small>
            <em>2021 - present</em>
          </small>
          <blockquote>
            Here I&apos;m working on developing the{' '}
            <a
              href="https://designsystem.olist.io/"
              target="_blank"
              rel="noreferrer"
            >
              Olist Design System
            </a>{' '}
            and splitting the company&apos;s front-end into small micro
            frontends applications. (where makes sense)
          </blockquote>
        </li>
        <li>
          Gympass{' '}
          <small>
            <em>2019 - 2021</em>
          </small>
          <blockquote>
            I&apos;ve developed the initial version of the Gympass Wellness
            product, created the multi-platform{' '}
            <a
              href="https://github.com/gympass/yoga"
              target="_blank"
              rel="noreferrer"
            >
              Yoga design system
            </a>
            , and worked with a bunch of different teams.
          </blockquote>
        </li>
        <li>
          Catho{' '}
          <small>
            <em>2015 - 2019</em>
          </small>
          <blockquote>
            In Catho was where I discovered my passion for the front-end
            development world. Here I was able to work in so many teams. With
            different projects and different people, from projects like
            Salesforce integration or the redesign of the recruiter area to when
            the company decided to migrate from the legacy PHP coupled
            applications to SPA&apos;s built with React. I&apos;ve also
            participated in the company react component library creation called{' '}
            <a
              href="https://github.com/catho/quantum"
              target="_blank"
              rel="noreferrer"
            >
              Quantum
            </a>
            .
          </blockquote>
        </li>
        <li>
          Encontra Brasil{' '}
          <small>
            <em>2014 - 2015</em>
          </small>
          <blockquote>
            It was a small company where I started to get in touch with the base
            of HTML, CSS, and Javascript.
          </blockquote>
        </li>
      </ul>
      <hr className={styles.about__divider} />
      <h2 className={styles.about__subtitle}>
        Projects I&apos;m proud to have been a part of
      </h2>
      <ProjectCard
        name="Quantum"
        description="A react component library that was created in 2018 and is still used
          nowadays"
      />
      <ProjectCard
        name="Yoga"
        description="The Gympass multi-platform design-system (React & React-Native), with
        support for multiple themes and with a great tokenization."
      />
      <ProjectCard
        name="React95"
        description="A component library with the Windows 95 UI."
      />
    </section>
  );
};

export default Home;
