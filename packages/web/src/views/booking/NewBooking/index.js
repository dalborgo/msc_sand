import React, { useRef } from 'react'
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
import { checkValues } from './validate'
import { axiosLocalInstance, useSnackQueryError } from 'src/utils/reactQueryFunctions'
import { useMutation } from 'react-query'
import { useGeneralStore } from 'src/zustandStore'
import shallow from 'zustand/shallow'
import { useSnackbar } from 'notistack'

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

const saveCertificateMutation = async values => {
  const { data } = await axiosLocalInstance.post('certificate/save', {
    ...values,
  })
  return data
}
const loadingSel = state => ({ setLoading: state.setLoading })
const NewBooking = () => {
  const snackQueryError = useSnackQueryError()
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()
  const intl = useIntl()
  const submitRef = useRef()
  const { setLoading } = useGeneralStore(loadingSel, shallow)
  const { mutateAsync: saveCertificate } = useMutation(saveCertificateMutation, {
    onMutate: () => {
      setLoading(true)
    },
    onSettled: (data, error) => {
      const { ok, message, err } = data || {}
      if (!ok || error) {
        snackQueryError(err || message || error)
      } else {
        enqueueSnackbar(intl.formatMessage(messages['booking_save_certificate_ok'], { id: data?.results?.id }), { variant: 'success' })
      }
      setLoading(false)
    },
  })
  return (
    <Page
      title={intl.formatMessage(messages['menu_new_booking'])}
    >
      <Formik
        initialValues={
          {
            acceptedByMSC: false,
            cityCollectionPoint: '',
            cityDeliveryPoint: '',
            countryCollectionPoint: null,
            countryDeliveryPoint: null,
            countryPortDischarge: null,
            countryPortLoading: null,
            currencyGoods: 'EUR',
            goodsValue: '',
            importantCustomer: false,
            insuranceType: '',
            moreGoodsDetails: '',
            numberContainers: '',
            portDischarge: null,
            portLoading: null,
            recipient: 'To the orders as per Bill of Lading',
            reeferContainer: false,
            rate: '',
            sender: 'MSC for whom it may concern',
            specialConditions: '',
            typeOfGoods: '42',
            vesselName: '',
            weight: '',
          }
        }
        onSubmit={
          async (values, { resetForm }) => {
            const newValues = checkValues(values)
            const { ok } = await saveCertificate(newValues)
            ok && resetForm()
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
                <Button color="secondary" onClick={() => submitRef.current.click()} variant="outlined">
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
                <PerfectScrollbar>
                  <BookingForm/>
                </PerfectScrollbar>
                <Button ref={submitRef} style={{ display: 'none' }} type="submit"/>
              </div>
            </Form>
          </DivContentWrapper>
        </>
      </Formik>
    </Page>
  )
}
export default NewBooking
