<template>
	<div>
		<div style="margin-top:20px;" v-for="(page, index) in pages" :key="page.id">
			<span>{{index+1}}) </span>
			<v-text-field style="display: inline-block;" solo :value="page.name"></v-text-field>
			
			<v-btn color="success" @click="refresh(page);" v-if="page.children.length">
				<v-icon>fa fa-chevron-down</v-icon>
			</v-btn>
			
			<!-- @click.stop.prevent.capture.self.once.passive -->
			<div v-if="page.children.length">
				{{page.showChildren}}
				<Page v-if="page.showChildren" :show="page.showChildren" style="margin-left:40px;" :pages="page.children"></Page>
			</div>
		</div>
	</div>
</template>

<script>
	import Page from './Page'
	export default {
		name: 'Page',
		props: ['pages'],
		methods: {
			refresh(page){
				this.$store.commit('pages/REFRESH', page)
			}
		},
	}
</script>