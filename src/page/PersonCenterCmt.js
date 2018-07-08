/**
 * Created by zhangmeng on 2018/5/30.
 */
import React, {Component} from 'react';
import './css/checkclerk.css'
import defaultImg from '../img/defaultHeadImg.png'
import {Link,withRouter} from 'react-router-dom'
import QRCode from 'qrcode-react'
import * as glo from '../utils/globle'
import axios from 'axios';
import { PullToRefresh, ListView, TabBar,Modal, List, Stepper,Button,WhiteSpace} from 'antd-mobile';
import settingmore from '../img/setting_more.png'
const prompt = Modal.prompt;
class PersonCenterCmt extends Component {
    constructor(props) {
        super(props);
        let uername = "立即登录"
        let isnamehid = '立即登录进行竞猜'
        let ethnum = 0
        if(localStorage.getItem(glo.UserName)){
            uername = localStorage.getItem(glo.UserName)
        }
        if(localStorage.getItem(glo.UserAddress)){
            isnamehid = localStorage.getItem(glo.UserAddress)
        }
        if(localStorage.getItem(glo.Balance)){
            ethnum = localStorage.getItem(glo.Balance)
        }
        this.state = {
            modal1:false,
            value: 'http://picturesofpeoplescanningqrcodes.tumblr.com/',
            size: 200,
            fgColor: '#000000',
            bgColor: '#ffffff',
            level: 'L',
            username:uername,
            isnamehid:isnamehid,
            ethnum:ethnum,
        };
        console.log('55555'+this.props.num)
    }

    componentDidUpdate() {

    }
    componentDidMount(){
        this.props.onRef(this)
        this.getUserData()
    }

    componentWillMount() {
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    rechargeClick(){
        this.setState({
            modal1: true,
        });
    }
    withdraw(){
        if(!localStorage.getItem(glo.Uid)){
            this.props.history.push("/logincmt");
            return
        }
        prompt('提现', '', [
            { text: '取消' },
            { text: '提现', onPress: value => this.withDrawHttp(value) },
        ], 'default', '')
    }
    withDrawHttp(value){
        if(value == "" || value == undefined){
            glo.showToast('请先输入ETH数量')
            return
        }
        // if(parseFloat(value) > parseFloat(localStorage.getItem(glo.Balance))){
        //     glo.showToast('超出账户ETH数量')
        //     return
        // }
        if(parseFloat(value) < 0.005){
            glo.showToast('提现数量必须大于0.005')
            return
        }
        let url = glo.urlhttp + '/eth/api/v1/eth/send?uid='+localStorage.getItem(glo.Uid)+'&value='+value+'&token='+localStorage.getItem(glo.Token)
        let tmpthis = this;
        let config = {
            headers: {'Content-Type': 'application/json'},
        };  //添加请求头
        console.log("111:" + url)
        axios.get(url,config)
            .then(function (response) {
                // taskData = response
                console.log(JSON.stringify(response));

                if(response.data.code == 200){
                    glo.showToast('提现成功')
                    this.getUserData()
                }
                else{
                    glo.showToast(response.data.msg)
                }
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
                glo.showToast('提现失败')
            });
    }
    render() {
        return (
            <div style={{backgroundColor:'white',height:'100%'}}>
                <div className="div-top">
                    {/*<p className="p-title">个人中心</p>*/}
                    <p className="p-title"></p>
                    <img src={defaultImg}/>
                    <Link to='/logincmt'>
                        <div className="btn-login">{this.state.username}</div>
                    </Link>
                    <div className="p-hint">{this.state.isnamehid}</div>
                </div>
                <div className="setting-div1">
                    <p className="p-setting">我的ETH</p>
                    <p className="p-ethnum">{this.state.ethnum}</p>
                </div>
                <Link to={localStorage.getItem(glo.Uid)?"/guessrecordcmt":"/logincmt"}>
                    <div className="setting-div1">
                        <p className="p-setting">竞猜记录</p>
                        <img className="img-more" src={settingmore}/>
                        <p className="set-line"></p>
                    </div>
                </Link>
                <div className="setting-div1" onClick={this.rechargeClick.bind(this)}>
                    <p className="p-setting">充值</p>
                    <img className="img-more" src={settingmore}/>
                </div>
                <div className="setting-div1" onClick={this.withdraw.bind(this)}>
                    <p className="p-setting">提现</p>
                    <img className="img-more" src={settingmore}/>
                </div>

                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title="充值"
                    footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal1')(); } ,style:{marginLeft:'15px',marginRight:'15px',marginBottom:'10px',borderRadius:'20px',lineHeight:'40px',height:'40px',backgroundColor:'#6b56f7',color:'white'}}]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div style={{ textAlign:'center',height: '300px',color:'#262626',fontSize:'12px',overflow: 'scroll' }}>
                        <p style={{color:'red'}}>请务必从注册的钱包地址转入</p>
                        <QRCode
                            value='0x16F7498C95A57669209D9B2Cdc9ad98b8386b87b'  //0x87bC630F9aaC634EBFf4A0adAf2d4Ec9Fe36519D
                            size={this.state.size}
                            fgColor={this.state.fgColor}
                            bgColor={this.state.bgColor}
                            level={this.state.level}
                        />
                        <p>充值ETH地址<br/>0x16F7498C95A57669209D9B2Cdc<br/>9ad98b8386b87b</p>
                    </div>
                </Modal>
            </div>
        );
    }
    getUserData(){
        let url = glo.urlhttp + '/user/api/v1/account/info?accountId='+localStorage.getItem(glo.Uid)+'&address=""'+'&token='+localStorage.getItem(glo.Token)
        let tmpthis = this;
        let config = {
            headers: {'Content-Type': 'application/json'},
        };  //添加请求头
        console.log("111:" + url)
        axios.get(url,config)
            .then(function (response) {
                // taskData = response
                console.log(JSON.stringify(response));

                if(response.data.code == 200){
                    localStorage.setItem(glo.Spend,response.data.data.spend)
                    localStorage.setItem(glo.Win,response.data.data.win)
                    tmpthis.setState({
                        ethnum:response.data.data.balance
                    })
                }
                else{

                }
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
}

export default withRouter(PersonCenterCmt);
