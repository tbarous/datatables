import Users from '../views/Users'
import Overview from '../views/Overview'
import DeltaReport from '../views/DeltaReport'
import Scripts from '../views/Scripts'
import Log from '../views/Log'
import Documentation from '../views/Documentation'
import Info from '../views/Info'

export default [
    {
        path: '/',
        redirect: '/eett-overview'
    },
    {
        path: '/users',
        component: Users,
        name: 'Users'
    },
    {
        path: '/eett-overview',
        component: Overview,
        name: 'EETT Overview'
    },
    {
        path: '/eett-delta-report',
        component: DeltaReport,
        name: 'EETT Delta Report'
    },
    {
        path: '/eett-scripts',
        component: Scripts,
        name: 'EETT Scripts'
    },
    {
        path: '/log',
        component: Log,
        name: 'Log'
    },
    {
        path: '/documentation',
        component: Documentation,
        name: 'Documentation'
    },
    {
        path: '/info',
        component: Info,
        name: 'Information'
    }
]
