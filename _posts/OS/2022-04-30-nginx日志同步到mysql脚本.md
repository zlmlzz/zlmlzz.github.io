---
layout: post
title: nginx日志同步到mysql脚本
category: OS
tags: shell
description: nginx日志同步到MySQL脚本
keywords: shell,nginx,mysql
---
## 概述
* 通过shell脚本将nginx日志同步到MySQL分析
* nginx日志格式(部分)`$remote_addr#>#$remote_user#>#$time_local#>#$request#>#$http_host#>#$status`

## 脚本实现
```
#!/bin/bash

#转换英文时间月份为阿拉伯数字
function transfer(){
    case $1 in
    "Jan") return 1
    ;;
    "Feb") return 2
    ;;
    "Mar") return 3
    ;;
    "Apr") return 4
    ;;
    "May") return 5
    ;;
    "Jun") return 6
    ;;
    "Jul") return 7
    ;;
    "Aug") return 8
    ;;
    "Sep" | "Sept") return 9
    ;;
    "Oct") return 10
    ;;
    "Nov") return 11
    ;;
    "Dec") return 12
    ;;
    esac
}

#设置环境变量,供后续执行程序使用
export -f transfer

#整个时间转换
function unixtime(){      
    if [ -n "$!"] ;
    then
        TIME=`echo ${1} | awk -F'+' '{print $1}' | awk -F'[:\b/]' '{cmd="transfer "$2;print $3"-"system(cmd)"-"$1" "$4":"$5":"$6}'`
        echo $TIME
    fi
}

#转换数字
function parseint(){
    data=`echo ${1}`
    if [ -z "$data" ] ;
    then
        echo 0
    else
        echo $data
    fi
}

#日志路径
LOG_PATH='/var/log/nginx/'

#日志名称
LOGS=('access')

#处理昨天日志
YESTERDAY=`date -d "yesterday" +"%Y-%m-%d"`

#拼写插入数据命令
SQL='use log;INSERT INTO access_log(remote_addr,remote_user,time_local,request,http_host,status)VALUES'

#获取当前时间
DATE=`date -d "yesterday" +"%Y%m%d"`

#循环读取所有的日志,并进行读取
for LOG in ${LOGS[@]} ;
do
    DATA=`/bin/cat "$LOG_PATH$LOG-$YESTERDAY.log" | awk -F "#>#" '{gsub(" ","",$0);printf("%s>>>%s>>>%s>>>%s>>>%s>>>%s",$1,$2,$3,$4,$5,$6);print""}'`

    #计算器,插入的数据超过500条先提前插入
    I=1
    QRYSQL=''
    for D in ${DATA[@]} ;
    do
          #将上面每行转化为数组
          DD=(`echo ${D//>>>/ }`)

          #超过400条先插入
          QRYSQL="${QRYSQL}(\"${DD[0]}\",\"${DD[1]}\",\"`unixtime ${DD[2]}`\",\"${DD[3]}\",\"${DD[4]}\",\"${DD[5]}\"),"
          if [ $I == 400 ] ;
          then
                QRYSQL=$SQL${QRYSQL%%,}';'
                mysql --login-path=local -e "${QRYSQL}"
                I=0
                QRYSQL=''
          fi
          I=`expr $I + 1`
    done
    if [ $I -gt 1 ] ; then
          QRYSQL=$SQL${QRYSQL%%,}';'
          mysql --login-path=local -e "${QRYSQL}"
    fi
done  
```

## 附
* MySQL中的`--login-path`是为了更方便更安全的不把登录MySQL的信息输出在控制台上
* 设置账号信息`mysql_config_editor set --login-path=root --user=root --host=127.0.0.1 --port=3306 --password`回车输入密码
