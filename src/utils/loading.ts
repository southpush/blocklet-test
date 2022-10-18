import { AsyncComponentLoader, Component, ComputedOptions, defineAsyncComponent, defineComponent, MethodOptions, reactive } from 'vue'
import LoadingComponent from '../components/loading.vue'


/**
 * 管理vue组件loading状态
 */
export function createLoadingState() {
    return reactive({
        /**
         * 所有等待状态
         */
        _all: false,
        /**
         * 注册loading
         * @param {*} key 
         */
        sub(key: string) {
            const that = reactive(this)
            that[key] = true
            that._all = true
        },
        /**
         * 取消loading
         * @param {*} key 
         */
        unSub(key: string) {
            const that = reactive(this)
            delete that[key]
            for (const i of Object.keys(that)) {
                if (!['_all', "sub", "unSub"].includes(i)) return;
            }
            that._all = false
        }
    } as { _all: boolean, sub: (key: string) => void, unSub: (key: string) => void } & Record<string, any>)
}

/**
 * 睡
 */
export function sleep(ms = 2000) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

/**
 * 异步导入组件，当组件载入中时显示loading
 * vue-router4 比较诡异，component接受一个loader，然后使用的还是defineAsyncComponent来解析这个loader的，但是却不接受defineAsyncComponent的其它参数，没办法使用高阶用法
 * @param {Function} AsyncView 导入组件的importFunction
 */
export const asyncImportComponent = <T extends AsyncComponentLoader<Component<any, any, any, ComputedOptions, MethodOptions>> = any>(AsyncView: AsyncComponentLoader<T>, loading = LoadingComponent,) => {
    const AsyncComp = defineAsyncComponent({
        // // 工厂函数
        // loader: async () => {
        //     await sleep(5000)
        //     return AsyncView()
        // },
        loader: AsyncView,
        // 加载异步组件时要使用的组件
        loadingComponent: loading,
        // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
        delay: 200,
        // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件
        // 默认值：Infinity（即永不超时，单位 ms）
        // timeout: 3000,
        // 定义组件是否可挂起 | 默认值：true
        suspensible: false,
        // errorComponent: 
        /**
         *
         * @param {*} error 错误信息对象
         * @param {*} retry 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试
         * @param {*} fail  一个函数，指示加载程序结束退出
         * @param {*} attempts 允许的最大重试次数
         */
        onError(error, retry, fail, attempts) {
            if (error.message.match(/fetch/) && attempts <= 3) {
                // 请求发生错误时重试，最多可尝试 3 次
                retry()
            } else {
                // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
                // 必须调用其中一个才能继续错误处理。
                fail()
            }
        }
    })


    return defineComponent({
        template: `
            <async-comp v-bind="$attrs"></async-comp>
        `,
        components: {
            AsyncComp
        },
    })
}
