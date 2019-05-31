<template>
    <v-layout>
        <v-flex xs2>
            <v-btn @click="fetchData">
                Reload <v-icon small>fas fa-sync</v-icon>
            </v-btn>
        </v-flex>

        <v-flex xs2>
            <v-btn @click="clearFilters">
                Clear <v-icon small>fas fa-eraser</v-icon>
            </v-btn>
        </v-flex>

        <v-flex xs2>
            <v-btn @click="openView">
                Columns <v-icon small>fas fa-columns</v-icon>
            </v-btn>
        </v-flex>

        <v-flex xs2>
            <v-btn :disabled="selected.length<2" @click="openUpdate">
                Update <v-icon small>fas fa-edit</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
    import { mapMutations } from 'vuex'
    import { mapActions } from 'vuex'

	export default{
		computed: {
            selected() {
                return this.$store.getters['datatable/getSelected']
            }
        },
        methods: {
            ...mapMutations('ui', {
              openUpdate: 'openUpdateDialog',
              openView: 'openViewDialog'
            }),
            ...mapMutations('datatable', {
              clearFilters: 'clearFilters',
            }),
            ...mapActions('datatable', {
              fetchData: 'fetchData'
            })
        }
	}
</script>