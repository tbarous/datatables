<template>
	<div>
		<v-list-group no-action sub-group :value="false" v-for="page in pages" :key="page.title" v-if="page.children">
	      <template v-slot:activator>
	        <v-list-tile>
	          <v-list-tile-title>{{page.title}}</v-list-tile-title>
	        </v-list-tile>
	      </template>

	      <v-divider class="mt-0 mb-0"></v-divider>

	      <Subgroup :pages="page.children"></Subgroup>
	    </v-list-group>

	    <v-list-tile
	        v-for="(page, i) in pages"
	        :key="i"
	        :to="page.slug"
	         v-if="!page.children"
	      >
	        <v-list-tile-title v-text="page.title"></v-list-tile-title>
	        <v-list-tile-action>
	          <v-icon v-text="page.icon"></v-icon>
	        </v-list-tile-action>
	     </v-list-tile>
    </div>
</template>

<script>
	import Subgroup from './Subgroup'

	export default {
		name: 'Subgroup',
		components: {
			Subgroup
		},
		props: ['pages']
	}
</script>