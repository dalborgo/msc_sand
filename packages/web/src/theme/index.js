import React from 'react'
import merge from 'lodash/merge'
import { colors, createMuiTheme, responsiveFontSizes, Slide } from '@material-ui/core'
import { THEMES } from 'src/constants'
import { softShadows, strongShadows } from './shadows'
import typography from './typography'
import log from '@adapter/common/src/log'
import { focus } from 'src/utils/formik'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide ref={ref} {...props} />
})

const baseOptions = {
  direction: 'ltr',
  typography,
  props: {
    MuiTextField: {
      variant: 'outlined',
      size: 'small',
      onFocus: focus,
    },
    MuiDialog: {
      TransitionComponent: Transition,
    },
    MuiButton: {
      disableFocusRipple: true,
    },
    MuiIconButton: {
      disableFocusRipple: true,
    },
    MuiFab: {
      disableFocusRipple: true,
    },
    MuiMenu: {
      disableAutoFocusItem: true,
      transitionDuration: 0,
      transformOrigin:
        {
          vertical: -40,
          horizontal: 'center',
        },
    },
    MuiTooltip: {
      arrow: true,
      disableFocusListener: true,
      enterDelay: 0,
      placement: 'bottom',
      TransitionProps: {
        timeout: 0,
      },
    },
  },
  overrides: {
    MuiTooltip: {
      tooltipPlacementBottom: {
        marginTop: 2,
      },
      arrow: {
        color: '#282C34',
      },
      tooltip: {
        backgroundColor: '#282C34',
      },
    },
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden',
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
      },
    },
    MuiChip: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.075)',
      },
    },
  },
}

const themesOptions = [
  {
    name: THEMES.LIGHT,
    overrides: {
      MuiInputBase: {
        input: {
          '&::placeholder': {
            opacity: 0.6,
          },
        },
        root: {
          color: colors.blueGrey[800],
        },
      },
      MuiAvatar: {
        rounded: {
          border: '1px solid',
          borderColor: '#282C34',
        },
      },
    },
    palette: {
      type: 'light',
      action: {
        active: colors.blueGrey[600],
      },
      background: {
        default: colors.common.white,
        dark: '#f4f6f8',
        paper: colors.common.white,
      },
      primary: {
        main: '#FECB00',
      },
      secondary: {
        main: '#F67457',
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
      },
    },
    shadows: softShadows,
  },
  {
    name: THEMES.ONE_DARK,
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)',
      },
      background: {
        default: '#282C34',
        dark: '#1c2025',
        paper: '#282C34',
      },
      primary: {
        main: '#FECB00',
      },
      secondary: {
        main: '#FECB00',
      },
      text: {
        primary: '#e6e5e8',
        secondary: '#adb0bb',
      },
    },
    shadows: strongShadows,
  },
]

export const createTheme = (config = {}) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme)
  
  if (!themeOptions) {
    log.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions
  }
  
  let theme = createMuiTheme(
    merge(
      {},
      baseOptions,
      themeOptions,
      { direction: config.direction }
    )
  )
  
  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme)
  }
  
  return theme
}
