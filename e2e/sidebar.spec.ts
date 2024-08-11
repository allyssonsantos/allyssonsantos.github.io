import { test, expect } from './base';

test.skip('SideBar component', async ({ sideBar, page }) => {
  await sideBar.changeTheme();

  await expect(page.locator('html')).toHaveClass('dark');

  await sideBar.changeTheme();

  await expect(page.locator('html')).not.toHaveClass('dark');
  await expect(page.locator('html')).toHaveClass('light');

  // // home
  // expect(home.textContent()).toBe('Início');
  // expect(home).toHaveAttribute('href', '/');

  // // blog
  // expect(blog.textContent()).toBe('Blog');
  // expect(blog).toHaveAttribute('href', '/blog');

  // // about
  // expect(about.textContent()).toBe('Sobre');
  // expect(about).toHaveAttribute('href', '/about');

  // // social links

  // // github
  // expect(github.textContent()).toBe('GitHub');
  // expect(github).toHaveAttribute('href', 'https://github.com/allyssonsantos');
  // expect(github).toHaveAttribute('target', '_blank');
  // expect(github).toHaveAttribute('rel', 'noopener nofollow noreferrer');

  // // x
  // expect(x.textContent()).toBe('X (Twitter)');
  // expect(x).toHaveAttribute('href', 'https://twitter.com/_allyssonsantos');
  // expect(x).toHaveAttribute('target', '_blank');
  // expect(x).toHaveAttribute('rel', 'noopener nofollow noreferrer');

  // // linkedin
  // expect(linkedin.textContent()).toBe('LinkedIn');
  // expect(linkedin).toHaveAttribute(
  //   'href',
  //   'https://www.linkedin.com/in/allyssonsantos/',
  // );
  // expect(linkedin).toHaveAttribute('target', '_blank');
  // expect(linkedin).toHaveAttribute('rel', 'noopener nofollow noreferrer');
});
