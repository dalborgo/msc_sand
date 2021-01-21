import React, { Fragment, lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import DashboardLayout from 'src/layouts/DashboardLayout'
import LoadingScreen from 'src/components/LoadingScreen'
import AuthGuard from 'src/components/AuthGuard'
import GuestGuard from 'src/components/GuestGuard'
import { isMenuLinkToShow } from './utils/logics'

export const renderRoutes = (routes = [], priority) => {
  return (
    <Suspense fallback={<LoadingScreen/>}>
      <Switch>
        {
          routes.reduce((acc, route, index) => {
            const Guard = route.guard || Fragment
            const Layout = route.layout || Fragment
            const Component = route.component
            if (isMenuLinkToShow(route, { priority })) {
              acc.push(
                <Route
                  exact={route.exact}
                  key={index}
                  path={route.path}
                  render={
                    props => (
                      <Guard>
                        <Layout>
                          {
                            route.routes
                              ? renderRoutes(route.routes, priority)
                              : <Component {...props} />
                          }
                        </Layout>
                      </Guard>
                    )
                  }
                />
              )
            }
            return acc
          }, [])
        }
      </Switch>
    </Suspense>
  )
}
/* eslint-disable react/display-name */
const routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/errors/Error404')),
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView')),
  },
  {
    exact: true,
    path: '/login-unprotected',
    component: lazy(() => import('src/views/auth/LoginView')),
  },
  {
    path: '/app',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        private: [4, 3],
        path: [
          '/app/reports/browser',
          '/app/reports/browser/:docId',
        ],
        component: lazy(() => import('src/views/reports/Browser')),
      },
      {
        exact: true,
        path: [
          '/app/reports/closing-day',
          '/app/reports/closing-day/:docId',
        ],
        component: lazy(() => import('src/views/reports/ClosingDay')),
      },
      {
        exact: true,
        path: [
          '/app/reports/running-tables',
          '/app/reports/running-tables/:docId',
        ],
        component: lazy(() => import('src/views/reports/RunningTables')),
      },
      {
        exact: true,
        path: [
          '/app/reports/closed-tables',
          '/app/reports/closed-tables/:docId',
          '/app/reports/closed-tables/change-payment-method/:targetDocId',
        ],
        component: lazy(() => import('src/views/reports/ClosedTables')),
      },
      {
        exact: true,
        path: '/app/reports/dashboard',
        component: lazy(() => import('src/views/reports/DashboardView')),
      },
      {
        exact: true,
        path: '/app/booking/new-booking',
        component: lazy(() => import('src/views/booking/NewBooking')),
      },
      {
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/reports/dashboard"/>,
      },
      {
        component: () => <Redirect to="/404"/>,
      },
    ],
  },
  {
    path: '*',
    routes: [
      {
        exact: true,
        guard: GuestGuard,
        path: '/',
        component: lazy(() => import('src/views/auth/LoginView')),
      },
      {
        component: () => <Redirect to="/404"/>,
      },
    ],
  },
]
/* eslint-enable react/display-name */

export default routes
