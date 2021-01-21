import React, { memo } from 'react'
import { FastField, Field } from 'formik'
import { Grid, InputLabel, makeStyles, TextField as TF } from '@material-ui/core'
import NumberFormatComp from 'src/components/NumberFormatComp'
import { focus } from 'src/utils/formik'
import { useIntl } from 'react-intl'
import { messages } from 'src/translations/messages'
import { Switch } from 'formik-material-ui'
import { ToggleButtonGroup } from 'formik-material-ui-lab'
import ToggleButton from '@material-ui/lab/ToggleButton'

const useStyles = makeStyles(theme => ({
  divContainer: {
    '& .MuiInputLabel-root': {
      marginTop: 6,
      fontSize: '0.9rem',
    },
    '& .MuiInputBase-input': {
      marginTop: 5,
    },
    '& .MuiSwitch-root': {
      marginTop: -2,
    },
  },
  field: {
    margin: theme.spacing(1, 1),
    backgroundColor: theme.palette.grey[100],
  },
  inputLabel: {
    paddingLeft: theme.spacing(1),
  },
  toggleButtonGroup: {
    marginLeft: theme.spacing(1.5),
  },
}))

const ContainerDataFields = ({ handleChange }) => {
  const classes = useStyles()
  const intl = useIntl()
  console.log('%cRENDER_FORM', 'color: orange')
  
  return (
    <div className={classes.divContainer} id="bookingForm">
      <Grid alignItems="center" container>
        <Grid item>
          <FastField
            as={TF}
            className={classes.field}
            InputProps={
              {
                inputComponent: NumberFormatComp,
                inputProps: {
                  thousandSeparator: '.',
                  decimalScale: 0,
                },
              }
            }
            label={intl.formatMessage(messages['booking_number_container'])}
            name="numberContainers"
            onFocus={focus}
            style={{ width: 230 }}
          />
        </Grid>
        <Grid item>
          <FastField
            as={TF}
            className={classes.field}
            InputProps={
              {
                inputComponent: NumberFormatComp,
                inputProps: {
                  thousandSeparator: '.',
                  decimalScale: 2,
                },
              }
            }
            label={intl.formatMessage(messages['booking_weight'])}
            name="weight"
            onFocus={focus}
            style={{ width: 180 }}
          />
        </Grid>
        <Grid item>
          <FastField
            as={TF}
            className={classes.field}
            InputProps={
              {
                inputComponent: NumberFormatComp,
                inputProps: {
                  thousandSeparator: '.',
                  decimalScale: 2,
                },
              }
            }
            label={intl.formatMessage(messages['booking_value_goods'])}
            name="goodsValue"
            onFocus={focus}
            style={{ width: 180 }}
          />
        </Grid>
        <Grid item>
          <FastField
            as={TF}
            className={classes.field}
            InputLabelProps={
              {
                shrink: true,
              }
            }
            label={intl.formatMessage(messages['booking_currency_goods'])}
            name="currencyGoods"
            onChange={
              event => {
                handleChange(event)
              }
            }
            select
            SelectProps={{ native: true }}
            style={{ width: 150 }}
            variant="outlined"
          >
            <option
              value="EUR"
            >
              EUR
            </option>
            <option
              value="USD"
            >
              USD
            </option>
          </FastField>
        </Grid>
        <Grid item>
          <InputLabel
            className={classes.inputLabel}
            htmlFor="currencyGoods"
          >
            {intl.formatMessage(messages['booking_currency_goods'])}
            <Field
              className={classes.toggleButtonGroup}
              component={ToggleButtonGroup}
              exclusive
              name="currencyGoods"
              size="small"
              type="checkbox"
            >
              <ToggleButton value="EUR">
                EUR
              </ToggleButton>
              <ToggleButton value="USD">
                USD
              </ToggleButton>
            </Field>
          </InputLabel>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <InputLabel
            className={classes.inputLabel}
            htmlFor="reeferContainer"
          >
            {intl.formatMessage(messages['booking_reefer_container'])}
            <FastField
              component={Switch}
              name="reeferContainer"
              type="checkbox"
            />
          </InputLabel>
        </Grid>
      </Grid>
    </div>
  )
}

export default memo(ContainerDataFields)
