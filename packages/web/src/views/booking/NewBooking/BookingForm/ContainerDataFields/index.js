import React, { memo } from 'react'
import { FastField } from 'formik'
import { Grid, makeStyles, TextField as TF } from '@material-ui/core'
import NumberFormatComp from 'src/components/NumberFormatComp'
import { focus } from 'src/utils/formik'
import { useIntl } from 'react-intl'
import { messages } from 'src/translations/messages'

const useStyles = makeStyles(theme => ({
  divContainer: {
    '& .MuiInputLabel-root': {
      marginTop: 3,
      fontSize: '0.9rem',
    },
    '& .MuiInputBase-input': {
      marginTop: 5,
    },
  },
  field: {
    margin: theme.spacing(1, 1),
    backgroundColor: theme.palette.grey[100],
  },
}))

const ContainerDataFields = ({handleChange}) => {
  const classes = useStyles()
  const intl = useIntl()
  console.log('%cRENDER_FORM', 'color: orange')

  return (
    <div className={classes.divContainer} id="bookingForm">
      <Grid container>
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
            size="small"
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
      </Grid>
    </div>
  )
}

export default memo(ContainerDataFields)
