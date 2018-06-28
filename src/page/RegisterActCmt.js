/**
 * Created by zhangmeng on 2018/6/22.
 */
import React, {Component} from 'react';
import { Modal, List, Stepper,Button, WhiteSpace, WingBlank } from 'antd-mobile';
import './css/registeractcmt.css'
import axios from 'axios';
import * as glo from '../utils/globle'
class RegisterActCmt extends Component {
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
    render(){
     return(
             <div style={{backgroundColor:'white',height:'100%'}}>
                 <div className="div-regname">
                     注册
                 </div>
                 <div className="div-first">
                     <div className="div3-img1">
                         <input ref="phone" type="number" className="input-text" placeholder="电话号码"/>
                     </div>
                 </div>

                 <div className="div1">
                     <div className="div3-img2">
                         <input ref="authcode" type="text" className="div-auth-code" placeholder="验证码"/>
                     </div>
                     <button className="div-psend" id="second-p" onClick={this.authcodeClick.bind(this)}>获取</button>
                 </div>

                 <div className="div1">
                     <div className="div3-img1">
                         <input ref="password" type="password" className="input-text" placeholder="账户密码"/>
                     </div>
                 </div>

                 <div className="div1">
                     <div className="div3-img1">
                         <input ref="surepassword" type="password" className="input-text" placeholder="确认密码"/>
                     </div>
                 </div>
                 <div className="div1">
                     <div className="div3-img1">
                         <input ref="address" type="password" className="input-text" placeholder="以太坊地址"/>
                     </div>
                 </div>
                 <footer>
                     <div className="div3" onClick={this.submitClick.bind(this)}>
                         注册
                     </div>
                 </footer>
             </div>
     );
    }
    submitClick() {  ///api/v1/executions?status=REVIEWED_APPROVE&userId=13826666362
        let url = glo.urlhttp + '/api/v1/register'
        console.log("111:" + url)
        let tmpthis = this;
        let data = {
            "address":this.refs.address.value,
            "password": this.refs.password.value,
            "userName": this.refs.phone.value,
        };
        console.log(this.refs.address.value + this.refs.password.value + this.refs.phone.value)
        axios.post(url,data)
            .then(function (response) {
                // taskData = response
                console.log(JSON.stringify(response));
                if(response.data.code == 200){
                    // tmpthis.rData = genData();
                    tmpthis.setState({
                        dataArr:response.data.data.content,
                        dataSource: tmpthis.state.dataSource.cloneWithRows(response.data.data.content),
                        height: 10,
                        refreshing: false,
                        isLoading: false,
                    })
                    console.log("33333 : " + JSON.stringify(response.data.data.content));
                }
            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
            });
    }
}
export default RegisterActCmt;