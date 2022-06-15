import React, { useState } from "react";

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import StakeButton from "../../atoms/StakeButton"
import styles from './index.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, updateItem } from '../../../redux/actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    title: {
      color: theme.palette.text.primary
    },
    fluff: {
      color: theme.syscolor.light
    },
    textField: {
      background: 'rgba(0, 66, 53, 0.1)',
      borderColor: alpha(`${theme.syscolor.light}`, 0.5),
      borderWidth: '2px',
      '& input': {
        borderColor: alpha(`${theme.syscolor.light}`, 0.5)
      }
    },
    neutral: {
      color: theme.syscolor.neutral
    },
    smallFont: {
      fontSize: '0.7rem !important'
    }
  })
)

const NftItem = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const value = useSelector((state: any) => state.global.items)
  const [amount, setAmount] = useState<Number>(0);

  const handleChangeAmount = (event: any) => {
    setAmount(parseInt(event.target.value))
  }
  const handleDeleteItem = async (index: any) => {
    let param = value[index]
    dispatch(deleteItem(param, value))
  }
  const handleUpdateItem = async (index: any) => {
    let param = {
      _id: value[index]._id,
      itemName: value[index].itemName,
      itemAmount: amount,
      _v: 0
    }
    dispatch(updateItem(param, value))
  }

  return (
    <div className={`col-12`}>
      <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
        <Grid item md={6} xs={6} className={`pr-8`}>
          <div className={`imageWrapper`}>
            <div className={`imageOver`}>
              <img src="/assets/marts/pearl.png" alt="Right" />
            </div>
          </div>
        </Grid>

        <Grid item md={6} xs={6} container direction="row" justifyContent="space-between" alignItems="center" className={`pl-8`}>
          <Grid item md={12} xs={12} className={`mb-8`}>
            <p className={`${styles.title} ${classes.title}`}>Name : {props.info.itemName}</p>
            <p className={`${styles.title} ${classes.title}`}>Amount : {props.info.itemAmount}</p>
          </Grid>
          <Grid item md={6} xs={6} className={`mb-4 pr-4`}>
            <p className={`font-12 ${styles.title} ${classes.title}`}>{props.info.itemAmount} piece</p>
          </Grid>
          <Grid item md={6} xs={6} className={`mb-4 pl-4`}>
            <StakeButton
              fullWidth={true}
              className={`pt-0 pr-4 pb-0 pl-4 font-700 ${classes.smallFont}`}
              onClick={() => { handleDeleteItem(props.index) }}
            >
              Delete
            </StakeButton>
          </Grid>
          <Grid item md={6} xs={6} className={`mb-4 pr-4`}>
            <TextField fullWidth variant="outlined" size='small' defaultValue={0} onChange={(event) => handleChangeAmount(event)} placeholder="Amount" className={`font-12 ${classes.textField} ${styles.textField}`} />
          </Grid>
          <Grid item md={6} xs={6} className={`mb-4 pl-4`}>
            <StakeButton
              fullWidth={true}
              className={`pt-0 pr-4 pb-0 pl-4 font-700 ${classes.smallFont}`}
              onClick={() => { handleUpdateItem(props.index) }}
            >
              Update
            </StakeButton>
          </Grid>
          <Grid item md={12} xs={12}>
            <p className={`${styles.descript} ${classes.neutral}`}>Minimum of 5 pieces</p>
            <p className={`${styles.descript} ${classes.neutral}`}>Conversion: 500 Pearls ~ 25000 FLUFF</p>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default NftItem;
