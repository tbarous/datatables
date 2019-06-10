<template>
    <v-navigation-drawer fixed app :value="drawer" dark width="270" stateless>
        <Toolbar></Toolbar>
        <v-list class="p-0">
            <div v-for="page in pages" :key="page.id" v-if="page.children.length">
                <v-list-group :prepend-icon="page.icon" :value="false">
                    <template v-slot:activator>
                        <v-list-tile>
                            <v-list-tile-title>{{page.name}}</v-list-tile-title>
                        </v-list-tile>
                    </template>
                    <Subgroup :pages="page.children"></Subgroup>
                </v-list-group>
            </div>

            <div v-for="page in pages" :key="page.name" v-if="!page.children.length">
                <v-list-tile :to="page.slug">
                    <v-list-tile-action>
                        <v-icon>{{page.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>{{page.name}}</v-list-tile-title>
                </v-list-tile>
            </div>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import Toolbar from './Toolbar'
import Subgroup from './Subgroup'
import { mapGetters } from 'vuex'

export default {
    computed: {
      ...mapGetters("pages", {
        pages: 'GET_PAGES',
      }),
      ...mapGetters("ui", {
        drawer: 'GET_DRAWER',
      })
    },
    components: { Subgroup, Toolbar }
}
</script>
