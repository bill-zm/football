/**
 * Created by zhangmeng on 2018/6/25.
 */
/**
 * Created by zhangmeng on 2018/6/22.
 */
import React, {Component} from 'react';
import { Modal, List, Stepper,Button, WhiteSpace, WingBlank ,Toast,ActivityIndicator} from 'antd-mobile';
import './css/logincmt.css'
import {Link} from 'react-router-dom'
import axios from 'axios';
import * as glo from '../utils/globle'

class LoginCmt extends Component {
    constructor(pros){
        super(pros)
        this.state = {
            modal2:true,
            val:0.01,
            animating:false,
        };
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    onChange = (val) => {
        console.log(val)
        // console.log(val);
        this.setState({ val });
    }
    authcodeClick(){

    }
    submitClick(){
        let url = glo.urlhttp + '/user/api/v1/user/login'///user/api/v1/register
        console.log("111:" + url)

        if(this.refs.loginphone.value == ""){
            this.refs.loginphone.focus()
            return
        }
        if(this.refs.loginpassword.value == ""){
            this.refs.loginpassword.focus()
            return
        }
        this.setState({
            animating:true,
        })
        let tmpthis = this;
        let data = {
            "password": this.refs.loginpassword.value,
            "userName": this.refs.loginphone.value,
        };
        console.log(this.refs.loginpassword.value + this.refs.loginphone.value)
        let config = {
            headers: {
                // 'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json',
            },
        };  //
        axios.post(url,data,config)
            .then(function (response) {
                // taskData = response
                tmpthis.setState({
                    animating:false,
                })
                console.log(JSON.stringify(response));
                if(response.data.code == 200){
                    localStorage.setItem(glo.UserName,data.userName)
                    localStorage.setItem(glo.UserAddress,response.data.data.tbAccount.address)
                    localStorage.setItem(glo.Uid,response.data.data.userRelationship.uid)
                    localStorage.setItem(glo.Balance,response.data.data.tbAccount.balance)
                    localStorage.setItem(glo.Spend,response.data.data.tbAccount.spend)
                    localStorage.setItem(glo.Win,response.data.data.tbAccount.win)
                    localStorage.setItem(glo.Token,response.data.data.token)
                    tmpthis.props.history.goBack()
                }
                else{
                    console.log("111"+response.data.code);
                    glo.showToast('登录失败')
                    localStorage.removeItem(glo.UserName)
                    localStorage.removeItem(glo.UserAddress)
                    localStorage.removeItem(glo.Uid)
                    localStorage.removeItem(glo.Balance)
                    localStorage.removeItem(glo.Spend)
                    localStorage.removeItem(glo.Win)
                    localStorage.removeItem(glo.Token)
                }
            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
                tmpthis.setState({
                    animating: false,
                })
                if(error != '{}') {
                    localStorage.removeItem(glo.UserName)
                    localStorage.removeItem(glo.UserAddress)
                    localStorage.removeItem(glo.Uid)
                    localStorage.removeItem(glo.Balance)
                    localStorage.removeItem(glo.Spend)
                    localStorage.removeItem(glo.Win)
                    localStorage.removeItem(glo.Token)
                    glo.showToast('登录失败')
                }
            });
    }
    render(){
        return(
            <div style={{backgroundColor:'white',height:'100%'}}>
                <div className="div-regname">
                    登录
                </div>
                <div className="div-first">
                    <div className="div3-img1">
                        <input ref="loginphone" type="number" className="input-text" placeholder="用户名"/>
                    </div>
                </div>
                <div className="div1">
                    <div className="div3-img1">
                        <input ref="loginpassword" type="password" className="input-text" placeholder="密码"/>
                    </div>
                </div>
                    <div className="div3" onClick={this.submitClick.bind(this)}>
                        登录
                    </div>
                    <Link to='/registeractcmt'>
                        <p className="p-register">注册</p>
                    </Link>

                <ActivityIndicator
                    toast
                    text="正在登录..."
                    animating={this.state.animating}
                />
            </div>
        );
    }
}
export default LoginCmt;