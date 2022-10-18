<template>
    <div class="flex flex-col gap-3">
        <div class="flex gap-5 flex-wrap">
            <div class="sort-btn w-10 !p-0 flex items-center justify-center">
                <ArrowMaximizeVertical20Filled v-show="isForceCollapsed" @click="isForceCollapsed = !isForceCollapsed"
                    class="w-6 h-6 !mr-0"></ArrowMaximizeVertical20Filled>
                <ArrowMinimizeVertical20Filled v-show="!isForceCollapsed" @click="isForceCollapsed = !isForceCollapsed"
                    class="w-6 h-6 !mr-0"></ArrowMinimizeVertical20Filled>
            </div>
            <!-- <div class="sort-btn">
                <ArrowDown16Filled></ArrowDown16Filled>Last
            </div>
            <div class="sort-btn">
                <ArrowDown16Filled></ArrowDown16Filled>First
            </div> -->
            <div class="sort-btn" @click="selectedSortIndex = 2" :class="{
                active: selectedSortIndex === 2
            }">
                <ArrowDown16Filled></ArrowDown16Filled>Size
            </div>
            <div class="sort-btn" @click="selectedSortIndex = 3" :class="{
                active: selectedSortIndex === 3
            }">
                <ArrowDown16Filled class="transform rotate-180"></ArrowDown16Filled>Size
            </div>
            <div class="sort-btn" @click="selectedSortIndex = 0" :class="{
                active: selectedSortIndex === 0
            }">
                <ArrowDown16Filled></ArrowDown16Filled>Fee
            </div>
            <div class="sort-btn" @click="selectedSortIndex = 1" :class="{
                active: selectedSortIndex === 1
            }">
                <ArrowDown16Filled class="transform rotate-180"></ArrowDown16Filled>Fee
            </div>
        </div>
        <NCollapse arrow-placement="right">
            <NCollapseItem v-for="item in displayedTxData" :key="item.hash" :ref="(setCollapsedComponentRef as any)"
                class="border rounded-lg">
                <template #header="{ collapsed }">
                    <div class="flex w-full px-5 py-3 text-xs items-center" :class="{
                        'border-b': !collapsed
                    }">
                        <div class="flex flex-col gap-1">
                            <p>TX906 <span class="text-gray-400">Hash<span class="text-orange-300 ml-1">
                                        {{ item.hash.substring(0, 8) }}</span></span></p>
                            <p class="text-gray-400">12/22/2020, 15:09:42</p>
                        </div>
                        <div class="flex flex-col gap-1 flex-1 flex justify-end text-right">
                            <p><span class="text-base font-bold">0.03273166 BTC</span> <span
                                    class="text-gray-400">$746.31</span></p>
                            <p><span class="text-red-500">Fee</span> <span>1.4K Sats</span> <span
                                    class="text-gray-400">$0.31</span></p>
                        </div>
                        <IosArrowLtr24Filled class="w-5 ml-5 transform transition text-gray-500" :class="{
                            'rotate-90': !collapsed,
                            '-rotate-90': collapsed
                        }"></IosArrowLtr24Filled>
                    </div>
                </template>
                <template #arrow>
                    <span></span>
                </template>
                <template #default>
                    <div class="w-full grid grid-cols-2">
                        <div class="px-4 py-3 border-r">
                            <b class="font-bold">From</b>
                        </div>
                        <div class="px-4 py-3">
                            <b class="font-bold">To</b>
                        </div>
                        <div class="col-span-2 border-t grid grid-cols-2">
                            <div class="tx_wrapper border-r">
                                <div v-for="(input_item, index) in item.inputs" class="" :key="index">
                                    <div class="index">
                                        {{ +index + 1 }}.
                                    </div>
                                    <div class="content">
                                        <p class="text-orange-400">{{ input_item.sequence }}
                                            <ClipboardArrowRight20Regular class="clipboard"
                                                @click="copy(input_item.sequence.toString())">
                                            </ClipboardArrowRight20Regular>
                                        </p>
                                        <p>0.00206806 BTC</p>
                                        <p class="text-orange-400">Script</p>
                                    </div>
                                </div>
                            </div>
                            <div class="tx_wrapper">
                                <div v-for="(out_item, index) in item.out" :key="index">
                                    <div class="index">
                                        {{ +index + 1 }}.
                                    </div>
                                    <div class="content">
                                        <p class="text-orange-400">{{ out_item.value }}<ClipboardArrowRight20Regular
                                                class="clipboard" @click="copy(out_item.value)">
                                            </ClipboardArrowRight20Regular>
                                        </p>
                                        <p>0.00206806 BTC</p>
                                        <p class="text-orange-400">Script</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </NCollapseItem>
        </NCollapse>
        <div class="flex justify-center pb-4">
            <n-pagination v-model:page="pagination.page" :item-count="tx.length" :page-size="pagination.pageSize"
                :page-slot='6' />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';
import { TransactionData } from '../apis/blockChainData';
import { NCollapse, NCollapseItem, useNotification, NPagination } from 'naive-ui'
import { IosArrowLtr24Filled, ClipboardArrowRight20Regular, ArrowMaximizeVertical20Filled, ArrowMinimizeVertical20Filled, ArrowDown16Filled } from '@vicons/fluent'
import { copy as copyUtil } from '../utils'

interface Props {
    tx: TransactionData[],
}

const notification = useNotification()

const props = defineProps<Props>()

const initPagination = {
    page: 1,
    pageSize: 10
}
const pagination = reactive({
    ...initPagination,
})

/**
 * 排序功能
 * @todo api缺少value、Last、First等字段信息
 */
interface Sort {
    sortBy: keyof TransactionData; // 根据哪个字段排序
    order: 1 | -1; // 升序降序
}
const selectedSortIndex = ref<number>(-1)
const sortArr: Sort[] = [
    {
        sortBy: "fee",
        order: 1,
    },
    {
        sortBy: 'fee',
        order: -1
    },
    {
        sortBy: "size",
        order: 1,
    },
    {
        sortBy: 'size',
        order: -1
    }
]

const displayedTxData = computed<TransactionData[]>(() => {
    const sort = sortArr[selectedSortIndex.value]
    if (sort) {
        return props.tx.sort((a, b) => sort.order * ((+a[sort.sortBy] || 0) - (+b[sort.sortBy] || 0))).slice(pagination.pageSize * (pagination.page - 1), pagination.pageSize * pagination.page)
    } else {
        return props.tx.slice(pagination.pageSize * (pagination.page - 1), pagination.pageSize * pagination.page)
    }
})

// 是否强制折叠起来
const isForceCollapsed = ref<boolean>(true)
// 获取v-for的折叠面板组件实例
interface CollapsedComponentExpose {
    readonly collapsed: boolean,
    handleClick: (e?: Event) => void
}
const collapsedComponentRefs = ref<CollapsedComponentExpose[]>([])
const setCollapsedComponentRef = (el: CollapsedComponentExpose) => {
    if (el) {
        collapsedComponentRefs.value.push(el)
    }
}
watch(
    () => isForceCollapsed.value,
    () => {
        forceCollapsed()
    }
)
// 强制打开或者折叠折叠面板
const forceCollapsed = () => {
    collapsedComponentRefs.value.forEach(i => {
        if (i.collapsed !== isForceCollapsed.value) {
            i.handleClick()
        }
    })
}

const copy = (str: string) => {
    copyUtil(str).then(() => {
        notification.success({
            content: "Copy Success."
        })
    }).catch(err => {
        notification.error({
            content: `Copy failed: ${err.message}.`
        })
    })
}


const resetOrderPagination = (): void => {
    Object.assign(pagination, { ...initPagination })
}
defineExpose({
    resetOrderPagination
})

</script>

<style scoped>
.sort-btn {
    @apply rounded-full h-10 min-w-10 px-4 flex items-center justify-center bg-gray-100 cursor-pointer;
}

.sort-btn svg {
    @apply w-4 mr-1;
}

.sort-btn.active {
    @apply text-white bg-dark-500;
}

:deep(.n-collapse-item__content-inner) {
    padding-top: 0 !important;
}

:deep(.n-collapse .n-collapse-item .n-collapse-item__header) {
    padding-top: 0 !important;
}

.tx_wrapper {
    @apply flex flex-col;
}

.tx_wrapper>div {
    @apply flex items-baseline px-4 py-2 gap-2;
}

.tx_wrapper>div>.index {
    @apply font-bold;
}

.tx_wrapper>div>.content {
    @apply text-xs flex flex-col;
}

.tx_wrapper .clipboard {
    @apply text-gray-800 w-4 h-4 inline-block cursor-pointer ml-1 align-middle;
}

:deep(.n-pagination-item) {
    @apply !rounded-full w-10 h-10 flex items-center justify-center;
}

:deep(.n-pagination-item:not(.n-pagination-item--disabled):hover) {
    @apply !border !border-gray-400 text-gray-600;
}

:deep(.n-pagination-item--active) {
    @apply !border-none !text-white !bg-gray-300;
}
</style>