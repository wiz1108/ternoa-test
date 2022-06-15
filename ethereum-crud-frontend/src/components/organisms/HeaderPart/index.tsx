import * as React from "react"
import { useState } from 'react'
import {
  Link,
} from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import { getImg } from "../../../utils/Helper"

import styles from './index.module.scss'

import { useResize } from "./../../../utils/Helper"
import { connectWallet } from './../../../helpers/methods'
import { setConnectFlag, getItem } from '../../../redux/actions'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    menu: {
      color: theme.palette.text.disabled,
      '&:hover': {
        color: theme.palette.text.primary
      }
    },
    active: {
      color: theme.palette.text.primary
    },
    wallet: {
      fontSize: '1.125rem',
      boxShadow: '0px 4px 0px rgba(0, 0, 0, 0.25)',
      background: theme.syscolor.light,
      color: theme.syscolor.dark,
      borderRadius: '5px',
      letterSpacing: '1.5px'
    }
  })
)

type Props = {
  children: React.ReactNode
  className?: string,
  menu: { node: React.ReactNode | string, url: string }[],
  logo: string
}

const HeaderPart = (props: Props) => {
  const { logo } = props
  const dispatch = useDispatch()
  const connectFlag = useSelector((state: any) => state.global.connectFlag)
  const classes = useStyles()
  const { isMobile } = useResize()
  const [walletAddress, setWalletAddress] = useState<any>("Connect Wallet")

  const handleConnectWallet = async () => {
    const wallet = await connectWallet()
    if (!wallet) {
      dispatch(setConnectFlag(false))
    } else {
      setWalletAddress(wallet)
      dispatch(setConnectFlag(true))
      if (!connectFlag) dispatch(getItem())
    }
  }
  return (
    <>
      {!isMobile
        ?
        <header
          className={`d-flex align-items-center justify-content-between global-padding pb-32 pt-32 ${styles.header}`}
        >
          <div className={`d-flex align-items-center justify-content-between ${styles.menu_link}`}>
            <div className={`${styles.logowrapper}`}>
              <Link to='/'><img src='/assets/ternoa_logo.svg' className={`${styles.logo}`} alt="logo" /></Link>
            </div>
          </div>

          <div className={`d-flex align-items-center justify-content-center ${styles.wallet_button}`}>
            <div
              className={`font-quick  ${styles.wallet} ${classes.wallet}`}
              onClick={handleConnectWallet}
            >
              <span> {walletAddress}</span>
            </div>
          </div>
        </header>
        :
        <header className={`d-flex align-items-center justify-content-between global-padding pb-16 pt-16 ${styles.header}`}>
          <div className={`d-flex align-items-center justify-content-between ${styles.menu_link}`}>
            <div className={`${styles.logowrapper}`}>
              <Link to='/'><img src='/assets/ternoa_logo.svg' className={`${styles.logo}`} alt="logo" /></Link>
            </div>
            <div className={`d-flex align-items-center justify-content-center ${styles.wallet_button}`}>
              <div
                className={`font-quick  ${styles.wallet} ${classes.wallet}`}
                onClick={handleConnectWallet}
              >
                {walletAddress}
              </div>
            </div>
          </div>
        </header>
      }
    </>
  )
}

export default HeaderPart
