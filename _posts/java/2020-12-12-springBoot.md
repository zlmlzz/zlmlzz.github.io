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
