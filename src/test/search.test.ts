import { flushPromises, mount } from "@vue/test-utils"
import { nextTick } from 'vue'
import AppVue from '../App.vue'
import { setActivePinia, createPinia } from 'pinia'
import { router, routeRecords } from '../routes'
import directives from '../directives'
import { useBlockStore } from "../stores/block"


describe('Search Block Function Test', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test('Loading is expected when load api data.', async () => {
        expect(AppVue).toBeTruthy()

        router.push({
            name: routeRecords.home.name
        })
        await router.isReady()

        const wrapper = mount(AppVue, {
            global: {
                plugins: [router],
                directives: directives
            }
        })

        await nextTick()
        const searchInput = await wrapper.find('[role="search-input"] input')
        expect(searchInput.exists()).toBe(true)

        searchInput.setValue("00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa")
        searchInput.trigger("keyup.enter")

        await nextTick()

        expect(wrapper.find('[role="Loading"]').exists()).toBe(true)
    })
})

