import React from 'react'
import { Card, makeStyles, Typography } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import ContainerDataFields from './ContainerDataFields'

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2),
  },
}))

const BookingForm = props => {
  const classes = useStyles()
  return (
    <>
      <Typography color="secondary" gutterBottom>
        <FormattedMessage defaultMessage="Container data" id="booking.container_data"/>
      </Typography>
      <Card className={classes.card}>
        <ContainerDataFields/>
      </Card>
    </>
  )
}

export default BookingForm
