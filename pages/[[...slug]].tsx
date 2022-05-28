import { toObjectId, toFieldPath } from '@stackbit/annotations';
import { hotContentReload } from 'sourcebit-target-next/hot-content-reload';
import Head from 'next/head';

import { DynamicComponent } from '../components/DynamicComponent';
import { Footer } from '../components/Footer';

import { pageUrlPath } from '../utils/page-utils';
import { pagesByLayout, dataByType } from '../utils/sourcebit-utils';

export const FlexiblePage = ({ page, site }) => {
    // console.log({ page, site });
    return (
        <div className="page">
            <Head>
                <title>{page.frontmatter.title}</title>
            </Head>
            <div {...toObjectId(page?.__metadata?.id)}>
                {page.frontmatter.sections?.length > 0 && (
                    <div {...toFieldPath('sections')}>
                        {page.frontmatter.sections.map((section, index) => (
                            <DynamicComponent key={index} {...section} {...toFieldPath(`.${index}`)} />
                        ))}
                    </div>
                )}
            </div>
            <Footer {...site.footer} />
        </div>
    );
};

const withHotContentReload = hotContentReload();
export default withHotContentReload(FlexiblePage);

export const getStaticProps = async ({ params }) => {
    const allPages = await pagesByLayout('Page');
    const siteConfig = await dataByType('SiteConfig');
    const pagePath = typeof params?.slug === 'string' ? params?.slug : '/' + (params?.slug || []).join('/');
    const page = allPages.find((page) => pageUrlPath(page) === pagePath);
    return { props: { page, site: siteConfig } };
};

export const getStaticPaths = async () => {
    const allPages = await pagesByLayout('Page');
    return {
        paths: allPages.map((page) => pageUrlPath(page)),
        fallback: false
    };
};
