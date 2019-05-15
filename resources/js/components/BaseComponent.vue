<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" fixed app>

            <v-toolbar flat class="transparent">
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img alt="alt" src="https://randomuser.me/api/portraits/men/85.jpg">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>John Leider</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-list dense>
                <v-divider class="mt-0"></v-divider>
                <v-list-tile :to="page.slug" v-for="(page, index) in pages" :key="index">
                    <v-list-tile-action>
                        <v-icon>{{page.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{page.title}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar color="indigo" dark fixed app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>EETT Halted Cell Status Handler</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn icon @click="logout">
                <v-icon>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>

        <v-content>
            <h3 class="mt-5 ml-5">{{$route.name}}</h3>
            <hr>
            <v-container fluid>
                <v-layout justify-center align-center>
                    <v-flex text-xs-center>
                        <router-view></router-view>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>

        <v-footer color="indigo" app>
            <span class="white--text">&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
    import pages from '../core/pages';

    export default {
        data: () => ({
            drawer: null,
            pages: pages
        }),

        props: {
            source: String
        },

        methods: {
            logout() {
                axios.post('/logout')
                    .then(response => {
                        console.log(response);
                        window.location.href = '/';
                    })
                    .catch(e => {
                        console.log(e.response.data)
                    })
            },
        }
    }
</script>