<template>
	<div>
		<div style="margin-top:20px;" v-for="(page, index1) in pages" :key="page.id">
			<span>{{index1+1}}) </span>
			<v-text-field style="display: inline-block;" solo :value="page.name"></v-text-field>
			<v-icon @click="make(index1)" v-if="page.children.length">fa fa-chevron-down</v-icon>

			<div v-if="page.showChildren" style="margin-left: 50px;margin-top:20px;" v-for="(child, index2) in page.children" :key="child.id">
				<span>{{index2+1}}) </span>
				<v-text-field style="display: inline-block;" solo :value="child.name"></v-text-field>
				<v-icon @click="child.showChildren=true"" v-if="child.children.length">fa fa-chevron-down</v-icon>

				<p v-if="child.showChildren" style="margin-left: 50px;margin-top:20px;" v-for="(grandchild, index3) in child.children" :key="grandchild.id">
					<span>{{index3+1}}) </span>
					<v-text-field style="display: inline-block;" solo :value="grandchild.name"></v-text-field>
					<v-icon v-if="grandchild.children.length">fa fa-chevron-down</v-icon>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
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
		},

		created(){
			this.pages.forEach(item => {
				item.showChildren = false
			})
			console.log(this.pages)
		},

		methods: {
			make(index){
				this.pages[index].showChildren = !this.pages[index].showChildren
				// console.log(this.pages[index].showChildren)
				let temp = []

				temp = this.pages.slice(0);

				this.pages = []

				this.pages = temp.slice(0);
			}
		}
	}
</script>