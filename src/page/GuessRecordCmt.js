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
                return (
                    <div style={{width: '100%', height: '100px', backgroundColor: '#EFF0F4'}}>
                        <div className="gdiv-item">
                          <p className="gp-name">尼日利亚 vs 冰岛</p>
                            <p className="gp-number">我已投注1个ETH压冰岛赢</p>
                            <p className="gp-time">6月27日 22:00截止</p>
                            <p className="gp-state">竞猜中</p>
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
