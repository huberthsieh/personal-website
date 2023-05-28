---
slug: "/blog/post-05"
date: "2023-05-23"
title: "面試日記 - 當你被貓吵整晚不能睡，還要出發去面試跟筆試時。"
category: "Interview"
featuredImage: ../images/blog-interview01.jpg
---


### 正式面試前
> 心裡MurMur：一不小心騎過頭，該公司在西屯區，我差點前往龍井區品茶。

習慣提早出門的我，想說應該給人資跟面試官一個良好印象，早一點抵達做點準備也好，結果不知道是不是都沒什麼睡，頭腦發昏外加路不熟整個騎過頭，還好沒遲到，差點就可以直接右轉回家睡覺，也不用面試了。  

一到公司樓下是一棟很氣派的大樓，不知是不是不成文的規定，好像博弈類的公司都在這種很氣派的大樓裡面。到公司後剛好遇到人資小姐姐經過門口幫我開門，
進去之後稍微聊一下我如何成為前端工程師，以及了解我成為工程師之前的職業跟經歷。

後來面試官也有再問我一次工程師之前的經歷，履歷上面我沒完整列出從當完兵到成為工程師之前的經歷，是因為之前在Linkedin上，
有幾名獵頭建議我非工程師的經歷其實可以不用列出來，我覺得很有道理就這樣調整了。  

我認為工程師大多就是看過往做過哪些專案，然後技術的了解程度到哪，所以去年底開始到現在一直在盡力多做一些 Side Project 充實自己的 Github ，也盡量慢慢提升自己的能力，
以前很多東西都只在工作中用用而已，過一陣子就忘記了，沒有好好記錄下來滿可惜的，現在重新把很多資訊輸入腦袋後再做一次輸出，感覺還是挺不錯的，對自己也慢慢多了點信心。


### 今天去面試的大略狀況
> 是台中的一間合法博弈產業公司

該公司有自己的產品，一個還滿知名的線上娛樂城，廣告很常看到，這類型產業在台灣很盛行，大多是走合法路線，自己也不排斥這產業。　　

面試流程除了前面跟人資小姐姐聊完之後，接著就是筆試最後再跟三位面試官面談，因為剛好該公司團隊是用自己比較喜歡的技術 **React** 做開發(內心老淚縱橫😭)，加上三位面試官很願意給我回饋，就趁這個機會跟三位面試官多請教請教，一不小心就聊到快中午，自己有點不好意思耽誤他們太多時間，不然還有滿多事情想跟面試官請教一番，很謝謝能跟他們聊這麼多。


### 筆試題目複習
> 題目沒有完全記得很清楚，基本上從CSS到JavaScript都有考到，大概分幾個方向
- CSS的原理及排版方式
- JavaScript的原理、寫法以及陣列的方法
- 型別的運算比較，比如經典的 1<2<3 以及 3>2>1
- 下面會記錄一下題目跟答案，跟我為什麼寫錯XD，然後再多做點補充

#### CSS的原理及排版方式
```javascript
Id Selector > Class Selector > Type Selector (這題我寫成Id Selector > Type Selector > Class Selector)
我一時忘記Type Selector是哪個選擇器，腦袋中浮現的是div[data-color=red]，記得這個跟class是同等級，  
後來問面試官才知道Type Selector就是指Element，h1、h2、p那些標籤。

另外還有如何水平垂直置中、flex 排成直的一些排法等等，我自己通常如果是口頭測驗，
會先確認水平置中、垂直置中、水平垂直置中三種考官要問哪種，不過概念大致上相同是也還好。
```


#### margin 邊界重疊的三種解法
```javascript
比較要提的是 margin 邊界重疊的三種解法，自己很常利用padding去設定間距，
所以很少遇到這類問題，後來詢問面試官其他的解法，原來可以幫元素加上clear-fix的屬性，
我以前只知道是用來清除 float 的浮動問題，原來也可以解決 margin 邊界重疊的狀況，長知識了！
```
[參考MDN - margin 邊界重疊的內容](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)


#### Function.call() / Function.apply() 的差異
```javascript
這題考如果要傳第二個參數，要傳陣列進去還是透過展開運算子傳一堆數字進去。
真的滿久沒看到這兩個方法，大抵上知道是關於this的綁定，但我忘記實際寫法以及後面參數要傳什麼，最後也是跟面試官請教才回憶起來。

// 定義測試用函式，箭頭函式的this會根據語意指定作用域，故這邊不用箭頭函式
function testFunction (a, b) {
    console.log(this.name, a, b);
}

// 定義測試用物件
const obj = { name: 'Hubert Hsieh'};

// Assign function in obj
obj.func = testFunction;
obj.func(1, 2);

// 第一個參數選擇要指定this到哪，也可以是null
testFunction.apply(obj, [1, 2]); // 傳一個陣列進去
testFunction.bind(obj)(1, 2); // 依次傳參數
testFunction.call(obj, 1, 2); // 依次傳參數
```


#### Promise 語法
```javascript 
關於Promise相關的考題，這邊考了兩個方向
- Promise 內運算的結果及Promise all方法的概念。
- Promise 的寫法如何用 async/await 的方式改寫。

這邊自己覺得答題時沒有寫得很好，不過基本的概念自己還算是清楚的，
Promise語法的出現是為了解決早期在做非同步處理時，必須不斷的透過CallBack去確保正確取到值之後，  
再執行某些運算或功能，當函式結構變得龐大時，程式碼就會越來越複雜，甚至會看到類似波動拳的巢狀結構。

Promise.all 則是可以等待多個 Promise 函式全部執行完成後，再回傳陣列結果，通常就是如果有多支 API 要一起執行時會運用到。

那 async / await 就是可以用類似同步執行的程式碼寫法，來處理非同步的事情，本質跟用Promise其實是差不多的。  
但是可讀性就高很多(這點可能見仁見智，我個人是習慣這樣寫，再利用 Try 集中處理 Success 相關的功能，Catch 處理 Error 時相關的功能)

// async / await的方式
const asyncFunction = async () => {
	try {
		const dataA = await fetchDatarA;
		const dataB = await fetchDatarB;
		console.log(dataA, dataB); 
	} 
	catch(error) {
		console.log('async function error', error);
	}
}
```

#### 陣列的方法 - sort、reduce
```javascript 
- sort 這邊考的是，一個物件陣列如何透過某個 key 的 value 去做排序?
- reduce 我忘記題目考什麼了。

sort() 基本概念是，如果沒有指定一個比較功能的參數，它會將每個元素轉成字串之後，第一個字元的 Unicode 編碼位置去排序。
reduce() 基本概念是，他可以不斷地跟上一個回傳的值再作運算，最後回傳該值。跟 map 相比不同的是，map 是回傳一個新陣列。

// sort()
// 簡單定義一個隨意排列的物件陣列
const sortArr = [
	{name: 'Alex', age: 33},
	{name: 'Hubert', age: 34},
	{name: 'Chris', age: 32}
]

// 依造每個元素的年齡大小去遞增排序
const sortResult = sortArr.sort((a, b) => {
	return a.age > b.age ? 1 : -1;
})

// result
[
    {name: 'Chris', age: 32},
    {name: 'Alex', age: 33},
    {name: 'Hubert', age: 34}
]

// reduce()
// 基本語法

array.reduce((accumulator, currentValue) => { do something... },  initialValue)

// example
const array = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const sumWithInitial = array.reduce((accumulator, currentValue) => accumulator + currentValue,  0);

// Expected output: 10
console.log(sumWithInitial); 
```

[參考MDN - Array.prototype.sort()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)  
[參考MDN - Array.prototype.reduce()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
#### 型別的運算比較，比如經典的 1<2<3 以及 3>2>1
```javascript
// console.log以下狀況的結果，這邊牽扯 JavaScript 的各種運算子在運算時，如果是不同型別會做甚麼處理以及回傳什麼結果。

- 1<2<3： 可以先判斷 1<2 是 true，重點就變成 true<3 會回傳什麼呢?
- 3>2>1： 可以先判斷 3>2 是 true，重點就變成 true>1 會回傳什麼呢?
- true+'xyz'： true 是 布林值，那重點就變成 布林值+字串會變成什麼呢?

// 上述幾點就需要先了解 JavaScript 的強制轉型別的概念(很雞婆？)   
- {key: "value"}： 理論上會把物件印出來沒錯，只是很有可能一般實務上物件console出來的值未必是如自己所想的那樣！
```
[物件的console-bug，詳情可以看看Huli大大的文章](https://blog.huli.tw/2020/03/23/console-log-bug/)

### 面試反省

我覺得我每次面試的時候都有點嘴笨，太過緊張都有點詞不達意，比如面試官問我有沒有處理過什麼複雜的資料結構，當下心裡想的是，應該都還可以，不管接收到什麼樣的格式，看實務需求需要怎麼重新整理跟排列就去處理。
結果我跟面試官說我沒有處理過什麼太複雜的資料結構(面試官應該很驚恐?!)，其實應該先確認一下複雜的定義是什麼再作回答才對。

然後討論 reduce() 的用法時，也問了面試官說 reduce() 很常用到嗎？但我意思其實是很常只透過 reduce() 處理好某筆資料，還是說會寫比較多行，比如說先 filter() 再 map() 之類的，讓整段 code 雖然變冗長，但是可讀性變高呢？

之後參加任何面試應該要多思考，緩一點回答才好，想不出來的慢慢想，最後讓面試官打斷思考也沒關係，不要都不思考XD

平常心平常心吧，Hubert QQ。

[附上那天面試大致上考題的 CodePen 參考](https://codepen.io/Yantsharn/pen/eYPXYmE)