import React, { memo } from 'react'
import { FastField } from 'formik'
import { Grid, InputLabel, makeStyles, TextField as TF } from '@material-ui/core'
import NumberFormatComp from 'src/components/NumberFormatComp'
import { focus } from 'src/utils/formik'
import { useIntl } from 'react-intl'
import { messages } from 'src/translations/messages'
import { Switch } from 'formik-material-ui'
import ToggleButton from '@material-ui/lab/ToggleButton'
import MandatoryToggleButtonGroup from 'src/utils/formik/MandatoryToggleButtonGroup'

const useStyles = makeStyles(theme => ({
  field: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.grey[100],
  },
  inputLabel: {
    paddingLeft: theme.spacing(2),
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
    <>
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
          <InputLabel
            className={classes.inputLabel}
            htmlFor="currencyGoods"
          >
            {intl.formatMessage(messages['booking_currency_goods'])}
            <FastField
              className={classes.toggleButtonGroup}
              component={MandatoryToggleButtonGroup}
              exclusive
              name="currencyGoods"
              size="small"
              type="checkbox"
            >
              <ToggleButton disableRipple value="EUR">
                EUR
              </ToggleButton>
              <ToggleButton disableRipple value="USD">
                USD
              </ToggleButton>
            </FastField>
          </InputLabel>
        </Grid>
      </Grid>
      <Grid alignItems="center" container>
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
        {/*   <Grid item>
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
        </Grid>*/}
      </Grid>
    </>
  )
}

export default memo(ContainerDataFields)
