---
layout: post
title: spring mvc
category: java
tags: spring
keywords: java,spring mvc
---    
## spring mvc 静态资源映射
* 实现WebMvcConfigurer.addResourceHandlers方法
```
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/**")
    .addResourceLocations("classpath:/META-INF/resources/") // 映射swagger2
    .addResourceLocations("file:\\idealProject\\upload\\img\\");// 映射本地静态资源
}
```
