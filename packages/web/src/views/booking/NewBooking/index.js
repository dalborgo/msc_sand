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

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100%',
    overflow: 'auto',
  },
  container: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: { //mobile
      padding: theme.spacing(0, 2),
    },
  },
}))

const NewBooking = () => {
  const classes = useStyles()
  const intl = useIntl()
  return (
    <Page
      title={intl.formatMessage(messages['menu_new_booking'])}
    >
      <div className={classes.container}>
        <StandardHeader
          breadcrumb={
            <StandardBreadcrumb
              crumbs={[{ name: intl.formatMessage(messages['menu_new_booking']) }]}
            />
          }
        >
          <FormattedMessage defaultMessage="Create a New Booking" id="booking.new_booking.header_title"/>
        </StandardHeader>
      </div>
      <Formik
        initialValues={
          {
            numberContainers: '',
            weight: '121212121212',
            goodsValue: '',
            currencyGoods: 'EUR',
          }
        }
        onSubmit={
          values => {
            console.log(values)
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
