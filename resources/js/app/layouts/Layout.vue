<template>
    <v-app id="inspire">
        <drawer></drawer>
        <Navbar></Navbar>
        <basic-content></basic-content>
        <notifications animation-name="fade" position="bottom right"></notifications>
        <loading :active.sync="loading" :is-full-page="true"></loading>
        <to-top></to-top>
    </v-app>
</template>

<script>
    import Loading from 'vue-loading-overlay'
    import Drawer from './../components/Navigation/Drawer'
    import Navbar from './../components/Navigation/Navbar'
    import BasicContent from './../components/Contents/BasicContent'
    import ToTop from './../components/UI/ToTop'
    import { mapGetters } from 'vuex'

    export default {
        components: {
            Drawer,
            Navbar,
            BasicContent,
            ToTop,
            Loading
        },
        computed: {
            ...mapGetters("ui", {
                loading: 'GET_LOADING',
            })
        }
    }
</script>