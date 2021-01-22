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
import { typeOfGoods } from 'src/utils/lists'

const useStyles = makeStyles(theme => ({
  backgroundTextArea: {
    backgroundColor: theme.palette.grey[100],
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
        <Grid item>
          <FastField
            as={TF}
            InputLabelProps={
              {
                shrink: true,
              }
            }
            label={intl.formatMessage(messages['booking_type_goods'])}
            name="typeGoods"
            onChange={
              event => {
                handleChange(event)
              }
            }
            select
            SelectProps={{ native: true }}
            style={{ width: 250 }}
          >
            {
              typeOfGoods.map(({ value, key }) => {
                return (
                  <option
                    key={key}
                    value={key}
                  >
                    {value}
                  </option>
                )
              })
            }
          </FastField>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <FastField
            as={TF}
            className={classes.backgroundTextArea}
            label={intl.formatMessage(messages['booking_more_goods_details'])}
            multiline
            name="moreGoodsDetails"
            rows={4}
            rowsMax={8}
            style={{ minWidth: 450 }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default memo(ContainerDataFields)
