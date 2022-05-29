const m = require('./index');

const options = {
    preview: true,
    spaceId: '8qvtpq9dnbf2',
    environment: 'master',
    previewToken: '-DfchuBiHm7Z7K6mIaqIcFKtPAoqmzwsYRHvO1LjXD8'
};

m.bootstrap({
    options: options,
    setPluginContext: (data) => {
        m.transform({
            options,
            data: { models: [], objects: [] },
            getPluginContext: () => data
        });
    }
});
