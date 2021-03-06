import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Box, Card, CardHeader, Divider, makeStyles, Typography } from '@material-ui/core'
import GenericMoreButton from 'src/components/GenericMoreButton'
import axios from 'src/utils/axios'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import Chart from './Chart'
import log from '@adapter/common/src/log'

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    textAlign: 'center',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3, 2),
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
}))

const EarningsSegmentation = ({ className, ...rest }) => {
  const classes = useStyles()
  const isMountedRef = useIsMountedRef()
  const [earnings, setEarnings] = useState(null)
  
  const getEarnings = useCallback(async () => {
    try {
      const response = await axios.get('/api/reports/earnings')
      
      if (isMountedRef.current) {
        setEarnings(response.data.earnings)
      }
    } catch (err) {
      log.error(err)
    }
  }, [isMountedRef])
  
  useEffect(() => {
    getEarnings()
  }, [getEarnings])
  
  if (!earnings) {
    return null
  }
  
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={<GenericMoreButton/>}
        title="Earnings Segmentation"
      />
      <Divider/>
      <Box
        minHeight={320}
        p={3}
        position="relative"
      >
        <Chart data={earnings}/>
      </Box>
      <Divider/>
      <Box display="flex">
        {
          earnings.labels.map((label, i) => (
            <div
              className={classes.item}
              key={label}
            >
              <Typography
                color="textPrimary"
                variant="h4"
              >
                {earnings.datasets[0].data[i]}
                %
              </Typography>
              <Typography
                color="textSecondary"
                variant="overline"
              >
                {label}
              </Typography>
            </div>
          ))
        }
      </Box>
    </Card>
  )
}

EarningsSegmentation.propTypes = {
  className: PropTypes.string,
}

export default EarningsSegmentation
