<template>
	<v-btn @click="close" class="close-window" flat icon>
        <v-icon small>fa fa-times</v-icon>
    </v-btn>
</template>

<script>
	export default{
		methods: {
			close() {
				this.$store.commit('ui/closeDialog')
			}
		}
	}
</script>