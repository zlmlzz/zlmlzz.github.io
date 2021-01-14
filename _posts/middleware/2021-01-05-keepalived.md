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
5. `./keepalived`
6. 注册服务
```
cd ./keepalived/etc/
cp ./init.d/keepalived /etc/init.d
cp ./sysconfig/keepalived /etc/sysconfig
systemctl daemon-reload
```

## keepalived核心配置文件
* 主节点配置  

```
global_defs {
    # 路由id:当前安装keepalived节点主机的标识符,全局唯一
    router_id keep_1
}

# 计算机节点
vrrp_instance VI_1 {
    # 表示状态,当前的主节点,MASTER/BACKUP
    state MASTER
    # 当前实例绑定的网卡
    inteface eth0
    # 虚拟路由id，保证主备节点一致
    virtual_router_id 51
    # 优先级/权重，优先成为MASTER
    priority 100
    # 主备之间同步检查的时间间隔，默认为1s
    advert_int 1
    # 认证授权的密码,防止非法节点进入
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    # 虚拟IP
    virtual_ipaddress {
        192.168.1.161
    }
}
```
* 从节点配置

```
global_defs {
    # 路由id:当前安装keepalived节点主机的标识符,全局唯一
    router_id keep_2
}

# 计算机节点
vrrp_instance VI_1 {
    # 表示状态,当前的主节点,MASTER/BACKUP
    state BACKUP
    # 当前实例绑定的网卡
    inteface eth0
    # 虚拟路由id，保证主备节点一致
    virtual_router_id 51
    # 优先级/权重，优先成为MASTER
    priority 80
    # 主备之间同步检查的时间间隔，默认为1s
    advert_int 1
    # 认证授权的密码,防止非法节点进入
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    # 虚拟IP
    virtual_ipaddress {
        192.168.1.161
    }
}
```

## keepalived配置nginx自动重启
* 当仅仅是nginx宕掉时，keepalived并不会切换
* 编辑nginx重启检测脚本
`vim check_nginx_alive.sh`

```
#!/bin/bash
   
A = `ps -c nginx --no-header | wc -l`
#判断nginx是否宕机,如果宕机,尝试重启
if [ $A -eq 0 ]; then
    /usr/local/nginx/sbin/nginx
    # 等待一段时间再次检查nginx,如果没有重启成功,则停止keepalived,使其启动备用机
    sleep 3
    if [ `ps -c nginx --no-header | wc -l` -eq 0]; then
        killall keepalived
    fi
fi
```
* 添加运行权限`chmod +x check_nginx_alive.sh`
* 配置keepalived监听nginx脚本

```
vrrp_script check_nginx_alive {
    script "/etc/keepalived/check_nginx_alive.sh"
    # 每隔2秒运行一次脚本
    interval 2
    # 如果脚本运行失败，则权重+10
    weight 10
}
```
* 在`vrrp_instance`中新增监控的脚本

```
track_script {
    check_nginx_alive
}
```
* 重启keepalived使配置生效`systemctl restart keepalived`

## 双主热备
* 节点1

```
global_defs {
    # 路由id:当前安装keepalived节点主机的标识符,全局唯一
    router_id keep_1
}

# 计算机节点
vrrp_instance VI_1 {
    # 表示状态,当前的主节点,MASTER/BACKUP
    state MASTER
    # 当前实例绑定的网卡
    inteface eth0
    # 虚拟路由id，保证主备节点一致
    virtual_router_id 51
    # 优先级/权重，优先成为MASTER
    priority 100
    # 主备之间同步检查的时间间隔，默认为1s
    advert_int 1
    # 认证授权的密码,防止非法节点进入
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    # 虚拟IP
    virtual_ipaddress {
        192.168.1.161
    }
}

vrrp_instance VI_2 {
    # 表示状态,当前的主节点,MASTER/BACKUP
    state BACKUP
    # 当前实例绑定的网卡
    inteface eth0
    # 虚拟路由id，保证主备节点一致
    virtual_router_id 52
    # 优先级/权重，优先成为MASTER
    priority 80
    # 主备之间同步检查的时间间隔，默认为1s
    advert_int 1
    # 认证授权的密码,防止非法节点进入
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    # 虚拟IP
    virtual_ipaddress {
        192.168.1.162
    }
}
```
* 节点2

```
global_defs {
    # 路由id:当前安装keepalived节点主机的标识符,全局唯一
    router_id keep_2
}

# 计算机节点
vrrp_instance VI_1 {
    # 表示状态,当前的主节点,MASTER/BACKUP
    state BACKUP
    # 当前实例绑定的网卡
    inteface eth0
    # 虚拟路由id，保证主备节点一致
    virtual_router_id 51
    # 优先级/权重，优先成为MASTER
    priority 80
    # 主备之间同步检查的时间间隔，默认为1s
    advert_int 1
    # 认证授权的密码,防止非法节点进入
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    # 虚拟IP
    virtual_ipaddress {
        192.168.1.161
    }
}

vrrp_instance VI_2 {
    # 表示状态,当前的主节点,MASTER/BACKUP
    state MASTER
    # 当前实例绑定的网卡
    inteface eth0
    # 虚拟路由id，保证主备节点一致
    virtual_router_id 52
    # 优先级/权重，优先成为MASTER
    priority 100
    # 主备之间同步检查的时间间隔，默认为1s
    advert_int 1
    # 认证授权的密码,防止非法节点进入
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    # 虚拟IP
    virtual_ipaddress {
        192.168.1.162
    }
}
```

## keepalived+lvs+nginx
```
global_defs {
    router_id keep_lvs_1
}

vrrp_instance VI_1 {
    state MASTER
    inteface eth0
    virtual_router_id 40
    priority 100
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.1.150
    }
}

# 配置集群地址访问的ip+端口,端口和nginx保持一致
virtual_server 192.168.1.150 80 {
    # 健康检查时间,单位:秒
    delay_loop 6
    # 配置负载均衡的算法,默认是轮询
    lb_algo rr
    # 设置lvs模式 NAT|TUN|DR
    lb_kind DR
    # 设置会话时间持久化时间
    persitence_timeout 50
    # 协议 -t
    protocol TCP

    # 负载均衡真实服务器,即nginx节点真实ip地址
    real_server 192.168.1.171 80 {
        # 轮询默认权重
        weight 1
        # 设置健康检查
        TCP_CHECK {
            # 检查80端口
            connect_port 80
            # 超时时间(秒)
            connect_timeout 2
            # 重试次数(次)
            nb_get_retry 2
            # 间隔时间(秒)
            delay_before_retry 3
        }
    }
    real_server 192.168.1.172 80 {
        weight 1
        # 设置健康检查
        TCP_CHECK {
            # 检查80端口
            connect_port 80
            # 超时时间(秒)
            connect_timeout 2
            # 重试次数(次)
            nb_get_retry 2
            # 间隔时间(秒)
            delay_before_retry 3
        }
    }
}
```
