<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" fixed app dark width="280">
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
                <v-list-group prepend-icon="fas fa-tools" :value="false" dark>
                    <template v-slot:activator>
                        <v-list-tile>
                            <v-list-tile-title>Tools</v-list-tile-title>
                        </v-list-tile>
                    </template>
                    <v-list-tile :to="page.slug" v-for="(page, index) in pages.tools" :key="index">
                        <v-list-tile-action>
                            <v-icon v-text="page.icon"></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title v-text="page.title"></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list-group>

                <v-divider class="mt-0 mb-0"></v-divider>

                <v-list-tile to="/documentation"> 
                    <v-list-tile-action>
                        <v-icon>fa-file</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Documentation</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
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

        <v-content style="padding-bottom: 50px;">
            <h3 class="mt-4 ml-3">{{$route.name}}</h3>
            <hr>
            <v-container fluid pt-0>
                <v-layout>
                    <v-flex>
                        <transition name="fade">
                            <router-view></router-view>
                        </transition>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        
        <notifications animation-name="fadeIn" group="foo" position="bottom right" />
        <loading :active.sync="isLoading" :is-full-page="true"></loading>
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            drawer: null,
            pages: data.pages
        }),

        props: {
            source: String
        },

        created(){
            this.$store.dispatch('user/setUser', data.user)
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