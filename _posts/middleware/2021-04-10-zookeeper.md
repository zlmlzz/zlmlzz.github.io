---
layout: post
title: zookeeper
category: 中间件
tags: zookeeper
keywords: zookeeper
---
## zookeeper
* zookeeper是一个类似Linux、hdfs的树形文件结构,zookeeper可以用来保证数据在(zookeeper)集群之间的数据的事务一致性,zookeeper也是常说的CAP理论中的CP(强一致性)
* watch(事件),一次性触发,当watch监视的数据发生变化时,通知设置了该watch的client端,即watch实例对象(用于改变节点的变化而做出相应的行为)

### leader
* leader:数据总控节点,用于接收客户端的连接请求,分发给所有的follower节点后,各个follower节点进行更新数据操作并返回给leader节点,如果满足半数以上(zookeeper集群一般是奇数个节点)更新成功则此次操作成功
* follower:相当于跟随者角色,zookeeper的leader宕机(挂掉)时,所有的follower角色内部会产生选举机制,选举出新的leader用于总控
* observer:顾名思义,客户端,用于观察zookeeper集群的数据发生变化,如果产生变化则zookeeper会主动推送watch事件给observer(客户端),用于对数据发生变化的后续处理;observer也可以发送数据变更请求

### 应用场景
* 统一命名服务(Name Server)
* 配置管理(Configuration Management)
* 集群管理(Group Memberships)
* 共享锁(Locks)
* 队列管理

### 集群环境搭建及配置
* 解压压缩包
* 配置环境变量
```
vi /etc/profile
## 根据自己的路径配置
export ZOOKEEPER_HOME=/usr/local/zookeeper
export PATH=.:$ZOOKEEPER_HOME/bin:$PATH
## 刷新环境变量
source /etc/profile
```
* 配置
```
## 根据自己路径配置
dataDir=/usr/local/zookeeper/data
server.0=192.168.150.80
server.1=192.168.150.81
server.2=192.168.150.82
```
* 增加服务器标识配置
```
## 每一台服务器的myid文件内容不同(0;1;2)
vi /usr/local/zookeeper/data/myid
```
* 启动、查看状态
```
zkServer.sh start
zkServer.sh status
```
* 客户端操作
```
zkCli.sh 进入zookeeper客户端
常用命令:
查找:ls / ls /zookeeper
创建并赋值:create /test zookeeper
获取:get /test
设置:set /test test
PS:任意节点都可以看到zookeeper集群的数据一致性
```

### 核心配置
* tickTime:基本事件单元,以毫秒为单位.zookeeper服务器之间或客户端与服务器之间维持心跳的事件间隔
* initLimit:zookeeper接受客户端的初始化连接最长能忍受心跳时间间隔数
* syncLimit:标识Leader与Follower之间发送消息,请求和应答时间长度
* dataDir:存储内存中数据快照位置
* clientPort:客户端连接zookeeper服务器的端口
* server.A=B:C:D
```
A表示这是第几号服务器
B是服务器IP地址
C表示服务器与集群中的Leader服务器交换信息的端口
D表示集群中Leader服务器挂掉后,需要一个端口来重新选举一个新的Leader
```
