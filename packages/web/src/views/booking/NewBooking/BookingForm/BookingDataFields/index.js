import React, { memo } from 'react'
import { FastField } from 'formik'
import { Grid, TextField as TF } from '@material-ui/core'
import { useIntl } from 'react-intl'
import { messages } from 'src/translations/messages'
import useNewBookingStore from 'src/zustandStore/useNewBookingStore'
import shallow from 'zustand/shallow'

/*const useStyles = makeStyles(theme => ({
  backgroundTextArea: {
    backgroundColor: theme.palette.grey[100],
  },
  toggleButtonGroup: {
    marginLeft: theme.spacing(1.5),
  },
}))*/

const { insuranceTypes } = useNewBookingStore.getState()
const newBookingSelector = state => ({
  insuranceSelected: state.insuranceSelected,
  setInsuranceSelected: state.setInsuranceSelected,
})
const BookingDataFields = ({ handleChange }) => {
  console.log('%cRENDER_FORM_BOOKING', 'color: orange')
  const intl = useIntl()
  const {
    insuranceSelected,
    setInsuranceSelected,
  } = useNewBookingStore(newBookingSelector, shallow)
  return (
    <Grid alignItems="center" container>
      <Grid item sm={6} xs={12}>
        <FastField
          as={TF}
          fullWidth
          label={intl.formatMessage(messages['booking_msc_booking_ref'])}
          name="bookingRef"
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FastField
          as={TF}
          fullWidth
          label={intl.formatMessage(messages['booking_booking_date'])}
          name="recipient"
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FastField
          as={TF}
          fullWidth
          InputLabelProps={
            {
              shrink: true,
            }
          }
          label={intl.formatMessage(messages['booking_insurance_type'])}
          name="insuranceType"
          onChange={
            event => {
              handleChange(event)
              setInsuranceSelected(event?.target?.value)
            }
          }
          onFocus={() => null}
          select
          SelectProps={{ native: true }}
        >
          <option
            key={''}
            value={''}
          />
          {
            insuranceTypes.map(value => {
              return (
                <option
                  key={value}
                  value={value}
                >
                  {value}
                </option>
              )
            })
          }
        </FastField>
      </Grid>
      <Grid item sm={6} xs={12}>
        <FastField
          as={TF}
          fullWidth
          label={intl.formatMessage(messages['booking_vessel_name'])}
          name="vesselName"
        />
      </Grid>
      {
        insuranceSelected.startsWith('door') &&
        <Grid item sm={6} xs={12}>
          <FastField
            as={TF}
            fullWidth
            label={intl.formatMessage(messages['booking_city_collation_point'])}
            name="cityCollationPoint"
            required
          />
        </Grid>
      }
    </Grid>
  )
}

export default memo(BookingDataFields)
