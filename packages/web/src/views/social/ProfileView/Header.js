import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Container,
  Hidden,
  IconButton,
  Tooltip,
  Typography,
  colors,
  makeStyles,
} from '@material-ui/core';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {},
  cover: {
    position: 'relative',
    height: 460,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '&:before': {
      position: 'absolute',
      content: '" "',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundImage: 'linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)',
    },
    '&:hover': {
      '& $changeButton': {
        visibility: 'visible',
      },
    },
  },
  changeButton: {
    visibility: 'hidden',
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    backgroundColor: colors.blueGrey[900],
    color: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
      top: theme.spacing(3),
      bottom: 'auto',
    },
    '&:hover': {
      backgroundColor: colors.blueGrey[900],
    },
  },
  avatar: {
    border: `2px solid ${theme.palette.common.white}`,
    height: 120,
    width: 120,
    top: -60,
    left: theme.spacing(3),
    position: 'absolute',
  },
  action: {
    marginLeft: theme.spacing(1),
  },
}));

const Header = ({ className, profile, ...rest }) => {
  const classes = useStyles();
  const [connectedStatus, setConnectedStatus] = useState(profile.connectedStatus);

  const handleConnectToggle = () => {
    setConnectedStatus((prevConnectedStatus) => (prevConnectedStatus === 'not_connected' ? 'pending' : 'not_connected'));
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <div
        className={classes.cover}
        style={{ backgroundImage: `url(${profile.cover})` }}
      >
        <Button
          className={classes.changeButton}
          startIcon={<AddPhotoIcon />}
          variant="contained"
        >
          Change Cover
        </Button>
      </div>
      <Container maxWidth="lg">
        <Box
          alignItems="center"
          display="flex"
          mt={1}
          position="relative"
        >
          <Avatar
            alt="Person"
            className={classes.avatar}
            src={profile.avatar}
          />
          <Box marginLeft="160px">
            <Typography
              color="textSecondary"
              variant="overline"
            >
              {profile.bio}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {profile.name}
            </Typography>
          </Box>
          <Box flexGrow={1} />
          <Hidden smDown>
            {
              connectedStatus === 'not_connected' && (
                <Button
                  className={classes.action}
                  onClick={handleConnectToggle}
                  size="small"
                  variant="outlined"
                >
                Connect
                </Button>
              )
            }
            {
              connectedStatus === 'pending' && (
                <Button
                  className={classes.action}
                  onClick={handleConnectToggle}
                  size="small"
                  variant="outlined"
                >
                Pending
                </Button>
              )
            }
            <Button
              className={classes.action}
              color="secondary"
              component={RouterLink}
              size="small"
              to="/app/chat"
              variant="contained"
            >
              Send message
            </Button>
          </Hidden>
          <Tooltip title="More options">
            <IconButton className={classes.action}>
              <MoreIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Container>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired,
};

export default Header;
