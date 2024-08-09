import { test as base } from '@playwright/test';
import { HomePage } from './pom/HomePage';
import { ArticlePage } from './pom/ArticlePage';

type Fixtures = {
  homePage: HomePage;
  articlePage: ArticlePage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.isReady();
    await use(homePage);
  },
  articlePage: async ({ page }, use) => {
    const articlePage = new ArticlePage(page);
    await articlePage.goto();
    await articlePage.isReady();
    await use(articlePage);
  },
});

export { expect } from '@playwright/test';
