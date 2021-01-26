import React from 'react'
import Page from 'src/components/Page'
import { Box, makeStyles } from '@material-ui/core'
import { FormattedMessage, useIntl } from 'react-intl'
import { messages } from 'src/translations/messages'
import StandardHeader from 'src/components/StandardHeader'
import { useQuery } from 'react-query'
import Paper from '@material-ui/core/Paper'
import { useSnackQueryError } from 'src/utils/reactQueryFunctions'
import { getEffectiveFetching } from 'src/utils/logics'
import { StandardBreadcrumb } from 'src/components/StandardBreadcrumb'
import IconButtonLoader from 'src/components/IconButtonLoader'
import TableList from './TableList'
import useCertificateStore from 'src/zustandStore/useCertificateStore'
import shallow from 'zustand/shallow'

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(0, 3),
  },
  container: {
    padding: 0,
    [theme.breakpoints.down('sm')]: { //mobile
      padding: theme.spacing(0, 2),
    },
  },
}))

const certificateSelector = state => ({
  certificateRows: state.certificateRows,
  setCertificateRows: state.setCertificateRows,
})

const CertificateList = () => {
  const classes = useStyles()
  const snackQueryError = useSnackQueryError()
  const intl = useIntl()
  const { certificateRows, setCertificateRows } = useCertificateStore(certificateSelector, shallow)
  const { isIdle, refetch, ...rest } = useQuery('certificates/list', {
    refetchOnMount: false,
    onError: snackQueryError,
    onSettled: data => {
      console.log('data list:', data)
      if (data?.ok) {
        setCertificateRows(data.results)
      }
    },
  })
  const effectiveFetching = getEffectiveFetching(rest)
  return (
    <Page
      title={intl.formatMessage(messages['menu_certificate_list'])}
    >
      <div className={classes.container}>
        <StandardHeader
          breadcrumb={
            <StandardBreadcrumb
              crumbs={[{ name: intl.formatMessage(messages['sub_bookings']) }, { to: '/app/booking/new-booking', name: intl.formatMessage(messages['menu_new_booking']) }]}
            />
          }
          rightComponent={
            <Box alignItems="center" display="flex">
              <Box>
                <IconButtonLoader
                  isFetching={effectiveFetching}
                  onClick={refetch}
                />
              </Box>
            </Box>
          }
        >
          <FormattedMessage defaultMessage="Retrieve Certificate" id="certificates.list.header_title"/>
        </StandardHeader>
      </div>
      <Box alignItems="center" display="flex" p={2} pt={0}/>
      <Paper className={classes.paper}>
        <TableList isFetching={effectiveFetching && !certificateRows.length} isIdle={isIdle} rows={certificateRows}/>
      </Paper>
    </Page>
  )
}

export default CertificateList
