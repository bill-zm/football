/**
 * Created by zhangmeng on 2018/6/7.
 */
import React, {Component} from 'react';
import { Modal, List, Stepper,Button, WhiteSpace, WingBlank ,Toast} from 'antd-mobile';

export const urlhttp  = "http://192.168.1.125:8090";
export const UserName = "UserName"
export const UserAddress = "UserAddress"
export const Uid = "Uid"
export const Balance = "Balance"
export const showToast = (str) => {
    Toast.info(str, 2);
}
//http://222.95.144.4:8081/api/v1/user-account