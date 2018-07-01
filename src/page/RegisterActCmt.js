/**
 * Created by zhangmeng on 2018/6/22.
 */
import React, {Component} from 'react';
import { Modal, List, Stepper,Button, WhiteSpace, WingBlank ,Toast,ActivityIndicator} from 'antd-mobile';
import './css/registeractcmt.css'
import axios from 'axios';
import * as glo from '../utils/globle'
class RegisterActCmt extends Component {
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
        var re = /^1\d{10}$/ //以1开始后面加10位数字
        if (re.test(this.refs.phone.value)) {
        } else {
            this.showToast("手机号格式错误");
            return
        }
    // /api/v1/register/sms
        let url = glo.urlhttp + '/api/v1/register/sms?phNo='+this.refs.phone.value+'&type=1'
        let tmpthis = this;
        let config = {
            headers: {'Content-Type': 'application/json'},
        };  //添加请求头
        console.log("111:" + url)
        axios.get(url,config)
            .then(function (response) {
                // taskData = response
                console.log(JSON.stringify(response));
                // if(response.data.code == 200){
                // tmpthis.rData = genData();
                // let data = {
                //     da:1,
                // };
                // let dataarr = response.data.content
                // console.log('22222' + JSON.stringify(dataarr))
                // dataarr.splice(0, 0, data)
                // tmpthis.setState({
                //     dataArr:dataarr,
                //     dataSource: tmpthis.state.dataSource.cloneWithRows(dataarr),
                //     height: 10,
                //     refreshing: false,
                //     isLoading: false,
                // })
                // console.log("33333 : " + JSON.stringify(response.data.data.content));
                // }
            })
            .catch(function (error) {

            });
    }
    showToast(str) {
    Toast.info(str, 2);
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
                         <input ref="address" className="input-text" placeholder="以太坊地址"/>
                     </div>
                 </div>
                 <footer>
                     <div className="div3" onClick={this.submitClick.bind(this)}>
                         注册
                     </div>
                 </footer>

                 <ActivityIndicator
                     toast
                     text="正在注册..."
                     animating={this.state.animating}
                 />
             </div>
     );
    }
    submitClick() {  ///api/v1/executions?status=REVIEWED_APPROVE&userId=13826666362
        let url = glo.urlhttp + '/user/api/v1/register'
        console.log("111:" + url)

        if(this.refs.phone.value == ""){
            this.refs.phone.focus()
            return
        }
        if(this.refs.authcode.value == ""){
            this.refs.authcode.focus()
            return
        }
        if(this.refs.password.value == ""){
            this.refs.password.focus()
            return
        }
        if(this.refs.surepassword.value == ""){
            this.refs.surepassword.focus()
            return
        }
        if(this.refs.address.value == ""){
            this.refs.address.focus()
            return
        }
        if(this.refs.password.value != this.refs.surepassword.value){
            this.showToast('密码与确认密码不一致')
            return
        }
        if (this.refs.password.value.length < 6 || this.refs.password.value.length > 15) {
            this.showToast("密码长度在6-15之间")
            return;
        }
        this.setState({
            animating:true,
        })
        let tmpthis = this;
        let data = {
            "address":this.refs.address.value,
            "password": this.refs.password.value,
            "userName": this.refs.phone.value,
        };
        console.log(this.refs.address.value + this.refs.password.value + this.refs.phone.value)
        let config = {
            headers: {'Content-Type': 'application/json'}
        };  //添加请求头
        axios.post(url,data,config)
            .then(function (response) {
                // taskData = response
                tmpthis.setState({
                    animating:false,
                })
                console.log(response.data.code);
                if(response.data.code == 200){
                    tmpthis.showToast('注册成功')
                    tmpthis.props.history.goBack()
                }
                else if(response.data.code == 4001){
                    tmpthis.showToast('用户已存在')
                }
                else{
                    tmpthis.showToast('注册失败')
                }
            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
                tmpthis.setState({
                    animating: false,
                })
                if(error != '{}') {
                    tmpthis.showToast('注册失败1')
                }
            });
    }
}
export default RegisterActCmt;