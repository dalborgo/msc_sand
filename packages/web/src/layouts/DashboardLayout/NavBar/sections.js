import {
  PieChart as PieChartIcon,
  FilePlus as FilePlusIcon,
} from 'react-feather'

const sections = [
  {
    subheader: 'home',
    items: [
      {
        title: 'Dashboard',
        icon: PieChartIcon,
        href: '/app/reports/dashboard',
      },
    ],
  },
  {
    subheader: 'booking',
    items: [
      {
        title: 'New Booking',
        icon: FilePlusIcon,
        href: '/app/booking/new-booking',
      },
    ],
  },
]

export default sections
