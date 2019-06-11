let traverse = (array) => {
    array.forEach(item => {
    	item.component = require('../views/' + item.component).default
        if(item.children.length) traverse(item.children)
    })
}

traverse(Object.values(window.data.menu))

export default window.data.menu