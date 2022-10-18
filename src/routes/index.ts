import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeVue from '../views/home.vue'
import ComingSoonVue from '../views/comingSoon.vue'

export const routeRecords: Record<string, RouteRecordRaw> = {
    home: {
        path: "/",
        component: HomeVue,
        name: "Home",
    },
    prices: {
        path: "/prices",
        component: ComingSoonVue,
        name: "Prices"
    },
    charts: {
        path: "/charts",
        component: ComingSoonVue,
        name: "Charts"
    },
    nfts: {
        path: "/nfts",
        component: ComingSoonVue,
        name: 'NFTs'
    },
    deFi: {
        path: "/defi",
        component: ComingSoonVue,
        name: "DeFi"
    },
    academy: {
        path: "/academy",
        component: ComingSoonVue,
        name: 'Academy'
    },
    developers: {
        path: "/developers",
        component: ComingSoonVue,
        name: "Developers"
    },
    wallet: {
        path: "/wallet",
        component: ComingSoonVue,
        name: "Wallet"
    },
    exchange: {
        path: "/exchange",
        component: ComingSoonVue,
        name: "Exchange"
    },
    // second half
    bitcoin: {
        path: "/bitcoin",
        component: ComingSoonVue,
        name: "Bitcoin"
    },
    ethereum: {
        path: "/ethereum",
        component: ComingSoonVue,
        name: 'Ethereum'
    },
    bitcoinCash: {
        path: '/bitcoinCash',
        component: ComingSoonVue,
        name: "BitcoinCash"
    },
    btcTestnet: {
        path: "/btcTestnet",
        component: ComingSoonVue,
        name: 'BtcTestnet'
    },
    bchTestnet: {
        path: "/bchTestnet",
        component: ComingSoonVue,
        name: "BchTestnet"
    },
    // 用重定向处理404
    notFound: {
        path: '/:w+',
        name: 'notFound',
        redirect: "/"
    }
};

export const router = createRouter({
    history: createWebHashHistory(),
    routes: Object.values(routeRecords)
})