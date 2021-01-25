import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import Page from 'src/components/Page'
import DivContentWrapper from 'src/components/DivContentWrapper'
import { StandardBreadcrumb } from 'src/components/StandardBreadcrumb'
import { FormattedMessage, useIntl } from 'react-intl'
import StandardHeader from 'src/components/StandardHeader'
import { messages } from 'src/translations/messages'
import { Form, Formik } from 'formik'
import BookingForm from './BookingForm'
import PerfectScrollbar from 'react-perfect-scrollbar'

const useStyles = makeStyles(theme => ({
  page: {
    maxWidth: theme.breakpoints.values['md'],
  },
  paper: {
    height: '100%',
    overflow: 'none',
    maxWidth: theme.breakpoints.values['md'] - theme.spacing(3),
  },
}))

const NewBooking = () => {
  const classes = useStyles()
  const intl = useIntl()
  return (
    <Page
      title={intl.formatMessage(messages['menu_new_booking'])}
    >
      
      <Formik
        initialValues={
          {
            cityCollationPoint: '',
            currencyGoods: 'EUR',
            goodsValue: '',
            insuranceType: '',
            moreGoodsDetails: '',
            numberContainers: '',
            recipient: 'To the orders as per Bill of Lading',
            reeferContainer: true,
            sender: 'MSC for whom it may concern',
            typeOfGoods: '',
            vesselName: '',
            weight: '',
          }
        }
        onSubmit={
          values => {
            console.log(values)
            return true
          }
        }
      >
        <>
          <div className={classes.page}>
            <StandardHeader
              breadcrumb={
                <StandardBreadcrumb
                  crumbs={[{ name: intl.formatMessage(messages['menu_new_booking']) }]}
                />
              }
              rightComponent={
                <Button color={'secondary'} type="submit" variant={'outlined'}>
                  <FormattedMessage
                    defaultMessage="Save"
                    id="common.save"
                  />
                </Button>
              }
            >
              <FormattedMessage defaultMessage="Create a New Booking" id="booking.new_booking.header_title"/>
            </StandardHeader>
          </div>
          <DivContentWrapper>
            <Form style={{ height: '100%' }}>
              <div className={classes.paper}>
                <PerfectScrollbar >
                  <BookingForm/>
                </PerfectScrollbar>
              </div>
            </Form>
          </DivContentWrapper>
        </>
      </Formik>
    </Page>
  )
}

export default NewBooking
