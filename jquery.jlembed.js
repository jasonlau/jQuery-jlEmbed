<!-- 

 /* 
    jlEmbed - A Plugin For jQuery
    ==================================================================
    © JasonLau.biz - Version 4.9.7.2
    ==================================================================
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

(function($){
    $.fn.extend({
        jlEmbed: function(options) {
            var defaults = {
                id : 'myMedia',
                plugin : 'windowsmedia',
                url : '',
                src : '',
                width : 300,
                height : 45,
                autoplay : true,
                loop : true,
                format : 'objectembed',
                pluginspace : '',
                codebase : '',
                params : '',
                af_params : 'allowscriptaccess=local allownetworking=local scale=showall quality=high wmode=transparent',
                rp_params : 'console=cons controls=all',
                qt_params : 'cache=true controller=true',
                sl_params : '',
                wm_params : 'showControls=true',
                caption : '',
                caption_id : 'myCaption',
                caption_class : '',
                caption_style : '',
                playlist : '',
                musicplayer : '',
                youtube : '',
                youtubekey : 'AI39si7VTVOVTwe6TuTDB36MwOuIEVGdwN844nhbCb7GXi8_90RcEpTgD1BXLAlb_P9CnkzU6RdV1nUvTaI2vay9hBdy8Iuh3g',
                swfobjectuniqueid : 'player' + Math.round(Math.random()*1000),
                youtubechromeless : false,
                youtubevolume : 100,
                youtubedebug : false,
                youtubedisplay : true,
                flash_version : 10,
                shuffle : false,
                value : false,
                m3u_url : ''
                }
                var options =  $.extend(defaults, options);
                var obj = $(this);
                return this.each(function(){
                    var o = options,
                    id = o.id,
                    plugin = o.plugin,
                    url = o.url,
                    width = o.width,
                    height = o.height,
                    autoplay = o.autoplay,
                    loop = o.loop,
                    format = o.format,
                    pluginspace = o.pluginspace,
                    codebase = o.codebase,
                    params = o.params,
                    af_params = o.af_params,
                    rp_params = o.rp_params,
                    qt_params = o.qt_params,
                    sl_params = o.sl_params,
                    wm_params = o.wm_params,
                    caption = o.caption,
                    caption_id = o.caption_id,
                    caption_class = o.caption_class,
                    caption_style = o.caption_style,
                    results = '',
                    o_params = '',
                    e_params = '',
                    swfobject_params = '',
                    playlist = o.playlist,
                    titles = o.titles,
                    musicplayer = o.musicplayer,
                    youtube = o.youtube,
                    youtubekey = o.youtubekey,
                    swfobjectuniqueid = o.swfobjectuniqueid,
                    youtubechromeless = o.youtubechromeless,
                    youtubevolume = o.youtubevolume,
                    youtubedebug = o.youtubedebug,
                    youtubedisplay = o.youtubedisplay,
                    flash_version = o.flash_version,
                    shuffle = o.shuffle,
                    value = o.value;
                    url = (o.src != '') ? o.src : url;
                    autoplay = (o.autoplay == 'yes' || o.autoplay == true) ? true : false;
                    loop = (o.loop == 'yes' || o.loop == true) ? true : false;
                    youtubechromeless = (o.youtubechromeless == 'yes' || o.youtubechromeless == true) ? true : false;
                    m3u_url = o.m3u_url; 

                    // end

                    if(youtube != ''){
                        var is_ytplaylist = false;
                        var yt_playlist = youtube.split('|');
                        if(yt_playlist[1] != ''){
                           is_ytplaylist = true;                        
                           if(shuffle){ 
                            yt_playlist.sort(function(){return (Math.round(Math.random())-0.5)});
                           }
                           var ytplaylist = '';
                           for(var i in yt_playlist){
                            if(i == 0){
                                ytplaylist += yt_playlist[i];
                            } else {
                                ytplaylist += '|' + yt_playlist[i];
                            }                          
                           }
                        }
                        plugin = 'adobeflash';
                        swfobject_params = 'allowscriptaccess: "always"';
                        if(youtubechromeless){
                            var yt_vid_url = 'http://www.youtube.com/v/' + yt_playlist[0];
                            url = 'http://www.youtube.com/apiplayer?enablejsapi=1&version=3&key=' + youtubekey + '&playerapiid=' + id;
                        } else {
                            var yt_vid_url = '';
                            url = 'http://www.youtube.com/v/' + yt_playlist[0] + '?enablejsapi=1&version=3&key=' + youtubekey + '&playerapiid=' + id;
                        }
                        src = url;
                        if(height == 45 && width == 300){
                            height = 295;
                            width = 480;    
                        }                                        
                } else if(musicplayer != ''){
                        plugin = 'adobeflash';
                        url = 'http://jasonlau.biz/home/jasonlau.biz.musicplayer.swf';
                        src = url;
                        width = '200';
                        height = '40';
                        classid = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
                        codebase = 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0';
                        if(playlist != ''){
                            var links_n_titles = '';
                            var link = playlist.split('|');
                            titles = (titles == '') ? playlist : titles;
                            var name = titles.split('|');
                            for(var yy in link){
                                if(yy == link.length-1){
                                    links_n_titles += link[yy] + '||' + name[yy];
                                    } else {
                                        links_n_titles += link[yy] + '||' + name[yy] + '::';
                                }
                            }
                        }
                        var player_params = '';
                        var p = musicplayer.split('|');
                        for(var zz in p){
                            player_params += p[zz] + ':|:';
                        }
                        var b = player_params + links_n_titles;
                        var build = jlembed_base64_encode(b);
                        params = 'flashvars=&build=' + build + '& wmode=transparent allowscriptaccess=always';                  
                    } else if(playlist != ''){
                        var b = '';
                        links = playlist.split('|');
                        for(var xx in links){
                            b += '||' + links[xx] + '::' + links[xx];
                            build = jlembed_base64_encode(b);
                            url = (m3u_url == '' || m3u_url == undefined) ? 'http://jasonlau.biz/user/' + build + '/playlist.m3u' : m3u_url + '?build=' + build;
                        }
                    }
                    
                    var ap;
                    var l;
                    var myParams = ['id','plugin','url','width','height','autoplay','loop','format','pluginspace','codebase','params','af_params','rp_params','qt_params','sl_params','wm_params','caption','caption_id','caption_class','caption_style','movie'];
                    var browser = navigator.appName;
                    if(browser == 'Microsoft Internet Explorer'){
                        var wm_type = 'application/x-mplayer2';
                    } else {
                        var wm_type = 'application/x-ms-wmp';
                    }
                    
                    if(params == ''){
                        switch(plugin){
                            case 'adobeflash':
                            params = o.af_params;
                            break;
                            
                            case 'quicktime':
                            params = o.qt_params;
                            break;
                            
                            case 'realplayer':
                            params = o.rp_params;
                            break;
                            
                            case 'silverlight':
                            params = o.sl_params;
                            break;
                            
                            default:
                            params = o.wm_params;
                        }
                    } else {
                        var par = params.split(' ');
                        for(var i in par){
                            var pp = par[i].split("=");
                            var myValue = '';
                            if(pp.length > 2){
                                for(var ii in pp){
                                    if(ii == 1) {
                                        myValue += pp[ii];
                                    } else if (ii > 1){
                                        myValue += '=' + pp[ii];
                                    }
                                }
                            } else {
                                myValue = pp[1];
                            }
                            id = (pp[0] == 'id') ? myValue : id;
                            plugin = (pp[0] == 'plugin') ? myValue : plugin;
                            url = (pp[0] == 'url') ? myValue : url;
                            url = (pp[0] == 'src') ? myValue : url;
                            width = (pp[0] == 'width') ? myValue : width;
                            height = (pp[0] == 'height') ? myValue : height;
                            autoplay = (pp[0] == 'autoplay') ? myValue : autoplay;
                            loop = (pp[0] == 'loop') ? myValue : loop;
                            format = (pp[0] == 'format') ? myValue : format;
                            pluginspace = (pp[0] == 'pluginspace') ? myValue : pluginspace;
                            codebase = (pp[0] == 'codebase') ? myValue : codebase;
                            caption = (pp[0] == 'caption') ? myValue : caption;
                            caption_id = (pp[0] == 'caption_id') ? myValue : caption_id;
                            caption_class = (pp[0] == 'caption_class') ? myValue : caption_class;
                            
                            var in_array = false;
                            for(var x in myParams){
                                if(myParams[x] == pp[0]){
                                    in_array = true;
                                }
                            }
                            if(!in_array){
                                o_params += '<param name="' + pp[0] + '" value="' + myValue + '" />\n';
                                e_params += pp[0] + '="' + myValue + '" ';
                                if(swfobject_params != ""){
                                    swfobject_params += ', ';
                                }
                                swfobject_params += pp[0] + ': "' + myValue + '"';
                            }
                        }
                    }
                    if(caption != ''){
                        results += '<div id="' + id + '-container" style="text-align:center;width:' + width + 'px;">\n';
                    }
                    
                    // backwards compatibility
                    
                    autoplay = (o.autoplay == 'yes' || o.autoplay == true) ? true : false;
                    loop = (o.loop == 'yes' || o.loop == true) ? true : false;
                    youtubechromeless = (o.youtubechromeless == 'yes' || o.youtubechromeless == true) ? true : false;
                    
                    switch(plugin){
                        case 'adobeflash':
                        pluginspace = (pluginspace == '') ? 'http://www.adobe.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash' : pluginspace;
                        codebase = (codebase == '') ? 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + flash_version : codebase;
                        break;
                        
                        case 'windowsmedia':
                        pluginspace = (pluginspace == '') ? 'http://microsoft.com/windows/mediaplayer/en/download/' : pluginspace;
                        codebase = (codebase == '') ? 'http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701' : codebase;
                        break;
                    }
                    
                    switch(format){
                        case 'swfobject':     
                        results += '\n<div id="' + swfobjectuniqueid + '"></div>\n<script type="text/javascript">var params = { ' + swfobject_params + ' }; var atts = { id: "' + id + '" }; jlembed_swfobject.embedSWF("' + url + '","' + swfobjectuniqueid + '", "' + width + '", "' + height + '", "' + flash_version + '", null, null, params, atts);</script>';
                        break;
                                                
                        case 'object':
                        switch(plugin){
                            case 'adobeflash':
                            results += '\n<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="' + id + '" type="application/x-shockwave-flash" height="'+ height +'" width="'+ width +'" codebase="'+ codebase +'" pluginspace="'+ pluginspace +'"><param name="movie" value="'+ url +'" />' + o_params + '</object>';
                            break;
                            
                            case 'quicktime':
                            (loop == true) ? l = 'true' : l = 'false';
                            (autoplay == true) ? ap = 'true' : ap = 'false';
                            results += '\n<object id="' + id + '" type="video/quicktime" height="'+ height +'" width="'+ width +'" data="'+ url +'">\n<param name="autoplay" value="'+ ap +'" />\n<param name="loop" value="'+ l +'" />\n' + o_params + '</object>';
                            break;
                            
                            case 'realplayer':
                            var cid = 'classid="clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA"';
                            // Remove classid for Firefox
                            if(browser == 'Netscape'){
                                var nappver =  navigator.appVersion;
                                var nav = nappver.split('Safari');
                                if(!nav[1]){                                    
                                    cid = '';
                                }
                            }
                            (loop == true) ? l = 'true' : l = 'false';
                            (autoplay == true) ? ap = 'true' : ap = 'false';
                            results += '\n<object id="' + id + '" type="audio/x-pn-realaudio-plugin" height="'+ height +'" width="'+ width +'" ' + cid + '>\n<param name="src" value="'+ url +'" />\n<param name="autostart" value="'+ ap +'" />\n<param name="loop" value="'+ l +'" />\n' + o_params + '</object>';
                            break;
                            
                            case 'silverlight':
                            results += '\n<object id="' + id + '" width="'+ width +'" height="'+ height +'" data="data:application/x-silverlight-2," type="application/x-silverlight-2">\n<param name="source" value="'+ url +'"/>\n' + o_params + '<a href="http://go.microsoft.com/fwlink/?LinkID=149156" style="text-decoration: none;"><img src="http://go.microsoft.com/fwlink/?LinkId=108181" alt="Get Microsoft Silverlight" style="border-style: none"/></a>\n</object>';
                            break;
                            
                            default:                            
                            var cid = 'classid="clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95"';
                            // Remove classid for Firefox
                            if(browser == 'Netscape'){
                                var nappver =  navigator.appVersion;
                                var nav = nappver.split('Safari');
                                if(!nav[1]){                                    
                                    cid = '';
                                }
                            }
                            (loop == true) ? l = 'true' : l = 'false';
                            (autoplay == true) ? ap = 'true' : ap = 'false';
                            results += '\n<object id="' + id + '" type="'+ wm_type +'" height="'+ height +'" width="'+ width +'" ' + cid + ' codebase="' + codebase + '" standby="Loading ..." fileName="'+ url +'">\n<param name="fileName" value="'+ url +'">\n<param name="autoStart" value="'+ ap +'">\n<param name="loop" value="'+ l +'">\n' + o_params + '</object>';
                        }
                        break;
                        
                        case 'embed':
                        switch(plugin){
                            case 'adobeflash':
                            results += '\n<embed id="' + id + '" type="application/x-shockwave-flash" height="'+ height +'" width="'+ width +'" src="'+ url +'" codebase="'+ o.codebase +'" pluginspace="'+ o.pluginspace +'"></embed>';
                            break;
                            case 'quicktime':
                            (loop == true) ? l = 'true' : l = 'false';
                            (autoplay == true) ? ap = 'true' : ap = 'false';
                            results += '\n<embed id="' + id + '" type="video/quicktime" height="'+ height +'" width="'+ width +'" data="'+ url +'" controller="true" autoplay="'+ ap +'" loop="'+ l +'" cache="true"></embed>';
                            break;
                            
                            case 'realplayer':
                            (loop == true) ? l = 'true' : l = 'false';
                            (autoplay == true) ? ap = 'true' : ap = 'false';
                            results += '\n<embed id="' + id + '" type="audio/x-pn-realaudio-plugin" height="'+ height +'" width="'+ width +'" src="'+ url +'" autostart="'+ ap +'" loop="'+ l +'" console="cons" controls="all"></embed>';
                            break;
                            
                            case 'silverlight':
                            results += '\n<embed id="' + id + '" width="'+ width +'" height="'+ height +'" data="data:application/x-silverlight-2," type="application/x-silverlight-2" source="'+ url +' ' + e_params + '><noembed><a href="http://go.microsoft.com/fwlink/?LinkID=149156" style="text-decoration: none;"><img src="http://go.microsoft.com/fwlink/?LinkId=108181" alt="Get Microsoft Silverlight" style="border-style: none"/></a></noembed></embed>';
                            break;
                            
                            default:
                            (loop == true) ? l = 'true' : l = 'false';
                            (autoplay == true) ? ap = 'true' : ap = 'false';
                            results += '\n<embed id="' + id + '" type="'+ wm_type +'" pluginspage="'+ pluginspace +'" height="'+ height +'" width="'+ width +'" src="'+ url +'" autostart="'+ ap +'" loop="'+ l +'" ' + e_params + '></embed>';
                        }
                        break;
                        
                        default:
                        switch(plugin){
                            case 'adobeflash':
                            results += '\n<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="' + id + '" type="application/x-shockwave-flash" height="'+ height +'" width="'+ width +'" codebase="'+ codebase +'" pluginspace="'+ pluginspace +'">\n<param name="movie" value="'+ url +'" />\n' + o_params + '<embed id="' + id + '" type="application/x-shockwave-flash" codebase="'+ codebase +'" pluginspace="'+ pluginspace +'" height="'+ height +'" width="'+ width +'" src="'+ url +'" ' + e_params + '></embed>\n</object>';
                            break;
                            
                            case 'quicktime':
                            (loop == true) ? l = 'true' : l = 'false';
                            (autoplay == true) ? ap = 'true' : ap = 'false';
                            results += '\n<object id="' + id + '" type="video/quicktime" height="'+ height +'" width="'+ width +'" data="'+ url +'">\n<param name="autoplay" value="'+ ap +'" />\n<param name="loop" value="'+ l +'" />\n' + o_params + '<embed id="' + id + '" type="video/quicktime" height="'+ height +'" width="'+ width +'" data="'+ url +'" controller="true" autoplay="'+ ap +'" loop="'+ l +'" ' + e_params + '></embed>\n</object>';
                            break;
                            
                            case 'realplayer':
                            (loop == true) ? l = 'true' : l = 'false';
                            (autoplay == true) ? ap = 'true' : ap = 'false';
                            results += '\n<object id="' + id + '" type="audio/x-pn-realaudio-plugin" classid="clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA" height="'+ height +'" width="'+ width +'">\n<param name="src" value="'+ url +'" />\n<param name="autostart" value="'+ ap +'" />\n<param name="loop" value="'+ l +'" />\n' + o_params + '<embed id="' + id + '" type="audio/x-pn-realaudio-plugin" height="'+ height +'" width="'+ width +'" src="'+ url +'" autostart="'+ ap +'" loop="'+ l +'" ' + e_params + '></embed>\n</object>';
                            break;
                            
                            case 'silverlight':
                            results += '\n<object id="' + id + '" width="'+ width +'" height="'+ height +'" data="data:application/x-silverlight-2," type="application/x-silverlight-2"><param name="source" value="'+ url +'"/>\n' + o_params + '<a href="http://go.microsoft.com/fwlink/?LinkID=149156" style="text-decoration: none;"><img src="http://go.microsoft.com/fwlink/?LinkId=108181" alt="Get Microsoft Silverlight" style="border-style: none"/></a>\n<embed id="' + id + '" width="'+ width +'" height="'+ height +'" data="data:application/x-silverlight-2," type="application/x-silverlight-2" source="'+ url +' ' + e_params + '></embed>\n</object>';
                            break;
                            
                            default:
                            (loop == true) ? l = 'true' : l = 'false';
                            (autoplay == true) ? ap = 'true' : ap = 'false';
                            results += '\n<object id="' + id + '" type="'+ wm_type +'" height="'+ height +'" width="'+ width +'" classid="CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95" codebase="' + codebase + '" standby="Loading ..." type="application/x-oleobject">\n<param name="fileName" value="'+ url +'">\n<param name="autostart" value="'+ ap +'">\n<param name="loop" value="'+ l +'">\n' + o_params + '<embed id="' + id + '" type="'+ wm_type +'" pluginspage="'+ pluginspace +'" height="'+ height +'" width="'+ width +'" src="'+ url +'" autostart="'+ ap +'" loop="'+ l +'" ' + e_params + '></embed>\n</object>';
                        }
                    }
                    
                    if (typeof $.browser === "undefined" || !$.browser) {
                        var browser = {};
                        $.extend(browser);
                        }
                        var pluginList = {
                            flash: {
                                activex: ["ShockwaveFlash.ShockwaveFlash", "ShockwaveFlash.ShockwaveFlash.3", "ShockwaveFlash.ShockwaveFlash.4", "ShockwaveFlash.ShockwaveFlash.5", "ShockwaveFlash.ShockwaveFlash.6", "ShockwaveFlash.ShockwaveFlash.7"],
                                plugin: /flash/gim
                            },
                            silverlight: {
                                activex: ["AgControl.AgControl"],
                                plugin: /silverlight/gim
                            },
                            quicktime: {
                                activex: ["QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "QuickTime.QuickTime.4"],
                                plugin: /quicktime/gim
                            },
                            windowsmedia: {
                                activex: ["WMPlayer.OCX", "MediaPlayer.MediaPlayer.1"],
                                plugin: /(windows\smedia)|(Microsoft)/gim
                            },
                            shockwave: {
                                activex: ["SWCtl.SWCtl", "SWCt1.SWCt1.7", "SWCt1.SWCt1.8", "SWCt1.SWCt1.9", "ShockwaveFlash.ShockwaveFlash.1"],
                                plugin: /shockwave/gim
                            },
                            realplayer: {
                                activex: ["RealPlayer", "rmocx.RealPlayer G2 Control.1"],
                                plugin: /realplayer/gim
                            }
                        };
                        var hasPlugin = function (p) {
                            if (window.ActiveXObject) {
                                $.browser[p] = false;
                                for (i = 0; i < pluginList[p].activex.length; i++) {
                                    try {
                                        new ActiveXObject(pluginList[p].activex[i]);
                                        $.browser[p] = true;
                                    } catch (e) {}
                                }
                            } else {
                                $.each(navigator.plugins, function () {
                                    if (this.name.match(pluginList[p].plugin)) {
                                        $.browser[p] = true;
                                        return false;
                                    } else {
                                        $.browser[p] = false;
                                    }
                                });
                            }
                        };
                        $.each(pluginList, function (i, n) {
                            hasPlugin(i);
                        });

                    switch(plugin){
                        case 'adobeflash':
                        var plugin_installed = $.browser.flash;
                        
                        if(!plugin_installed ){
                            var install_plugin = '\n<a href="http://get.adobe.com/flashplayer/" target="_blank">Please install the Adobe Flash plugin to view this content. Follow this link to open the official Adobe Flash download page in a new window.</a>\n';
                        }                    
                        break;
                        
                        case 'quicktime':
                        var plugin_installed = $.browser.quicktime;
                        if(!plugin_installed){
                            var install_plugin = '\n<a href="http://www.apple.com/quicktime/download/" target="_blank">Please install the Apple QuickTime plugin to view this content. Follow this link to open the official Apple QuickTime download page in a new window.</a>\n';                          
                        }
                        break;
                        
                        case 'realplayer':
                        var plugin_installed = $.browser.realplayer;
                        if(!plugin_installed){
                            var install_plugin = '\n<a href="http://real.com/" target="_blank">Please install the Real Player plugin to view this content. Follow this link to open the official Real Player installation page in a new window.</a>\n';                            
                        }
                        break;
                        
                        case 'silverlight':
                        var plugin_installed = true;
                        break;
                        
                        default:
                        var plugin_installed = $.browser.windowsmedia;
                        if(!plugin_installed){
                            var install_plugin = '\n<a href="http://www.microsoft.com/windows/windowsmedia/player/default.aspx" target="_blank">Please install the Windows Media Player plugin to view this content. Follow this link to open the official Windows Media Player installation page in a new window.</a>\n';
                        }                       
                    }
                    
                    if(!plugin_installed){
                        results = '';
                        caption = install_plugin;
                    }
                    
                    if(youtube != ''){
                        if(youtubedebug == 'false' || !youtubedebug){                               
                                var inputType = 'hidden';
                            } else {
                                
                                var inputType = 'text';
                            }

                        if(youtubechromeless){
                            results += '\n'
                            + '<input type="hidden" id="jlembed_yt_chromeless_' + id + '" value="true" />\n';    
                        } else {                           
                            results += '\n'
                            + '<input type="' + inputType + '" id="jlembed_yt_chromeless_' + id + '" value="false" title="Is Chromeless?" />\n';
                        }
                        results += '<input type="' + inputType + '" id="jlembed_yt_video_url_' + id + '" value="' + yt_vid_url + '" title="Video URL" />\n'
                        + '<input type="' + inputType + '" id="jlembed_yt_volume_' + id + '" value="' + youtubevolume + '" title="Current Volume" />\n'
                        + '<input type="' + inputType + '" id="jlembed_yt_autoplay_' + id + '" value="' + autoplay + '" title="Autoplay" />\n'
                        + '<input type="' + inputType + '" id="jlembed_yt_loop_' + id + '" value="' + loop + '" title="Loop" />\n'
                        + '<input type="' + inputType + '" id="jlembed_yt_player_ready_' + id + '" value="false" title="Is The Player Ready?" />\n'
                        + '<input type="' + inputType + '" id="jlembed_yt_player_state_' + id + '" value="" title="Current Player State" />\n'
                        + '<input type="' + inputType + '" id="jlembed_yt_current_playlist_item_' + id + '" value="0" title="Current Playlist Array Item Index Number" />\n'
                        + '<input type="' + inputType + '" id="jlembed_yt_playlist_' + id + '" value="" title="Current Playlist" />\n'
                        + '<input type="' + inputType + '" id="jlembed_yt_bytesloaded_' + id + '" value="0" title="Bytes Loaded" />\n'
                        + '<input type="' + inputType + '" id="jlembed_yt_bytestotal_' + id + '" value="0" title="Bytes total" />\n'
                        + '<input type="' + inputType + '" id="jlembed_yt_percentloaded_' + id + '" value="0" title="Percent Loaded" />\n'
                        + '<input type="' + inputType + '" id="jlembed_yt_currenttime_' + id + '" value="0" title="Current Track Time" />\n'
                        + '<input type="' + inputType + '" id="jlembed_yt_duration_' + id + '" value="0" title="Track Duration" />\n'
                        + '<input type="' + inputType + '" id="jlembed_yt_playpercent_' + id + '" value="0" title="Percent Played" />\n';
                        }
                        
                    if(caption != ''){
                        if(caption_class == ''){
                            if(caption_style != ''){
                                results += '\n<div id="' + caption_id + '" style="' + caption_style + '">\n';
                                } else {
                                    results += '\n<div id="' + caption_id + '">\n';
                            }
                        } else {
                            if(caption_style != ''){
                                results += '\n<div id="' + caption_id + '" class="' + caption_class + '" style="' + caption_style + '">\n';
                            } else {
                                results += '\n<div id="' + caption_id + '" class="' + caption_class + '">\n';
                            }
                        }
                        results += caption + '\n</div>\n</div>\n';
                    }
                                            
                    if(plugin_installed){
                        if(value){
                           $(this).val(results); 
                        } else {
                          $(this).html(results);  
                        }                       

                        if(youtube != ''){
                           if(!youtubedisplay){
                            $(this).attr("style","position:absolute;left:-" + width + "px;top:-" + height + "px;");
                           } 
                            $("#jlembed_yt_playlist_" + id).val(ytplaylist);
                        }
                                                 
                    } else {
                        if(value){
                           $(this).val(install_plugin); 
                        } else {
                          $(this).html(install_plugin);  
                        }
                    }
                });
          }
    });
                                
function jlembed_base64_encode( data ) {        
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = ac = 0, enc="", tmp_arr = [];

    if (!data) {
        return data;
    }

    data = jlembed_utf8_encode(data+'');
    
    do {
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1<<16 | o2<<8 | o3;

        h1 = bits>>18 & 0x3f;
        h2 = bits>>12 & 0x3f;
        h3 = bits>>6 & 0x3f;
        h4 = bits & 0x3f;
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);
    
    enc = tmp_arr.join('');
    
    switch( data.length % 3 ){
        case 1:
            enc = enc.slice(0, -2) + '==';
        break;
        case 2:
            enc = enc.slice(0, -1) + '=';
        break;
    }

    return enc;
}

function jlembed_base64_decode( data ) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = ac = 0, dec = "", tmp_arr = [];

    if (!data) {
        return data;
    }

    data += '';

    do {
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));

        bits = h1<<18 | h2<<12 | h3<<6 | h4;

        o1 = bits>>16 & 0xff;
        o2 = bits>>8 & 0xff;
        o3 = bits & 0xff;

        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);

    dec = tmp_arr.join('');
    dec = jlembed_utf8_decode(dec);

    return dec;
}  

function jlembed_utf8_decode ( str_data ) {
    var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;
    
    str_data += '';
    
    while ( i < str_data.length ) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if ((c1 > 191) && (c1 < 224)) {
            c2 = str_data.charCodeAt(i+1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i+1);
            c3 = str_data.charCodeAt(i+2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }

    return tmp_arr.join('');
}

function jlembed_utf8_encode ( argString ) {
    var string = (argString+'');

    var utftext = "";
    var start, end;
    var stringl = 0;

    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.substring(start, end);
            }
            utftext += enc;
            start = end = n+1;
        }
    }

    if (end > start) {
        utftext += string.substring(start, string.length);
    }

    return utftext;
}    

})(jQuery);

// jlEmbed YouTube Functions
// YouTube API Reference - http://code.google.com/apis/youtube/js_api_reference.html
// Prefix YouTube API functions with jlembed_ and add the player id when needed.

function onYouTubePlayerReady(playerId){
    myjlembedplayer = document.getElementById(playerId);
    if(jQuery('#jlembed_yt_chromeless_' + playerId).val() == 'true'){
        if(jQuery('#jlembed_yt_autoplay_' + playerId).val() == 'true'){
            jlembed_loadVideoByUrl(playerId, jQuery('#jlembed_yt_video_url_' + playerId).val());
        } else {
            jlembed_cueVideoByUrl(playerId, jQuery('#jlembed_yt_video_url_' + playerId).val());   
        }        
    } else {
     if(jQuery('#jlembed_yt_autoplay_' + playerId).val() == 'true'){
        jlembed_playVideo(playerId);
        } else {
            jlembed_stopVideo(playerId);
        }   
    } 
    jQuery('#jlembed_yt_player_ready_' + playerId).val('true');
    var setCurrentVolume = jQuery('#jlembed_yt_volume_' + playerId).val();
    jlembed_setVolume(playerId,setCurrentVolume);
    myjlembedplayer.addEventListener("onStateChange", "jlembed_onPlayerStateChange('"+playerId+"')");
    if(!jlembedListener){
       var jlembedListener = setInterval('jlembed_ytPlayerListener(\''+playerId+'\')',500);  
    }           
    jlembed_debugYouTube(playerId);
}

function jlembed_ytPlayerListener(playerId) {
     var playerBytesLoaded = jlembed_getVideoBytesLoaded(playerId),
     playerBytesTotal = jlembed_getVideoBytesTotal(playerId),
     playerCurrentTime = jlembed_getCurrentTime(playerId),
     playerDuration = jlembed_getDuration(playerId),
     playerCurrentUrl = jlembed_getVideoUrl(playerId),
     playerCurrentVolume = jlembed_getVolume(playerId);
     var playerPercentLoaded = Math.round((playerBytesLoaded/playerBytesTotal)*100);
     var playerPlayPercent = Math.round((playerCurrentTime/playerDuration)*100);
     if(playerBytesLoaded == undefined){
        playerPercentLoaded = '0';
     }
     if(playerDuration == undefined){
        playerPlayPercent = '0';
     }
     jQuery('#jlembed_yt_bytesloaded_' + playerId).val(playerBytesLoaded);
     jQuery('#jlembed_yt_bytestotal_' + playerId).val(playerBytesTotal);
     jQuery('#jlembed_yt_percentloaded_' + playerId).val(playerPercentLoaded);
     jQuery('#jlembed_yt_currenttime_' + playerId).val(playerCurrentTime);
     jQuery('#jlembed_yt_duration_' + playerId).val(playerDuration);
     jQuery('#jlembed_yt_playpercent_' + playerId).val(playerPlayPercent);
     jQuery('#jlembed_yt_video_url_' + playerId).val(playerCurrentUrl);
     jQuery('#jlembed_yt_volume_' + playerId).val(playerCurrentVolume);
}

function jlembed_onPlayerStateChange(playerId) {
    var currentState = jlembed_getPlayerState(playerId);
    var ytplaylistitem = jQuery('#jlembed_yt_current_playlist_item_' + playerId).val();
    jQuery('#jlembed_yt_player_state_' + playerId).val(currentState);
    var ytplaylist = jQuery('#jlembed_yt_playlist_' + playerId).val();    
    var playlist_items = ytplaylist.split('|');   
    var number_of_items = playlist_items.length;
    var currentTime = jlembed_getCurrentTime(playerId);
    var currentDuration = jlembed_getDuration(playerId);
    playedPercent = Math.round((currentTime/currentDuration)*100);
    var playlist_loop = jQuery('#jlembed_yt_loop_' + playerId).val();    
    if(currentState == '0' || (currentState == '2' && playedPercent > 98)){       
        var next_item = parseInt(ytplaylistitem)+1;
       if(next_item < number_of_items && number_of_items > 1){        
        jQuery('#jlembed_yt_current_playlist_item_' + playerId).val(next_item);
        jlembed_loadVideoById(playerId,playlist_items[next_item]);
       } else if(next_item >= number_of_items){
        // end of the playlist
        jQuery('#jlembed_yt_current_playlist_item_' + playerId).val('0');
        //loop?
        if(playlist_loop){
            jlembed_loadVideoById(playerId,playlist_items[0]);
        } else {
            jlembed_cueVideoById(playerId,playlist_items[0]);
        }       
       }        
    }
}


// Queueing functions

function jlembed_cueVideoById(playerId, videoId, startSeconds, suggestedQuality){
    if(playerId && videoId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.cueVideoById(videoId, startSeconds, suggestedQuality);
        return true;
    } else {
        return false;
    }
}

function jlembed_loadVideoById(playerId, videoId){
    if(playerId && videoId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.loadVideoById(videoId);
        return true;
    } else {
        return false;
    }
}

function jlembed_cueVideoByUrl(playerId, video_url, startSeconds){
    if(playerId && video_url){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.cueVideoByUrl(video_url, startSeconds);
        return true;
    } else {
        return false;
    }
}

function jlembed_loadVideoByUrl(playerId, video_url, startSeconds){    
    if(playerId && video_url){
        var checkurl = video_url.split('?v=');
        if(checkurl[1]){
            video_url = 'http://www.youtube.com/v/' + checkurl[1];
        }
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.loadVideoByUrl(video_url, startSeconds);
        return true;
    } else {
        return false;
    }
}

// Playback controls and player settings

// Playing a video

function jlembed_playVideo(playerId) {
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.playVideo();
        return true;
    } else {
        return false;
    }
}
 
function jlembed_pauseVideo(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.pauseVideo();
        return true;
    } else {
        return false;
    }
}

function jlembed_stopVideo(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.stopVideo();
        return true;
    } else {
        return false;
    }
}

function jlembed_seekTo(playerId, seconds, allowSeekAhead){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.seekTo(seconds, allowSeekAhead);
        return true;
    } else {
        return false;
    }
}

// Changing the player volume
   
function jlembed_mute(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.mute();
        return true;
    } else {
        return false;
    }
}

function jlembed_unMute(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.unMute();
        return true;
    } else {
        return false;
    }
}

function jlembed_isMuted(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        if(myjlembedplayer.isMuted()){
            return true;
        } else {
            return false;
        }
    }
}

function jlembed_setVolume(playerId, volume) {
    if(isNaN(volume) || volume < 0 || volume > 100) {
        return false;
        // Ivalid volume setting
    }
    else if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.setVolume(volume);
        return true;
    } else {
        return false;
    }
}
      
function jlembed_getVolume(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        return myjlembedplayer.getVolume();
    } else {
        return false;
    }
}
      
// Setting the player size

function jlembed_setSize(playerId, width, height){
    if(playerId && width && height){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.setSize(width, height);
        return true;
    } else {
        return false;
    }
}

// Playback status

function jlembed_getVideoBytesLoaded(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        return myjlembedplayer.getVideoBytesLoaded();
    } else {
        return false;
    }
}

function jlembed_getVideoBytesTotal(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        return myjlembedplayer.getVideoBytesTotal();
    } else {
        return false;
    }
}

function jlembed_getVideoStartBytes(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        return myjlembedplayer.getVideoStartBytes();
    } else {
        return false;
    }
}

function jlembed_getPlayerState(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        return myjlembedplayer.getPlayerState();
    } else {
        return false;
    }
}

function jlembed_getCurrentTime(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        return myjlembedplayer.getCurrentTime();
    } else {
        return false;
    }
}

// Playback quality

function jlembed_getPlaybackQuality(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        return myjlembedplayer.getPlaybackQuality();
    } else {
        return false;
    }
}

function jlembed_setPlaybackQuality(playerId, suggestedQuality){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.setPlaybackQuality(suggestedQuality);
        return true;
    } else {
        return false;
    }
}

function jlembed_getAvailableQualityLevels(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        return myjlembedplayer.getAvailableQualityLevels();
    } else {
        return false;
    }
}

// Retrieving video information

function jlembed_getDuration(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        return myjlembedplayer.getDuration();
    } else {
        return false;
    }
}

function jlembed_getVideoUrl(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        return myjlembedplayer.getVideoUrl();
    } else {
        return false;
    }
}

function jlembed_getVideoEmbedCode(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        return myjlembedplayer.getVideoEmbedCode();
    } else {
        return false;
    }
}

// Adding an event listener

function jlembed_addEventListener(playerId, event, listener){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.addEventListener(event, listener);
        return true;
    } else {
        return false;
    }
}

function jlembed_debugYouTube(playerId){
    var debug = '<div style="padding: 12px 0px 0px 25px;">Duration: <span id="jlembed_debug_videoduration">' + jlembed_getDuration(playerId) + '</span><br>Current time: <span id="jlembed_debug_videotime">' + jlembed_getCurrentTime(playerId) + '</span><br>Player state: <span id="jlembed_debug_playerstate">' + jlembed_getPlayerState(playerId) + '</span></div><div id="quality" style="padding: 12px 0px 0px 25px;">Quality level: <span id="jlembed_debug_playbackquality">' + jlembed_getPlaybackQuality(playerId) + '</span><br>Available levels: <span id="jlembed_debug_availablelevels">' + jlembed_getAvailableQualityLevels(playerId) + '</span><br>Volume : <span id="jlembed_debug_volumelevel">' + jlembed_getVolume(playerId) + '%</span></div>';
    jQuery('#jlembed_yt_debug_' + playerId).html(debug);
}

/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
    // Renamed for cross-compatibility 
*/

var jlembed_swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in jlembed_swfobject){jlembed_swfobject[X]=null}jlembed_swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

// -->