function traverse(array){
    array.map(item=>{
    	item.component = require('../views/' + item.component).default
        if(item.children.length) traverse(item.children)
    })
}

traverse(Object.values(window.data.pages));

export default window.data.pages