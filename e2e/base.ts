import { test as base } from '@playwright/test';
import { HomePage } from './pom/HomePage';
import { AboutPage } from './pom/AboutPage';
import { ArticlePage } from './pom/ArticlePage';
import { SideBar } from './pom/SideBar';

type Fixtures = {
  homePage: HomePage;
  aboutPage: AboutPage;
  articlePage: ArticlePage;
  sideBar: SideBar;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.isReady();
    await use(homePage);
  },
  aboutPage: async ({ page }, use) => {
    const aboutPage = new AboutPage(page);
    await aboutPage.goto();
    await aboutPage.isReady();
    await use(aboutPage);
  },
  articlePage: async ({ page }, use) => {
    const articlePage = new ArticlePage(page);
    await articlePage.goto();
    await articlePage.isReady();
    await use(articlePage);
  },
  sideBar: async ({ page }, use) => {
    const sideBar = new SideBar(page);
    await sideBar.isReady();
    await use(sideBar);
  },
});

export { expect } from '@playwright/test';
