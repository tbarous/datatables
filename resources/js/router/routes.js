import Users from '../views/Users'
import Overview from '../views/Overview'
import DeltaReport from '../views/DeltaReport'
import Scripts from '../views/Scripts'
import Log from '../views/Log'
import Documentation from '../views/Documentation'
import Info from '../views/Info'

import store from './../store'
import _ from 'lodash'

window.a = []

function getPages(pages){
    Object.values(pages).map(item=>{
        if(item.slug){
            console.log('./../views/' + _.startCase(item.slug))
            window.a.push({
                path: '/' + item.slug,
                component: () => import('./../views/' + _.startCase(item.slug)),
                name: _.startCase(item.slug)
            })
        }

        if(item.children){
            getPages(item.children)
        } else {
            return false
        }
    })
}

getPages(data.pages)

console.log(window.a)

export default window.a

// export default [
//     {
//         path: '/',
//         redirect: '/eett-overview'
//     },
//     {
//         path: '/users',
//         component: () => import('./../views/Users')
//     },
//     {
//         path: '/eett-overview',
//         component: Overview,
//         name: 'EETT Overview'
//     },
//     {
//         path: '/eett-delta-report',
//         component: DeltaReport,
//         name: 'EETT Delta Report'
//     },
//     {
//         path: '/eett-scripts',
//         component: Scripts,
//         name: 'EETT Scripts'
//     },
//     {
//         path: '/log',
//         component: Log,
//         name: 'Log'
//     },
//     {
//         path: '/documentation',
//         component: Documentation,
//         name: 'Documentation'
//     },
//     {
//         path: '/info',
//         component: Info,
//         name: 'Information'
//     }
// ]
