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
import {Link} from 'react-router-dom'
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
            val:0.01,
        };
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
        let url = glo.urlhttp + '/game/api/v1/fbg/game/bet'  ///user/api/v1/register
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
        axios.post(url,data)
            .then(function (response) {
                // taskData = response
                tmpthis.setState({
                    animating:false,
                })
                console.log(JSON.stringify(response));
                if(response.data.data.code == 200){
                    glo.showToast('投注成功')
                    tmpthis.getTaskList()
                }
                else{
                    console.log("111"+response.data.code);
                    glo.showToast('投注失败')
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
    componentDidMount() {
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
                    <div style={{width: '100%',height: '200px',backgroundColor:'green'}}>
                        <p className="p-titletop">ETH竞猜世界杯</p>
                        <button className="btn-detail" onClick={this.detailClick.bind(this)}>详细规则</button>
                    </div>
                )
            }
            else {
                let p1 = (obj.target1/(obj.target1+obj.target2+obj.target3)).toFixed(2)
                let p2 = obj.target2/(obj.target1+obj.target2+obj.target3).toFixed(2)
                let p3 = obj.target3/(obj.target1+obj.target2+obj.target3).toFixed(2)

                let arr = obj.endTime.split('.')
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
                let timenum = mouth+"月"+day+"日 "+hour.toString()+":"+minutes.toString()
                console.log(222222+timenum+ "  "+hour+"   "+minutes+"  "+seconds)
                console.log((obj.target1+obj.target2+obj.target3).toFixed(4));
                return (
                    <div style={{width: '100%', height: '260px', backgroundColor: '#EFF0F4'}}>
                        <div className="div-item">
                            <p className="p-fname">1/8决赛</p>
                            <p className="p-ftime">{timenum}截止</p>
                            <div className="div-competition">
                                <p className="p-country">{obj.team1} VS {obj.team2}</p>
                                <p className="p-number">本场已投注 {(obj.target1+obj.target2+obj.target3).toFixed(4)} ETH</p>
                            </div>
                            <div className="div-percent" onClick={this.betClick.bind(this, 0,rowID)}>
                                <p className="per-pbet">{p1}%投注</p>
                                <button className="per-bcon">{obj.team1}赢</button>
                                <p className="per-pcarve">瓜分{obj.target1}ETH</p>
                            </div>
                            <div className="div-percent" onClick={this.betClick.bind(this, 1,rowID)}>
                                <p className="per-pbet">{p2}投注</p>
                                <button className="per-cbcon">平</button>
                                <p className="per-pcarve">瓜分{obj.target2}ETH</p>
                            </div>
                            <div className="div-percent" onClick={this.betClick.bind(this, 2,rowID)}>
                                <p className="per-pbet">{p3}投注</p>
                                <button className="per-bcon">{obj.team2}赢</button>
                                <p className="per-pcarve">瓜分{obj.target3}ETH</p>
                            </div>
                            <Link to={{
                                    pathname: '/handicap',
                                    query: {hid: obj.handicapId},
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
                    1.每场比赛最多参与3次，每次不限选项。每次投注最低0.01ETH，最高10ETH。<br />
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
                                min={0.01}
                                step={0.01}
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

    getTaskList() {  ///api/v1/executions?status=REVIEWED_APPROVE&userId=13826666362
        let url = glo.urlhttp + '/game/api/v1/fbg/handicap/handicaps?offset=0&limit=1000&status=3'
        console.log("111:" + url)
        let tmpthis = this;
        let config = {
            headers: {'Content-Type': 'application/json'},
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
            })
            .catch(function (error) {

            });
    }
}

export default BFGueListCmt;
