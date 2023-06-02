import { render, screen } from '@testing-library/react';
import Home from '../src/pages/index';
import '@testing-library/jest-dom';

import { mockedPost } from '../__mocks__/mockedPost';

describe('Home', () => {
  it('renders a blog post', () => {
    render(<Home posts={[mockedPost]} />);

    const heading = screen.getByRole('heading', {
      name: `${mockedPost.title} - ${mockedPost.readingTime.text}`,
    });

    expect(heading).toBeVisible();
  });
});
