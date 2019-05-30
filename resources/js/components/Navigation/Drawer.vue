<template>
  <v-navigation-drawer fixed app :value="drawer" dark width="230" stateless>
  
    <Toolbar></Toolbar>
    <v-divider class="mt-0 mb-0"></v-divider>

    <v-list>
      <div v-for="page in pages" :key="page.title" v-if="page.children.length">
        <v-list-group :prepend-icon="page.icon" :value="false" >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>{{page.name}}</v-list-tile-title>
          </v-list-tile>
        </template>

        <Subgroup :pages="page.children"></Subgroup>
      </v-list-group>
        <v-divider class="mt-0 mb-0"></v-divider>
      </div>
      

      <div v-for="page in pages" :key="page.name" v-if="!page.children.length">
        <v-list-tile :to="page.slug" >
          <v-list-tile-action>
            <v-icon>{{page.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{page.name}}</v-list-tile-title>
        </v-list-tile>
        <v-divider class="mt-0 mb-0"></v-divider>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import Toolbar from './Toolbar'
  import Subgroup from './Subgroup'

  export default {
    computed: {
      pages (){
        return this.$store.getters['pages/getPages']
      },
      drawer(){
        return this.$store.getters['ui/getDrawer']
      }
    },

    components: {
      Subgroup,
      Toolbar
    }
  }
</script>