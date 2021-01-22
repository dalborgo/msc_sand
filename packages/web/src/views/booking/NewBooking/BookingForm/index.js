import React, { memo } from 'react'
import { Card, makeStyles, Typography } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import ContainerDataFields from './ContainerDataFields'
import { useFormikContext } from 'formik'
import HeaderDataFields from './HeaderDataFields'

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
    },
    '& .MuiGrid-item': {
      padding: theme.spacing(1,1,2,1),
    },
  },
}))

const BookingForm = () => {
  const classes = useStyles()
  const { handleChange } = useFormikContext()
  return (
    <>
      <div className={classes.divContainer} id="bookingForm">
        <Typography color="secondary" gutterBottom>
          <FormattedMessage defaultMessage="Sender Recipient data" id="booking.sender_recipient_data"/>
        </Typography>
        <HeaderDataFields/>
        <Typography color="secondary" gutterBottom>
          <FormattedMessage defaultMessage="Container data" id="booking.container_data"/>
        </Typography>
        <Card id="mio">
          <ContainerDataFields handleChange={handleChange}/>
        </Card>
      </div>
    </>
  )
}

export default memo(BookingForm)
