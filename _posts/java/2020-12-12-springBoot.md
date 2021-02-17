---
layout: post
title: spring boot
category: java
tags: spring
keywords: java,spring boot
---    
## spring boot
* spring boot 是由pivotal团队提供的权限框架，其设计目的是用来简化spring应用的初始搭建过程以及开发过程，该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化配置。spring boot默认配置了很多框架的使用方式，就像maven整合了所有jar包，spring boot整合了所有的框架，它的核心设计思想是：约定优于配置，spring boot所有开发细节都是依据此思想进行实现的。
* 约定优于配置，也称作按约定编程，是一种软件设计范式，旨在减少软件开发人员需做决定的数量、获得简单的好处，而又不失灵活性。
* spring boot体系将预定优于配置的思想展现的淋漓尽致，小到配置文件、中间件的默认配置、大到内置容器、生态中的各种starters无不遵循此设计规则。spring boot鼓励各软件组织方创建自己的starter，创建starter的核心组件之一就是autoconfigure模块，也是starter的核心功能，在启动的时候进行自动装配，属性默认化配置
* 正是因为spring boot简化的配置和众多的starters才让spring boot变得简单、易用、快速上手，也可以说正是约定优于配置的思想彻底落地才让spring boot走向辉煌，spring boot约定优于配置的思想让spring boot项目非常容易上手，让编程变得更简单。
* spring boot starters基于约定优于配置的理念来设计，spring boot starter中有两个核心组件：自动配置代码和提供自动配置模块及其它有用的依赖。也就意味着当我们项目中引入某个starter，即拥有了此软件的默认使用能力，除非我们需要特定的配置，一般情况下仅需要少量的配置或者不配置即可使用组件对应的功能。
* spring boot由众多starter组成，随着版本的推移，starter家族成员也与日俱增。在spring boot项目中可以创建自定义spring boot starter来达成目的
spring boot整合了主流的开源软件形成了一系列的starter，让我们有了一致的编程体验来集成各种软件，spring boot在集成中做了大量的优化，让集成的时候往往只需要很少的配置和代码就可以完成。可以说各种starter就是spring boot最大的优势之一
* spring boot 是一套全新框架,来自spring家族家族，因此spring所有具备的功能它都有并且更容易使用；同时还简化了基于spring的应用开发，通过少量的代码就能创建一个独立的、产品级别的spring应用
* spring boot特性
    * 使用spring项目引导页面可以在几秒构建一个项目
    * 方便对外输出各种形式的服务：如REST API、WebSocket、Web、Streaming、Tasks
    * 非常简洁的安全策略集成
    * 支持关系数据库和非关系数据库
    * 支持运行期内嵌容器，如Tomcat、Jetty
    * 强大的开发包，支持热启动
    * 自动管理依赖
    * 自带应用监控
    * 支持各种IDEA，如IntelliJ IDEA、NetBeans
* 使用spring boot开发项目的优势
    * spring boot使开发变得简单，提供了丰富的解决方案，快速集成各种解决方案提升开发效率
    * spring boot使配置变得简单，提供了丰富的starters，集成主流开源产品往往只需要简单的配置即可
    * spring boot使部署变得简单，其本身内嵌启动容器，仅仅需要一个命令即可启动项目，结合Jenkins、Docker自动化运维非常容易实现
    * spring boot使监控变得简单，自带监控控件，使用Actuator轻松监控服务各项状态
    * spring boot极大简化了应用开发的门槛
* spring、spring boot和spring cloud之间关系
    * spring最初核心的两大核心功能springIoC和spring Aop成就了spring，spring在这两大核心功能上不断地发展，才有了spring事务、spring MVC等一系列产品
    * spring boot是在强大的spring帝国生态基础上发展来的，spring boot不是为了取代spring，是为了让人们更容易使用spring。spring boot使用约定优于配置的理念，重新重构了spring的使用，让spring后续发展更有生命力
    * spring cloud是一系列框架的有序集合，利用spring boot的开发便利性巧妙的简化了分布式系统基础设施的开发。服务发现注册、配置中心、消息总线、负载均衡、断路器、数据监控等，都可以用spring boot的开发风格做到一键式启动和部署
    * spring cloud是为了解决微服务架构中服务治理而提供的具备一系列功能的开发框架，并且spring cloud是完全基于spring boot而开发

## spring boot 自动装配
* SpringBootApplication注解默认配置
    * SpringBootConfiguration
        * Configuration
    * EnableAutoConfiguration
        * AutoConfigurationImportSelector.selectImports()
        * META-INF/spring.factories
    * ComponentScan

## spring boot 跨域设置
``` 
@Bean
public CorsFilter corsFilter(){
    CorsConfiguration config = new CorsConfiguration();
    config.addAllowedOrigin("http:192.168.217.129:8080");
    config.addAllowedOrigin("http:localhost:8080");
    // 设置是否发送cookie信息
    config.setAllowCredentials(true);
    // 设置允许的请求方式
    config.addAllowedMethod("*");
    // 设置允许的header
    config.addAllowedHeader("*");
    // 为url添加映射路径
    UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();
    corsConfigurationSource.registerCorsConfiguration("/**", config);
    // 返回重新定义好的corsConfigurationSource
    return new CorsFilter(corsConfigurationSource);
} 
```
## spring boot 打包(war)
```
<packing>war</packing>
```
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <!-- 2.移除自带的内置tomcat -->
    <!--<exclusions>
        <exclusion>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <groupId>org.springframework.boot</groupId>
        </exclusion>
    </exclusions>-->
</dependency>
```
```
<!-- 3.添加依赖 -->
<!--<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <scope>provided</scope>
</dependency>-->
```
```
// 4.增加war的启动类
public class WarStartApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        // 指向Application这个springboot启动类
        return builder.sources(Application.class);
    }
}
```
