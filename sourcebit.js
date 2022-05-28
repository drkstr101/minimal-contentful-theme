const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

function flattenMarkdownData() {
    return ({ data }) => {
        const objects = data.objects.map((object) => {
            if ('frontmatter' in object) {
                return {
                    __metadata: object.__metadata,
                    ...object.frontmatter,
                    markdown_content: object.markdown || null
                };
            }
            return object;
        });

        return {
            ...data,
            objects
        };
    };
}

module.exports = {
    plugins: [
        {
            module: require('sourcebit-source-filesystem'),
            options: {
                watch: isDev,
                sources: [{ name: 'content', path: path.join(__dirname, 'content') }]
            }
        },

        /**
         * converts { __metadata, frontmatter, markdown }
         * to { __metadata, ...frontmater, markdown_content: markdown }
         */
        flattenMarkdownData(),

        {
            module: require('sourcebit-target-next'),
            options: {
                flattenAssetUrls: true,
                liveUpdate: isDev
            }
        }
    ]
};
