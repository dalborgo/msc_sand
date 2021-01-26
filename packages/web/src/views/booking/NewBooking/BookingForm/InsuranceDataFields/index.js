import React, { memo } from 'react'
import { FastField } from 'formik'
import { Grid, InputAdornment, InputLabel, TextField as TF } from '@material-ui/core'
import { useIntl } from 'react-intl'
import { messages } from 'src/translations/messages'
import { Switch } from 'formik-material-ui'
import NumberFormatComp from 'src/components/NumberFormatComp'

const InsuranceDataFields = () => {
  const intl = useIntl()
  return (
    <Grid alignItems="center" container>
      <Grid item sm={6} style={{paddingTop: 0}} xs={12}>
        <InputLabel
          htmlFor="importantCustomer"
        >
          {intl.formatMessage(messages['booking_important_customer'])}
          <FastField
            component={Switch}
            name="importantCustomer"
            type="checkbox"
          />
        </InputLabel>
      </Grid>
      <Grid item sm={6} xs={12}>
        <FastField
          as={TF}
          fullWidth
          InputProps={
            {
              inputComponent: NumberFormatComp,
              inputProps: {
                thousandSeparator: '.',
                decimalScale: 2,
                max: 100,
              },
              endAdornment: <InputAdornment position="start">%</InputAdornment>,
            }
          }
          label={intl.formatMessage(messages['common_rate'])}
          name="rate"
        />
      </Grid>
      <Grid item xs={12}>
        <FastField
          as={TF}
          fullWidth
          label={intl.formatMessage(messages['booking_special_conditions'])}
          multiline
          name="specialConditions"
          rows={4}
          rowsMax={8}
        />
      </Grid>
    </Grid>
  )
}

export default memo(InsuranceDataFields)