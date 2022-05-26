import { render, screen } from '@testing-library/react';
import { DynamicPage, getStaticProps } from '../pages/[[...slug]]';

it('renders homepage without crashing', async () => {
    const { props } = await getStaticProps({ params: { slug: '/' } });
    const { container } = render(<DynamicPage {...props} />);
    expect(container).toBeInstanceOf(HTMLElement);
    expect(container).toMatchSnapshot();

    const heading = screen.getByText('Stackbit Next.js Starter');
    expect(heading).toBeInTheDocument();
});
