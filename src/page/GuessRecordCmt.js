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

class GuessRecordCmt extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataArr:new Array(),
            dataSource:dataSource.cloneWithRows([1,2,3,4,5,6,7,8]),
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: true,
            modal2:false,
            modal1:false,
            val:0.01,
        };
        // this.getTaskList()
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
        this.setState({
            modal1:true,
        })
    }
    render() {
        const row = (rowData, sectionID, rowID) => {
                if(rowID == 0){
                    return(
                        <div style={{width: '100%', height: '150px', backgroundColor: '#6e56f8'}}>
                        <div style={{width: '100%', height: '100px', backgroundColor: '#6e56f8'}}>
                            <div className="gpdiv-top">
                                <p className="gpnum-p">1</p>
                                <p className="gptitle-p">猜中</p>
                            </div>
                            <div className="gpdiv-top">
                                <p className="gpnum-p">1</p>
                                <p className="gptitle-p">未猜中</p>
                            </div>
                            <div className="gpdiv-top">
                                <p className="gpnum-p">1</p>
                                <p className="gptitle-p">押注总钻</p>
                            </div>
                            <div className="gpdiv-top">
                                <p className="gpnum-p">3</p>
                                <p className="gptitle-p">赢得总钻数</p>
                            </div>
                        </div>
                            <div style={{width: '100%', height: '50px', backgroundColor: 'white'}}>
                                <p className="gppv-p">我的区块链地址</p>
                                <p className="gpaddress-p">0x2222220020020202202020020</p>
                            </div>
                        </div>
                    )
                }
                return (
                    <div onClick={this.detailClick.bind(this)}>
                        <div style={{width: '100%', height: '30px', backgroundColor: '#EFF0F4'}}>
                            <p style={{marginLeft:'15px',color:'#999',fontSize:'11px',position:'absolute',marginTop:'10px'}}>6月26日 赛事</p>
                        </div>
                    <div style={{width: '100%', height: '100px', backgroundColor: '#EFF0F4'}}>
                        <div className="gdiv-item">
                            <p className="gp-name">尼日利亚 vs 冰岛</p>
                            <p className="gp-number">我已投注1个ETH压冰岛赢</p>
                            <p className="gp-time">6月27日 22:00截止</p>
                            <p className="gp-state">竞猜中</p>
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
        let url = glo.urlhttp + '/ksb-coin/api/v1/change/coin?limit=1000&owner='+queryper.userId
        console.log("111:" + url)
        let tmpthis = this;
        let config = {
            // headers: {'Content-Type': 'application/json'},
            dataType: 'jsonp'
        };  //添加请求头
        axios.get(url,config)
            .then(function (response) {
                // taskData = response
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

            });
    }
}

export default GuessRecordCmt;
