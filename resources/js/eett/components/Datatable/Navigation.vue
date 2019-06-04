<template>
	<nav v-if="pagination && tableData.length > 0" class="text-center ml-auto mr-auto d-flex align-center justify-content-center">
        <ul class="pagination justify-content-center m-0">
            <li v-for="i in 2">
                <v-btn :disabled="firstDisabled(i)" dark fab small class="page-link d-flex" href="#" @click.prevent="switchPage(i)">
                    <v-icon>{{icon(i)}}</v-icon>
                </v-btn>
            </li>

            <li v-for="page in pagesNumber" class="page-item" :class="{'active': page == currentPage}">
                <!-- :class="{'active': page == pagination.meta.current_page}" -->
                <v-btn fab small href="javascript:void(0)" @click.prevent="changePage(page)" class="page-link d-flex">
                    {{ page }}
                </v-btn>
            </li>

            <li :class="{'disabled': currentPage === pagination.meta.last_page }">
                <v-btn :disabled="currentPage === pagination.meta.last_page"
                    dark fab small class="page-link d-flex" href="#" 
                    @click.prevent="changePage(currentPage + 1)">
                    <v-icon>chevron_right</v-icon>
                </v-btn>
            </li>

            <li :class="{'disabled': currentPage === pagination.meta.last_page }">
                <v-btn :disabled="currentPage === pagination.meta.last_page"
                    dark fab small class="page-link d-flex" 
                    href="#" @click.prevent="changePage(pagination.meta.last_page)">
                    <v-icon>fast_forward</v-icon>
                </v-btn>
            </li>
        </ul>
    </nav>
</template>

<script>
    import { mapGetters } from 'vuex'
    
	export default {
        computed: {
            ...mapGetters("datatable", {
                currentPage: 'GET_CURRENT_PAGE',
                pagesNumber: 'GET_PAGES_NUMBER',
                pagination: 'GET_PAGINATION',
                tableData: 'GET_TABLE_DATA'
            })
        },
		methods: {
            firstDisabled(index) {
                if(this.currentPage === 1 && index >= 1 && index<=2){
                    return true
                }
            },

            icon(index){
                if(index==1) return 'fast_rewind'
                if(index==2) return 'chevron_left'
            },

            switchPage(index) {
                if(index == 1){
                     this.$store.dispatch('datatable/CHANGE_PAGE', 1)
                }

                if(index==2){
                     this.$store.dispatch('datatable/CHANGE_PAGE', this.currentPage-1)
                }
            },
            changePage(page){
                this.$store.dispatch('datatable/CHANGE_PAGE', page)
            }
        }
	}
</script>