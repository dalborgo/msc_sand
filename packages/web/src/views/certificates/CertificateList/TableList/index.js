import React, { memo, useCallback } from 'react'
import { Grid, Table, TableHeaderRow, Toolbar } from '@devexpress/dx-react-grid-material-ui'
import { IntegratedFiltering, SearchState } from '@devexpress/dx-react-grid'
import { Cell } from './comps'
import { LoadingComponent } from 'src/components/TableComponents'
import { CellHeader, RootToolbar } from 'src/components/TableComponents/CellBase'
import SearchPanelIntl from 'src/components/TableComponents/SearchPanelIntl'

const getRowId = row => row.code

const tableColumnExtensions = [
  { columnName: 'action', align: 'right' },
]
const columns = [
  { name: 'code' },
  { name: 'action' },
]

const IntegratedFilteringSel = memo(function IntegratedFilteringSel () {
  const filteringColumnExtensions = ['covers', 'date']
    .map(columnName => ({
      columnName,
      predicate: () => false,
    }))
  return (
    <IntegratedFiltering
      columnExtensions={filteringColumnExtensions}
    />
  )
})

const TableList = memo(function TableList ({ rows, isFetching, isIdle }) {
  console.log('%c***EXPENSIVE_RENDER_TABLE', 'color: yellow')
  const noDataCellComponent = useCallback(({ colSpan }) =>
    <LoadingComponent colSpan={colSpan} idle={isIdle} isFetching={isFetching}/>, [isFetching, isIdle])
  
  return (
    <Grid
      columns={columns}
      getRowId={getRowId}
      rows={rows}
    >
      <SearchState/>
      <IntegratedFilteringSel/>
      <Table
        cellComponent={Cell}
        columnExtensions={tableColumnExtensions}
        noDataCellComponent={noDataCellComponent}
      />
      <Toolbar
        rootComponent={RootToolbar}
      />
      <TableHeaderRow cellComponent={CellHeader}/>
      <SearchPanelIntl/>
    </Grid>
  )
})

export default TableList
