import Head from 'next/head';
import { resolve } from 'path';
import sourcebit from 'sourcebit';

import { DynamicComponent } from '../components/DynamicComponent';
import { Footer } from '../components/Footer';

import { toObjectId, toFieldPath } from '@stackbit/annotations';
import { withRemoteDataUpdates } from '../sourcebit-target-next/with-remote-data-updates';
import { IPage, ISiteConfig } from '../types/sourcebit';

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
    const sourcebitConfig = await import('../sourcebit.js');

    if (preview) {
        // when in preview mode, ensure live updates are enabled and cache is disabled.
        sourcebitConfig.plugins[0].options.preview = true;
        sourcebitConfig.plugins[1].options.liveUpdate = true;
        sourcebitConfig.plugins[1].options.cacheFilePath = false;
    }

    const objects = await sourcebit
        .fetch(sourcebitConfig)
        .then((data) => data.objects)
        .catch(console.error);

    const page = objects.find((obj) => obj.__metadata.modelName === 'Page' && obj.slug === pagePath);
    console.assert(!!page, `Failed to select an entry with: (__metadata.modelName=Page, slug=${pagePath})`);

    const site = objects.find((obj) => obj.__metadata.modelName === 'SiteConfig');
    console.assert(!!site, `Failed to select an entry with: (__metadata.modelName=SiteConfig`);

    return { props: { site, page, preview } };
}

export async function getStaticPaths() {
    const sourcebitConfig = await import('../sourcebit.js');

    // disable cache
    sourcebitConfig.plugins[1].options.cacheFilePath = false;

    const objects = await sourcebit
        .fetch(sourcebitConfig)
        .then((data) => data.objects)
        .catch(console.error);

    return {
        paths: objects.map((obj) => obj.slug).filter(Boolean),
        fallback: false
    };
}

export default withRemoteDataUpdates(FlexiblePage);
