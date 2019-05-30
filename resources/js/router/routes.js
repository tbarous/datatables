import _ from 'lodash'

function traverse(array){
    array.map(item=>{
    	console.log('./../views/' + item.component + '.vue')
        item.component = () => import('../views/' + item.component + '.vue')

        if(item.children.length){
            traverse(item.children)
        }
    })
}

traverse(Object.values(window.data.pages));

console.log(window.data.pages)

export default Object.values(window.data.pages)