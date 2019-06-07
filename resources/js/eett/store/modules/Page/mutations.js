export default {
    SET_DATA: (state, pages) => state.pages = pages,
    REFRESH: (state, page) => {
    	let pages = JSON.stringify(state.pages)
		var id = '"id":6'
		var searchString = '"showChildren":false'
		var index = pages.indexOf(id)
		console.log(index)
		// var searchIndex = preIndex + pages.substring(preIndex).indexOf(searchString);

		var sub = pages.substr(index-100)
		console.log(sub)
		var foundstringIndex = sub.indexOf(searchString)
		console.log(foundstringIndex)
		// console.log(index+foundstringIndex)
		// var tochange = pages.substr(foundstringIndex, 20)
		// console.log(pages.slice(0, 1777))

		var final = pages.slice(0, index + foundstringIndex) + '"showChildren":true' + pages.slice(index+foundstringIndex + 20)
		// console.log(final)



		  // console.log(JSON.stringify(state.pages).slice(searchIndex, searchIndex+20))
		  // console.log(string.substring(preIndex).indexOf(searchString))
		  // let part1 = JSON.stringify(state.pages).slice(searchIndex)
		
		// let s = pages.substr(0, searchIndex) + '"showChildren":true' + pages.substr(searchIndex + 20);
    	// console.log(s)

    	state.pages = []
    	state.pages = JSON.parse(final)

    	// console.log(JSON.stringify(state.pages).slice(searchIndex, searchIndex+20))

    	console.log(state.pages)
    }
}
