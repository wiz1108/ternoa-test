import api from '../../configs/api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export const setConnectFlag = (param: any) => async (dispatch: any) => {
    dispatch({
        type: 'SET_CONNECT_FLAG',
        payload: param
    })
}

export const getItem = () => async (dispatch: any) => {
    try {
        await api.post("/item/getItem").then(response => {
            const result = response.data
            if (result.success) {
                dispatch({
                    type: 'GET_ITEM',
                    payload: result.data
                })
                toast.success('Get items success!', { theme: 'light' })
            }
            else {
                toast.error('Get items failed!', { theme: 'dark' })
            }
        });
    } catch (error) {
        toast.error('Get items failed!', { theme: 'dark' })
    }
}

export const addItem = (params: any, value: any) => async (dispatch: any) => {
    try {
        await api.post("/item/addItem", params).then(response => {
            const result = response.data

            if (result.success) {
                let newParams = [...value, result.data]
                dispatch({
                    type: 'ADD_ITEM',
                    payload: newParams
                })
                toast.success('Adding items success!', { theme: 'light' })
            }
            else {
                toast.error("Adding item failed!", { theme: 'dark' })
            }
        });
    } catch (error) {
        toast.error("Backend Server Failed!", { theme: 'dark' })
    }
}

export const deleteItem = (params: any, value: any) => async (dispatch: any) => {
    try {
        await api.post("/item/deleteItem", params).then(response => {
            const result = response.data

            if (result.success) {
                let temp = [...value]
                let newParam: any[] = []
                for (var i = 0; i < temp.length; i++) {
                    if (params._id !== temp[i]._id) newParam.push(temp[i])
                }

                dispatch({
                    type: 'DELETE_ITEM',
                    payload: newParam
                })
                toast.success('Delete items success!', { theme: 'light' })
            }
            else {
                toast.error('Delete items failed!', { theme: 'dark' })
            }
        });
    } catch (error) {
        toast.error("Backend Server Failed!", { theme: 'dark' })
    }
}

export const updateItem = (param: any, value: any) => async (dispatch: any) => {
    try {
        await api.post("/item/updateItem", param).then(response => {
            const result = response.data

            if (result.success) {
                let temp = [...value]
                let newParam: any[] = []
                for (var i = 0; i < temp.length; i++) {
                    if (result.data._id === temp[i]._id) newParam.push(result.data)
                    else newParam.push(temp[i])
                }

                dispatch({
                    type: 'UPDATE_ITEM',
                    payload: newParam
                })
                toast.success('Update items success!', { theme: 'light' })
            }
            else {
                toast.error('Update items failed!', { theme: 'dark' })
            }
        });
    } catch (error) {
        toast.error("Backend Server Failed!", { theme: 'dark' })
    }
}