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
### 配置方式
* 系统属性(-D):使用`-Dskywalking.`+`agent.config配置文件中的key即可`,如:`java -javaagent:/skywalking-agent.jar -Dskywalking.agent.service_name=test -jar springboot.jar`
* 代理选项:在JVM参数中的代理路径之后添加属性:`-javaagent:/skywalking-agent.jar=[option1]=[value1],[option2]=[value2]`,如:`java -javaagent:/skywalking-agent.jar=agent.service_name=test -jar springboot.jar`
* 系统环境变量:`agent.config`文件中默认的大写值,都可以作为环境变量引用
* 优先级:代理选项>系统属性>系统环境变量>配置文件

## 插件
* 监控spring bean将`apm-spring-annotation-plugin`文件拷贝到plugin下

### 监控任意代码
* 将`apm-customize-enhance-plugin`文件拷贝到plugin下
* 编写规则

```
创建一个文件,名称如customize_enhance.xml
<?xml version="1.0" encoding="UTF-8"?>
<enhanced>
    <class class_name="test.Test">
        <method method="test(java.lang.String,java.util.List;)" 
        operation_name="/is_static_method_args" static="true">
            <operation_name_suffix>arg[0]</operation_name_suffix>
            <operation_name_suffix>arg[1]</operation_name_suffix>
            <tag key="tag_1">arg[0]</tag>
            <log key="log_1">arg[1]</log>
        </method>
    </class>
</enhanced>

注:method
* 基本类型:基本类型.class,如int.class
* 数组:通过打印类型得到
```
* 配置`agent.config`文件:`plugin.customize.enhance_file=customize_enhance.xml的绝对路径`

### 编写插件
* [点击跳转查看](https://www.itmuch.com/skywalking/write-plugin/)

## 数据持久化
* 配置skywalking的`application.yml`文件:`注释掉默认的h2,放开es配置`

## 告警
* [点击跳转查看](https://www.itmuch.com/skywalking/alert/)

## 动态配置

## 集群搭建
