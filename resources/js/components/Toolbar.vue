<template>
	<v-toolbar flat class="transparent" style="background-image:url('/images/victus.png');background-position: center right;background-size: contain;">
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img alt="alt" src="https://randomuser.me/api/portraits/men/86.jpg">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>{{user.username}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
</template>

<script>
	export default {
		data: () => ({
            user: {}
        }),

		created(){
			this.user = this.$store.getters['user/getUser']
		}
	}
</script>