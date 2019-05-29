<template>
  <v-navigation-drawer fixed app v-model="drawer" dark width="280" stateless value="true">
  
    <Toolbar></Toolbar>
    <v-divider class="mt-0 mb-0"></v-divider>

    <v-list>
      <div v-for="page in pages" :key="page.title" v-if="!page.children">
        <v-list-tile :to="page.slug" >
          <v-list-tile-action>
            <v-icon>{{page.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{page.title}}</v-list-tile-title>
        </v-list-tile>
        <v-divider class="mt-0 mb-0"></v-divider>
      </div>
      
      <v-list-group :prepend-icon="page.icon" :value="false" v-for="page in pages" :key="page.title" v-if="page.children">
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>{{page.title}}</v-list-tile-title>
          </v-list-tile>
        </template>

        <Subgroup :pages="page.children"></Subgroup>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import Toolbar from './Toolbar'
  import Subgroup from './Subgroup'

  export default {
    props: ['pages', 'drawer'],

    components: {
      Subgroup,
      Toolbar
    }
  }
</script>