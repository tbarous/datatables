<template>
	<div>
		<div 
			style="margin-top:20px;" 
			v-for="(page, index1) in pages" 
			:key="page.id">
			
			<span>{{index1+1}}) </span>
			<v-text-field style="display: inline-block;" solo :value="page.name"></v-text-field>
			<v-icon @click="page.showChildren=!page.showChildren;refresh();" v-if="page.children.length">fa fa-chevron-down</v-icon>
			
			<div v-if="page.children.length">
				<Page :page="page" :show="page.showChildren"></Page>
			</div>
		</div>
	</div>
</template>

<script>
	import Page from './../components/Pages/Page'

	export default {
		components: {
			Page
		},
		computed: {
			pages: {
				get(){
					return this.$store.getters['pages/GET_PAGES']
				},
				set(pages){
					this.$store.commit('pages/SET_DATA', pages)
				}				
			}
		},

		created(){
			this.pages.forEach(item => {
				item.showChildren = false
				item.children.forEach(item2 => {
					item2.showChildren = false
					item2.children.forEach(item3 => {
						item3.showChildren = false
					})
				})
			})
			console.log(this.pages)
		},

		methods: {
			refresh(){
				this.$store.commit('pages/REFRESH')
			},
		}
	}
</script>