import { setActivePinia, createPinia } from 'pinia'
import { useBlockStore } from './block'

describe("Block Store Test", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('Loading state check', async () => {
        const blockStore = useBlockStore()

        expect(blockStore.blockData).toBeNull()

        // set blockHash to mock search input
        blockStore.filter.blockHash = "00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa"

        // when requesting api data, loading show be true
        const promise = blockStore.getSingleBlockData()
        expect(blockStore.isLoading).toBe(true)
        await promise
        expect(blockStore.isLoading).toBe(false)
        // error handle
        if (!blockStore.blockData) {
            expect(blockStore.isError).toBe(true)
            expect(blockStore.errorMessage).not.toHaveLength(0)
        }

        if (blockStore.isError) {
            expect(blockStore.blockData).toBeNull()
        }
    })
})