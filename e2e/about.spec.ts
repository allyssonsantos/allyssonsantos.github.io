import { test, expect } from './base';

test('About page - skills', async ({ aboutPage }) => {
  await aboutPage.isReady();

  for (const skill of await aboutPage.skills.all()) {
    await expect(skill).toBeVisible();
  }
  await expect(aboutPage.skills).toHaveCount(3);
});

test('About page - projects', async ({ aboutPage }) => {
  await aboutPage.isReady();

  await expect(aboutPage.projects).toHaveCount(3);

  const firstProject = aboutPage.projects.first();
  const secondProject = aboutPage.projects.nth(1);
  const lastProject = aboutPage.projects.last();

  await aboutPage.clickOnProject(firstProject);
  const modal = await aboutPage.getModal();
  await expect(modal).toBeVisible();
  await expect(
    await aboutPage.getModalTitle((await firstProject.textContent()) as string),
  ).toBeVisible();
  await aboutPage.closeModal();
  await expect(modal).not.toBeVisible();

  await aboutPage.clickOnProject(secondProject);
  const modal2 = await aboutPage.getModal();
  await expect(modal2).toBeVisible();
  await expect(
    await aboutPage.getModalTitle(
      (await secondProject.textContent()) as string,
    ),
  ).toBeVisible();
  await aboutPage.closeModal();
  await expect(modal2).not.toBeVisible();

  await aboutPage.clickOnProject(lastProject);
  const modal3 = await aboutPage.getModal();
  await expect(modal3).toBeVisible();
  await expect(
    await aboutPage.getModalTitle((await lastProject.textContent()) as string),
  ).toBeVisible();
  await aboutPage.closeModal();
  await expect(modal3).not.toBeVisible();
});

test('About page - companies', async ({ aboutPage }) => {
  await aboutPage.isReady();

  for (const company of await aboutPage.companies.all()) {
    await expect(company).toBeVisible();
  }
  await expect(aboutPage.companies).toHaveCount(5);
});
