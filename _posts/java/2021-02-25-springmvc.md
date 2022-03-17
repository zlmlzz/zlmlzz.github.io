---
layout: post
title: spring mvc
category: java
tags: spring
description: spring mvc静态资源映射,会话拦截
keywords: java,spring mvc
---    
## spring mvc 静态资源映射
* 实现WebMvcConfigurer.addResourceHandlers方法
```
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/**")
    .addResourceLocations("classpath:/META-INF/resources/") // 映射swagger2
    // 映射本地静态资源
    .addResourceLocations("file:\\idealProject\\upload\\img\\");
}
```

## 会话拦截
* 实现WebMvcConfigurer.addInterceptors方法

```
// 注册拦截器
@Override
public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(userTokenInterceptor())
        .addPathPatterns("/hello");
    WebMvcConfigurer.super.addInterceptors(registry);
}

// 拦截器对象
@Bean
public UserTokenInterceptor userTokenInterceptor() {
    return new UserTokenInterceptor();
}

##拦截器
public class UserTokenInterceptor implements HandlerInterceptor {

    // 访问controller之前
    @Override
    public boolean preHandle(HttpServletRequest request, 
        HttpServletResponse response, Object handler) throws Exception {
        return true;
    }

    // 访问controller之后，渲染视图之前
    @Override
    public void postHandle(HttpServletRequest request, 
        HttpServletResponse response, Object handler, 
            ModelAndView modelAndView)throws Exception {
    }

    // 访问controller之后，渲染视图之后
    @Override
    public void afterCompletion(HttpServletRequest request, 
        HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
    }
}
```
