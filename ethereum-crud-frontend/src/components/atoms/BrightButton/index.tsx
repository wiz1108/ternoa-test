import * as React from "react";

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import styles from './index.module.scss';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.syscolor.light,
      borderColor: theme.syscolor.light,
      borderStyle: 'solid',
      borderWidth: '1px',
      padding: '3px 8px',
      color: theme.syscolor.dark,
      '&.active': {
        background: 'none',
        color: theme.syscolor.light,
        '&:hover': {
          background: theme.syscolor.light,
          color: theme.syscolor.dark
        },
      },
      '&:hover': {
        background: 'none',
        color: theme.syscolor.light,
      },
      '&:disabled': {
        borderColor: alpha(`${theme.syscolor.light}`, 0.2),
        background: 'none',
        color: alpha(`${theme.syscolor.light}`, 0.2)
      }
    }
  })
)

type Props = {
  children: React.ReactNode,
  enabled?: boolean,
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const BrightButton = (props: Props) => {
  const { children, enabled, className, onClick } = props;
  const classes = useStyles();
  return <Button
    variant="contained"
    className={`${className} ${styles.root} ${classes.root}`}
    disabled={enabled === undefined ? false : !enabled}
    onClick={onClick}
  >
    {children}
  </Button>
}

export default BrightButton;
