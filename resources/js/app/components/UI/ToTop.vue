<template>
	<v-btn class="to-top" v-if="top" @click="toTop" small fab dark color="grey">
        <v-icon small>fa fa-chevron-up</v-icon>
    </v-btn>
</template>

<script>
	export default {
		computed: {
            top() {
                return this.$store.getters['ui/GET_TOP']
            }
        },

        methods: {
            toTop(){
                this.$store.commit('ui/TO_TOP')
            }
        }
	}
</script>