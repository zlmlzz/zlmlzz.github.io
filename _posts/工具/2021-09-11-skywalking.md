---
layout: post
title: skywalking
category: 工具
tags: skywalking
keywords: skywalking,监测工具
---
## 定义
* 适用于分布式系统的性能检测工具

## 核心概念
* 服务:
* 服务实例
* 端点:uri或者类名+方法
* 追踪

## 功能
* 服务,服务实例,端点指标分析
* 根本原因分析
* 服务拓扑图分析
* 服务,服务实例和端点依赖性分析
* 检测到慢服务和端点
* 性能优化
* 分布式跟踪和上下文传播
* 数据库访问指标
* 告警

## 安装
* [下载](https://skywalking.apache.org/downloads/)
* 环境
    * jdk
    * 端口11800(和skywalking通信的grpc端口)
    * 端口12800(和skywalking通信的http端口)
    * 端口8080(ui占用端口)

## 使用(java agent)
* 配置Java agent
    * 找到skywalking包中的agent目录
    * 将agent目录拷贝到任意位置
    * 配置config/agent.config
    ```
    1.将agent.service_name修改为服务名称
    2.如果skywalking和服务部署在不同服务器,
    还需修改collector.backend_service的值,
    该配置用来指定服务和skywalking通信的地址,默认是127.0.0.1:11800
    ```
* 启动应用
    * spring boot应用`-javaagent:/home/user/agent/skywalking-agent.jar`jar包全路径
    * tomcat应用:修改`tomcat/bin/catalina.sh`的第一行`CATALINA_OPTS=$CATALINA_OPTS -javaagent:/home/user/agent/skywalking-agent.jar;export CATALINA_OPTS`

## agent配置

