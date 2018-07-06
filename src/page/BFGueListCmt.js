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
import './css/fastcoinlist.css'
import ethimg from '../img/football_eth.jpeg'
import {Link,withRouter} from 'react-router-dom'
import wulaigui from '../img/wulagui.ico'
import england from '../img/england.ico'
import france from '../img/france.ico'
import brazil from '../img/brazil.ico'
import belgium from '../img/belgium.png'
import sweden from '../img/sweden.png'
import russia from '../img/russia.png'
import croatia from '../img/croatia.png'
import colombia from '../img/colombia.png'
import { PullToRefresh, ListView, TabBar,Modal, List, Stepper,Button} from 'antd-mobile';
const NUM_ROWS = 20;
let type = 0;
let selectNum = 1;
let ethNum = 0;
class BFGueListCmt extends Component {
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
            val:0.00001,
        };
    }

    componentDidMount() {
        this.getTaskList()
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    onClose1 = key => () => {
        this.setState({
            [key]: false,
        });
        if(!localStorage.getItem(glo.Uid)){
            // const location = {
            //     pathname: '/logincmt',
            //     // state: {fromDashboard: true},
            //     // props: {datacard: this.state.listDataArr[index-1]}
            // }
            // this.props.history.push(location)
            this.props.history.push("/logincmt");
            // glo.showToast('请先登录')
            return
        }
        // if(parseFloat(this.state.val) > parseFloat(localStorage.getItem(glo.Balance))){
        //     glo.showToast('超出账户ETH数量')
        //     return
        // }
        let url = glo.urlhttp + '/game/api/v1/fbg/game/bet?'+'token='+localStorage.getItem(glo.Token)//+glo.TokenUrl  ///user/api/v1/register
        let data
        let obj = this.state.dataArr[selectNum]
        console.log(obj)
        if(type == 0) {
            data = {
                'address': obj.handicapId,
                'handicapId': obj.handicapId,
                "target1Num": this.state.val,
                "uid": localStorage.getItem(glo.Uid)
            }
        }
        else if(type == 1) {
            data = {
                'address': obj.handicapId,
                'handicapId': obj.handicapId,
                "target2Num": this.state.val,
                "uid": localStorage.getItem(glo.Uid)
            }
        }
        else if(type == 2) {
            data = {
                'address': obj.handicapId,
                'handicapId': obj.handicapId,
                "target3Num": this.state.val,
                "uid": localStorage.getItem(glo.Uid)
            }
        }
        console.log('1111'+JSON.stringify(data) + obj.handicapId);
        let tmpthis = this;
        console.log('222'+url);
        axios.post(url,data)
            .then(function (response) {
                // taskData = response
                tmpthis.setState({
                    animating:false,
                })
                console.log(JSON.stringify(response));
                if(response.data.code == 200){
                    glo.showToast('投注成功')
                    tmpthis.getTaskList()
                }
                else{
                    console.log("111"+response.data.code);
                    glo.showToast(response.data.msg)
                }
            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
                tmpthis.setState({
                    animating: false,
                })
                if(error != '{}') {
                    glo.showToast('投注失败')
                }
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
    onRefresh = () => {
        // this.getTaskList()
        this.setState({
            refreshing: false,
        })
    };
    betClick(index,sel){
        type = index
        selectNum = sel
        console.log("111"+index)
        this.setState({
            modal2:true,
        })
    }
    detailClick(){
        this.setState({
            modal1:true,
        })
    }
    moreAddreeClick(){

    }
    render() {
        const row = (rowData, sectionID, rowID) => {
            // "handicapId": "H18063014255592679",
            //     "team1": "德国",
            //     "team2": "韩国",
            //     "startTime": "2018-06-30T06:25:56.000+0000",
            //     "endTime": "2018-06-30T06:25:56.000+0000",
            //     "title": "test title",
            //     "target3": 0.0002,
            //     "target2": 0.0003,
            //     "target1": 0.0005,
            //     "status": 2
            let obj = this.state.dataArr[rowID]
            if(rowID == 0){
                return(
                    <div style={{width: '100%',height: '250px',backgroundColor:'white',position:'relative',textAlign:'center'}}>
                        {/*<div className="bf-topdiv" style={{width: '100%',height: '200px'}}>*/}

                        {/*</div>*/}
                        <img className="bf-topdiv" src={ethimg} />
                        {/*<p className="p-titletop">ETH竞猜世界杯</p>*/}
                        <button className="btn-detail" onClick={this.detailClick.bind(this)}></button>
                    </div>
                )
            }
            else {
                let p1 = parseInt((obj.target1/(obj.target1+obj.target3)) * 100)
                let p2 = parseInt((obj.target2/(obj.target1+obj.target3)) * 100)
                let p3 = parseInt((obj.target3/(obj.target1+obj.target3)) * 100)
                if(obj.target1 == 0){
                    p1 = 0
                }
                if(obj.target2 == 0){
                    p2 = 0
                }
                if(obj.target3 == 0){
                    p3 = 0
                }
                if(p1+p3 != 100){
                    if(p1 != 0 && p3 != 0){
                        p3 = 100 - p1
                    }
                }
                console.log("p11111: "+p1)
                console.log("p2: "+p2)
                console.log("p3: "+p3)
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
                    hour = "0"+(d.getHours()-2)
                }
                else{
                    hour = ""+(d.getHours()-2)
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
                let timenum = mouth+"月"+day+"日 "+hour.toString()+":"+minutes.toString()
                console.log(222222+timenum+ "  "+hour+"   "+minutes+"  "+seconds)
                console.log((obj.target1+obj.target2+obj.target3).toFixed(4));


                let imgc1 = this.getContoryData(obj.team1)
                let imgc2 = this.getContoryData(obj.team2)
                return (
                    <div style={{width: '100%', height: '260px', backgroundColor: '#EFF0F4'}}>
                        <div className="div-item">
                            <p className="p-fname">{obj.title}</p>
                            <p className="p-ftime">{timenum}截止</p>
                            <div className="div-competition">
                                <div className="con-div">
                                    <div className="con-div1">
                                        <div className="con-detail">
                                        <p className="p-country1">{obj.team1}</p>
                                        <img className='leftimg' src={imgc1}/>
                                        </div>
                                    </div>
                                    <div className="con-div2">
                                        <p className="p-country3">VS</p>
                                    </div>
                                    <div className="con-div1">
                                        <p className="p-country2">{obj.team2}</p>
                                        <img className='rightimg' src={imgc2}/>
                                    </div>
                                    {/*<p className="p-country1">{obj.team1} VS {obj.team2}</p>*/}
                                    {/*<p className="p-country2">{obj.team1} VS {obj.team2}</p>*/}
                                    {/*<p className="p-country3">{obj.team1} VS {obj.team2}</p>*/}
                                    {/*<img className='leftimg' src={wulaigui}/>*/}
                                </div>
                                <p className="p-number">本场已投注 {(obj.target1+obj.target3).toFixed(5)} ETH</p>
                            </div>
                            <div className="div-percent" onClick={this.betClick.bind(this, 0,rowID)}>
                                <p className="per-pbet">{p1}%投注</p>
                                <button className="per-bcon">{obj.team1}赢</button>
                                <p className="per-pcarve">瓜分{obj.target3}ETH</p>
                            </div>
                            {/*<div className="div-percent" onClick={this.betClick.bind(this, 1,rowID)}>*/}
                                {/*<p className="per-pbet">{p2}%投注</p>*/}
                                {/*<button className="per-cbcon">平</button>*/}
                                {/*<p className="per-pcarve">瓜分{obj.target2}ETH</p>*/}
                            {/*</div>*/}
                            <div className="div-percent" onClick={this.betClick.bind(this, 2,rowID)}>
                                <p className="per-pbet">{p3}%投注</p>
                                <button className="per-bcon">{obj.team2}赢</button>
                                <p className="per-pcarve">瓜分{obj.target1}ETH</p>
                            </div>
                            <Link to={{
                                pathname: localStorage.getItem(glo.Uid)?"/pankoulist":"/logincmt",
                                query: {obj: obj},
                            }}>
                                <div onClick={this.moreAddreeClick.bind(this)}>
                                    <p className="p-address">本场比赛区块链地址0x{obj.handicapId}</p>
                                    <p className="p-addressmore">></p>
                                </div>
                            </Link>
                        </div>
                    </div>
                );
            }
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
                    // useBodyScroll={this.state.useBodyScroll}
                    style={this.state.useBodyScroll ? { height: '100%',
                        backgroundColor:'#EFF0F4'} : {
                        height: '100%',
                        backgroundColor:'#EFF0F4'
                    }}
                    pullToRefresh={<PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}
                    //onEndReached={this.onEndReached}
                    pageSize={5}
                />

            <Modal
                visible={this.state.modal1}
                transparent
                maskClosable={false}
                onClose={this.onClose('modal1')}
                title="详细规则"
                footer={[{ text: '同意', onPress: () => { console.log('ok'); this.onClose('modal1')(); } ,style:{marginLeft:'15px',marginRight:'15px',marginBottom:'10px',borderRadius:'20px',lineHeight:'40px',height:'40px',backgroundColor:'#6b56f7',color:'white'}}]}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
                <div style={{ textAlign:'left',height: '220px', lineHeight:'20px',color:'#262626',fontSize:'12px',overflow: 'scroll' }}>
                    1.每场比赛最多参与3次，每次不限选项。每次投注最低0.00001ETH，最高1000ETH。<br />
                    2.猜中比赛结果则赢得本场竞猜，未猜中则输掉ETH；赢家按照投注占比赢取ETH<br />
                    3.派奖计算计算公式：用户A赢取ETH数 = 用户A投注ETH x (1 + 所有未猜中用户投注ETH总数/所有猜中投注ETH总数)<br />
                    4.若比赛取消或因特殊情况未能确定比赛结果，投注ETH全部退回<br />
                    5.所有比赛投注信息全部记录在区块链上，保证公平公正公开<br />
                </div>
            </Modal>

            <Modal
                popup
                visible={this.state.modal2}
                onClose={this.onClose('modal2')}
                animationType="slide-up"
            >
                <List renderHeader={() => <div>参与竞猜</div>} className="popup-list">
                    <List.Item
                        wrap
                        extra={
                            <Stepper
                                style={{ width: '100%', minWidth: '100px' }}
                                showNumber
                                max={1000}
                                min={0.00001}
                                step={0.00001}
                                value={this.state.val}
                                onChange={this.onChange}
                            />}
                    >
                        ETH数量
                    </List.Item>
                    <List.Item>
                        <Button style={{backgroundColor:'#6b56f7'}} type="primary" onClick={this.onClose1('modal2',1)}>买入</Button>
                    </List.Item>
                </List>
            </Modal>
        </div>
            )
        }
    getContoryData(team){
        if(team == "英格兰"){
            return england
        }
        else if(team == "乌拉圭"){
            return wulaigui
        }
        else if(team == "法国"){
            return france
        }
        else if(team == "巴西"){
            return brazil
        }
        else if(team == "比利时"){
            return belgium
        }
        else if(team == "瑞典"){
            return sweden
        }
        else if(team == "俄罗斯"){
            return russia
        }
        else if(team == "克罗地亚"){  //乌拉圭、法国、巴西、比利时；俄罗斯、克罗地亚、瑞典、英格兰
            return croatia
        }
        else if(team == '哥伦比亚'){
            return colombia
        }
    }
    getTaskList() {  ///api/v1/executions?status=REVIEWED_APPROVE&userId=13826666362
        let url = glo.urlhttp + '/game/api/v1/fbg/handicap/handicaps?offset=0&limit=1000&status=0'+'&token='+localStorage.getItem(glo.Token)
        console.log("111:" + url)
        let tmpthis = this;
        console.log('token：'+localStorage.getItem(glo.Token))
        let config = {
            headers: {
                // 'Access-Control-Allow-Origin':'*',
                // 'token':localStorage.getItem(glo.Token),
                'Content-Type': 'application/json',
            },
        };  //添加请求头
        axios.get(url,config)
            .then(function (response) {
                // taskData = response
                console.log(JSON.stringify(response));
                if(response.data.code == 200){
                    // tmpthis.rData = genData();
                    let data = {
                        da:1,
                    };
                    let dataarr = response.data.data.content
                    console.log('22222' + JSON.stringify(dataarr))
                    dataarr.splice(0, 0, data)
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

export default withRouter(BFGueListCmt);
