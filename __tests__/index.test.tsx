import { render, screen } from '@testing-library/react';
import Home from '../src/pages';

import { mockedPost } from '../__mocks__/mockedPost';

describe('Home', () => {
  test('renders a blog post', () => {
    render(<Home posts={[mockedPost]} />);

    const heading = screen.getByRole('heading', {
      name: `${mockedPost.title} - ${mockedPost.readingTime.text}`,
    });

    expect(heading).toBeVisible();
  });
});
