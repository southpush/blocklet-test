<template>

    <div class="px-8 py-5 border-b sticky top-0 bg-white z-10">
        <SearchBar></SearchBar>
    </div>
    <div v-mask:loading="blockStore.isLoading" class="w-full h-full">
        <div v-if="!blockStore.isError && blockStore.blockData" class="grid grid-cols-1 divide-x divide-y min-h-full"
            xl="grid-cols-7">
            <div class="p-5 flex flex-col gap-4 h-[fit-content] border-b" xl="col-span-4">
                <div class="w-26 h-26 rounded-xl relative"
                    style="background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);">
                    <div
                        class="w-10 h-10 rounded-full bg-white absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 flex items-center justify-center">
                        <Apps28Regular class="w-5 h-5"></Apps28Regular>
                    </div>
                </div>
                <div>
                    <b class="fond-bold text-2xl">Bitcoin Block #{{ blockStore.blockData ?
                    splitNumber(blockStore.blockData.block_index) : ''}}</b>
                    <p class="text-sm text-gray-400">Mined on 12/22/2020, 15:09:42
                        View all Blocks</p>
                </div>

                <p>This block was mined on 12/22/2020, 15:09:42 by Poolin. A total of 306.52 BTC ($6,988,858) were sent
                    in the block with
                    the average transaction being 0.3361 BTC ($7,663.38). Poolin earned a total reward of 6.25 BTC
                    $142,505. The reward
                    consisted of a base reward of 6.25 BTC $142,505 with an additional 0.1658 BTC ($3,780.39) reward
                    paid as fees of the 912
                    transactions which were included in the block.</p>
                <div class="flex gap-5">
                    <div @click="checkPrevBlock"
                        class="rounded-full flex items-center justify-center bg-gray-200 p-2 cursor-pointer">
                        <ArrowLeft20Filled class="w-6 h-6"></ArrowLeft20Filled>
                    </div>
                    <div @click="checkNextBlock"
                        class="rounded-full flex items-center justify-center bg-gray-200 p-2 cursor-pointer">
                        <ArrowRight20Filled class="w-6 h-6"></ArrowRight20Filled>
                    </div>
                </div>
            </div>
            <div class="px-4" xl="col-span-3 px-4 py-2 flex flex-col">
                <p class="font-bold py-3 text-sm">Transactions</p>
                <TransactionsList :tx="blockStore.blockData.tx"></TransactionsList>
            </div>
        </div>
        <div v-if="blockStore.isError" class="message-wrapper">
            <p class="text-2xl">Some errors have occurred...</p>
            <p class="text-gray-600 text-lg">{{ blockStore.errorMessage }}</p>
        </div>
        <div class="message-wrapper text-2xl" v-else-if="!blockStore.blockData">
            Please search a block
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useBlockStore } from '../stores/block'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNotification } from 'naive-ui'
import SearchBar from '../components/searchbar.vue'
import TransactionsList from '../components/transactionsList.vue'
import { Apps28Regular, ArrowLeft20Filled, ArrowRight20Filled } from '@vicons/fluent'


const blockStore = useBlockStore()
const router = useRouter()
const notification = useNotification()

/**
 * 分割千位
 */
const splitNumber = computed(() => {
    return (number: string | number) => {
        const arr = []
        number = number.toString()
        for (const i in Array.from(number)) {
            if (+i > 0 && +i % 3 === 0) {
                arr.push(',')
            }
            arr.push(number[number.length - 1 - +i])
        }

        return arr.reverse().join('')
    }
})


// 查看上一个下一个block
const checkPrevBlock = () => {
    if (blockStore.blockData?.prev_block) {
        blockStore.filter.blockHash = blockStore.blockData.prev_block
        router.push({
            query: {
                search: blockStore.filter.blockHash
            }
        })
        blockStore.getSingleBlockData()
    } else {
        notification.warning({
            content: 'Previous block does not exist.'
        })
    }
}
const checkNextBlock = () => {
    if (blockStore.blockData?.next_block && blockStore.blockData.next_block.length > 0) {
        blockStore.filter.blockHash = blockStore.blockData.next_block[0]
        router.push({
            query: {
                search: blockStore.filter.blockHash
            }
        })
        blockStore.getSingleBlockData()
    } else {
        notification.warning({
            content: 'Next block does not exist.'
        })
    }
}


</script>

<style scoped>
.message-wrapper {
    @apply w-full h-full flex flex-col items-center justify-center font-bold;
}
</style>