/**
 * Created by zhangmeng on 2018/6/25.
 */
/**
 * Created by zhangmeng on 2018/6/22.
 */
import React, {Component} from 'react';
import { Modal, List, Stepper,Button, WhiteSpace, WingBlank ,Toast} from 'antd-mobile';
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
        let url = glo.urlhttp + '/api/v1/user/login'
        console.log("111:" + url)

        if(this.refs.phone.value == ""){
            this.refs.phone.focus()
            return
        }
        if(this.refs.password.value == ""){
            this.refs.password.focus()
            return
        }
        this.setState({
            animating:true,
        })
        let tmpthis = this;
        let data = {
            "password": this.refs.password.value,
            "userName": this.refs.phone.value,
        };
        console.log(this.refs.password.value + this.refs.phone.value)

        axios.post(url,data)
            .then(function (response) {
                // taskData = response
                tmpthis.setState({
                    animating:false,
                })
                console.log(JSON.stringify(response));
                if(response.data.status == 200){
                    this.props.history.goBack()
                }
                else{
                    glo.showToast('登录失败')
                }
            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
                glo.showToast('登录失败')
                tmpthis.setState({
                    animating:false,
                })
            });
    }
    btnRegisterClick(){

    }
    render(){
        return(
            <div style={{backgroundColor:'white',height:'100%'}}>
                <div className="div-regname">
                    登录
                </div>
                <div className="div-first">
                    <div className="div3-img1">
                        <input id="phone" type="number" className="input-text" placeholder="用户名"/>
                    </div>
                </div>
                <div className="div1">
                    <div className="div3-img1">
                        <input id="password" type="password" className="input-text" placeholder="密码"/>
                    </div>
                </div>
                <footer>
                    <div className="div3" onClick={this.submitClick.bind(this)}>
                        登录
                    </div>
                    <Link to='/registeractcmt'>
                        <p className="p-register" onClick={this.btnRegisterClick.bind(this)}>注册</p>
                    </Link>
                </footer>
            </div>
        );
    }

}
export default LoginCmt;