import React, { memo } from 'react'
import { FastField, Field } from 'formik'
import { Grid, InputAdornment, InputLabel, TextField as TF } from '@material-ui/core'
import { useIntl } from 'react-intl'
import { messages } from 'src/translations/messages'
import { Switch } from 'formik-material-ui'
import NumberFormatComp from 'src/components/NumberFormatComp'
import useAuth from 'src/hooks/useAuth'
import { numeric } from '@adapter/common'
import { getMinimumRate } from 'src/utils/logics'

const InsuranceDataFields = ({ handleChange, setFieldValue, minimumRateLabel }) => {
  const intl = useIntl()
  const { user: { priority } } = useAuth()
  return (
    <Grid alignItems="center" container>
      <Grid item sm={6} style={{ paddingTop: 0 }} xs={12}>
        <InputLabel
          htmlFor="importantCustomer"
        >
          {intl.formatMessage(messages['booking_important_customer'])}
          <FastField
            component={Switch}
            id="importantCustomerField"
            name="importantCustomer"
            onChange={
              event => {
                handleChange(event)
                const reeferContainerField = document.getElementById('reeferContainerField')
                if (reeferContainerField) {
                  setFieldValue('rate', getMinimumRate(event.target.checked, reeferContainerField.checked))
                }
              }
            }
            type="checkbox"
          />
        </InputLabel>
      </Grid>
      {
        priority > 2 &&
        <Grid item sm={6} xs={12}>
          <Field
            as={TF}
            fullWidth
            InputProps={
              {
                inputComponent: NumberFormatComp,
                inputProps: {
                  thousandSeparator: '.',
                  decimalScale: 3,
                  min: minimumRateLabel ? numeric.normNumb(minimumRateLabel, false) : 0,
                  max: 100,
                },
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }
            }
            label={
              intl.formatMessage(
                messages['common_rate_min'],
                { min: minimumRateLabel ? ` minimum: ${minimumRateLabel} %` : '' }
              )
            }
            name="rate"
          />
        </Grid>
      }
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
