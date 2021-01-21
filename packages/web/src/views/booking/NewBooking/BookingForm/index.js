import React, { memo } from 'react'
import { Card, makeStyles, Typography } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import ContainerDataFields from './ContainerDataFields'
import { useFormikContext } from 'formik'

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2),
  },
}))

const BookingForm = () => {
  const classes = useStyles()
  const { handleChange } = useFormikContext()
  return (
    <>
      <Typography color="secondary" gutterBottom>
        <FormattedMessage defaultMessage="Container data" id="booking.container_data"/>
      </Typography>
      <Card className={classes.card}>
        <ContainerDataFields handleChange={handleChange}/>
      </Card>
    </>
  )
}

export default memo(BookingForm)
