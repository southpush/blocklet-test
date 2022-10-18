<template>
    <n-notification-provider>
        <div class="h-screen w-screen overflow-hidden flex flex-col" md="flex-row">
            <nav class="border-gray-200 w-full overflow-hidden flex flex-col box-border" md="w-58 border-r h-full">
                <div class="flex items-center justify-start py-2 px-4 border-b" sm="py-3"
                    md="py-4 px-0 justify-center border-none">
                    <TextBulletListTree20Filled @click="showNav = !showNav" class="w-5 h-5 mr-5 cursor-pointer"
                        md="hidden">
                    </TextBulletListTree20Filled>
                    <div id="blockchainLogo" class="w-5 h-5 bg-center bg-contain bg-black mr-2"></div>
                    <b class="text-sm" sm="text-md" lg="text-lg">Blockchain.com</b>
                </div>
                <div class="fixed z-20 h-screen w-screen bg-gray-700 bg-opacity-30" :class="{
                    hidden: !showNav
                }" md="!hidden" @click="showNav = false"></div>

                <div class="flex flex-col gap-2 border-r border-gray-200 overflow-auto flex-1 px-3 fixed left-0 transition transition-all bg-white pt-3 h-screen z-20"
                    :class="{
                        '-left-full': !showNav,
                    }" md="relative pt-0 h-auto !left-0 border-none">

                    <div class="flex w-full justify-end" md="hidden">
                        <TextBulletListTree20Filled class="w-5 h-5 cursor-pointer" @click="showNav = !showNav">
                        </TextBulletListTree20Filled>
                    </div>

                    <router-link active-class="active-route" :to="routeRecords.home.path" class="route-row">
                        <Home12Filled class="active-icon"></Home12Filled>
                        <Home12Regular class="inactive-icon"></Home12Regular>
                        <p>Home</p>
                    </router-link>
                    <router-link active-class="active-route" :to="routeRecords.prices.path" class="route-row">
                        <AlignBottom16Filled class="active-icon"></AlignBottom16Filled>
                        <AlignBottom16Regular class="inactive-icon"></AlignBottom16Regular>
                        <p>Prices</p>
                    </router-link>
                    <router-link active-class="active-route" :to="routeRecords.charts.path" class="route-row">
                        <ChartMultiple24Filled class="active-icon"></ChartMultiple24Filled>
                        <ChartMultiple24Regular class="inactive-icon"></ChartMultiple24Regular>
                        <p>Charts</p>
                    </router-link>
                    <router-link active-class="active-route" :to="routeRecords.nfts.path" class="route-row">
                        <Image16Filled class="active-icon"></Image16Filled>
                        <Image16Regular class="inactive-icon"></Image16Regular>
                        <p>NFTs</p>
                    </router-link>
                    <router-link active-class="active-route" :to="routeRecords.deFi.path" class="route-row">
                        <div class="active-icon" :style="{ backgroundImage: `url(${DeFiSelectedSvg})`}"></div>
                        <div class="inactive-icon" :style="{ backgroundImage: `url(${DeFiSvg})`}"></div>
                        <p>DeFi</p>
                    </router-link>
                    <a href="https://www.blockchain.com/learning-portal/bitcoin-faq" class="route-row">
                        <div class="active-icon" :style="{ backgroundImage: `url(${AcademySvg})`}"></div>
                        <div class="inactive-icon" :style="{ backgroundImage: `url(${AcademySvg})`}"></div>
                        <p>Acdemy</p>
                    </a>
                    <router-link active-class="active-route" :to="routeRecords.developers.path" class="route-row">
                        <Code16Filled class="active-icon">
                        </Code16Filled>
                        <Code16Regular class="inactive-icon"></Code16Regular>
                        <p>Developers</p>
                    </router-link>
                    <router-link active-class="active-route" :to="routeRecords.wallet.path" class="route-row">
                        <Wallet24Filled class="active-icon">
                        </Wallet24Filled>
                        <Wallet24Regular class="inactive-icon"></Wallet24Regular>
                        <p>Wallet</p>
                    </router-link>
                    <a href="https://exchange.blockchain.com/?utm_campaign=expmarketing_getstarted" class="route-row">
                        <ArrowTrendingLines24Regular class="inactive-icon"></ArrowTrendingLines24Regular>
                        <p>Exchange</p>
                    </a>

                    <router-link active-class="active-route" :to="routeRecords.bitcoin.path" class="route-row mt-6">
                        <BitcoinIcon class="icon fill-orange-400"></BitcoinIcon>
                        <p>Bitcoin</p>
                    </router-link>
                    <router-link active-class="active-route" :to="routeRecords.ethereum.path" class="route-row">
                        <div class="icon bg-center bg-contain" :style="{ backgroundImage: `url(${EthPng})`}"></div>
                        <p>Ethereum</p>
                    </router-link>
                    <router-link active-class="active-route" :to="routeRecords.bitcoinCash.path" class="route-row">
                        <BitcoinIcon class="icon fill-green-400 transform -rotate-45"></BitcoinIcon>
                        <p>Bitcoin Cash</p>
                    </router-link>
                    <router-link active-class="active-route" :to="routeRecords.btcTestnet.path" class="route-row">
                        <BitcoinIcon class="icon fill-gray-400"></BitcoinIcon>
                        <p>BTC Testnet</p>
                    </router-link>
                    <router-link active-class="active-route" :to="routeRecords.bchTestnet.path" class="route-row">
                        <BitcoinIcon class="icon fill-gray-400 transform -rotate-45"></BitcoinIcon>
                        <p>BCH Testnet</p>
                    </router-link>
                </div>
                <div class="hidden" md="block">
                    <!-- 语言切换 -->
                </div>
            </nav>
            <main class="flex-1 h-full flex flex-col overflow-auto">
                <router-view></router-view>
            </main>
        </div>
    </n-notification-provider>
</template>

<script lang='ts' setup>
import { ref } from 'vue'

import { routeRecords } from './routes'
import { Home12Filled, Home12Regular, AlignBottom16Filled, AlignBottom16Regular, ChartMultiple24Filled, ChartMultiple24Regular, Image16Filled, Image16Regular, Code16Filled, Code16Regular, Wallet24Filled, Wallet24Regular, ArrowTrendingLines24Regular, TextBulletListTree20Filled } from '@vicons/fluent'

import DeFiSvg from './assets/icons/defi.svg'
import DeFiSelectedSvg from './assets/icons/defiSelected.svg'
import AcademySvg from './assets/icons/academy.svg'
import EthPng from './assets/icons/eth.png'

import BitcoinIcon from './components/bitcoinIcon.vue'

import { NNotificationProvider } from 'naive-ui'

// 控制侧边导航栏折叠
const showNav = ref(false)

console.log(import.meta.env)

</script>

<style scoped>
#blockchainLogo {
    mask-image: url(./assets/blockchain.logo.svg);
    -webkit-mask-image: url(./assets/blockchain.logo.svg);
    mask-position: center center;
    -webkit-mask-position: center center;
    mask-size: contain;
    -webkit-mask-size: contain;
}

.route-row {
    @apply flex gap-5 rounded-lg text-dark-600 px-4 py-2 font-bold text-sm items-end;
}

.active-route.route-row,
.route-row:hover {
    @apply bg-gray-100;
}

.route-row>.active-icon,
.route-row>.icon,
.route-row>.inactive-icon {
    @apply w-6 h-6 text-gray-800;
}

.route-row>.inactive-icon,
.route-row.active-route>.active-icon {
    display: block;
}

.route-row.active-route>.inactive-icon,
.route-row>.active-icon {
    display: none;
}
</style>
