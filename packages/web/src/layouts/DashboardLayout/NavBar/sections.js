import {
  BarChart as BarChartIcon,
  Clock as ClockIcon,
  DollarSign as DollarSignIcon,
  FileText as FileTextIcon,
  List as ListIcon,
  PieChart as PieChartIcon,
} from 'react-feather'

const sections = [
  {
    subheader: 'reports',
    items: [
      {
        title: 'Browser',
        exact: false,
        private: 4,
        icon: ListIcon,
        href: '/app/reports/browser',
      },
      {
        title: 'closing_day',
        exact: false,
        icon: DollarSignIcon,
        href: '/app/reports/closing-day',
      },
      {
        title: 'running_tables',
        exact: false,
        icon: ClockIcon,
        href: '/app/reports/running-tables',
      },
      {
        title: 'closed_tables',
        exact: false,
        icon: FileTextIcon,
        href: '/app/reports/closed-tables',
      },
      {
        title: 'Dashboard',
        icon: PieChartIcon,
        href: '/app/reports/dashboard',
      },
      {
        title: 'Dashboard Alternative',
        icon: BarChartIcon,
        href: '/app/reports/dashboard-alternative',
      },
    ],
  },
]

export default sections
