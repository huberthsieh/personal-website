---
slug: "/blog/post-04"
date: "2023-05-18"
title: "前端知識 - React的生命週期：一元復始，萬象更新。"
category: "JavaScript"
featuredImage: ../images/blog-react.jpg
---

### React的生命週期
- Mount(創建): 元件被渲染到畫面上(渲染後的節點加入DOM)

- Update(更新): 元件的內容因為資料的更動而重新渲染(比較虛擬DOM和實際DOM之間那些地方有變化 - Re-Rendered)

- Unmount(銷毀): 元件從畫面上消失，移除這個元件

### Mounting
> 在元件一開始 Mount 的時候，初始化會先經過建構子 Constructor，Constructor 會完成所有必要的 initial 過程，像是初始化state、初始化ref物件等等。
- constructor()
- render()
- componentDidMount()

### Updating
> 當元件的 props 或 state 更新，重新渲染 (re-rendered) DOM 時會觸發。
- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

### Unmounting
> 註銷元件，當元件從 DOM 中被移除時會觸發。
- componentWillUnmount()

[附上 React 生命週期簡易 Demo，大家可以從 Console 看看每個生命週期的 Method 是如何被調用的](https://codepen.io/Yantsharn/pen/abRxBoz)

```javascript
// Destructuring assignment
const { Component, Children, PropTypes, useState, useEffect } = React

// Class Component
class MessageClassComponent extends Component {

    // 初始化狀態、屬性
    constructor(props) {
        super(props);

        this.state = {
            message: 'Welcome guest, this message in the Class Component.'
        };
    }

    // static 靜態函數，因此無法操作 class 中的屬性 (ex. this.state)。
    // 在每次 re-rendering 前會被調用，
    static getDerivedStateFromProps(props, state) {
        console.log('在每次 re-rendering 之前會調用 getDerivedStateFromProps');
        return null;
    }

    // 元件Render完成時，調用一次
    componentDidMount() {
        console.log('元件Render完成，調用一次 componentDidMount()');
    }

    // 如果 props 或 state 發生變化，re-rendering 前會調用， 回傳 false 會阻止按鈕點擊
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('props 或 state 發生變化， shouldComponentUpdate() 回傳true / false');
        return true;
    }

    // 要和 componentDidUpdate 一起使用
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate， 更新前取得原本狀態');
        return null
    }

    // 元件屬性或狀態改變，調用一次
    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('prevProps', prevProps);
        // console.log('prevState', prevState);
        // console.log('snapshot', snapshot);

        if (this.state.message !== prevState.message) {
            console.log('State Change!, componentDidUpdate invoked.');
        }
    }

    // 在 component 即將從DOM中移除之前，componentWillUnmount
    componentWillUnmount() {
        console('組件即將移除，componentWillUnmount invoked once.');
    }

    handleMessage = () => {
        this.setState({
            message: 'Hey guy, you change this message.'
        })
    }

    render () {
        const { message } = this.state;

        return (
            <div className="block">
                <h2>{ message }</h2>

                <button onClick={() => this.handleMessage()}>
                    改變文字
                </button>
            </div>
        )
    }
}

// Functionl Component
const MessageFunctionlComponent = () => {
    const [message, setMessage] = useState('Welcome Guest, this message in the Functionl Component.');

    // 每次 render 結束時，觸發 useEffect
    useEffect(() => {
        console.log(`message will be ==> ${message}`);
    });

    return (
        <div>
            <h2>
                { message }
            </h2>

            <button onClick={() => setMessage('Hey guy, you change this message.')}>
                改變文字
            </button>
        </div>
    )
}
```