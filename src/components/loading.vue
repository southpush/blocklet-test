<!--
    组件加载时的loading效果
-->
<template>
    <div role="alert" aria-label="Loading" ref="wrapperRef"
        class="w-full h-full flex flex-col justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="
                display: block;
                shape-rendering: auto;
            " :width="size + 'px'" :height="size + 'px'" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="80" cy="50" fill="#F0F6FF" r="6">
                <animate attributeName="r"
                    values="3.5999999999999996;3.5999999999999996;6;3.5999999999999996;3.5999999999999996"
                    times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.9166666666666666s"></animate>
                <animate attributeName="fill" values="#F0F6FF;#F0F6FF;#2E7AFF;#F0F6FF;#F0F6FF" repeatCount="indefinite"
                    times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.9166666666666666s"></animate>
            </circle>
            <circle cx="75.98076211353316" cy="65" fill="#F0F6FF" r="6">
                <animate attributeName="r"
                    values="3.5999999999999996;3.5999999999999996;6;3.5999999999999996;3.5999999999999996"
                    times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.8333333333333334s"></animate>
                <animate attributeName="fill" values="#F0F6FF;#F0F6FF;#2E7AFF;#F0F6FF;#F0F6FF" repeatCount="indefinite"
                    times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.8333333333333334s"></animate>
            </circle>
            <circle cx="65" cy="75.98076211353316" fill="#F0F6FF" r="6">
                <animate attributeName="r"
                    values="3.5999999999999996;3.5999999999999996;6;3.5999999999999996;3.5999999999999996"
                    times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.75s"></animate>
                <animate attributeName="fill" values="#F0F6FF;#F0F6FF;#2E7AFF;#F0F6FF;#F0F6FF" repeatCount="indefinite"
                    times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.75s"></animate>
            </circle>
            <circle cx="50" cy="80" fill="#F0F6FF" r="6">
                <animate attributeName="r"
                    values="3.5999999999999996;3.5999999999999996;6;3.5999999999999996;3.5999999999999996"
                    times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.6666666666666666s"></animate>
                <animate attributeName="fill" values="#F0F6FF;#F0F6FF;#2E7AFF;#F0F6FF;#F0F6FF" repeatCount="indefinite"
                    times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.6666666666666666s"></animate>
            </circle>
            <circle cx="35.00000000000001" cy="75.98076211353316" fill="#F0F6FF" r="6">
                <animate attributeName="r"
                    values="3.5999999999999996;3.5999999999999996;6;3.5999999999999996;3.5999999999999996"
                    times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.5833333333333334s"></animate>
                <animate attributeName="fill" values="#F0F6FF;#F0F6FF;#2E7AFF;#F0F6FF;#F0F6FF" repeatCount="indefinite"
                    times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.5833333333333334s"></animate>
            </circle>
            <circle cx="24.01923788646684" cy="65" fill="#F0F6FF" r="6">
                <animate attributeName="r"
                    values="3.5999999999999996;3.5999999999999996;6;3.5999999999999996;3.5999999999999996"
                    times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.5s"></animate>
                <animate attributeName="fill" values="#F0F6FF;#F0F6FF;#2E7AFF;#F0F6FF;#F0F6FF" repeatCount="indefinite"
                    times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.5s"></animate>
            </circle>
            <circle cx="20" cy="50.00000000000001" fill="#F0F6FF" r="6">
                <animate attributeName="r"
                    values="3.5999999999999996;3.5999999999999996;6;3.5999999999999996;3.5999999999999996"
                    times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.4166666666666667s"></animate>
                <animate attributeName="fill" values="#F0F6FF;#F0F6FF;#2E7AFF;#F0F6FF;#F0F6FF" repeatCount="indefinite"
                    times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.4166666666666667s"></animate>
            </circle>
            <circle cx="24.019237886466836" cy="35.00000000000001" fill="#F0F6FF" r="6">
                <animate attributeName="r"
                    values="3.5999999999999996;3.5999999999999996;6;3.5999999999999996;3.5999999999999996"
                    times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.3333333333333333s"></animate>
                <animate attributeName="fill" values="#F0F6FF;#F0F6FF;#2E7AFF;#F0F6FF;#F0F6FF" repeatCount="indefinite"
                    times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.3333333333333333s"></animate>
            </circle>
            <circle cx="34.999999999999986" cy="24.019237886466847" fill="#F0F6FF" r="6">
                <animate attributeName="r"
                    values="3.5999999999999996;3.5999999999999996;6;3.5999999999999996;3.5999999999999996"
                    times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.25s"></animate>
                <animate attributeName="fill" values="#F0F6FF;#F0F6FF;#2E7AFF;#F0F6FF;#F0F6FF" repeatCount="indefinite"
                    times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.25s"></animate>
            </circle>
            <circle cx="49.99999999999999" cy="20" fill="#F0F6FF" r="6">
                <animate attributeName="r"
                    values="3.5999999999999996;3.5999999999999996;6;3.5999999999999996;3.5999999999999996"
                    times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.16666666666666666s"></animate>
                <animate attributeName="fill" values="#F0F6FF;#F0F6FF;#2E7AFF;#F0F6FF;#F0F6FF" repeatCount="indefinite"
                    times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.16666666666666666s"></animate>
            </circle>
            <circle cx="65" cy="24.019237886466843" fill="#F0F6FF" r="6">
                <animate attributeName="r"
                    values="3.5999999999999996;3.5999999999999996;6;3.5999999999999996;3.5999999999999996"
                    times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.08333333333333333s"></animate>
                <animate attributeName="fill" values="#F0F6FF;#F0F6FF;#2E7AFF;#F0F6FF;#F0F6FF" repeatCount="indefinite"
                    times="0;0.1;0.2;0.3;1" dur="1s" begin="-0.08333333333333333s"></animate>
            </circle>
            <circle cx="75.98076211353316" cy="34.999999999999986" fill="#F0F6FF" r="6">
                <animate attributeName="r"
                    values="3.5999999999999996;3.5999999999999996;6;3.5999999999999996;3.5999999999999996"
                    times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="0s"></animate>
                <animate attributeName="fill" values="#F0F6FF;#F0F6FF;#2E7AFF;#F0F6FF;#F0F6FF" repeatCount="indefinite"
                    times="0;0.1;0.2;0.3;1" dur="1s" begin="0s"></animate>
            </circle>
            <!-- [ldio] generated by https://loading.io/ -->
        </svg>
        <div v-if="message" class="font-bold">
            {{ message }}
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
export default {
    props: {
        message: {
            required: false,
            default: () => ('')
        }
    },
    setup() {
        const rs: Record<string, any> = {
            duration: 1000,
            delay: 500,
        }

        const size = ref(50)
        rs.size = size

        const wrapperRef = ref<HTMLDivElement | null>(null)
        rs.wrapperRef = wrapperRef

        onMounted(() => {
            if (!wrapperRef.value) return;
            const rect = wrapperRef.value.getBoundingClientRect()
            size.value = Math.min(Math.min(rect.width, rect.height) / 2, 100)
        })

        return rs;
    },
};
</script>