var doc=window.document,Calendar=function(t){"use strict";var e={monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],dayNames:["周日","周一","周二","周三","周四","周五","周六"],dayLongNames:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],holiday:{"1-1":"元旦","2-2":"湿地日","2-14":"情人节","3-8":"妇女节","3-12":"植树节","3-15":"消费者权益日","4-1":"愚人节","4-22":"地球日","5-1":"劳动节","5-4":"青年节","5-12":"护士节","5-18":"博物馆日","6-1":"儿童节","6-5":"环境日","6-23":"奥林匹克日","6-24":"骨质疏松日","7-1":"建党节","8-1":"建军节","9-3":"抗战胜利日","9-10":"教师节","10-1":"国庆节","11-17":"学生日","12-1":"艾滋病日","12-24":"平安夜","12-25":"圣诞节"},firstDay:1,weekendDays:[0,6],dateFormat:"yyyy-mm-dd",weekHandler:"dayThead",monthContainer:"dateUl",toolBar:"timeChoose",limitDis:80};t=t||{};for(var a in e)"undefined"==typeof t[a]&&(t[a]=e[a]);this.attrs=t,this.touchesStart={},this.init()};Calendar.prototype={constructor:Calendar,init:function(){this.initEvents(),this.layout(),this.index=0,this._initEd=!0,this._interval=!0,this.offsetValue=this.monthEle.offsetWidth,this.timeNowEle=doc.querySelector(".timeNow"),this.bigTimeEle=doc.querySelector(".bigTime"),this.noliDateEle=doc.querySelector(".noliDate"),this.gooList=doc.querySelector(".gooList"),this.badList=doc.querySelector(".badList"),this.timePannel=doc.getElementById("timePannel"),this.prevMonthEle=doc.querySelector(".prev-month-html"),this.currMonthEle=doc.querySelector(".current-month-html"),this.nextMonthEle=doc.querySelector(".next-month-html"),this.setAside()},setAside:function(t){t=t||new Date;var e=t.getFullYear(),a=t.getMonth(),i=t.getDate(),n=Util.getLunarCalendar(e,a+1,i),s=Util.getSuitAndTaboo(e,a+1,i),r="<i>宜</i>",o="<i>忌</i>";this.timeNowEle.innerHTML="<span>"+e+"年"+(a+1)+"月</span><span>"+this.attrs.dayLongNames[t.getDay()]+"</span>",this.bigTimeEle.innerHTML="<span>"+i+"</span>",this.noliDateEle.innerHTML="<p>"+n.month+n.date+"</p><p>"+Util.getSexagenaryCycle(e)+"【"+Util.getZodiac(e)+"】</p>";for(var l=0,h=s.suit.length;h>l;l++)r+="<span>"+s.suit[l]+"</span>";for(var l=0,h=s.taboo.length;h>l;l++)o+="<span>"+s.taboo[l]+"</span>";this.gooList.innerHTML=r,this.badList.innerHTML=o},initEvents:function(){var t=this,e=this.monthEle=doc.querySelector("."+this.attrs.monthContainer);this.timeChooseEle=doc.querySelector(".timeChoose"),this.goPrev=doc.querySelector(".goPrev"),this.goNext=doc.querySelector(".goNext"),e.addEventListener("mousedown",this._handleTouchStart.bind(this),!1),e.addEventListener("mousemove",this._handleTouchMove.bind(this),!1),e.addEventListener("mouseup",this._handleTouchEnd.bind(this),!1),e.addEventListener("touchstart",this._handleTouchStart.bind(this),!1),e.addEventListener("touchmove",this._handleTouchMove.bind(this),!1),e.addEventListener("touchend",this._handleTouchEnd.bind(this),!1),e.addEventListener("click",this._handleClick.bind(this),!1),e.addEventListener("touchstart",this._handleClick.bind(this),!1),this.goPrev.addEventListener("click",function(e){t.turnPre()},!1),this.goNext.addEventListener("click",function(e){t.turnNext()},!1),e.addEventListener("transitionend",this._transformEnd.bind(this),!1),e.addEventListener("webkitTransitionEnd",this._transformEnd.bind(this),!1),this.timeChooseEle.addEventListener("click",this._handleTimeChoose.bind(this),!1),document.addEventListener("click",this._handleDocument.bind(this),!1),window.addEventListener("resize",this._handleResize.bind(this),!1)},_handleDocument:function(t){var e=t.target,a=e.className;if("pullDown"!==a)for(var i=document.querySelectorAll(".buttonGroup"),n=0,s=i.length;s>n;n++)i[n].classList.remove("open")},_handleTimeChoose:function(t){t.preventDefault();var e=t.target,a=e.parentNode,i=e.className;if(console.log(e),console.log(a),1===e.nodeType){if("pullDown"===i){var n=a.className.split(" ");-1===n.indexOf("open")?a.classList.add("open"):a.classList.remove("open")}if(("returnToday"===i||"returnToday"===a.className)&&this.resetDate(new Date),"list-year"===i){var s=parseInt(e.getAttribute("data-year")),r=parseInt(doc.getElementById("op-month-time").textContent)-1;doc.getElementById("op-year-time").textContent=s+"年",this.resetDate(new Date(s,r))}if("list-month"===i){var s=parseInt(doc.getElementById("op-year-time").textContent),r=parseInt(e.getAttribute("data-month"));doc.getElementById("op-month-time").textContent=r+"月",this.resetDate(new Date(s,r))}}},_handleResize:function(t){var e=this;e.resizeInterval=setTimeout(function(){e.offsetValue=e.monthEle.offsetWidth},300)},_handleClick:function(t){t.preventDefault();var e=t.target,a=e.nodeName;if("SPAN"===a||"dayTd"===e.className){var i="SPAN"===a?e.parentNode:e,n=parseInt(i.getAttribute("data-year")),s=parseInt(i.getAttribute("data-month")),r=parseInt(i.getAttribute("data-day"));this._oldEle&&this._oldEle.classList.remove("date-selected"),i.classList.add("date-selected"),this._oldEle=i,this.setAside(new Date(n,s,r))}},_handleTouchStart:function(t){t.preventDefault(),this._interval&&(this.isTouched=!0,"touchstart"===t.type?this.touchesStart.x=t.targetTouches[0].pageX:this.touchesStart.x=t.pageX)},_handleTouchMove:function(t){if(t.preventDefault(),this.isTouched){if(this.isMoved=!0,"touchmove"===t.type)var e=t.targetTouches[0].pageX;else var e=t.pageX;this.touchesDiff=e-this.touchesStart.x,this.endPos=e,this.monthEle.style[Util.prefix+"transition"]="all 0ms",this.monthEle.style[Util.prefix+"transform"]="translate3d("+(this.index*this.offsetValue+this.touchesDiff)+"px, 0px, 0px)"}},_handleTouchEnd:function(t){if(t.preventDefault(),!this.isTouched||!this.isMoved)return this.isTouched=!1,void(this.isMoved=!1);var e=this.endPos-this.touchesStart.x;Math.abs(e)<this.attrs.limitDis?this._transformPage():0>e?this.turnNext():this.turnPre(),this.isTouched=!1,this.isMoved=!1},turnPre:function(){this._interval&&(this.index++,this._isTurnPage=!0,this._offset="prev",this._interval=!1,this._transformPage())},turnNext:function(){this._interval&&(this.index--,this._isTurnPage=!0,this._offset="next",this._interval=!1,this._transformPage())},_transformPage:function(){this.monthEle.style[Util.prefix+"transition"]="300ms",this.monthEle.style[Util.prefix+"transform"]="translate3d("+100*this.index+"%, 0, 0)"},_tipPannel:function(){var t=this;if(!(this.offsetValue>425)){var e=this.value.getFullYear(),a=this.value.getMonth()+1;this.timePannel.textContent=e+"年"+a+"月",clearTimeout(this.tipInterval),this.timePannel.style.display="block",t.timePannel.offsetWidth,this.timePannel.style.opacity=1,this.tipInterval=setTimeout(function(){t.timePannel.style.opacity=0,t.timePannel.style.display="none"},800)}},_transformEnd:function(){var t=this._offset;if(this._isTurnPage){var e=new Date(this.value),a=e.getFullYear(),i=e.getMonth();"next"===t&&(e=11===i?new Date(a+1,0):new Date(a,i+1,1)),"prev"===t&&(e=0===i?new Date(a-1,11):new Date(a,i-1,1)),this.value=e,this._tipPannel(),this.layout();var n=-1*this.index;this.prevMonthEle=doc.querySelector(".prev-month-html"),this.currMonthEle=doc.querySelector(".current-month-html"),this.nextMonthEle=doc.querySelector(".next-month-html"),this.prevMonthEle.style[Util.prefix+"transform"]="translate3d("+100*(n-1)+"%, 0px, 0px)",this.currMonthEle.style[Util.prefix+"transform"]="translate3d("+100*n+"%, 0px, 0px)",this.nextMonthEle.style[Util.prefix+"transform"]="translate3d("+100*(n+1)+"%, 0px, 0px)",doc.getElementById("op-year-time").textContent=this.value.getFullYear()+"年",doc.getElementById("op-month-time").textContent=this.value.getMonth()+1+"月",this._interval=!0,this._isTurnPage=!1}},resetDate:function(t){this.value=t,this.index=0,this.monthEle.style[Util.prefix+"transition"]="all 0ms",this.monthEle.style[Util.prefix+"transform"]="translate3d(0 ,0 ,0)",this.prevMonthEle.style[Util.prefix+"transform"]="translate3d(-100%, 0px, 0px)",this.currMonthEle.style[Util.prefix+"transform"]="translate3d(0%, 0px, 0px)",this.nextMonthEle.style[Util.prefix+"transform"]="translate3d(100%, 0px, 0px)",doc.getElementById("op-year-time").textContent=this.value.getFullYear()+"年",doc.getElementById("op-month-time").textContent=this.value.getMonth()+1+"月",this.layout()},layout:function(){var t=this.value?this.value:(new Date).setHours(0,0,0,0);this.value=t;var e=this.monthHTML(t,"prev"),a=this.monthHTML(t),i=this.monthHTML(t,"next"),n='<div class="dateLi prev-month-html"><div class="dayTbody">'+e+'</div></div><div class="dateLi current-month-html"><div class="dayTbody">'+a+'</div></div><div class="dateLi next-month-html"><div class="dayTbody">'+i+"</div></div>";if(!this._initEd){for(var s=[],r=0;7>r;r++){var o=r+this.attrs.firstDay>6?r-7+this.attrs.firstDay:r+this.attrs.firstDay,l=this.attrs.dayNames[o];-1!==this.attrs.weekendDays.indexOf(o)?s.push('<div class="dayTd active">'+l+"</div>"):s.push('<div class="dayTd">'+l+"</div>")}for(var h=[],d=[],r=1900;2050>=r;r++){var u="<li class='list-year' data-year='"+r+"'>"+r+"年</li>";h.push(u)}for(var r=1;12>=r;r++){var u="<li class='list-month' data-month='"+(r-1)+"'>"+r+"月</li>";d.push(u)}doc.querySelector("."+this.attrs.weekHandler).innerHTML=s.join(""),doc.querySelector("."+this.attrs.toolBar).innerHTML='<div class="yearChoose"><div class="chooseContainer"><div class="buttonGroup"><span class="yearTime" id="op-year-time">'+(new Date).getFullYear()+'年</span><span class="pullDown">+</span></div><div class="pullSelect"><ul>'+h.join("")+'</ul></div></div></div><div class="monthChoose"><div class="chooseContainer"><div class="buttonGroup"><span class="monthTime" id="op-month-time">'+((new Date).getMonth()+1)+'月</span><span class="pullDown">+</span></div><div class="pullSelect"><ul>'+d.join("")+'</ul></div></div></div><div class="returnToday"><span>返回今天</span></div>'}doc.querySelector("."+this.attrs.monthContainer).innerHTML=n},totalDaysInMonth:function(t){var e=new Date(t);return new Date(e.getFullYear(),e.getMonth()+1,0).getDate()},monthHTML:function(t,e){var t=new Date(t),a=t.getFullYear(),i=t.getMonth();t.getDate();"next"===e&&(t=11===i?new Date(a+1,0):new Date(a,i+1,1)),"prev"===e&&(t=0===i?new Date(a-1,11):new Date(a,i-1,1)),("next"===e||"prev"===e)&&(i=t.getMonth(),a=t.getFullYear());var n=this.totalDaysInMonth(new Date(t.getFullYear(),t.getMonth()).getTime()-864e6),s=this.totalDaysInMonth(t),r=new Date(t.getFullYear(),t.getMonth()).getDay();0===r&&(r=7);for(var o,l=6,h=7,d=[],u=0+(this.attrs.firstDay-1),c=(new Date).setHours(0,0,0,0),m=1;l>=m;m++){for(var v=[],p=1;h>=p;p++){u++;var f=u-r,g=["dayTd"];0>f?(g.push("date-prev"),f=n+f+1,o=new Date(0>i-1?a-1:a,0>i-1?11:i-1,f).getTime()):(f+=1,f>s?(g.push("date-next"),f-=s,o=new Date(i+1>11?a+1:a,i+1>11?0:i+1,f).getTime()):o=new Date(a,i,f).getTime()),o===c&&g.push("date-current"),(u%7===this.attrs.weekendDays[0]||u%7===this.attrs.weekendDays[1])&&g.push("date-reset"),o=new Date(o);var y=o.getFullYear(),D=o.getMonth(),T=Util.getLunarCalendar(y,D+1,f),x=this.attrs.holiday[D+1+"-"+f];if(x){var E=x;g.push("date-holiday")}else if(T.festival){var E=T.festival;g.push("date-holiday")}else if(T.solarTerm){var E=T.solarTerm;g.push("date-holiday")}else var E=T.date;v.push('<div class="'+g.join(" ")+'" data-year='+y+" data-month="+D+" data-day="+f+'><span class="dayNumber">'+f+'</span><span class="almanac">'+E+"</span></div>")}d.push('<div class="dayTr">'+v.join("")+"</div>")}return d.join("")},formatDate:function(t){t=new Date(t);var e=t.getFullYear(),a=t.getMonth(),i=a+1,n=t.getDate(),s=t.getDay();return this.attrs.dateFormat.replace(/yyyy/g,e).replace(/yy/g,(e+"").substring(2)).replace(/mm/g,10>i?"0"+i:i).replace(/m/g,i).replace(/MM/g,this.attrs.monthNames[a]).replace(/dd/g,10>n?"0"+n:n).replace(/d/g,n).replace(/DD/g,this.attrs.dayNames[s])}};var Util={prefix:function(){var t=document.createElement("div"),e="-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;";t.style.cssText=e;var a=t.style;return a.transition?"":a.webkitTransition?"-webkit-":a.MozTransition?"-moz-":a.oTransition?"-o-":a.msTransition?"-ms-":void 0}(),_gregorianCalendarToAccumulateDate:function(t,e,a){var i=0;i+=365*(t-1900),i+=parseInt((t-1901)/4);for(var n=e-1;n>0;n--)i+=new Date(t,n,0).getDate();return i+=a},_getLunarDate:function(t){var e=parseInt((t-1.6)/29.5306),a=e-1;do{a++;var i=parseInt(1.6+29.5306*a+.4*Math.sin(1-.45058*a)),n=t-i+1}while(n>=30);return 0===n?30:n},_getSolarTermAccumulateDate:function(t,e){var a=parseInt(365.242*t+6.2+15.22*e-1.9*Math.sin(.262*e));return a},getLunarCalendar:function(t,e,a){var i=["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","腊月"],n=["十","一","二","三","四","五","六","七","八","九"],s=["初","十","廿","三"],r=["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","露水","秋分","寒露","霜降","立冬","小雪","大雪","冬至"],o={"0101":"春节","0115":"元宵节","0202":"龙头节","0505":"端午","0707":"七夕","0715":"中元节","0815":"中秋","0909":"重阳节",1001:"寒衣节",1015:"下元节",1208:"腊八节",1223:"小年",1230:"除夕"},l=t-1900,h=2*e-1,d=(e-1+12)%12,u=Util._gregorianCalendarToAccumulateDate(t,e,a),c=Util._getLunarDate(u),m=Util._getLunarDate(Util._getSolarTermAccumulateDate(l,h)),v=(Util._getLunarDate(Util._getSolarTermAccumulateDate(l,h-2)),Util._getLunarDate(Util._getSolarTermAccumulateDate(l,h+2))),p=(Util._getLunarDate(Util._getSolarTermAccumulateDate(l,h-1)),Util._getLunarDate(Util._getSolarTermAccumulateDate(l,h+1)),Util._getSolarTermAccumulateDate(l,h)),f=(Util._getSolarTermAccumulateDate(l,h-2),Util._getSolarTermAccumulateDate(l,h+2)),g=Util._getSolarTermAccumulateDate(l,h-1),y=Util._getSolarTermAccumulateDate(l,h+1);if(p>u&&c+p-u!==m?d--:u>p&&c-(u-p)!==m&&c+v-u===f&&d++,p===u)var D=r[h];else if(g===u)var D=r[h-1];else if(y===u)var D=r[h+1];var T=d;if(10>T)var x="0"+T;else var x=T;x+=10>c?"0"+c:c;var E=o[x],_=i[(T+11)%12],L=parseInt((c-1)/10);if(20===c||30===c)var M=s[L+1];else var M=s[L];M+=n[c%10];var w={month:_,date:M,solarTerm:D,festival:E};return w},getSexagenaryCycle:function(t){var e=["癸","甲","乙","丙","丁","戊","己","庚","辛","壬"],a=["亥","子","丑","寅","卯","辰","巳","午","未","申","酉","戌"],i=t-1863,n=e[i%10];return n+=a[i%12],n+="年"},getZodiac:function(t){var e=["猪年","鼠年","牛年","虎年","兔年","龙年","蛇年","马年","羊年","猴年","鸡年","狗年"],a=t-1863;return e[a%12]},getSuitAndTaboo:function(t,e,a){var i=["开光","嫁娶","入宅","上梁","祭祀","出行","作灶","破土","订盟","祈福"],n=["纳采","冠笄","竖柱","掘井","伐木","理发","交易","探病","雕刻","斋醮"],s=parseInt(t*e*a%1025).toString(2),r=s.length;if(10>r)for(;10>r;r++)s="0"+s;s=s.split("").reverse().join("");for(var o=parseInt(s,2),l=[],h=[],d=0;10>d;d++)o%2?l.push(n[d]):h.push(i[d]),o=parseInt(o/2);var u=l,c=h,m={suit:u,taboo:c};return m}};
