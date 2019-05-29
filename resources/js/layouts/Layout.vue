<template>
    <v-app id="inspire">
        <drawer :drawer="drawer" :pages="pages"></drawer>

        <v-toolbar dark fixed app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>EETT Halted Cell Status Handler</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn icon @click="logout">
                <v-icon>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>

        <v-content>
            <v-container fluid pt-0>
                <h3>{{$route.name}}</h3>
                <v-divider color="white"></v-divider>
                <v-layout>
                    <v-flex>
                        <transition name="fade">
                            <router-view></router-view>
                        </transition>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        
        <notifications animation-name="fade" position="bottom right" />

        <loading :active.sync="isLoading" :is-full-page="true"></loading>

        <v-btn 
            v-if="showToTop" 
            small 
            fab 
            dark 
            @click="toTop" 
            color="grey" 
            style="position: fixed;bottom:10px;right:10px;"
        >
            <v-icon small>fa fa-chevron-up</v-icon>
        </v-btn>
    </v-app>
</template>

<script>
    import Page from './../components/Page'
    import Drawer from './../components/Drawer'

    export default {
        components: {
            Page,
            Drawer
        },

        data: () => ({
            drawer: true,
            pages: data.pages,
            showToTop: false
        }),

        props: {
            source: String
        },

        created(){
            this.$store.dispatch('user/setUser', data.user)
        },

        mounted(){
            $(document).on( 'scroll', () => {
                var scroll = $(window).scrollTop();
                if(scroll > 500) {
                    this.showToTop = true
                } else {
                    this.showToTop = false
                }
            });
        },

        computed: {
          currentUser() {
            return this.$store.getters['user/getUser']
          },
          isLoading() {
            return this.$store.getters['loading/getLoading']
          }
        },

        methods: {
            toTop() {
                $("html, body").animate({ scrollTop: 0 }, "slow");
            },

            logout() {
                axios.post('/logout').then(response => {
                    window.location.href = '/';
                }).catch(e => {
                    console.log(e.response.data)
                })
            },
        }
    }
</script>