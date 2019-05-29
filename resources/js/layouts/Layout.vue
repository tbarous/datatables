<template>
    <v-app id="inspire">
        <Drawer></Drawer>
        <Navbar></Navbar>
        <Content></Content>
        <notifications animation-name="fade" position="bottom right" />
        <loading :active.sync="loading" :is-full-page="true"></loading>
        <to-top></to-top>
    </v-app>
</template>

<script>
    import Drawer from './../components/Navigation/Drawer'
    import Navbar from './../components/Navigation/Navbar'
    import Content from './../components/Content'
    import ToTop from './../components/UI/ToTop'

    export default {
        components: {
            Drawer,
            Navbar,
            Content,
            ToTop
        },

        computed: {
            loading() {
                return this.$store.getters['loading/getLoading']
            },
        }
    }
</script>