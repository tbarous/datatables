<template>
    <v-app id="inspire">
        <v-navigation-drawer temporary v-model="drawer" fixed app dark width="280">
            <v-toolbar flat class="transparent">
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <!-- <v-list-tile-avatar>
                            <img alt="alt" src="https://randomuser.me/api/portraits/men/86.jpg">
                        </v-list-tile-avatar> -->

                        <v-list-tile-content>
                            <v-list-tile-title>{{currentUser.username}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            
            <v-list dense>
                <v-divider class="mt-0 mb-0"></v-divider>

                <div v-for="page in pages" v-if="page.length>=2" :key="page.title">
                    <v-list-group prepend-icon="fas fa-tools" :value="false" dark >
                        <template v-slot:activator>
                            <v-list-tile>
                                <v-list-tile-title>{{page[0].title}}</v-list-tile-title>
                            </v-list-tile>
                        </template>
                        <v-list-tile :to="p.slug" v-for="(p, index) in page.slice(1)" :key="index">
                            <v-list-tile-action>
                                <v-icon v-text="p.icon"></v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="p.title"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                    <v-divider class="mt-0 mb-0"></v-divider>
                </div>
                
                <div v-for="page in pages" v-if="page.length==1" :key="page.title">
                    <v-list-tile :to="page[0].slug" > 
                        <v-list-tile-action>
                            <v-icon>{{page[0].icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{page[0].title}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider class="mt-0 mb-0"></v-divider>
                </div>
            </v-list>
        </v-navigation-drawer>

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
        
        <notifications 
            animation-name="fade" 
            position="bottom right" 
        />

        <loading 
            :active.sync="isLoading" 
            :is-full-page="true">
        </loading>

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
    export default {
        data: () => ({
            drawer: null,
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