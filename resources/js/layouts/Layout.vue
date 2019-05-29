<template>
    <v-app id="inspire">
        <Drawer></Drawer>
        <Navbar></Navbar>
        <Content></Content>
        <notifications animation-name="fade" position="bottom right" />
        <loading :active.sync="loading" :is-full-page="true"></loading>
        <v-btn class="to-top" v-if="top" small fab dark @click="$store.dispatch('ui/toTop')" color="grey">
            <v-icon small>fa fa-chevron-up</v-icon>
        </v-btn>
    </v-app>
</template>

<script>
    import Drawer from './../components/Drawer'
    import Navbar from './../components/Navbar'
    import Content from './../components/Content'

    export default {
        components: {
            Drawer,
            Navbar,
            Content
        },

        computed: {
            loading() {
                return this.$store.getters['loading/getLoading']
            },
            top() {
                return this.$store.getters['ui/getTop']
            }
        }
    }
</script>