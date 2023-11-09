---
slug: "/blog/post-07"
date: "2023-05-22"
title: "面試日記 - 和接案公司面對面，案子如繁星點點。"
category: "Interview"
featuredImage: ../images/blog-star.jpg
---

### 今天去面試的大略狀況
> 是台北的一間接案公司，台中也有辦公室，專門解決客戶提出的需求。

面試過程是在 2023.05.22 先透過 Google Meet 和人資小姐姐一面，彼此以討論聊天的形式，了解一下公司大致上有哪幾種專案、有哪些團隊的組成，以及了解一下我的職涯目標與人生規劃。
2023.05.29 的時候和技術長二面，主要問實務開發上遇到的一些問題要怎麼排除，或是如果有哪些狀況要怎麼解決。

### 面試結果
> Get Offer

### 筆試題目複習
> 題目沒有完全記得很清楚，我大致上描述，盡量還原題型。

#### 請描述一下，假設有一個按鈕按下去會發出一個請求，那如果使用者短時間內反覆點擊，要如何確保能正確取得 Response
一開始我是先向面試官確認，在什麼情況下會用一個按鈕一直對同一個接口連續發請求？一般不是會在點擊按鈕觸發請求取得回應的過程中，透過Loading狀態去做一些判斷，避免按鈕能夠被使用者連續按？　 

這邊可能問的不是很好，主要是想確認說，是不是希望我描述如何透過防抖或節流的方式，去防止使用者不斷地送出請求，以我自己實際應用過的例子來舉例，比如在監聽Scroll事件時，防止一滾動就一直重複觸發事件，影響效能！
或是input輸入時，有時要依據輸入內容做請求，假設是a、b、c，每次字元KEY完都發請求的話，也會發送太多請求，所以可以透過節流的方式，當短時間內觸發的同一請求，就以最後(最新)觸發的為原則去送出請求。

太晚才回來補面試的過程，很多細節忘記了，但大多數是圍繞在這一題上討論，自己後續在新公司工作其實也常常在思考一些效能上的問題，像是如何避免撈取重複的資料，然後相同的請求只要在A頁面拉取一次，B頁面也能共用，等等的課題，都是前端工程師後期應該多考慮的點。

```javascript
// 簡單的節流概念
var timer; // 全域 Timer
function debounce(fn, delay){
    if(timer){
        clearTimeout(timer)
    }
    
    timer = setTimeout(function(){
        fn();
    }, delay);
}
window.onscroll = function(){
    debounce(test, 1000)
}
function test(){
    console.log('滾動停止')
}
}
```

#### 請描述一下，CSS排版時，要如何做垂直置中 
> 經典題目，大部分公司都會問一下，確認一下基本切版的知識。
```javascript
我大致上描述可能有哪幾種方法：
{
    display:flex;
    justify-content:center;
    align-items:center;
}

{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

{
    display: grid;
    place-content: center;
}

```

