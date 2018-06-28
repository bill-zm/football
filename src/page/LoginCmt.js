/**
 * Created by zhangmeng on 2018/6/25.
 */
/**
 * Created by zhangmeng on 2018/6/22.
 */
import React, {Component} from 'react';
import { Modal, List, Stepper,Button, WhiteSpace, WingBlank } from 'antd-mobile';
import './css/logincmt.css'
import {Link} from 'react-router-dom'
class LoginCmt extends Component {
    constructor(pros){
        super(pros)
        this.state = {
            modal2:true,
            val:0.01,
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
                        <input id="put-phone" type="number" className="input-text" placeholder="用户名"/>
                    </div>
                </div>
                <div className="div1">
                    <div className="div3-img1">
                        <input id="put-password" type="password" className="input-text" placeholder="密码"/>
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