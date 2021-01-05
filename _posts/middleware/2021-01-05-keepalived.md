---
layout: post
title: keepalived
category: 中间件
tags: keepalived
keywords: keepalived
---
## keepalived
* 解决单点故障,高可用
* 组件免费
* 基于VRRP协议(虚拟路由冗余协议)
    * Virtual Route Redundancy Protocol
    * 解决内网单点故障的路由协议
    * 构建多个路由器MASTER BACKUP
    * 虚拟IP-VIP(Virtual IP Address)

## 安装
1. 下载
2. 解压`tar -zxvf keepalived-2.0.18.tar.gz`
3. 进入解压目录`./configure --prefix=/usr/local/keepalived --sysconf=/etc`
4. `make && make install`

## keepalived核心配置文件
```

```
