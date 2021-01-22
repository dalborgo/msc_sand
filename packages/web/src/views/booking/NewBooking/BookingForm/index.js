import React, { memo } from 'react'
import { Card, makeStyles, Typography } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import ContainerDataFields from './ContainerDataFields'
import { useFormikContext } from 'formik'
import HeaderDataFields from './HeaderDataFields'
import BookingDataFields from './BookingDataFields'

const useStyles = makeStyles(theme => ({
  divContainer: {
    '& .MuiInputLabel-root': {
      marginTop: 2,
      fontSize: '0.9rem',
    },
    '& .MuiInputBase-input': {
      backgroundColor: theme.palette.grey[100],
    },
    '& .MuiSwitch-root': {
      marginTop: -2,
    },
    '& .MuiCard-root': {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      maxWidth: theme.breakpoints.values['md'],
    },
    '& .MuiGrid-item': {
      padding: theme.spacing(1.5, 1, 1.5, 1),
    },
  },
}))

const BookingForm = () => {
  const classes = useStyles()
  const { handleChange } = useFormikContext()
  return (
    <div className={classes.divContainer} id="bookingForm">
      <Typography color="secondary" gutterBottom>
        <FormattedMessage defaultMessage="Sender and Recipient data" id="booking.sender_recipient_data"/>
      </Typography>
      <Card>
        <HeaderDataFields/>
      </Card>
      <Typography color="secondary" gutterBottom>
        <FormattedMessage defaultMessage="Container data" id="booking.container_data"/>
      </Typography>
      <Card>
        <ContainerDataFields handleChange={handleChange}/>
      </Card>
      <Typography color="secondary" gutterBottom>
        <FormattedMessage defaultMessage="Booking data" id="booking.booking_data"/>
      </Typography>
      <Card>
        <BookingDataFields/>
      </Card>
    </div>
  )
}

export default memo(BookingForm)
