---
slug: "/blog/post-01"
date: "2023-05-15"
title: "前端知識 - Cookie、SessionStorage、LocalStorage"
category: "JavaScript"
featuredImage: ../images/blog-storage.jpg
---

### 瀏覽器提供本地端儲存資料的方式有三種
- Cookie
- LocalStorage
- SessionStorage

### Cookie
> 可設定失效時間，沒設定的話預設是瀏覽器關閉後失效。  

第一次用戶端瀏覽器在發送請求後，伺服器端會在回應的標頭中，添加一個 Set-Cookie 的選項並將 cookie 放入到回應中，送回用戶瀏覽器端後，會儲存在用戶端本地。此外 cookie 會在用戶瀏覽器下一次發送請求時，一同被攜帶並發送回伺服器上。
- 大小約 4kb
- 每次請求時都會在 header 帶上

```
Domain - 指定網域可以使用，預設是當前網域但不包含子網域。

Path - 作用範圍，指定路徑可以使用這個 cookie，預設是都可存取。

Expires - 有效期限，該 cookie 過期的時間，值為Date.toUTCString() 格式的時間字串。

Max-Age - 有效期限，該 cookie 可以留存的時間，單位為秒。如果同時設定 Max-Age 以及 Expires，則 Max-Age 優先。

Secure - 安全性，是否只能在 https 下傳遞，格式為 boolean 值。

HttpOnly - 安全性，此 cookie 只能從 web server 訪問，以避免不正確的進入來取得竄改。
```



### LocalStorage以及SessionStorage
> SessionStorage : 關閉頁面或是關閉瀏覽器後失效。  
> LocalStorage : 基本上永久保存，除非手動去清除。


LocalStorage以及SessionStorage是HTML5提供兩種在客戶端儲存資料的方法，彌補了cookie儲存量小、不適用於大量資料本地儲存的問題。

- 大小約 5mb (依各瀏覽器會有些許不同)
- 都藉由key-value的方式去儲存資料
- 僅能儲存字串的資料型態，可以將陣列或物件透過 JSON.stringify 轉JSON字串儲存， JSON.parse 將JSON字串轉回原本物件取出。

```javascript
// localStorage 存入數據
localStorage.setItem('keyName', value);

// localStorage 讀取數據
localStorage.getItem('keyName');

// sessionStorage 存入數據
sessionStorage.setItem('keyName', value);

// sessionStorage 讀取數據
sessionStorage.getItem('keyName');

// 刪除指定數據
localStorage.removeItem('keyName');
sessionStorage.removeItem('keyName');

// 刪除全部數據
localStorage.clear();
sessionStorage.clear();
```


### 常見應用
> 工程師在開發網站時，在瀏覽器儲存資料的應用滿廣泛的，最常見的當然就是會員登入狀態，購物車資料暫存或者分步驟表單驗證等等。

Cookie 比較常用的場景就是判斷用戶是否登錄，針對登錄過的用戶，服務器端會在他登錄時，往 Cookie 插入一段加密過的辨識碼，下次只要讀取這個值就可以判斷用戶是否登錄。

SessionStorage 如果遇到一些內容特別多的表單，為了提升用戶體驗，可能要把表單頁面拆分成多個子頁面，然後按照步驟引導用戶。SessionStorage 這時候就可以發揮出效用。

LocalStorage 除了可以用來代替 Cookie 做購物車的資料保存，也能做會員登入狀態的持久化。或者在電商網站、遊戲通常會產生一些使用者數據，這時就很適合用 LocalStorage 來保存這些數據。



