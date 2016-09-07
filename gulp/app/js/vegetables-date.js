require({
    baseUrl: 'js',
    paths: {
        vendor: ['vendor/vendor.min'],

    }
    }, function(){
    require(['vendor'], function() {
        var getmonthday = function(year, month) { //获取某一个月的天数
            var monthAry = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (year % 400 == 0) {
                monthAry[1] = 29;
            } else {
                if (year % 4 == 0 && year % 100 != 0) {
                    monthAry[1] = 29;
                }
            }
            return monthAry[month];
        }
        var dateformat = function(d, n) {
            if (n == 2) {
                if (d.length < 2) {
                    d = "0" + d;
                }
                return d
            } else if (n == 1) {
                return parseInt(d);
            }
        }
        var selectcheck = function(selectmonth, firstweek) {
            $(".select").removeClass("select");
            for (var i = 0; i < $(".selected-label").length; i++) { //已选择的select渲染
                var m = $(".selected-label").eq(i).find(".label-time p:first-child label:first-child").text();
                var d = $(".selected-label").eq(i).find(".label-time p:first-child label:last-child").text();
                if (parseInt(m) == parseInt(selectmonth)) {
                    $(".time-body li span").eq(parseInt(d) + firstweek - 1).addClass("select");
                }
                if (parseInt(m) + 1 == parseInt(selectmonth)) {
                    for (var j = 0; j < firstweek; j++) {
                        if (parseInt($(".time-body li span").eq(j).text()) == parseInt(d)) {
                            $(".time-body li span").eq(j).addClass("select");
                        }
                    }
                }
            }
        }
        var appenddate = function(givey, givem, gived, speciald, hasselect, clicknum, limitmon) {
            if (givey == null || givey == undefined) {
                var date = new Date();
                givey = date.getFullYear();

            }
            if (givem == null || givem == undefined) {
                var date = new Date();
                givem = date.getMonth() + 1;
            }
            if (gived == null || gived == undefined) {
                var date = new Date();
                gived = date.getDate();

            }
            givem = givem - 1;
            var apeendday = function(firstweek, monthday) { //渲染日期到页面
                for (var i = 0; i < monthday; i++) {
                    $(".time-body li span").eq(firstweek + i).text(i + 1);
                }
            }
            var prevapeendday = function(firstweek, days) { //渲染上个月剩余日期到页面
                for (var i = 0; i < firstweek; i++) {

                    $(".time-body li span").eq(i).text(days - firstweek + 1 + i);
                }
            }
            var addlimit = function(limitmon) {
                if (limitmon != null && limitmon != undefined) {
                    var minyear = parseInt(limitmon[0].toString().substring(0, 4));
                    var maxyear = parseInt(limitmon[1].toString().substring(0, 4));
                    var minmon = parseInt(limitmon[0].toString().substring(4, 6));
                    var maxmon = parseInt(limitmon[1].toString().substring(4, 6));
                    if (parseInt($(".top-month span").eq(0).text()) >= minyear && parseInt($(".top-month span").eq(1).text()) > minmon) {
                        $(".left-time").removeClass("gray");
                    } else {
                        $(".left-time").addClass("gray");
                    }
                    if (parseInt($(".top-month span").eq(0).text()) <= maxyear && parseInt($(".top-month span").eq(1).text()) < maxmon) {
                        $(".right-time").removeClass("gray");
                    } else {
                        $(".right-time").addClass("gray");
                    }
                }
            };
            var todayget = function(year, month, today) {
                var dayNames = new Array(0, 1, 2, 3, 4, 5, 6);
                var monthday = getmonthday(year, month); //当前月天数
                var Stamp = new Date(year, month, 1); //获取当前月1号的信息
                var firstweek = dayNames[Stamp.getDay()]; //获取当前月1号为星期几
                var j = 1;
                for (var i = firstweek; i < monthday + firstweek; i++) {
                    if (j == today) {
                        $(".time-body li").eq(i).addClass("today");
                        break;
                    } else {
                        j++;
                    }
                }
            };
            var compare = function() {
                var height = $(window).height() - $(".selected-container").height() - $(".next-btn").height();
                $(".body-container").css("height", height);
            };
            var month = givem;
            var year = givey;
            var today = gived;

            var selectyear = $(".top-month span").eq(0).text(year);
            var selectmonth = $(".top-month span").eq(1).text(month + 1);
            var datecontroller = function(year, month, today) {
                $(".time-body li ,.time-body li span").removeClass()
                $(".time-body li span").text("");
                var selectyear = $(".top-month span").eq(0).text();
                var selectmonth = $(".top-month span").eq(1).text();

                var dayNames = new Array(0, 1, 2, 3, 4, 5, 6);
                var prevyear = selectyear;
                var m = selectmonth - 2; //上个月标号
                if (selectmonth == 1) {
                    m = 11;
                    prevyear--;
                }
                var monthday = getmonthday(selectyear, selectmonth - 1); //当前月天数
                var Stamp = new Date(selectyear, selectmonth - 1, 1); //获取当前月1号的信息
                var firstweek = dayNames[Stamp.getDay()]; //获取当前月1号为星期几
                var prevmonthday = getmonthday(prevyear, m); //上个月天数

                apeendday(firstweek, monthday); //渲染当前月日历
                addlimit(limitmon);
                prevapeendday(firstweek, prevmonthday);
                var temp = 1;
                if (selectmonth == month + 1) {
                    todayget(year, month, today);
                }
                for (var i = 0; i < monthday + firstweek; i++) { //时间比较渲染灰色
                    if (i < firstweek) {
                        if (selectyear < year) {
                            $(".time-body li span").addClass("font-color-ash2");
                        } else if (selectyear == year) {
                            if (selectmonth - 1 < month + 1) {
                                $(".time-body li span").eq(i).addClass("font-color-ash2");
                            } else if ($(".time-body li span").eq(i).text() < today && selectmonth - 1 == month + 1) {
                                $(".time-body li span").eq(i).addClass("font-color-ash2");
                            }
                        }
                    } else {
                        if (selectyear < year) {
                            $(".time-body li span").addClass("font-color-ash2");
                        } else if (selectyear == year) {
                            if (selectmonth < month + 1) {
                                $(".time-body li span").addClass("font-color-ash2");
                            } else if ($(".time-body li span").eq(i).text() <= today && selectmonth == month + 1) {
                                $(".time-body li span").eq(i).addClass("font-color-ash2");
                            }
                        }
                    }
                    temp++;
                }
                if (speciald != null || speciald != undefined) {
                    for (var i = 0; i < speciald.length; i++) {
                        var specialy = speciald[i].toString().substring(0, 4);
                        var specialm = speciald[i].toString().substring(4, 6);
                        var specialday = speciald[i].toString().substring(6, 8);
                        if (parseInt(specialy) == parseInt($(".top-month span").eq(0).text())) {
                            if (parseInt(specialm) == parseInt($(".top-month span").eq(1).text())) {
                                $(".time-body li span").eq(firstweek + parseInt(specialday) - 1).addClass("font-color-ash2");
                            }
                            if (parseInt(specialm) == parseInt($(".top-month span").eq(1).text()) - 1) {
                                if (firstweek + specialday - prevmonthday - 1 >= 0) {
                                    $(".time-body li span").eq(firstweek + parseInt(specialday) - prevmonthday - 1).addClass("font-color-ash2");
                                }
                            }
                        }
                    }
                }
                $(".choosed").remove();
                if (hasselect != null && hasselect != undefined) {
                    for (var i = 0; i < hasselect.length; i++) {
                        var specialy = parseInt(hasselect[i].toString().substring(0, 4));
                        var specialm = parseInt(hasselect[i].toString().substring(4, 6));
                        var specialday = parseInt(hasselect[i].toString().substring(6, 8));
                        if (parseInt(specialy) == parseInt($(".top-month span").eq(0).text())) {
                            if (parseInt(specialm) == parseInt($(".top-month span").eq(1).text())) {
                                $(".time-body li ").eq(firstweek + specialday - 1).append("<div class='choosed'>已选</div>");
                                var t = $(".time-body li ").eq(firstweek + specialday - 1);
                                if (t.hasClass("today")) {
                                    t.removeClass("today");
                                }
                            }
                            if (parseInt(specialm) == parseInt($(".top-month span").eq(1).text()) - 1) {
                                if (firstweek + specialday - prevmonthday - 1 >= 0) {
                                    $(".time-body li span").eq(firstweek + specialday - prevmonthday - 1).append("<div class='choosed'>已选</div>");
                                    var t = $(".time-body li span").eq(firstweek + specialday - prevmonthday - 1);
                                    if (t.hasClass("today")) {
                                        t.removeClass("today");
                                    }
                                }
                            }
                        }
                    }
                }
                selectcheck(selectmonth, firstweek);
                $(".first-get").hide(); //首次选中特效先隐藏
                $(".time-body li").unbind("click"); //防止重复绑定
                if ($(".get-num label").text() == '') {
                    if (clicknum == null || clicknum == undefined) {
                        $(".get-num label").text('0');
                    } else {
                        $(".get-num label").text(clicknum);
                    }
                }
                $(".time-body li").click(function() { //点击事件
                    if ($(".get-num label").text() > 0) { //选择次数控制
                        var label = $(this).find("label");
                        var span = $(this).find("span")
                        if (span.hasClass("font-color-ash2") || span.text() == '') {

                        } else {
                            if (!span.hasClass("select")) {
                                label.show().addClass("fadeout");
                            }
                            span.addClass("select");
                            if ($(this).find("div.choosed").length > 0) {
                                $(this).find("div.choosed").hide();
                            }
                            var d = span.text();
                            var temp = new Date(selectyear, selectmonth - 1, d);
                            var daybigNames = new Array("日", "一", "二", "三", "四", "五", "六");
                            var week = daybigNames[temp.getDay()];
                            var html = '<div class="selected-label"><div class="label-body"><div class="close-selected"></div><div class="label-time"><p><label>' + dateformat(selectmonth, 2) + '</label><span>·</span><label>' + dateformat(d, 2) + '</label></p><p><span class="send-week">周' + week + '配送</span></p></div></div></div>';
                            $(".selected-container").append(html);
                            $(".selected-label").unbind("click");
                            $(".selected-label").click(function() {
                                var spm = parseInt($(this).find(".label-time p:first-child label:first-child").text());
                                var showy = parseInt($(".top-month span").eq(0).text());
                                var showm = parseInt($(".top-month span").eq(1).text());
                                var spd = parseInt($(this).find(".label-time").find("p:first-child label:last-child").text());
                                var spy = $(".top-month span").eq(0).text()
                                var dayNames = new Array(0, 1, 2, 3, 4, 5, 6);
                                var Stamp = new Date(showy, showm - 1, 1); //获取当前月1号的信息
                                var firstweek = dayNames[Stamp.getDay()]; //获取当前月1号为星期几
                                if (spm == showm) {
                                    $(".time-body li label").eq(firstweek + spd - 1).removeClass("fadeout").hide();
                                }
                                if (spm + 1 == showm) {
                                    for (var j = 0; j < firstweek; j++) {
                                        if (parseInt($(".time-body li span").eq(j).text()) == spd) {
                                            $(".time-body li label").eq(j).removeClass("fadeout").hide();
                                        }
                                    }
                                }
                                $(this).remove();
                                selectcheck(showm, firstweek);
                                $(".get-num label").text(parseInt($(".get-num label").text()) + 1);
                                compare();
                            });
                            compare();

                            $(".get-num label").text($(".get-num label").text() - 1);
                        }
                    }
                });
            }

            datecontroller(year, month, today); //首次进入页面渲染一次

            $(".right-time").click(function() { //右边点击按钮
                if (!$(this).hasClass("gray")) {
                    var m = $(".top-month span").eq(1).text();
                    var y = $(".top-month span").eq(0).text();
                    if (m < 12) {
                        m++;
                    } else {
                        m = 1;
                        y++;
                    }
                    $(".top-month span").eq(1).text(m);
                    $(".top-month span").eq(0).text(y);
                    datecontroller(year, month, today);
                }
            });
            $(".left-time").click(function() { //左边点击按钮
                if (!$(this).hasClass("gray")) {
                    var m = $(".top-month span").eq(1).text();
                    var y = $(".top-month span").eq(0).text();
                    if ((y - year == 0 && m - 1 > month) || (y - year > 0)) {
                        var y = $(".top-month span").eq(0).text();
                        if (m > 1) {
                            m--;
                        } else {
                            m = 12;
                            y--;
                        }
                        $(".top-month span").eq(1).text(m);
                        $(".top-month span").eq(0).text(y);
                        datecontroller(year, month, today);
                    }
                }
            });

            compare();

        };
        var choosed = [20160727, 20160729];
        var limitmon = [20160727, 20161229];
        appenddate(null, null, null, null, null, 8, limitmon);
        $(".setmeal-alert").hide();
        $(".alert-button-contain a").click(function() {
            $(".plusMark,.setmeal-alert").hide();
        });
        $(".vegetables-setmeal  div").click(function() {
            $(".plusMark,.setmeal-alert").show();
        });
        $(".time-body li ").eq(12).addClass("over-top");
        var y = $(".over-top span").offset().top - ($(".over-top span").height() / 4) - $(".vegetable-first img").height();
        var x = $(".over-top span").offset().left + ($(".over-top span").width() / 2);

        $(".vegetable-first").css("top", y);
        $(".vegetable-first").css("right", $(window).width() - x);
        $(".first-show").css("top", $(".over-top span").offset().top).css("left", $(".over-top span").offset().left).text($(".over-top span").text());
        if ($(".over-top span").hasClass("font-color-ash2")) {
            $(".first-show").addClass("font-color-ash2");
        }
        $(".vegetable-know").click(function() {
            $(".plusMark,.vegetable-first,.vegetable-know,.first-show").hide();
            $(".over-top").removeClass("over-top");
        });


    });

});
