---
title: hexo基本设置
toc: true
tag: hexo
---

欢迎来到袁园的博客～

<!--
语法：
[知乎](https://www.zhihu.com/) -关键词连接-

-->
<!-- more -->

`$ sudo npm install -g hexo`
本地安装 hexo

本地 clone 地址：

```
$ git clone git@github.com:yybeaut/yybeaut.github.io.git
```

**敲重点**
**切换到 hexos 分支上**

<!-- 主题：大道至简
`https://www.haomwei.com/technology/maupassant-hexo.html`
[主题配置](https://www.yyyyuans.com/hexo/themeSet/) -->

主题：yilia

<!-- `https://github.com/litten/hexo-theme-yilia` -->

[https://github.com/litten/hexo-theme-yilia 主题配置](https://github.com/litten/hexo-theme-yilia)

完成后：
`$ npm i`

#### 基本维护命令

```bash
$ npm install hexo-deployer-git --save
$ hexo c
$ hexo g
$ hexo d
$ hexo clean && hexo g && hexo d
```

### hexo server

```bash
$ hexo server
```

### Generate static files

```bash
$ hexo generate
$ hexo s
```

### Deploy to remote sites

```bash
$ hexo deploy
```
