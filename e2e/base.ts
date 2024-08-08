import { test as base } from '@playwright/test';
import { HomePage } from './pom/HomePage';

type Fixtures = {
  homePage: HomePage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.isReady();
    await use(homePage);
  },
});

export { expect } from '@playwright/test';
