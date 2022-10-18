describe('import vue components', () => {
    test('normal imports as expected', async () => {
        const cmps = await Promise.all([
            import('../components/bitcoinIcon.vue'),
            import('../components/loading.vue'),
            import("../components/searchbar.vue"),
            import('../components/transactionsList.vue')
        ])
        for (const cmp of cmps) {
            expect(cmp).toBeDefined()
        }
    })
})

