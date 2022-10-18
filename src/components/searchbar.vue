<template>
    <n-input role="search-input" v-model:value="blockStore.filter.blockHash" :loading="blockStore.isLoading"
        id="searchInput" type="text" round class="flex-1 max-w-2xl w-full bg-gray-300 text-gray-400 bg-opacity-40 "
        placeholder="Search Block By Block Hash" @keyup.enter="searchBlockData">
        <template #prefix>
            <Search20Filled class="w-5 h-5 mr-4"></Search20Filled>
        </template>
    </n-input>
</template>

<script lang="ts" setup>
import { Search20Filled } from '@vicons/fluent'
import { useBlockStore } from '../stores/block'
import { NInput } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue';

const route = useRoute()
const router = useRouter()
const blockStore = useBlockStore()

const searchBlockData = () => {
    if (blockStore.isLoading || !blockStore.filter.blockHash) return;
    blockStore.getSingleBlockData();
    router.push({
        query: {
            search: blockStore.filter.blockHash
        }
    })
}


onMounted(() => {
    blockStore.filter.blockHash = (route.query.search instanceof Array ? route.query.search[0] : route.query.search) || ''
    blockStore.getSingleBlockData()
})

</script>

<style scoped>
#searchInput input {
    @apply !border-none !outline-none;
}
</style>