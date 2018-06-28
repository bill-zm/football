/**
 * Created by zhangmeng on 2018/6/7.
 */
import ReactDOM from 'react-dom';
import React, { Component } from 'react';

/**
 * ReactDOM 不推荐直接向 document.body mount 元素
 * 当 node 不存在时，创建一个 div
 */
function domRender(reactElem, node) {
    let div;
    if (node) {
        div = typeof node === 'string'
            ? window.document.getElementById(node)
            : node;
    } else {
        div = window.document.createElement('div');
        window.document.body.appendChild(div);
    }
    return ReactDOM.render(reactElem, div);
}

export class QueryPer extends Component {
    userId = ''
    taskId = ''
    remaintime = ''
    storeNo = ''
    // stopAll() {
    //     if (!this.state.show) return;
    //     this.globalLoadingCount = 0;
    //     this.pageLoadingCount = 0;
    //     this.setState({show: false});
    // }
    //
    // get isGlobalLoading() {
    //     return this.state.isGlobal && this.state.show;
    // }
    //
    // get noWaiting() {
    //     return this.noGlobalWaiting && this.pageLoadingCount < 1;
    // }
    //
    // get toPageLoading() {
    //     return this.noGlobalWaiting && this.isGlobalLoading;
    // }
    //
    // get noGlobalWaiting() {
    //     return this.globalLoadingCount < 1;
    // }
    render() {
        return (
            <div></div>
        );
    }
}

// 使用上面的工具函数
export const queryper = domRender(<QueryPer />);