import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd-mobile/dist/antd-mobile.css';
import {BrowserRouter, HashRouter,Route, Link, Prompt, Redirect, Switch} from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';
import PersonCenterCmt from './page/PersonCenterCmt';
import BFGueListCmt from './page/BFGueListCmt'
import RegisterActCmt from './page/RegisterActCmt'
import LoginCmt from './page/LoginCmt'
import GuessRecordCmt from './page/GuessRecordCmt'
import PanKouListCmt from './page/PanKouListCmt'
import {httpurl} from './utils/globle'
import {queryper}from './utils/QueryPer'
function GetRequest() {
    var url = window.location.href; //获取url中"?"符后的字串
    let arr = url.split('?')
    if(arr.length == 2) {
        var theRequest = new Object();
        // if (arr[1].indexOf("?") != -1) {
            var str = arr[1];
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        // }
    }
    return theRequest;
}
ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/guelist" component={BFGueListCmt}/>
            <Route path="/personcenter" component={PersonCenterCmt}/>
            <Route path="/registeractcmt" component={RegisterActCmt}/>
            <Route path="/logincmt" component={LoginCmt}/>
            <Route path="/guessrecordcmt" component={GuessRecordCmt}/>
            <Route path="/handicap" component={GuessRecordCmt}/>
            <App/>
        </Switch>
    </HashRouter>
    , document.getElementById('root'));
registerServiceWorker();
// "homepage": ".",
// "proxy": "http://localhost:3000/"//反向代理解决跨域问题
