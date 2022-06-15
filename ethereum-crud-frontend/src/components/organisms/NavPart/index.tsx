import * as React from "react";
import {
  Link,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import type { LinkProps } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import { MARKET_PAGES } from "./../../../constants/routers";

import styles from './index.module.scss';

import { useDispatch, useSelector } from "react-redux";

import { addItem } from "../../../redux/actions";

import { useResize } from "./../../../utils/Helper";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderBottom: '20px solid rgba(0,0,0,0.3)'
    },
    tab: {
      '&.active': {
        background: 'rgba(0,0,0,0.3)'
      },
      '& a': {
        color: theme.palette.text.disabled,
        '&.active': {
          color: theme.syscolor.light,
        }
      }
    },
    collection: {
      color: theme.palette.text.primary
    },
    getCollection: {
      background: '#7D3CCF',
      color: theme.palette.text.primary,
      fontSize: '0.875rem',
      boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.25)',
      '&:hover': {
        opacity: 0.75,
        color: theme.palette.text.primary,
        background: '#7D3CCF'
      }
    }
  })
)

type Props = {
  children: React.ReactNode
  className?: string
}

const CustomNav = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  const classes = useStyles();
  return (
    <>
      <div className={`${styles.tab} ${match && `active`} ${classes.tab}`}>
        <Link
          to={to}
          {...props}
          className={`font-quick font-700 ${match && `active`}`}
        >
          {children}
        </Link>
      </div>

    </>
  );
}

const HeaderPart = (props: Props) => {
  const dispatch = useDispatch();
  const value = useSelector((state: any) => state.global.items)

  const loading = false;
  const classes = useStyles();
  const { isMobile } = useResize();


  const handleAddItem = async () => {
    const param = {
      itemName: 'Ternoa Item',
      itemAmount: 10
    }
    dispatch(addItem(param, value))
  }

  return (
    <section
      className={`d-flex align-items-center justify-content-between global-padding ${classes.root} ${styles.header}`}
    >
      {loading && <div id="preloader"></div>}
      {!isMobile
        ? <>
          <div className={`d-flex align-items-center justify-content-between`}>
            {MARKET_PAGES.map((tab, index) => {
              return <CustomNav to={tab.url} key={index} >{tab.node}</CustomNav>
            })}
          </div>

          <div className={`d-flex align-items-center justify-content-between`}>
            <div className={`text-center mr-16`}>
              <Button onClick={handleAddItem} variant="contained" disableElevation fullWidth className={`font-quick ${styles.getCollection} ${classes.getCollection}`}>
                Add Item
              </Button>
            </div>
          </div>
        </>
        :
        <div className={styles.nav_part}>
          <div className={`d-flex`}>
            <div className={`text-center ${styles.deposit_button}`}>
              <Button onClick={handleAddItem} variant="contained" disableElevation fullWidth className={`font-quick ${styles.getCollection} ${classes.getCollection}`}>
                Add Item
              </Button>
            </div>
          </div>
          <div className={`d-flex align-items-center justify-content-between ${styles.nav_tabs}`}>
            {MARKET_PAGES.map((tab, index) => {
              return <CustomNav to={tab.url} key={index} >{tab.node}</CustomNav>
            })}
          </div>
        </div>
      }
    </section>
  )
}

export default HeaderPart;
