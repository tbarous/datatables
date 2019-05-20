import UsersComponent from '../components/UsersComponent';
import OverviewComponent from '../components/OverviewComponent';
import DeltaReportComponent from '../components/DeltaReportComponent';
import ScriptsComponent from '../components/ScriptsComponent';
import LogComponent from '../components/LogComponent';

export default [
    { 
        path: '/', 
        redirect: '/eett-overview' 
    },
    {
        path: '/users',
        component: UsersComponent,
        name: 'Users'
    },
    {
        path: '/eett-overview',
        component: OverviewComponent,
        name: 'EETT Overview'
    },
    {
        path: '/eett-delta-report',
        component: DeltaReportComponent,
        name: 'EETT Delta Report'
    },
    {
        path: '/eett-scripts',
        component: ScriptsComponent,
        name: 'EETT Scripts'
    },
    {
        path: '/log',
        component: LogComponent,
        name: 'Log'
    },
];
