import { render, screen } from '@testing-library/react';
import { FlexiblePage, getStaticProps, getStaticPaths } from '../pages/[[...slug]]';
import sourcebit from 'sourcebit';
import config from '../sourcebit.js';
import { act } from 'react-dom/test-utils';

const sourcebitOptions = {};

describe('FlexiblePage', () => {
    // ensure sourcebit has loaded
    beforeEach(async () => {
        console.log('Loading source data...');
        const data = await sourcebit.fetch(config, sourcebitOptions);
        // console.log(data);
    });

    it('getStaticPaths', async () => {
        const { paths, fallback } = await getStaticPaths();
        expect(fallback).toEqual(false);
        expect(paths).toEqual(['/']);
    });

    it('getStaticProps', async () => {
        const { props } = await getStaticProps({ params: { slug: '/' } });
        expect(props.page.frontmatter).toEqual({
            layout: 'Page',
            title: 'Stackbit Next.js Starter',
            sections: [
                {
                    type: 'HeroSection',
                    heading: 'Welcome to Stackbit!',
                    subheading: "You've just [unlocked visual editing capabilities](https://www.stackbit.com/) in this Next.js app.\n",
                    buttons: [
                        { label: 'Start Building', url: 'https://docs.stackbit.com/getting-started/', theme: 'primary' },
                        { label: 'Read the Docs', url: 'https://docs.stackbit.com/', theme: 'secondary' }
                    ]
                },
                {
                    type: 'CardGridSection',
                    heading: 'Jump to Topic',
                    subheading: 'Or jump right to a specific topic to help you build your site.\n',
                    cards: [
                        {
                            heading: 'How Stackbit Works →',
                            subheading: 'Follow an end-to-end guide to learn the inner-workings of Stackbit.\n',
                            url: 'https://docs.stackbit.com/conceptual-guides/how-stackbit-works/'
                        },
                        {
                            heading: 'Pages →',
                            subheading: 'Add a new type of page to your site, while touching on content modeling and data retrieval.\n',
                            url: 'https://docs.stackbit.com/how-to-guides/content/'
                        },
                        {
                            heading: 'Components →',
                            subheading: 'Make components editable, add styles, and provide content presets to speed up content editing.\n',
                            url: 'https://docs.stackbit.com/how-to-guides/components/'
                        },
                        {
                            heading: 'Styling →',
                            subheading: 'Set up global styles and add a styling toolbar to individual components in the visual editor.\n',
                            url: 'https://docs.stackbit.com/how-to-guides/styles/'
                        }
                    ]
                }
            ]
        });
        expect(props.site.footer.body).toEqual('Made by [Stackbit](https://www.stackbit.com/)\n');
    });

    it('renders homepage without crashing', async () => {
        const { props } = await getStaticProps({ params: { slug: '/' } });
        let container: HTMLElement | null = null;
        await act(() => {
            container = render(<FlexiblePage {...props} />).container;
        });
        expect(container).toBeInstanceOf(HTMLElement);
        expect(container).toMatchSnapshot();

        const heading = screen.getByText('Welcome to Stackbit!');
        expect(heading).toBeInTheDocument();
    });
});
