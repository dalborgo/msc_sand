import React, { memo } from 'react'
import { FastField } from 'formik'
import { Card, Grid, makeStyles, TextField as TF } from '@material-ui/core'
import { focus } from 'src/utils/formik'
import { useIntl } from 'react-intl'
import { messages } from 'src/translations/messages'

const useStyles = makeStyles(theme => ({
  cardMarginRight: {
    marginRight: theme.spacing(2),
  },
  field: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.grey[100],
  },
  inputLabel: {
    paddingLeft: theme.spacing(1),
  },
  toggleButtonGroup: {
    marginLeft: theme.spacing(1.5),
  },
}))

const HeaderDataFields = ({ handleChange }) => {
  const classes = useStyles()
  const intl = useIntl()
  console.log('%cRENDER_FORM', 'color: orange')
  
  return (
    <Grid alignItems="center" container>
      <Grid item>
        <Card className={classes.cardMarginRight}>
          <FastField
            as={TF}
            className={classes.field}
            label={intl.formatMessage(messages['booking_sender'])}
            name="sender"
            onFocus={focus}
            style={{ width: 300 }}
          />
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <FastField
            as={TF}
            className={classes.field}
            label={intl.formatMessage(messages['booking_recipient'])}
            name="recipient"
            onFocus={focus}
            style={{ width: 300 }}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default memo(HeaderDataFields)
