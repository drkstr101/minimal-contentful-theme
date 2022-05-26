module.exports = {
    plugins: [
        {
            module: require('sourcebit-source-contentful'),
            options: {
                accessToken: process.env['CONTENTFUL_ACCESS_TOKEN'],
                environment: 'master',
                spaceId: 'krtnabbrkhtd'
            }
        },
        {
            module: require('sourcebit-target-next'),
            options: {
                pages: function (objects, utils) {
                    return objects.reduce((pages, page) => {
                        if (page.__metadata.modelName === 'Page' && page.__metadata.source === 'sourcebit-source-contentful') {
                            return pages.concat({
                                path: '{slug}',
                                page
                            });
                        }

                        return pages;
                    }, []);
                },
                commonProps: function (objects, utils) {
                    return {
                        site: objects.find((object) => object.__metadata.modelName === 'SiteConfig')
                    };
                }
            }
        }
    ]
};
