/*
 * simpleCalendar v0.9.1
 * https://github.com/w3tl/simpleGallery
 *
 * Copyright 2014 Vitaly Dostovalov (dostovalovvs@gmail.com)
 * Released under the MIT license.
 *
 * Date: 2014.01.11
 */
(function ($) {
    $.fn.calendar = function (opt) {
        var opt = $.extend({
            view: 'days'
        }, opt);
        
        Date.prototype.getWeek = function () {
            var target  = new Date(this.valueOf()),
                dayNr   = (this.getDay() + 6) % 7;
            target.setDate(target.getDate() - dayNr + 3);
            var firstThursday = target.valueOf();
            target.setMonth(0, 1);
            if (target.getDay() !== 4) {
                target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
            }
            return 1 + Math.ceil((firstThursday - target) / 604800000);
        };
        
        return this.each(function () {
            var calendar = new Date(),
                year = calendar.getFullYear(),
                month = calendar.getMonth(),
                calendar_main = $(this);
            createMainView();
            var calendar_year = $('.calendar-year', calendar_main),
                calendar_days = $('.calendar-day', calendar_main),
                calendar_weeks = $('.calendar-week', calendar_main).not('.calendar-now'),
                month_id = [ {name: "January", days: 31}, {name: "February", days: 28}, {name: "March", days: 31}, {name: "April", days: 30}, {name: "May", days: 31}, {name: "June", days: 30}, {name: "Jule", days: 31}, {name: "August", days: 31}, {name: "September", days: 30}, {name: "October", days: 31}, {name: "November", days: 30}, {name:  "December", days: 31} ];
            
            function createMainView() {
                calendar_main.append('<div class="calendar-head"><span class="calendar-prev"></span>' +
                                     '<span class="calendar-year"></span><span class="calendar-next">' + 
                                     '</span></div>');
                createDaysView();
                createMonthsView();
                createYearsView();
            };
            
            function createDaysView() {
                calendar_main.append('<div class="calendar-body-days">');
                var calendar_body = $('.calendar-body-days', calendar_main);
                calendar_body.append('<div class="calendar-weeks"></div><div class="calendar-day-names"></div><div class="calendar-days"></div></div>');
                var cWeeks = '<span class="calendar-week calendar-now">&#9679;</span>';
                for (var i = 0; i < 6; i++) {
                    cWeeks += '<span class="calendar-week"></span>';
                }
                $('.calendar-weeks', calendar_body).append(cWeeks);
                var dayNames = [ 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su' ], cDayNames = '';
                for (var i = 0; i < 7; i++) {
                    cDayNames += '<span class="calendar-day-name">' + dayNames[i] + '</span>';
                }
                $('.calendar-day-names', calendar_body).append(cDayNames);
                var cDay = '';
                for (var i = 0; i < 42; i++) {
                    cDay += '<span class="calendar-day' + '"></span>';
                }
                $('.calendar-days', calendar_main).append(cDay);
                calendar_body.hide();
            };
            
            function createMonthsView() {
                calendar_main.append('<div class="calendar-body-months">');
                var calendar_body = $('.calendar-body-months', calendar_main);
                calendar_body.append('<div class="calendar-weeks"><span class="calendar-week calendar-now">&#9679;</span></div><div class="calendar-day-names"><span class="calendar-day-name">Year</span></div>');
                var cYear = '<div class="calendar-months">';
                for (var i = 0; i < 12; i++) {
                    cYear += '<span class="calendar-month"></span>';   
                }
                cYear += '</div>';
                calendar_body.append(cYear);
                calendar_body.hide();
            };
            function createYearsView() {
                calendar_main.append('<div class="calendar-body-years">');
                var calendar_body = $('.calendar-body-years', calendar_main);
                calendar_body.append('<div class="calendar-weeks"><span class="calendar-week calendar-now">&#9679;</span></div><div class="calendar-day-names"><span class="calendar-day-name">Years</span></div>');
                var cYears = '<div class="calendar-years">';
                for (var i = 0; i < 16; i++) {
                    cYears += '<span class="calendar-year-view"></span>';   
                }
                cYears += '</div>';
                calendar_body.append(cYears);
                calendar_body.hide();
            };
            
            function showYears(s_year) {
                $('.calendar-year', calendar_main).removeClass('showDays').removeClass('showMonths');
                $('.calendar-body-days',calendar_main).hide();
                $('.calendar-body-months',calendar_main).hide();
                calendar_year.text(s_year + ' - ' + (s_year + 15));
                var calendar_year_view =  $('.calendar-year-view', calendar_main);
                for (var i = 0; i < 16; i++) {
                    calendar_year_view.eq(i).text(s_year + i);
                }
                $('.calendar-body-years',calendar_main).show();
            };
            function showMonths(s_year) {
                $('.calendar-year', calendar_main).removeClass('showDays').addClass('showMonths');
                $('.calendar-body-days',calendar_main).hide();
                $('.calendar-body-years',calendar_main).hide();
                calendar_year.text(s_year);
                var calendar_month =  $('.calendar-month', calendar_main);
                for (var i = 0; i < 12; i++) {
                    calendar_month.eq(i).text(month_id[i].name.substring(0, 3));
                }
                $('.calendar-body-months',calendar_main).show();
            };
            function showDays(s_year, s_month) {
                $('.calendar-year', calendar_main).removeClass('showMonths').addClass('showDays');
                $('.calendar-body-months',calendar_main).hide();
                $('.calendar-body-years',calendar_main).hide();

                var date = new Date();
                date.setDate(1);
                date.setMonth(s_month);
                date.setFullYear(s_year);
                month_id[1].days = (s_year % 4 == 0 && s_year % 100 !== 0) || (s_year % 400 == 0) ? 29 : 28;

                calendar_year.text(s_year + ', ' + month_id[s_month].name);
                
                var month_before = s_month == 0 ? 11 : s_month - 1,
                    dayOfWeek = date.getDay() == 0 ? 6 : date.getDay() - 1;
                
                if ( dayOfWeek == 0 ) dayOfWeek = 7;
                for ( var i = 0; i < dayOfWeek; i++) {
                    calendar_days.eq(i).addClass('calendar-day-before');
                    calendar_days.eq(i).text(month_id[month_before].days - dayOfWeek + i + 1);
                };
                for ( var i = dayOfWeek; i < month_id[s_month].days + dayOfWeek; i++) {
                    calendar_days.eq(i).text(i - dayOfWeek + 1);
                    calendar_days.eq(i).removeClass('calendar-day-after calendar-day-before');
                };
                for ( var i = month_id[s_month].days + dayOfWeek; i < 42; i++) {
                    calendar_days.eq(i).text(i - month_id[s_month].days - dayOfWeek + 1);
                    calendar_days.eq(i).addClass('calendar-day-after');
                };
                
                var week = date.getWeek();
                for ( var i = week; i < week + 6; i++) {
                    calendar_weeks.eq(i - week).text(i);
                };
                $('.calendar-body-days',calendar_main).show();
            };
            
            $( ".calendar-prev", calendar_main ).click(function () {
                if (calendar_year.hasClass('showDays')) {
                    if ( month == 0 ) {
                        year -= 1;
                        month = 11;
                    } else {
                        month -= 1;   
                    }
                    showDays(year, month);
                } else if (calendar_year.hasClass('showMonths')) {
                    year -= 1;
                    showMonths(year);
                } else {
                    year -= 16;
                    showYears(year);
                }
            });
            $( ".calendar-next", calendar_main ).click(function () {
                if (calendar_year.hasClass('showDays')) {
                    if ( month == 11 ) {
                        year += 1;
                        month = 0;
                    } else {
                        month += 1;
                    }
                    showDays(year, month);
                }  else if (calendar_year.hasClass('showMonths')) {
                    year += 1;
                    showMonths(year);
                } else {
                    year += 16;
                    showYears(year);
                }
            });
            calendar_year.click(function () {
                if (calendar_year.hasClass('showDays')) {
                    showMonths(year);
                } else if (calendar_year.hasClass('showMonths')) {
                    showYears(year);   
                }
            });
            $( ".calendar-now", calendar_main ).click(function () {
                showDays(calendar.getFullYear(), calendar.getMonth());
            });
            
            $( ".calendar-month", calendar_main ).click(function () {
                month = $(this).index();
                showDays(year, month);
            });
            $( ".calendar-year-view", calendar_main ).click(function () {
                year = $(this).index() + year;
                showMonths(year);
            });
            switch (opt.view) {
                case 'days':
                    showDays(year, month);
                    break;
                case 'months':
                    showMonths(year);
                    break;
                case 'years':
                    showYears(year);
                    break;
                default:
                    showDays(year, month);
            }
            
        });
    }
})(jQuery);