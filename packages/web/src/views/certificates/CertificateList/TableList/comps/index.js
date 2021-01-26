import { Button, withStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import Box from '@material-ui/core/Box'
import { Table } from '@devexpress/dx-react-grid-material-ui'
import { IntegratedSummary } from '@devexpress/dx-react-grid'
import { useMoneyFormatter } from 'src/utils/formatters'
import { useGeneralStore } from 'src/zustandStore'
import shallow from 'zustand/shallow'
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined'

export const summaryCalculator = (type, rows, getValue) => {
  if (type === 'incomeSum') {
    return rows.reduce((prev, curr) => {
      prev.tot += curr.pu_totale_totale || 0
      prev.sc += curr.pu_totale_sc || 0
      prev.st += curr.pu_totale_st || 0
      return prev
    }, { tot: 0, sc: 0, st: 0 })
  } else {
    return IntegratedSummary.defaultCalculator(type, rows, getValue)
  }
}
export const SummaryCellBase = props => {
  const { column, children } = props
  const moneyFormatter = useMoneyFormatter()
  if (column.name === 'income') {
    const { columnSummaries } = children.props || {}
    const [first] = columnSummaries
    return (
      <Table.Cell {...props}>
        <Box color="text.primary" fontWeight="bold">
          <FormattedMessage
            defaultMessage="Totale"
            id="reports.total"
          />: {moneyFormatter(first.value.tot)}
        </Box>
        {
          first.value.sc > 0 &&
          <Box color="red">
            <FormattedMessage
              defaultMessage="Totale Sconti"
              id="reports.tot_discount"
            />: {moneyFormatter(first.value.sc)}
          </Box>
        }
        {
          first.value.st > 0 &&
          <Box color="orange">
            <FormattedMessage
              defaultMessage="Totale Storni"
              id="reports.closing_day.tot_reversal "
            />: {moneyFormatter(first.value.st)}
          </Box>
        }
      </Table.Cell>
    )
  } else {
    return <Table.Cell {...props}/>
  }
}
const loadingSel = state => ({ setLoading: state.setLoading, loading: state.loading })

const CellBase = props => {
  const { column, theme } = props
  const { setLoading } = useGeneralStore(loadingSel, shallow)
  const [intLoading, setIntLoading] = useState(false)
  const cellStyle = { paddingLeft: theme.spacing(2) }
  if (column.name === 'action') {
    return (
      <Table.Cell {...props}>
        <Button
          disabled={intLoading}
          onClick={
            async () => {
              setLoading(true)
              setIntLoading(true)
              console.log('clicked')
              setIntLoading(false)
              setLoading(false)
            }
          }
          size="small"
          startIcon={<PictureAsPdfOutlinedIcon />}
          style={{ textTransform: 'none' }}
          variant="contained"
        >
          PDF
        </Button>
      </Table.Cell>
    )
  }
  return <Table.Cell {...props} style={cellStyle}/>
}

const styles = theme => ({
  cell: {
    padding: theme.spacing(1, 2),
  },
})

export const Cell = withStyles(styles, { withTheme: true })(
  CellBase
)
export const CellSummary = withStyles(styles, { withTheme: true })(
  SummaryCellBase
)
