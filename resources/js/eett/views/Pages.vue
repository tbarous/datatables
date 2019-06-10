<template>
	<div>
		<v-treeview :items="pages"></v-treeview>
	</div>
</template>

<script>
	export default {
		computed: {
			pages: {
				get(){
					return this.$store.getters['pages/GET_PAGES']
				},
				set(pages){
					this.$store.commit('pages/SET_DATA', pages)
				}				
			}
		}
	}
</script>