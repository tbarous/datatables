<template>
	<v-btn class="to-top" v-if="top" @click="$store.dispatch('ui/toTop')" small fab dark color="grey">
            <v-icon small>fa fa-chevron-up</v-icon>
        </v-btn>
</template>

<script>
	export default {
		computed: {
            top() {
                return this.$store.getters['ui/getTop']
            }
        }
	}
</script>