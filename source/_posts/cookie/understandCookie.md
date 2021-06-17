---
title: cookie 相关
tag: http
---


request header 中添加了cookie字段
cookie基本通信流程：设置cookie => 添加到 request header 中 => 服务端接收到cookie
<!-- more -->
![cookie存在现象](/path/cookie存在现象.png);


什么样的数据适合放在cookie中？

cookie是怎么设置的？

cookie为什么会自动加到request header中？

cookie怎么增删查改？

存储cookie是浏览器提供的功能。cookie 其实是存储在浏览器中的纯文本，浏览器的安装目录下会专门有一个 cookie 文件夹来存放各个域下设置的cookie

### cookie工作方式
  网页发起http网页请求的时候，浏览器会先检查是否有相应的cookie，有则自动添加再request header的cookie字段中。每一次浏览器都会帮我们做。
  存放在cookie中的数据每次都会被浏览器自动放入http请求中，如果不是都需要发送给服务端的就会增加网络开销。
  * #### 每个域名下的cookie的大小最大为4KB，每个域名下的cookie数量最多为20个(但很多浏览器厂商在具体实现时支持大于20个）

### cookie格式

js原生API提供：document.cookie
  * 只能获取非 HttpOnly类型的cookie
  * 由键值对 key=value 组成，键值对之间由一个**分号**和**空格**组成。

## cookie的属性

  * ## expires ： 
    **设置cookie什么时间内有效** 
    是cookie的失效日期，必须是GMT格式的时间。
    `new Date().toGMTString()`
    `new Date().toUTCString()`两种方式获得
    设置时间之后失效的cookie浏览器会清空，没有设置默认为**session**->这种为会话cookie，浏览器关闭后就没有了。
expires 是 http/1.0协议中的选项: 值是一个时间点，（cookie失效时刻= expires）默认值 session
max-age 是 http/1.1协议中选项，已经替代expires：以秒为单位时间段（cookie失效时刻= 创建时刻+ max-age）默认值 -1 
 max-age： 
      * 负数：有效期session；
      * 0：删除cookie；
      * 正数：有效期为创建时刻+ max-age




  * ## domain:
  域名： 的默认值为设置该cookie的网页所在的域名

  * ## path：
  路径：path默认值为设置该cookie的网页所在的目录

domain是域名，path是路径，两者加起来就构成了 URL，domain和path一起来限制 cookie 能被哪些 URL 访问
2个选项共同决定了cookie何时被浏览器自动添加到请求头部中发送出去。如果没有设置这两个选项，则会使用默认值

  * ## secure：
  cookie只在确保安全的请求中才会发送
  默认情况下cookie为空，当请求是HTTPS或者其他安全协议时，包含 secure 选项的 cookie 才能被发送至服务器
  客户端即网页中通过 js 去设置secure类型的 cookie，必须保证网页是https协议的。在http协议的网页中是无法设置secure类型cookie的

  * ## HttpOnly：
  在客户端是不能通过js代码去设置一个httpOnly类型的cookie的，这种类型的cookie只能通过服务端来设置
  默认情况下，客户端是可以通过js代码去访问（包括读取、修改、删除等）这个cookie的。当cookie带httpOnly选项时，客户端则无法通过js代码去访问（包括读取、修改、删除等）这个cookie
  **** 任何 cookie 都能被客户端通过document.cookie获取会发生安全问题

### 设置cookie

服务端设置：
  * 服务器返回response-headers中有一项叫set-cookie，是服务端专门用来设置cookie的。
  * 一个set-Cookie字段只能设置一个cookie，当你要想设置多个 cookie，需要添加同样多的set-Cookie字段。
  * 可以设置cookie的所有选项
客户端设置：
  * 设置cookie 的下列选项：expires、domain、path、secure（有条件：只有在https协议的网页中，客户端设置secure类型的 cookie 才能成功），但无法设置HttpOnly选项
  * 设置多个cookie重复执行 `document.cookie = "key=value"`

### 修改删除

修改：
  * 重新赋值就行，旧的值会被新的值覆盖
  * path/domain这几个选项一定要旧cookie 保持一样 否则是新添加了一个cookie
删除：
  * 重新赋值，将新cookie的expires 选项设置为一个过去的时间点
  * path/domain/这几个选项一定要旧cookie 保持一样