/**
 * Created by zhangmeng on 2018/5/30.
 */
import React, {Component} from 'react';
import './css/checkclerk.css'
import defaultImg from '../img/defaultHeadImg.png'
import {Link} from 'react-router-dom'
import QRCode from 'qrcode-react'
import * as glo from '../utils/globle'
import { PullToRefresh, ListView, TabBar,Modal, List, Stepper,Button,WhiteSpace} from 'antd-mobile';
import settingmore from '../img/setting_more.png'
const prompt = Modal.prompt;
class PersonCenterCmt extends Component {
    constructor(props) {
        super(props);
        let uername = "立即登录"
        let isnamehid = '立即登录进行竞猜'
        if(localStorage.getItem(glo.UserName)){
            uername = localStorage.getItem(glo.UserName)
        }
        if(localStorage.getItem(glo.UserAddress)){
            isnamehid = localStorage.getItem(glo.UserAddress)
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
        };
    }

    componentDidUpdate() {

    }
    componentDidMount() {

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
        prompt('提现', '', [
            { text: '取消' },
            { text: '提现', onPress: value => console.log(`输入的内容:${value}`) },
        ], 'default', '')
    }
    render() {
        return (
            <div style={{backgroundColor:'white',height:'100%'}}>
                <div className="div-top">
                    <p className="p-title">个人中心</p>
                    <img src={defaultImg}/>
                    <Link to='/logincmt'>
                        <div className="btn-login">{this.state.username}</div>
                    </Link>
                    <div className="p-hint">{this.state.isnamehid}</div>
                </div>
                <div className="setting-div1">
                    <p className="p-setting">我的ETH</p>
                    <p className="p-ethnum">10</p>
                </div>
                <Link to="/guessrecordcmt">
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
                    footer={[{ text: '同意', onPress: () => { console.log('ok'); this.onClose('modal1')(); } ,style:{marginLeft:'15px',marginRight:'15px',marginBottom:'10px',borderRadius:'20px',lineHeight:'40px',height:'40px',backgroundColor:'#4C7CFA',color:'white'}}]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div style={{ textAlign:'center',height: '240px', lineHeight:'20px',color:'#262626',fontSize:'12px',overflow: 'scroll' }}>
                        <QRCode
                            value={this.props.qucodeurl}
                            size={this.state.size}
                            fgColor={this.state.fgColor}
                            bgColor={this.state.bgColor}
                            level={this.state.level}
                        />
                        <p>充值ETH地址</p>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default PersonCenterCmt;
