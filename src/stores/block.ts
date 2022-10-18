import { defineStore } from 'pinia'
import { BlockData } from '../apis/blockChainData'
import $api from '../apis'

export const useBlockStore = defineStore("blockData", {
    state: () => ({
        filter: {
            blockHash: ''
        },
        isLoading: false,
        isError: false,
        errorMessage: '',
        blockData: null as BlockData | null,
    }),
    actions: {
        // 获取详情
        getSingleBlockData() {
            if (!this.filter.blockHash) return;

            this.isLoading = true
            this._resetResult()
            return $api.blockChain.getSingleBlockData(this.filter.blockHash).then(res => {
                if (res.error) {
                    throw new Error(res.message)
                }

                this.blockData = res
            }).catch(err => {
                this.isError = true
                this.errorMessage = err.message
            }).finally(() => {
                this.isLoading = false
            })
        },
        // 重设详情结果，每次请求前调用
        _resetResult() {
            this.errorMessage = ""
            this.blockData = null
            this.isError = false
        }
    }
})