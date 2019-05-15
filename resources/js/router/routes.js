import Users from '../components/UsersComponent';
import Overview from '../components/Overview';
import DeltaReport from '../components/DeltaReport';
import Scripts from '../components/Scripts';
import Log from '../components/Log';

export default [
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
];