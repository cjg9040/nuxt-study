module.exports = {
    srcDir: 'src/',
    head: {
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Meta description'}
        ]
    },
    loading: false,
    router: {
        base: '/',
        scrollBehavior: function (to, from, savedPosition) {
            return {x: 0, y: 0}
        }
    }
};