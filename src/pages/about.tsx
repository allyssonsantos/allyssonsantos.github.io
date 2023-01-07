import type { NextPage } from 'next';

import { Projects, Skills } from 'src/components/About';
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
      <Skills />
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
      <Projects />
    </section>
  );
};

export default Home;
