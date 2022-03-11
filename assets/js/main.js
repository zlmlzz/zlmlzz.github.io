---
layout: null
---

$(function() {
  var toc = $('.toc-link'),
      sidebar = $('#sidebar'),
      main = $('#main'),
      menu = $('#menu'),
      posttoc = $('#post-toc-menu'),
      baseUrl = 'http://127.0.0.1:3000/front/',
      home = 'http://127.0.0.1:4000',
      x1, y1;

  // run this function after pjax load.
  var afterPjax = function() {
    // open links in new tab.
    $('#main').find('a').filter(function() {
      return this.hostname != window.location.hostname;
    }).attr('target', '_blank');

    // generate toc
    var toc = $('#post-toc-ul');
    // Empty TOC and generate an entry for h1
    toc.empty().append('<li class="post-toc-li post-toc-h1"><a href="#post-title" class="js-anchor-link">' + $('#post-title').text() + '</a></li>');

    // Generate entries for h2 and h3
    $('.post').children('h2,h3').each(function() {
      // Generate random ID for each heading
      $(this).attr('id', function() {
        var ID = "", alphabet = "abcdefghijklmnopqrstuvwxyz";

        for(var i=0; i < 5; i++) {
          ID += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        return ID;
      });

      if ($(this).prop("tagName") == 'H2') {
        toc.append('<li class="post-toc-li post-toc-h2"><a title="'+$(this).text()+' "href="#' + $(this).attr('id') + '" class="js-anchor-link">' + $(this).text() + '</a></li>');
      } else {
        toc.append('<li class="post-toc-li post-toc-h3"><a title="'+$(this).text()+'" href="#' + $(this).attr('id') + '" class="js-anchor-link">' + $(this).text() + '</a></li>');
      }
    });

    // Smooth scrolling
    $('.js-anchor-link').on('click', function() {
      var target = $(this.hash);
      main.animate({scrollTop: target.offset().top + main.scrollTop() - 70}, 500);
    });

    // your scripts
    // 复制链接
    $('.share.copy').bind("click",function (e) {
      //创建input
      var inputZ = document.createElement('input');
      //添加Id,用于后续操作
      inputZ.setAttribute('id', 'inputCopy');
      //获取当前链接
      inputZ.value = window.location.href;
      //创建的input添加到body
      document.body.appendChild(inputZ);
      //选中input中的值
      document.getElementById('inputCopy').select();
      //把值复制下来
      document.execCommand('Copy')
      //删除添加的input
      document.body.removeChild(inputZ);
      $('.share.result').css("color", "red");
    });

    // 电子邮箱校验
    $('#username').on("change", function () {
      var email = $('#username').val();
      if (checkEmail(email)) {
        $('.username-message').hide();
      } else {
        $('.username-message').show();
      }
    });

    // 密码校验
    $('#password').on("change", function () {
      var password = $('#password').val();
      var reg = new RegExp("^(?![a-zA-z]+$)(?!\\d+$)(?![!@#$%^&*]+$)[a-zA-Z\\d!@#$%^&*]+$");
      if (password && password.length >= 8 && password.length <= 50 && password.length <= 50 && reg.test(password)) {
        $('.password-message').hide();
      } else {
        $('.password-message').show();
      }
    });

    // 重复密码
    $('#prePassword').on("change", function () {
      var prePassword = $('#prePassword').val();
      var password = $('#password').val();
      if (prePassword === password) {
        $('.pre-password-message').hide();
      } else {
        $('.pre-password-message').show();
      }
    });

    // 发表评论
    $('.send').on("click",function () {
      if (online()) {
        // 调用发表评论接口
      } else {
        window.location.href = home + "/login.html";
      }
    });

    // 回复
    $(document).on("click", ".send", function () {
      if (online()) {
        // 调用回复接口
      } else {
        window.location.href = home + "/login.html";
      }
    });


    // 注册
    $('#register').on("click", function () {
      var data = {
        "username": $('#username').val(),
        "password": $('#password').val(),
        "prePassword": $('#prePassword').val(),
        "nickName": $('#nickName').val()
      };
      if (!check(data)) {
        return;
      }
      $.ajax({
        type: "POST",
        url: baseUrl + "register",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          alert(data);
          window.location.href = home;
        },
        error: function (data) {
          console.log(data);
        }
      });
    });

    // 登录
    $('#login').on("click", function () {
      var data = {
        "username": $('#username').val(),
        "password": $('#password').val()
      };
      if (!check(data)) {
        return;
      }
      $.ajax({
        type: "POST",
        url: baseUrl + "login",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          if (data.message === "success") {
            setCookie("token", data.token);
            window.location.href = home;
          } else {
            $('.btn-message').text(data.message);
            $('.btn-message').show();
          }
        },
        error: function (data) {
          console.log(data);
        }
      });
    });

    // 退出登录
    $('.exit').on("click", function () {
      var url = baseUrl + "exit?token=" + getCookie("token");
      $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          if ("success" === data) {
            clearCookie("token");
            window.location.href = home;
          }
        },
        error: function (data) {
          console.log(data);
          return false;
        }
      });
    });

  };

  function check(data) {
    return checkEmail(data.username) && checkPassword(data);
  }

  function checkEmail(email) {
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    return email && email.length <= 50 && reg.test(email);
  }

  function checkPassword(data) {
    var reg = new RegExp("^(?![a-zA-z]+$)(?!\\d+$)(?![!@#$%^&*]+$)[a-zA-Z\\d!@#$%^&*]+$");
    var password = data.password;
    var prePassword = data.prePassword;
    if (prePassword) {
      return password === prePassword && password
          && password.length >= 8 && password.length <= 50 && password.length <= 50 && reg.test(password);
    } else {
      return password.length >= 8 && password.length <= 50 && password.length <= 50 && reg.test(password);
    }
  }

  //清除cookie
  function clearCookie(name) {
    setCookie(name, "", -1);
  }

  function publish() {
    $('#contentId').val("test");
  }

  function online() {
    var token = getCookie("token");
    if (token) {
      $.ajax({
        type: "POST",
        url: baseUrl + "online?token=" + token,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          adjust(data);
        },
        error: function () {
          return false;
        }
      });
    } else {
      adjust(false);
    }
  }

  function list() {
    var data = {
      "size": 281,
      "list": [{
        "id": 1,
        "imageUrl": "https://himg.bdimg.com/sys/portrait/item/wise.1.27fe2bb5.7hXDYeTK0d3OIahW6MztlA.jpg?time=7402",
        "nickName": "zhangnan1111ai",
        "time": "1小时前",
        "likeText": 1948,
        "content": "然而没有，都是缓兵之计，一个等白俄罗斯和车臣增兵，一个等国际雇佣兵登场。",
        "child": [{
          "id": 2,
          "imageUrl": "https://himg.bdimg.com/sys/portrait/item/wise.1.eec5bf39.edtuVzcQyQNNohDE2HIdlg.jpg?time=3635",
          "nickName": "蓝浩洋",
          "time": "14分钟前",
          "content": "斯拉夫",
          "likeText": "赞"
        }]
      }]
    };

    if (data && data.size > 0) {
      var html = '<h2 class="xcp-list-title">评论列表(' + data.size + '条)</h2>'
          + '        <div class="xcp-list-list">';
      for (var i = 0; i < data.list.length; i++) {
        var item = data.list[i];
        html = html +
            '            <div class="xcp-item">' +
            '<input hidden="hidden" value="' + item.id + '">' +
            '                <div class="left">' +
            '                    <div class="x-avatar">' +
            '                        <div class="x-avatar-placeholder"></div>' +
            '                        <div class="x-avatar-img"' +
            '                             style="background-image: url(' + item.imageUrl + ')"></div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="right">' +
            '                    <div class="user-bar">' +
            '                        <h5 class="user-bar-uname">' + item.nickName + '</h5>' +
            '                    </div>' +
            '                    <div class="x-interact-rich-text rich-text">' +
            '                        <span class="type-text">' + item.content + '</span>' +
            '                    </div>' +
            '                    <div class="interact-bar">' +
            '                        <div class="interact-bar-left">' +
            '                            <span class="time">' + item.time + '</span>' +
            '                            <span class="report">举报</span>' +
            '                        </div>' +
            '                        <div class="interact-bar-right">' +
            '                            <div class="reply">' +
            '                                <i class="icon reply-icon"></i>' +
            '                                <span class="reply-text">回复</span>' +
            '                            </div>' +
            '                            <div class="like ">' +
            '                                <i class="icon like-icon"></i>' +
            '                                <span class="like-text">' + item.likeText + '</span>' +
            '                            </div>' +
            '                        </div></div>';
        if (item && item.child && item.child.length > 0) {
          html = html + '                    <div class="xcp-list">' +
              '                        <div class="xcp-list-list is-second">';
          for (var j = 0; j < item.child.length; j++) {
            var child = item.child[j];
            html = html +
                '                            <div class="xcp-item">' +
                '<input hidden="hidden" value="' + child.id + '">' +
                '                                <div class="left">' +
                '                                    <div class="x-avatar is-small">' +
                '                                        <div class="x-avatar-placeholder"></div>' +
                '                                        <div class="x-avatar-img"' +
                '                                             style="background-image: url(' + child.imageUrl + ')"></div>' +
                '                                    </div>' +
                '                                </div>' +
                '                                <div class="right">' +
                '                                    <div class="user-bar">' +
                '                                        <h5 class="user-bar-uname">' + child.nickName + '</h5>' +
                '                                    </div>' +
                '                                    <div class="x-interact-rich-text rich-text"' +
                '                                         >' +
                '                                        <span class="type-text">' + child.content + '</span>' +
                '                                    </div>' +
                '                                    <div class="interact-bar">' +
                '                                        <div class="interact-bar-left">' +
                '                                            <span class="time">' + child.time + '</span>' +
                '                                            <span class="report">举报</span>' +
                '                                        </div>' +
                '                                        <div class="interact-bar-right">' +
                '                                            <div class="reply">' +
                '                                                <i class="icon reply-icon"></i>' +
                '                                            </div>' +
                '                                            <div class="like ">' +
                '                                                <i class="icon like-icon"></i>' +
                '                                                <span class="like-text">' + child.likeText + '</span>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                    </div>' +
                '                                </div>' +
                '                            </div>';
          }
          html = html + '</div></div>';
        }
        html = html + '</div>';
      }
      html = html + '</div>';
      $('.xcp-list').append(html);
    }
  }

  function adjust(online) {
    if (online) {
      $('#login-btn').hide();
      $('#register-btn').hide();
    } else {
      $('#exit-btn').hide();
    }
  }

  function setCookie(name, value) {
    //设置名称为name,值为value的Cookie
    var expdate = new Date();   //初始化时间
    expdate.setTime(expdate.getTime() + 30 * 60 * 1000);   //时间
    document.cookie = name + "=" + value + ";expires=" + expdate.toGMTString() + ";path=/";
  }

  function getCookie(name) {
    var prefix = name + "="
    var start = document.cookie.indexOf(prefix)

    if (start == -1) {
      return null;
    }

    var end = document.cookie.indexOf(";", start + prefix.length)
    if (end == -1) {
      end = document.cookie.length;
    }

    var value = document.cookie.substring(start + prefix.length, end)
    return unescape(value);
  }

  afterPjax();

  // NProgress
  NProgress.configure({ showSpinner: false });

  // Pjax
  $(document).pjax('#sidebar-avatar, .toc-link', '#main', {
    fragment: '#main',
    timeout: 3000
  });

  $(document).on({
    'pjax:click': function() {
      NProgress.start();
      main.removeClass('fadeIn');
    },
    'pjax:end': function() {
      afterPjax();
      NProgress.done();
      main.scrollTop(0).addClass('fadeIn');
      // only remove open in small screen
      if($(window).width() <= 1024) {
        menu.add(sidebar).add(main).removeClass('open');
      }
    }
  });

  // Tags Filter
  $('#sidebar-tags').on('click', '.sidebar-tag', function() {
    var filter = $(this).data('filter');
    toc.hide();
    if (filter === 'recent') {
      toc.slice(0, {{ site.recent_num }}).fadeIn(350);
    } else {
      $('.toc-link[data-tags~=' + filter + ']').fadeIn(350);
    }
    $(this).addClass('active').siblings().removeClass('active');
  });
  // Only show recent
  toc.hide();
  toc.slice(0, {{ site.recent_num }}).fadeIn(350);

  // Menu
  menu.on('click', function() {
    $(this).add(sidebar).add(menu).add(main).toggleClass('open');
  });

  // right toc
  posttoc.on('click', function() {
    $('#post-toc').toggleClass('open');
  });

  // Search
  $('#search-input').on('input', function(e){
    var blogs = $(".toc-link").filter(function() {
      var reg = new RegExp($('#search-input').val(), "i");
      return reg.test($(this).text());
    });
    toc.hide();
    blogs.fadeIn(350);
  });

  online();
  list();
  // 回复
  $('.reply-text').on("click", function () {
    var val = $(this).text();
    var interactBar = $(this).parents('.interact-bar');
    if ("回复" === val) {
      $(this).text("取消回复");
      var text = interactBar.prevAll('.user-bar').text();
      var html = '<div style="padding-top: 17px;">' +
          '            <div class="x-interact-publish">' +
          '                <div class="x-interact-publish-cont">' +
          '                    <textarea contenteditable="true" class="text-area placeholder" placeholder="回复' + text.trim() + ':"></textarea>' +
          '                    <div class="other"></div>' +
          '                </div>' +
          '                <div class="x-interact-publish-panel-center">' +
          '                </div>' +
          '                <div class="x-interact-publish-opt ">' +
          '                    <span class="send enable">发表</span>' +
          '                </div>' +
          '            </div>' +
          '        </div>';
      interactBar.after(html);
    } else if ("取消回复" === val) {
      $(this).text("回复");
      interactBar.next().remove();
    }
  });

});
