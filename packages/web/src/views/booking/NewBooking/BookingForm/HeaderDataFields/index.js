import React, { memo } from 'react'
import { FastField } from 'formik'
import { Card, Grid, TextField as TF } from '@material-ui/core'
import { focus } from 'src/utils/formik'
import { useIntl } from 'react-intl'
import { messages } from 'src/translations/messages'

const HeaderDataFields = () => {
  const intl = useIntl()
  console.log('%cRENDER_FORM', 'color: orange')
  
  return (
    <Grid alignItems="center" container>
      <Grid item style={{ paddingLeft: 0 }}>
        <Card>
          <FastField
            as={TF}
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
