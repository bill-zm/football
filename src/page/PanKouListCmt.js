/**
 * Created by zhangmeng on 2018/5/30.
 */
import React, {Component} from 'react';
import { FormGroup, Table, Pagination, Nav, NavItem, Image} from 'react-bootstrap'
import timelinepointnow from '../img/timelinepointnow.png'
import timelinepoint from '../img/timelinepoint.png'
import integral from '../img/integral.png'
import axios from 'axios';
import {queryper}from '../utils/QueryPer'
import * as glo from '../utils/globle'
import './css/guessrecordt.css'
import { PullToRefresh, ListView, TabBar,Modal, List, Stepper,Button} from 'antd-mobile';
const NUM_ROWS = 20;

let hid = ""
let team1 = ""
let team2 = ""
class PanKouListCmt extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataArr:new Array(),
            dataSource:dataSource.cloneWithRows(new Array()),
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: true,
            modal2:false,
            modal1:false,
            val:0.01,
        };
        if(this.props.location.query){
            let tmp = this.props.location.query.obj
            if(tmp != undefined) {
                hid = this.props.location.query.obj.handicapId
                team1 = this.props.location.query.obj.team1
                team2 = this.props.location.query.obj.team2
                localStorage.setItem(glo.Obj,JSON.stringify(tmp))
                console.log("222222:" + hid)
            }
            else{
                hid = JSON.parse(localStorage.getItem(glo.Obj)).handicapId
                team1 = JSON.parse(localStorage.getItem(glo.Obj)).team1
                team2 = JSON.parse(localStorage.getItem(glo.Obj)).team2
                console.log("111111:" + hid+team1+team2)
            }
        }
        else{
            hid = JSON.parse(localStorage.getItem(glo.Obj)).handicapId
            team1 = JSON.parse(localStorage.getItem(glo.Obj)).team1
            team2 = JSON.parse(localStorage.getItem(glo.Obj)).team2
            console.log("111111:" + hid+team1+team2)
        }
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
    componentDidUpdate() {
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }
    componentDidMount() {
        this.getTaskList()
    }
    onRefresh = () => {
        // this.getTaskList()
        this.setState({
            refreshing: false,
        })
    };
    betClick(index){
        console.log("111"+index)
        this.setState({
            modal2:true,
        })
    }
    detailClick(){
        // this.setState({
        //     modal1:true,
        // })
    }
    render() {
        const row = (rowData, sectionID, rowID) => {
            if(rowID == 0){
                return(
                    <div style={{width: '100%', height: '100px', backgroundColor: '#6e56f8'}}>
                        <div style={{width: '100%', height: '100px', fontSize:'20px',backgroundColor: '#6e56f8',textAlign:'center',color:'white',lineHeight:'100px',}}>
                            {/*<div className="gpdiv-top">*/}
                            {/*<p className="gpnum-p">1</p>*/}
                            {/*<p className="gptitle-p">猜中</p>*/}
                            {/*</div>*/}
                            {/*<div className="gpdiv-top">*/}
                            {/*<p className="gpnum-p">1</p>*/}
                            {/*<p className="gptitle-p">未猜中</p>*/}
                            {/*</div>*/}
                            {/*<div className="gpdiv-top">*/}
                                {/*<p className="gpnum-p">{localStorage.getItem(glo.Spend)}</p>*/}
                                {/*<p className="gptitle-p">押注总ETH</p>*/}
                            {/*</div>*/}
                            {/*<div className="gpdiv-top">*/}
                                {/*<p className="gpnum-p">{localStorage.getItem(glo.Win)}</p>*/}
                                {/*<p className="gptitle-p">赢得总ETH</p>*/}
                            {/*</div>*/}
                            {team1} VS {team2}
                        </div>
                        {/*<div style={{width: '100%', height: '50px', backgroundColor: 'white'}}>*/}
                            {/*<p className="gppv-p">我的区块链地址</p>*/}
                            {/*<p className="gpaddress-p">{localStorage.getItem(glo.UserAddress)}</p>*/}
                        {/*</div>*/}
                    </div>
                )
            }
            // "betId": "B18070101205204383",
            //     "uid": "U18063014233480941",
            //     "address": "H18063014255592679",
            //     "handicapId": "H18063014255592679",
            //     "status": 0,
            //     "target1Num": 0,
            //     "target2Num": 0.01,
            //     "target3Num": 0,
            //     "createTime": "2018-06-30T17:20:52.000+0000",
            //     "team1": "德国",
            //     "team2": "韩国"
            //"startTime": "2018-06-30T06:25:56.000+0000",
            // "endtime": "2018-06-30T06:25:56.000+0000"
            let obj = this.state.dataArr[rowID]
            let teamstr = ""
            if(obj.target1Num != 0){
                teamstr = obj.uid+"已投注"+obj.target1Num +"个ETH压"+obj.team1+"赢"
            }
            else if(obj.target2Num != 0){
                teamstr = obj.uid+"已投注"+ obj.target2Num +"个ETH压"+"平"
            }
            else if(obj.target3Num != 0){
                teamstr = obj.uid+"已投注"+ obj.target3Num +"个ETH压"+obj.team2+"赢"
            }
            let str = ""
            // public static final byte STATUS_FREEZE = 1;
            // public static final byte STATUS_NORMAL = 0;
            // public static final byte STATUS_RESULT = 2
            if(obj.status == 0){
                str = '竞猜中'
            }
            else{
                str = '已结束'
            }
            let arr = obj.startTime.split('.')
            let tmpTime = ""
            if(arr.length > 1){
                tmpTime = arr[0].replace(" ","T")
            }
            console.log("tmpTime: "+tmpTime)
            var d = new Date(tmpTime)
            let year="",mouth="",day=""
            let hour="",minutes="",seconds=""
            year = d.getFullYear()+""
            if(d.getMonth() < 10){
                let mo = d.getMonth()+1
                mouth = "0"+mo
            }
            else{
                mouth = d.getMonth()+1+""
            }
            day = d.getDate()+""
            if(d.getHours() < 10){
                hour = "0"+d.getHours()
            }
            else{
                hour = ""+d.getHours()
            }
            if(d.getMinutes() < 10){
                minutes = "0"+d.getMinutes()
            }
            else{
                minutes = ""+d.getMinutes()
            }
            if(d.getSeconds() < 10){
                seconds = "0"+d.getSeconds()
            }
            else{
                seconds = ""+d.getSeconds()
            }
            let timenum = mouth+"月"+day+"日"
            console.log(222222+timenum+ "  "+hour+"   "+minutes+"  "+seconds)

            let timenum1 = ""
            if(obj.endtime != "") {
                let arr = obj.startTime.split('.')
                let tmpTime = ""
                if (arr.length > 1) {
                    tmpTime = arr[0].replace(" ", "T")
                }
                console.log("tmpTime: " + tmpTime)
                var d = new Date(tmpTime)
                let year = "", mouth = "", day = ""
                let hour = "", minutes = "", seconds = ""
                year = d.getFullYear() + ""
                if (d.getMonth() < 10) {
                    let mo = d.getMonth() + 1
                    mouth = "0" + mo
                }
                else {
                    mouth = d.getMonth() + 1 + ""
                }
                day = d.getDate() + ""
                if (d.getHours() < 10) {
                    hour = "0" + d.getHours()
                }
                else {
                    hour = "" + d.getHours()
                }
                if (d.getMinutes() < 10) {
                    minutes = "0" + d.getMinutes()
                }
                else {
                    minutes = "" + d.getMinutes()
                }
                if (d.getSeconds() < 10) {
                    seconds = "0" + d.getSeconds()
                }
                else {
                    seconds = "" + d.getSeconds()
                }
                timenum1 = mouth + "月" + day + "日"
                console.log(222222 + timenum + "  " + hour + "   " + minutes + "  " + seconds)
            }

            return (
                <div onClick={this.detailClick.bind(this)}>
                    <div style={{width: '100%', height: '30px', backgroundColor: '#EFF0F4'}}>
                        <p style={{marginLeft:'15px',color:'#999',fontSize:'11px',position:'absolute',marginTop:'10px'}}>{timenum} 赛事</p>
                    </div>
                    <div style={{width: '100%', height: '100px', backgroundColor: '#EFF0F4'}}>
                        <div className="gdiv-item">
                            <p className="gp-name">{obj.team1} vs {obj.team2}</p>
                            <p className="gp-number">{teamstr}</p>
                            <p className="gp-time">{timenum1}截止</p>
                            {/*<p className="gp-state">{str}</p>*/}
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <div style={{width:'100%',height:'100%'}}>
                <ListView
                    // key={this.state.useBodyScroll ? '0' : '1'}
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    // renderFooter={() => (<div style={{textAlign: 'center' }}>
                    //     {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    // </div>)}
                    renderRow={row}
                    // renderSeparator={separator}
                    useBodyScroll={this.state.useBodyScroll}
                    style={this.state.useBodyScroll ? { height: '100%',
                        backgroundColor:'#EFF0F4'} : {
                        height: '100%',
                        backgroundColor:'#EFF0F4'
                    }}
                    pullToRefresh={<PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}
                    // onEndReached={this.onEndReached}
                    pageSize={5}
                />

                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title="详细规则"
                    footer={[{ text: '同意', onPress: () => { console.log('ok'); this.onClose('modal1')(); } ,style:{marginLeft:'15px',marginRight:'15px',marginBottom:'10px',borderRadius:'20px',lineHeight:'40px',height:'40px',backgroundColor:'#4C7CFA',color:'white'}}]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div style={{ textAlign:'left',height: '220px', lineHeight:'20px',color:'#262626',fontSize:'12px',overflow: 'scroll' }}>
                        1.每场比赛最多参与3次，每次不限选项。每次投注最低0.01ETH，最高10ETH。<br />
                        2.猜中比赛结果则赢得本场竞猜，未猜中则输掉ETH；赢家按照投注占比赢取ETH<br />
                        3.派奖计算计算公式：用户A赢取ETH数 = 用户A投注ETH x (1 + 所有未猜中用户投注ETH总数/所有猜中投注ETH总数)<br />
                        4.若比赛取消或因特殊情况未能确定比赛结果，投注ETH全部退回<br />
                        5.所有比赛投注信息全部记录在区块链上，保证公平公正公开<br />
                    </div>
                </Modal>
            </div>
        )
    }
    getTaskList() {  ///api/v1/executions?status=REVIEWED_APPROVE&userId=13826666362

        let url = glo.urlhttp + '/game/api/v1/fbg/game/bets?hid='+hid+'&token='+localStorage.getItem(glo.Token)
        console.log("111:" + url +localStorage.getItem(glo.Token))
        let tmpthis = this;
        let config = {
            // headers: {'Content-Type': 'application/json'},
            dataType: 'jsonp'
        };  //添加请求头
        axios.get(url,config)
            .then(function (response) {
                // taskData = response
                console.log("33333 : " + JSON.stringify(response));
                // if(response.data.code == 200){
                // tmpthis.rData = genData();
                let data = {
                    da:1,
                };
                let dataarr = response.data.data.content
                console.log('22222' + JSON.stringify(dataarr))
                dataarr.splice(0, 0, data)
                if(response.data.code == 200){
                    tmpthis.setState({
                        dataArr:dataarr,
                        dataSource: tmpthis.state.dataSource.cloneWithRows(dataarr),
                        height: 10,
                        refreshing: false,
                        isLoading: false,
                    })
                    console.log("33333 : " + JSON.stringify(response.data.data.content));
                }
                else{
                    let data = [{
                        da:1,
                    }];
                    let dataarr = data
                        tmpthis.setState({
                            dataArr:dataarr,
                            dataSource: tmpthis.state.dataSource.cloneWithRows(dataarr),
                            height: 10,
                            refreshing: false,
                            isLoading: false,
                        })
                }
            })
            .catch(function (error) {
                let data = [{
                    da:1,
                }];
                let dataarr = data
                tmpthis.setState({
                    dataArr:dataarr,
                    dataSource: tmpthis.state.dataSource.cloneWithRows(dataarr),
                    height: 10,
                    refreshing: false,
                    isLoading: false,
                })
            });
    }
}

export default PanKouListCmt;
