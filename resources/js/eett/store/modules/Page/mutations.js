export default {
    SET_DATA: (state, pages) => state.pages = pages,
    REFRESH: (state, page) => {
		// state.pages = traverse2(state.pages, page)
		// console.log(state.pages)
		// let temp = [...state.pages];
		// state.pages = temp
    }
}

function traverse2(array, page){
	// console.log(array)
 //    return array.map(item => {
 //        if(item.id == page.id){
 //        	console.log('found' + item.name + ' show children:' + item.showChildren)
 //        	item.showChildren = true
 //        	// return
 //        } 
 //        item.children = traverse2(item.children, page)
 //    })
}

