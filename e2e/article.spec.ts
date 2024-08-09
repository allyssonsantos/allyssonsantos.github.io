import { test, expect } from './base';

test('Article page - skills', async ({ articlePage }) => {
  await articlePage.isReady();

  for (const skill of await articlePage.skills.all()) {
    await expect(skill).toBeVisible();
  }
  await expect(articlePage.skills).toHaveCount(3);
});

test('Article page - projects', async ({ articlePage }) => {
  await articlePage.isReady();

  await expect(articlePage.projects).toHaveCount(3);

  const firstProject = articlePage.projects.first();
  const secondProject = articlePage.projects.nth(1);
  const lastProject = articlePage.projects.last();

  await articlePage.clickOnProject(firstProject);

  const modal = await articlePage.getModal();

  await expect(modal).toBeVisible();
  await expect(
    await articlePage.getModalTitle(
      (await firstProject.textContent()) as string,
    ),
  ).toBeVisible();
  await articlePage.closeModal();
  await expect(modal).not.toBeVisible();

  await articlePage.clickOnProject(secondProject);
  const modal2 = await articlePage.getModal();
  await expect(modal2).toBeVisible();
  await expect(
    await articlePage.getModalTitle(
      (await secondProject.textContent()) as string,
    ),
  ).toBeVisible();

  await articlePage.closeModal();
  await expect(modal2).not.toBeVisible();

  await articlePage.clickOnProject(lastProject);
  const modal3 = await articlePage.getModal();
  await expect(modal3).toBeVisible();
  await expect(
    await articlePage.getModalTitle(
      (await lastProject.textContent()) as string,
    ),
  ).toBeVisible();

  await articlePage.closeModal();
  await expect(modal3).not.toBeVisible();
});

test('Article page - companies', async ({ articlePage }) => {
  await articlePage.isReady();

  for (const company of await articlePage.companies.all()) {
    await expect(company).toBeVisible();
  }
  await expect(articlePage.companies).toHaveCount(5);
});
