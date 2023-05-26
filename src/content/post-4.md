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


```javascript
class Message extends Component {  
    
    // 建構子 Constructor ，初始化初始狀態
    constructor(props) {
        super(props);
        this.state = {
            message: 'Welcome Hubert Hsieh'
        };
        this.inputRef = React.createRef();
    }
    
    render() {
        const { message } = this.state;

        return (
            <div>
                <h1>{ message }</h1>
                <button onClick={ () => this.handleMessage() }>Subscribe</button>
            </div>
        );
    }
}
```

### Updating
> 當元件的 props 或 state 更新，重新渲染 (re-rendered) DOM 時會觸發。


### Unmounting
> 註銷元件，當元件從 DOM 中被移除時會觸發。




