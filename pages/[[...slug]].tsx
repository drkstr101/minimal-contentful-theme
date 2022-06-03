import Head from 'next/head';
import { resolve } from 'path';
import sourcebit from 'sourcebit';

import { DynamicComponent } from '../components/DynamicComponent';
import { Footer } from '../components/Footer';

import { sourcebitDataClient } from 'sourcebit-target-next';
import { toObjectId, toFieldPath } from '@stackbit/annotations';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { IPage, ISiteConfig, Metadata } from '../types/sourcebit';

export interface FlexiblePageProps {
    page: IPage;
    site: ISiteConfig;
}

export const FlexiblePage = ({ page, site }: FlexiblePageProps) => {
    console.log({ page, site });
    return (
        <div className="page">
            <Head>
                <title>{page.title}</title>
                {site.favicon && <link rel="icon" href={site.favicon.url} type="image/svg+xml" />}
            </Head>
            <div {...toObjectId(page?.__metadata?.id)}>
                {page.sections?.length > 0 && (
                    <div {...toFieldPath('sections')}>
                        {page.sections.map((section, index) => (
                            <DynamicComponent key={index} {...section} {...toFieldPath(`.${index}`)} />
                        ))}
                    </div>
                )}
            </div>
            <Footer {...site} />
        </div>
    );
};

export async function getStaticProps({ params, preview = false }) {
    const pagePath = typeof params?.slug === 'string' ? params.slug : '/' + (params?.slug || []).join('/');
    let objects: any[] = [];
    if (preview) {
        // if preview is enabled then fetch on every request
        const sourcebitConfig = await import('../sourcebit.js');
        objects = await sourcebit.fetch(sourcebitConfig).then((data) => data.objects);
    } else {
        objects = await sourcebitDataClient.getData().then((data) => data.objects);
    }

    const page = objects.find((obj) => obj.__metadata.modelName === 'Page' && obj.slug === '/') ?? null;
    const site = objects.find((obj) => obj.__metadata.modelName === 'SiteConfig') ?? null;
    return { props: { site, page } };
}

export async function getStaticPaths() {
    const paths = await sourcebitDataClient.getStaticPaths();
    return {
        paths,
        fallback: false
    };
}

export default withRemoteDataUpdates(FlexiblePage);
