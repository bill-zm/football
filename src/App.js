import React, { Component } from 'react';
import './App.css';
import { TabBar,} from 'antd-mobile';
import BFGueListCmt from './page/BFGueListCmt'
import PersonCenterCmt from './page/PersonCenterCmt'

class App extends Component {
    constructor(){
        super()
        let selEd = "greenTab"
        if(window.selectedTab) {
            selEd =  window.selectedTab
        }
        this.state = ({
            selectedTab:selEd,
        })
    }
  render() {
    return (
        <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
                prerenderingSiblingsNumber={0}
            >
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                    title="竞猜"
                    key="quiz"
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'greenTab',
                        });
                        window.selectedTab = 'greenTab'
                        document.title = "竞猜"
                    }}
                >
                    <BFGueListCmt />
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
                        />
                    }
                    selectedIcon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
                        />
                    }
                    title="个人中心"
                    key="my"
                    selected={this.state.selectedTab === 'yellowTab'}
                    onPress={() => {
                        this.child.getUserData()
                        this.setState({
                            selectedTab: 'yellowTab',
                        });
                        window.selectedTab = 'yellowTab'
                        document.title = "个人中心"
                    }}
                >
                    <PersonCenterCmt num={this.state.selectedTab} onRef={this.onRef} />
                </TabBar.Item>
            </TabBar>
        </div>
    );
  }
    onRef = (ref) => {
        this.child = ref
    }
}
export default App;