---
layout: post
title: spring boot
category: java
tags: spring
keywords: java,spring boot
---    
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
