function traverse(array){
    array.map(item=>{
    	// import a from '../views/' + item.component
    	item.component = require('../views/' + item.component)

        if(item.children.length){
            traverse(item.children)
        }
    })
}

traverse(Object.values(window.data.pages));

console.log(window.data.pages)

export default window.data.pages