$(document).ready(function(){
        function completeAddIpAccesscontrol(ip, mac, name) {
                $('#macaddress').val(mac);
        }
        $('#button_network').click(function() {
                showLanPopup(completeAddIpAccesscontrol);
                return false;
        });

        $(".timepick").clockpick({
                military:true,
                starthour : 0,
                endhour : 23
        });

});

jQuery.fn.clockpick=function(k,o){var p={starthour:8,endhour:18,showminutes:true,minutedivisions:4,military:false,event:'click',layout:'vertical',valuefield:null,useBgiframe:false,hoursopacity:1,minutesopacity:1};if(k){jQuery.extend(p,k)};var o=o||function(){},v=(p.layout=='vertical');errorcheck();jQuery(this)[p.event](function(e){var g=this,$self=jQuery(this),$body=jQuery("body");if(!p.valuefield){$self.unbind("keydown").bind("keydown",keyhandler)}else{var j=jQuery("[name="+p.valuefield+"]");j.unbind("keydown").bind("keydown",keyhandler)[0].focus();j.bind("click",function(){j.unbind("keydown")})}jQuery("#CP_hourcont,#CP_minutecont").remove();$hourcont=jQuery("<div id='CP_hourcont' class='CP' />").appendTo($body);!p.useBgiframe?$hourcont.css("opacity",p.hoursopacity):null;binder($hourcont);$hourcol1=jQuery("<div class='CP_hourcol' id='hourcol1' />").appendTo($body);$hourcol2=jQuery("<div class='CP_hourcol' id='hourcol2' />").appendTo($body);if(p.showminutes){$mc=jQuery("<div id='CP_minutecont' class='CP' />").appendTo($body);!p.useBgiframe?$mc.css("opacity",p.minutesopacity):null;binder($mc)}if(!v){$hourcont.css("width","auto");$mc.css("width","auto")}else{$hourcol1.addClass('floatleft');$hourcol2.addClass('floatleft')}renderhours();putcontainer();function renderhours(){var c=1;for(h=p.starthour;h<=p.endhour;h++){if(h==12){c=1}displayhours=((!p.military&&h>12)?h-12:h);if(!p.military&&h==0){displayhours='12'}if(p.military&&h<10){displayhours='0'+displayhours}$hd=jQuery("<div class='CP_hour' id='hr_"+h+"_"+c+"'>"+displayhours+set_tt(h)+"</div>");if(p.military){$hd.width(20)}binder($hd);if(!v){$hd.css("float","left")}(h<12)?$hourcol1.append($hd):$hourcol2.append($hd);c++}$hourcont.append($hourcol1);!v?$hourcont.append("<div style='clear:left' />"):'';$hourcont.append($hourcol2)}function renderminutes(h){realhours=h;displayhours=(!p.military&&h>12)?h-12:h;if(!p.military&&h==0){displayhours='12'}if(p.military&&h<10){displayhours='0'+displayhours}$mc.empty();var n=60/p.minutedivisions,tt=set_tt(realhours),counter=1;for(m=0;m<60;m=m+n){$md=jQuery("<div class='CP_minute' id='"+realhours+"_"+m+"'>"+displayhours+":"+((m<10)?"0":"")+m+tt+"</div>");if(!v){$md.css("float","left");if(p.minutedivisions>6&&counter==p.minutedivisions/2+1){$mc.append("<div style='clear:left' />")}}$mc.append($md);binder($md);counter++}}function set_tt(a){if(!p.military){return(a>=12)?' PM':' AM'}else{return''}}function putcontainer(){if(e.type!='focus'){$hourcont.css("left",e.pageX-5+'px').css("top",e.pageY-(Math.floor($hourcont.height()/2))+'px');rectify($hourcont)}else{$self.after($hourcont)}$hourcont.slideDown('fast');if(p.useBgiframe)bgi($hourcont)}function rectify(a){var b=document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;var c=document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth;var t=parseInt(a.css("top"));var l=parseInt(a.css("left"));var d=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;if(t<=d&&!a.is("#CP_minutecont")){a.css("top",d+10+'px')}else if(t+a.height()-d>b){a.css("top",d+b-a.height()-10+'px')}if(l<=0){a.css("left",'10px')}}function bgi(a){if(typeof jQuery.fn.bgIframe=='function')a.bgIframe();else alert('bgIframe plugin not loaded.')}function binder(a){if(a.attr("id")=='CP_hourcont'){a.mouseout(function(e){hourcont_out(e)})}else if(a.attr("id")=='CP_minutecont'){a.mouseout(function(e){minutecont_out(e)})}else if(a.attr("class")=='CP_hour'){a.mouseover(function(e){hourdiv_over(a,e)});a.mouseout(function(){hourdiv_out(a)});a.click(function(){hourdiv_click(a)})}else if(a.attr("class")=='CP_minute'){a.mouseover(function(){minutediv_over(a)});a.mouseout(function(){minutediv_out(a)});a.click(function(){minutediv_click(a)})}};function hourcont_out(e){try{t=(e.toElement)?e.toElement:e.relatedTarget;if(!(jQuery(t).is("div[class^=CP], iframe"))){cleardivs()}}catch(e){cleardivs()}}function minutecont_out(e){try{t=(e.toElement)?e.toElement:e.relatedTarget;if(!(jQuery(t).is("div[class^=CP], iframe"))){cleardivs()}}catch(e){cleardivs()}}function hourdiv_over(a,e){var h=a.attr("id").split('_')[1],i=a.attr("id").split('_')[2],l,t;a.addClass("CP_over");if(p.showminutes){$mc.hide();renderminutes(h);if(v){t=e.type=='mouseover'?e.pageY-15:$hourcont.offset().top+2+(a.height()*i);if(h<12)l=$hourcont.offset().left-$mc.width()-2;else l=$hourcont.offset().left+$hourcont.width()+2}else{l=(e.type=='mouseover')?e.pageX-10:$hourcont.offset().left+(a.width()-5)*i;if(h<12){t=$hourcont.offset().top-$mc.height()-2}else{t=$hourcont.offset().top+$hourcont.height()}}$mc.css("left",l+'px').css("top",t+'px');rectify($mc);$mc.show();if(p.useBgiframe)bgi($mc)}return false}function hourdiv_out(a){a.removeClass("CP_over");return false}function hourdiv_click(a){h=a.attr("id").split('_')[1];tt=set_tt(h);str=a.text();if(str.indexOf(' ')!=-1){cleanstr=str.substring(0,str.indexOf(' '))}else{cleanstr=str}a.text(cleanstr+':00'+tt);setval(a);cleardivs()}function minutediv_over(a){a.addClass("CP_over");return false}function minutediv_out(a){a.removeClass("CP_over");return false}function minutediv_click(a){setval(a);cleardivs()}function setval(a){if(!p.valuefield){g.value=a.text()}else{jQuery("input[name="+p.valuefield+"]").val(a.text())}o.apply($self,[a.text()]);$self.unbind("keydown",keyhandler)}function cleardivs(){if(p.showminutes){$mc.hide()}$hourcont.slideUp('fast');$self.unbind("keydown",keyhandler)}function keyhandler(e){var d=$("div.CP_over").size()?$("div.CP_over"):$("div.CP_hour:first"),divtype=d.is(".CP_hour")?'hour':'minute',hi=(divtype=='hour')?d[0].id.split('_')[2]:0,h=(divtype=='minute')?d[0].id.split('_')[0]:d[0].id.split('_')[1];if(divtype=='minute'){var f=h<12?'m1':'m2'}else{var f=h<12?'h1':'h2'}function divprev(a){if(a.prev().size()){eval(divtype+'div_out($obj)');eval(divtype+'div_over($obj.prev(), e)')}else{return false}}function divnext(a){if(a.next().size()){eval(divtype+'div_out($obj)');eval(divtype+'div_over($obj.next(), e)')}else{return false}}function hourtohour(a){var b=h>=12?'#hourcol1':'#hourcol2';$newobj=jQuery(".CP_hour[id$=_"+hi+"]",b);if($newobj.size()){hourdiv_out(a);hourdiv_over($newobj,e)}else{return false}}function hourtominute(a){hourdiv_out(a);minutediv_over($(".CP_minute:first"))}function minutetohour(a){minutediv_out(a);var b=h>=12?'#hourcol2':'#hourcol1';var c=jQuery(".CP_hour[id^=hr_"+h+"]",b);hourdiv_over(c,e)}switch(e.keyCode){case 37:if(v){switch(f){case'm1':return false;break;case'm2':minutetohour(d);break;case'h1':hourtominute(d);break;case'h2':hourtohour(d);break}}else{divprev(d)}break;case 38:if(v){divprev(d)}else{switch(f){case'm1':return false;break;case'm2':minutetohour(d);break;case'h1':hourtominute(d);break;case'h2':hourtohour(d);break}}break;case 39:if(v){switch(f){case'm1':minutetohour(d);break;case'm2':return false;break;case'h1':hourtohour(d);break;case'h2':hourtominute(d);break}}else{divnext(d)}break;case 40:if(v){divnext(d)}else{switch(f){case'm1':minutetohour(d);break;case'm2':return false;break;case'h1':hourtohour(d);break;case'h2':hourtominute(d);break}}break;case 13:eval(divtype+'div_click($obj)');break;default:return true}return false}return false});function errorcheck(){if(p.starthour>=p.endhour){alert('Error - start hour must be less than end hour.');return false}else if(60%p.minutedivisions!=0){alert('Error - param minutedivisions must divide evenly into 60.');return false}}return this}
