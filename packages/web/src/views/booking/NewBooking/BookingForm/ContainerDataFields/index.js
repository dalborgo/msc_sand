import React, { memo } from 'react'
import { FastField } from 'formik'
import { Grid, InputLabel, makeStyles, TextField as TF } from '@material-ui/core'
import NumberFormatComp from 'src/components/NumberFormatComp'
import { useIntl } from 'react-intl'
import { messages } from 'src/translations/messages'
import { Switch } from 'formik-material-ui'
import ToggleButton from '@material-ui/lab/ToggleButton'
import MandatoryToggleButtonGroup from 'src/utils/formik/MandatoryToggleButtonGroup'
import useNewBookingStore from 'src/zustandStore/useNewBookingStore'

const useStyles = makeStyles(theme => ({
  toggleButtonGroup: {
    marginLeft: theme.spacing(1.5),
  },
}))
const { typesOfGoods } = useNewBookingStore.getState()
const ContainerDataFields = ({ handleChange }) => {
  const classes = useStyles()
  const intl = useIntl()
  console.log('%cRENDER_FORM', 'color: orange')
  return (
    <>
      <Grid alignItems="center" container>
        <Grid item sm={6} xs={12}>
          <FastField
            as={TF}
            fullWidth
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
          />
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
                },
              }
            }
            label={intl.formatMessage(messages['booking_goods_weight'])}
            name="goodsWeight"
          />
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
                },
              }
            }
            label={intl.formatMessage(messages['booking_value_goods'])}
            name="goodsValue"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
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
        <Grid item sm={6} xs={12}>
          <FastField
            as={TF}
            fullWidth
            label={intl.formatMessage(messages['booking_type_goods'])}
            name="typeOfGoods"
            onChange={
              event => {
                handleChange(event)
              }
            }
            onFocus={() => null}
            required
            select
            SelectProps={{ native: true }}
          >
            <option
              key={''}
              value={''}
            />
            {
              typesOfGoods.map(({ value, key }) => {
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
        <Grid item sm={6} xs={12}>
          <InputLabel
            htmlFor="reeferContainer"
            style={{height: 20}}
          >
            {intl.formatMessage(messages['booking_reefer_container'])}
            <FastField
              component={Switch}
              name="reeferContainer"
              type="checkbox"
            />
          </InputLabel>
          <InputLabel
            htmlFor="acceptedByMSC"
            style={{whiteSpace: 'nowrap'}}
          >
            {intl.formatMessage(messages['accepted_by_msc'])}
            <FastField
              component={Switch}
              name="acceptedByMSC"
              required
              type="checkbox"
            />
          </InputLabel>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <FastField
            as={TF}
            fullWidth
            label={intl.formatMessage(messages['booking_more_goods_details'])}
            multiline
            name="moreGoodsDetails"
            rows={4}
            rowsMax={8}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default memo(ContainerDataFields)
