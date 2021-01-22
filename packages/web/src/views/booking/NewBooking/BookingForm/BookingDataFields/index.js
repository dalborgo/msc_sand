import React, { memo } from 'react'
import { FastField } from 'formik'
import { Grid, TextField as TF } from '@material-ui/core'
import { useIntl } from 'react-intl'
import { messages } from 'src/translations/messages'

/*const useStyles = makeStyles(theme => ({
  backgroundTextArea: {
    backgroundColor: theme.palette.grey[100],
  },
  toggleButtonGroup: {
    marginLeft: theme.spacing(1.5),
  },
}))*/

const BookingDataFields = () => {
  const intl = useIntl()
  console.log('%cRENDER_FORM_BOOKING', 'color: orange')
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
    </Grid>
  )
}

export default memo(BookingDataFields)
