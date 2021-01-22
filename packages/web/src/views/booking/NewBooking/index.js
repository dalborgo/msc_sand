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

const useStyles = makeStyles(() => ({
  paper: {
    height: '100%',
    overflow: 'auto',
  },
}))

const NewBooking = () => {
  const classes = useStyles()
  const intl = useIntl()
  return (
    <Page
      title={intl.formatMessage(messages['menu_new_booking'])}
    >
      <StandardHeader
        breadcrumb={
          <StandardBreadcrumb
            crumbs={[{ name: intl.formatMessage(messages['menu_new_booking']) }]}
          />
        }
      >
        <FormattedMessage defaultMessage="Create a New Booking" id="booking.new_booking.header_title"/>
      </StandardHeader>
      <Formik
        initialValues={
          {
            currencyGoods: 'EUR',
            goodsValue: '',
            moreGoodsDetails: '',
            numberContainers: '',
            recipient: 'To the orders as per Bill of Lading',
            reeferContainer: true,
            sender: 'MSC for whom it may concern',
            weight: '121212121212',
          }
        }
        onSubmit={
          values => {
            console.log(values)
            return true
          }
        }
      >
        <DivContentWrapper>
          <Form style={{ height: '100%' }}>
            <div className={classes.paper}>
              <BookingForm/>
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </DivContentWrapper>
      </Formik>
    </Page>
  )
}

export default NewBooking
