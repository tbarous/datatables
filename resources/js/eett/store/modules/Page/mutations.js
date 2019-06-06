export default {
    SET_DATA: (state, pages) => state.pages = pages,
    REFRESH: (state, page) => {

    	console.log(JSON.stringify(state.pages))

    	console.log(JSON.stringify(state.pages).search('"id":'+page.id))

    	var string = JSON.stringify(state.pages),
		  preString = '"id":6',
		  searchString = '"showChildren":false',
		  preIndex = string.indexOf(preString),
		  searchIndex = preIndex + string.substring(preIndex).indexOf(searchString);

		  // console.log(JSON.stringify(state.pages).slice(searchIndex, searchIndex+20))
		  console.log(string.substring(preIndex).indexOf(searchString))
		  // let part1 = JSON.stringify(state.pages).slice(searchIndex)
		let pages = JSON.stringify(state.pages)
		let s = pages.substr(0, searchIndex) + '"showChildren":true' + pages.substr(searchIndex + 20);
    	console.log(s)

    	state.pages = []
    	state.pages = JSON.parse(s)

    	console.log(JSON.stringify(state.pages).slice(searchIndex, searchIndex+20))

    	console.log(state.pages)
    }
}
