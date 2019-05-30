// import _ from 'lodash'
console.log(window.pages)
// function recursiveIteration(object) {
//     for (var property in object) {
//         if (object.hasOwnProperty(property)) {
//             let path = './../views/' + object.title + '/'
//             console.log(object)
//             if (typeof object[property] == "object"){
//                 object[property]['component'] = path + object[property].component
//                 recursiveIteration(object[property]);
//             } else {
//                 //found a property which is not an object, check for your conditions here
//             }
//         }
//     }
//     return object
// }

// let obj = recursiveIteration(window.data.pages)

// console.log(obj)

export default window.pages