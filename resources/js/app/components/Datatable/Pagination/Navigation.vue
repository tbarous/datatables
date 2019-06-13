<template>
	<nav class="pagination-nav">
        <ul class="pagination">
            <li v-for="i in [0,1]">
                <v-btn :disabled="disabled(i)" dark fab small class="page-link d-flex" href="#" 
                @click.prevent="switchPage(i)">
                    <v-icon>{{icon(i)}}</v-icon>
                </v-btn>
            </li>
            <li 
                v-for="page in pagesNumber" 
                class="page-item" 
                :class="{'active': page == currentPage}">
                <v-btn fab small href="javascript:void(0)" @click.prevent="changePage(page)" class="page-link d-flex">
                    {{ page }}
                </v-btn>
            </li>
            <li v-for="i in [2,3]">
                <v-btn :disabled="disabled(i)" dark fab small class="page-link d-flex" href="#" 
                @click.prevent="switchPage(i)">
                    <v-icon>{{icon(i)}}</v-icon>
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
                data: 'GET_TABLE_DATA'
            })
        },
		methods: {
            disabled(index) {
                if(this.currentPage === 1 && index <= 1) return true
                if(this.currentPage === this.pagination.meta.last_page && index >=1 && index <=3) return true
            },
            icon(index){
                return ['fast_rewind', 'chevron_left', 'chevron_right', 'fast_forward'][index]
            },
            switchPage(index) {
                const arr = [1, this.currentPage-1, this.currentPage+1, this.pagination.meta.last_page]
                this.$store.dispatch('datatable/CHANGE_PAGE', arr[index])
            },
            changePage(page){
                alert(page)
                this.$store.dispatch('datatable/CHANGE_PAGE', page)
            }
        }
	}
</script>