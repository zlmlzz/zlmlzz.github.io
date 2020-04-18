---
layout: post
title: spring schedule
category: java
tags: spring
keywords: java,spring schedule
---    
<style>
tr td,th{
    border:2px solid;
    text-align:center;
}
.mt{
    border-collapse:collapse;
}
</style>
## Spring Schedule Cron表达式
<table class="mt" width="900">
    <tr>
        <th>字段名</th>
        <th>允许的值</th>
        <th>允许的特殊字符</th>
    </tr>
    <tr align="center">
        <td>秒</td>
        <td>0-59</td>
        <td>, - * /</td>
    </tr>
    <tr align="center">
        <td>分</td>
        <td>0-59</td>
        <td>, - * /</td>
    </tr>
    <tr align="center">
        <td>小时</td>
        <td>0-23</td>
        <td>, - * /</td>
    </tr>
    <tr align="center">
        <td>月内日期</td>
        <td>1-31</td>
        <td>, - * ? / L W C</td>
    </tr>
    <tr align="center">
        <td>月</td>
        <td>1-12或者JAN-DEC</td>
        <td>, - * /</td>
    </tr>
    <tr align="center">
        <td>周内日期</td>
        <td>1-7或者SUN_SAT</td>
        <td>, - * ? / L C #</td>
    </tr>
    <tr align="center">
        <td>年(可选)</td>
        <td>留空,1970-2099</td>
        <td>, - * /</td>
    </tr>
</table>
<br>
<table class="mt" width="900">
    <tr>
        <th>特殊字符</th>
        <th>意义</th>
    </tr>
    <tr>
        <td>*</td>
        <td>匹配所有的值,如:*在分钟的字段里表示每分钟</td>
    </tr>
    <tr>
        <td>?</td>
        <td>之在日期域和星期域中使用,它被用来指定"非明确的值"</td>
    </tr>
    <tr>
        <td>-</td>
        <td>指定一个范围,如:"10-12"在小时域意味着"10点、11点、12点"</td>
    </tr>
    <tr>
        <td>,</td>
        <td>指定几个可选值,如:"MON,WED,FRI"表示"星期一、星期三、星期五"</td>
    </tr>
    <tr>
        <td>/</td>
        <td>指定增量,如:"0/15"在秒域意思是每分钟的0,15,30和45秒,"5/15"在分钟域表示每小时的5,20,35和50,符号"*"在"/"前面(如:*/10)等价于0在"/"前面(如:0/10)</td>
    </tr>
    <tr>
        <td>L</td>
        <td>表示day-of-month和day-of-week域,但在两个字段中意思不同,例如day-of-month域中表示一个月的最后一天。如果在day-of-week域表示"7"或者"SAT",如果在day-of-week域中前面加上数字,它表示一个月的最后几天,例如"6L"就表示一个月的最后一个星期五</td>
    </tr>
    <tr>
        <td>W</td>
        <td>只允许日期域内出现,这个字符用于指定日期的最近工作日.例如:"15W",表示这个月15号最近的工作日.即15号是周六的话任务在14号周五触发,如果15号是周日,则任务在16号下周触发."1W"的话不管周六周日都会在下周一触发,"W"字符指定的最近工作日是不能够跨月份的,字符"W"只能配合一个单独的数字使用,不能是一个数字段</td>
    </tr>
    <tr>
        <td>LW</td>
        <td>L和W可以在日期域中联合使用,LW表示这个月最后一周的工作日</td>
    </tr>
    <tr>
        <td>#</td>
        <td>只允许在星期域中出现.这个字符用于h指定本月的某某天。例如:"6#3"表示本月第三周的星期五,"2#1"表示本月第一周的星期一</td>
    </tr>
    <tr>
        <td>C</td>
        <td>允许在日期域和星期域出现。这个字符依靠一个指定的日历。</td>
    </tr>
</table>
### 常用cron表达式
* 0 0 0 * * ？          每天0点一次
* 0 0 23 * * ？         每天23点一次
* 0 */1 * * * ？        每1分钟
* 0 0 */6 * * ？        每6小时
* 0 0 */1 * * ？        每1小时



