<!-- 
/* 
    jlEmbed - A jQuery plugin
    ==================================================================
    ©2009-2011 JasonLau.biz - Version 5.0.0 - Open-Source
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
 		 var mode, obj, browser, format, plugin_is_installed, pluginList, output, classid, nappver, nav, type, src, url, h = $(window).height(), w = $(window).width(), st, t;
                 
            plugin_exists = function(mode){
                // Function for detecting if the required browser plugin exists. v.1.0.0
                if(typeof $.browser === "undefined" || !$.browser){
                    browser = {};
                    $.extend(browser);
                }
                pluginList = {
                    
                    flash: {
                        activex: ["ShockwaveFlash.ShockwaveFlash", "ShockwaveFlash.ShockwaveFlash.3", "ShockwaveFlash.ShockwaveFlash.4", "ShockwaveFlash.ShockwaveFlash.5", "ShockwaveFlash.ShockwaveFlash.6", "ShockwaveFlash.ShockwaveFlash.7", "ShockwaveFlash.ShockwaveFlash.8", "ShockwaveFlash.ShockwaveFlash.9", "ShockwaveFlash.ShockwaveFlash.10"],
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
                    
                    shockwave: { // Not implemented
                        activex: ["SWCtl.SWCtl", "SWCt1.SWCt1.7", "SWCt1.SWCt1.8", "SWCt1.SWCt1.9", "ShockwaveFlash.ShockwaveFlash.1"],
                        plugin: /shockwave/gim
                    },
                    
                    realplayer: {
                        activex: ["RealPlayer", "rmocx.RealPlayer G2 Control.1"],
                        plugin: /realplayer/gim
                    }
                };
                
                plugin_is_installed = false;
                
                switch(mode){
                    case 'adobeflash':
                    case 'youtube':
                    case 'musicplayer':
                    $.browser.flash = false;
                    if(window.ActiveXObject){
                        for(i = 0; i < pluginList.flash.activex.length; i++){
                            try{
                                new ActiveXObject(pluginList.flash.activex[i]);
                                $.browser.flash = true;
                                }catch(e){}
                        }
                        } else {
                            $.browser.flash = false;
                            $.each(navigator.plugins, function(){
                                if(this.name.match(pluginList.flash.plugin)){
                                    $.browser.flash = true;
                                }
                            });
                        }
                            if(!$.browser.flash){
                                install_plugin('\n<a href="http://get.adobe.com/flashplayer/" target="_blank">Please install the Adobe Flash plugin to view this content. Follow this link to open the official Adobe Flash download page in a new window.</a>\n');
                                return false;
                            }
                            plugin_is_installed = $.browser.flash;
                            break;
                            
                            case 'quicktime':
                            $.browser.quicktime = false;
                            if(window.ActiveXObject) {
                                for(i = 0; i < pluginList.quicktime.activex.length; i++) {
                                    try{
                                        new ActiveXObject(pluginList.quicktime.activex[i]);
                                        $.browser.quicktime = true;
                                    }catch(e){}
                                }
                            } else {
                                $.browser.quicktime = false;
                                $.each(navigator.plugins, function () {
                                    if(this.name.match(pluginList.quicktime.plugin)) {
                                        $.browser.quicktime = true;
                                    }
                                });
                            }
                            if(!$.browser.quicktime){
                                install_plugin('\n<a href="http://www.apple.com/quicktime/download/" target="_blank">Please install the Apple QuickTime plugin to view this content. Follow this link to open the official Apple QuickTime download page in a new window.</a>\n');
                                return false;
                            }
                            plugin_is_installed = $.browser.quicktime;
                            break;
                            
                            case 'realplayer':
                            $.browser.realplayer = false;
                            if(window.ActiveXObject) {
                                for(i = 0; i < pluginList.realplayer.activex.length; i++) {
                                    try{
                                        new ActiveXObject(pluginList.realplayer.activex[i]);
                                        $.browser.realplayer = true;
                                    }catch(e){}
                                }
                            } else {
                                $.each(navigator.plugins, function () {
                                    if(this.name.match(pluginList.realplayer.plugin)) {
                                        $.browser.realplayer = true;
                                    }
                                });
                            }
                            if(!$.browser.realplayer){
                                install_plugin('\n<a href="http://real.com/" target="_blank">Please install the Real Player plugin to view this content. Follow this link to open the official Real Player installation page in a new window.</a>\n');
                                return false;
                            }
                            plugin_is_installed = $.browser.realplayer;
                            break;
                            
                            case 'silverlight':
                            // Use Silverlight's built-in installer
                            plugin_is_installed = true;
                            break;
                            
                            default:
                            $.browser.windowsmedia = false;
                            if(window.ActiveXObject) {
                                for(i = 0; i < pluginList.windowsmedia.activex.length; i++) {
                                    try{
                                        new ActiveXObject(pluginList.windowsmedia.activex[i]);
                                        $.browser.windowsmedia = true;
                                    }catch(e){}
                                }
                            } else {
                                $.each(navigator.plugins, function () {
                                    if(this.name.match(pluginList.windowsmedia.plugin)) {
                                        $.browser.windowsmedia = true;
                                    }
                                }); 
                            }
                            if(!$.browser.windowsmedia){
                                install_plugin('\n<a href="http://www.microsoft.com/windows/windowsmedia/player/default.aspx" target="_blank">Please install the Windows Media Player plugin to view this content. Follow this link to open the official Windows Media Player installation page in a new window.</a>\n');
                                return false;
                                }
                                plugin_is_installed = $.browser.windowsmedia;
                                break;
                        }
                    
                    return plugin_is_installed;
            }, // plugin_exists
            
            install_plugin = function(message){
                // Function for displaying a message when the required browser plugin is not installed. v.1.0.0
                obj.html(message);
            },
            
            get_parameters = function(format, obj){
                // Function for constructing code parameters. v.1.0.0
                data = obj.data(), output = '';
                $.each(data.params, function(index, value){
                    switch(format){
                        case 'embed':
                        // Construct embed tag attributes
                        output += ' ' + index + '=' + '"' + value + '"';
                        break;
                        
                        case 'swfobject':
                        // Construct swfobject options
                        output += index + ': "' + value + '",';
                        break;
                        
                        default :
                        // Construct object parameter tags
                        output += '<param name="' + index + '" value="' + value + '" />\n';
                    }
              });
              return trim(output, ',');  
            },
            
            base64_encode = function(data){
                // Function for base64 encoding music player parameters. v.1.0.0
                var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                var o1, o2, o3, h1, h2, h3, h4, bits, i = ac = 0, enc="", tmp_arr = [];
                if(!data){
                    return data;
                }
                
                data = utf8_encode(data+'');
                
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
                    
                    switch(data.length % 3){
                        case 1:
                        enc = enc.slice(0, -2) + '==';
                        break;
                        
                        case 2:
                        enc = enc.slice(0, -1) + '=';
                        break;
                    }
                    return enc;
            },
            
            utf8_encode = function(argString){
                // Function for utf8 encoding data during the base64 encoding process. v.1.0.0
                var string = (argString+'');
                var utftext = "";
                var start, end;
                var stringl = 0;
                start = end = 0;
                stringl = string.length;
                for (var n = 0; n < stringl; n++){
                    var c1 = string.charCodeAt(n);
                    var enc = null;
                    if(c1 < 128){
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
            },
            
            make_m3u = function(data){
                // Function to build m3u.php compatible playlist. v.1.0.0
                var m3u = '';
                $.each(data, function(i,v){
                    m3u += '|' + i + '@'+ v;
                });
                return base64_encode(trim(m3u,'|'));              
            },
            
            get_resource = function(obj){
                // Function for defining playlist path. v.1.0.0
                data = obj.data();
                // Check for playlist.
                if($.isPlainObject(data.src)){
                    // This is a playlist. Check for shuffle option.
                    var shuffle = (data.shuffle) ? 'true' : 'false';
                    if(data.m3u){
                        // Define a custom path to m3u.php
                        url = data.m3u + 'm3u.php?playlist=' + make_m3u(data.src) + '&shuffle=' + shuffle;
                    } else {
                        // Or use my copy of m3u.php
                        url = 'http://jlembed.com/m3u.php?playlist=' + make_m3u(data.src) + '&shuffle=' + shuffle;
                    } 
                    return url;                    
                } else {
                    return obj.data().src;  
                }
            },
            
            real_player = function(obj){
                // Function for displaying Real Player. v.1.0.0
                data = obj.data(), classid = 'classid="clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA" ', output = '';
                type = 'audio/x-pn-realaudio-plugin';
                url = get_resource(obj);
                var id = (data.id) ? data.id : 'jlembed_' + Math.floor(Math.random()),
                height = (data.height) ? data.height : _error('Error: Missing data-height attribute.'),
                width = (data.width) ? data.width : _error('Error: Missing data-width attribute.'),
                loop = (data.width) ? data.loop : 'false',
                autostart = (data.autostart) ? data.autostart : 'true';
                output += '\n<!-- BEGIN JLEMBED OUTPUT -->';
                switch(data.format){
                    case 'embed':
                    output += '\n<embed id="' + id + '" type="'+ type +'" '+ classid +'height="'+ height +'" width="'+ width +'" src="'+ url +'" autostart="'+ autostart +'" loop="'+ loop +'"';
                    output += get_parameters('embed',obj);
                    output += '></embed>\n';
                    break;
                    
                    case 'object':
                    output += '\n<object id="' + id + '" type="'+ type +'" '+ classid +'height="'+ height +'" width="'+ width +'">\n<param name="src" value="'+ url +'" />\n<param name="autostart" value="'+ autostart +'" />\n<param name="loop" value="'+ loop +'" />\n'
                    + get_parameters('object',obj)
                    + '</object>\n';
                    break;
                    
                    default :
                    // objectembed
                    output += '\n<object id="' + id + '" type="'+ type +'" '+ classid +'height="'+ height +'" width="'+ width +'">\n<param name="src" value="'+ url +'" />\n<param name="autostart" value="'+ autostart +'" />\n<param name="loop" value="'+ loop +'" />\n'
                    + get_parameters('object',obj)
                    + '<embed id="' + id + '" type="'+ type +'" height="'+ height +'" width="'+ width +'" src="'+ url +'" autostart="'+ autostart +'" loop="'+ loop +'"'
                    + get_parameters('embed',obj)
                    + '></embed>\n'
                    + '</object>\n';
                }
                obj.html(output);
                do_caption(obj);
                obj.append('<!-- END JLEMBED OUTPUT -->\n');
                obj.addClass('jlembed_loaded');
                obj.removeClass('jlembed_loading');
            },
            
            windows_media = function(obj){
                // Function for displaying Windows Media Player. v.1.0.0
                data = obj.data(), browser = navigator.appName, classid = 'classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95" ', output = '';
                url = get_resource(obj);
                (browser == 'Microsoft Internet Explorer') ? type = 'application/x-mplayer2' : type = 'application/x-ms-wmp';
                var id = (data.id) ? data.id : 'jlembed_' + Math.floor(Math.random()),
                height = (data.height) ? data.height : _error('Error: Missing data-height attribute.'),
                width = (data.width) ? data.width : _error('Error: Missing data-width attribute.'),
                loop = (data.width) ? data.loop : 'false',
                autostart = (data.autostart) ? data.autostart : 'true';
                output += '\n<!-- BEGIN JLEMBED OUTPUT -->';
                switch(data.format){
                    case 'embed':
                    output += '\n<embed id="' + id + '" type="'+ type +'" '+ classid +'height="'+ height +'" width="'+ width +'" src="'+ url +'" autostart="'+ autostart +'" loop="'+ loop +'"';
                    output += get_parameters('embed',obj);
                    output += '></embed>\n';
                    break;
                    
                    case 'object':
                    output += '\n<object id="' + id + '" type="'+ type +'" '+ classid +'height="'+ height +'" width="'+ width +'">\n<param name="src" value="'+ url +'" />\n<param name="autostart" value="'+ autostart +'" />\n<param name="loop" value="'+ loop +'" />\n'
                    + get_parameters('object',obj)
                    + '</object>\n';
                    break;
                    
                    default :
                    // objectembed
                    output += '\n<object id="' + id + '" type="'+ type +'" '+ classid +'height="'+ height +'" width="'+ width +'">\n<param name="src" value="'+ url +'" />\n<param name="autostart" value="'+ autostart +'" />\n<param name="loop" value="'+ loop +'" />\n'
                    + get_parameters('object',obj)
                    + '<embed id="' + id + '" type="'+ type +'" height="'+ height +'" width="'+ width +'" src="'+ url +'" autostart="'+ autostart +'" loop="'+ loop +'"'
                    + get_parameters('embed',obj)
                    + '></embed>\n'
                    + '</object>\n';
                }
                obj.html(output);
                do_caption(obj);
                obj.append('<!-- END JLEMBED OUTPUT -->\n');
                obj.addClass('jlembed_loaded');
                obj.removeClass('jlembed_loading');
            },
            
            adobe_flash = function(obj){
                // Function for displaying Adobe Flash. v.1.0.0
                data = obj.data(), browser = navigator.appName, classid = 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ', output = '';
                type = 'application/x-shockwave-flash';
                url = get_resource(obj);
                var id = (data.id) ? data.id : 'jlembed_' + Math.floor(Math.random()),
                height = (data.height) ? data.height : _error('Error: Missing data-height attribute.'),
                width = (data.width) ? data.width : _error('Error: Missing data-width attribute.');
                output += '\n<!-- BEGIN JLEMBED OUTPUT -->';
                switch(data.format){
                    case 'embed':
                    output += '\n<embed id="' + id + '" type="'+ type +'" '+ classid +'height="'+ height +'" width="'+ width +'" src="'+ url +'"';
                    output += get_parameters('embed',obj);
                    output += '></embed>\n';
                    break;
                    
                    case 'object':
                    output += '\n<object id="' + id + '" type="'+ type +'" '+ classid +'height="'+ height +'" width="'+ width +'">\n<param name="src" value="'+ url +'" />\n'
                    + get_parameters('object',obj)
                    + '</object>\n';
                    break;
                    
                    case 'objectembed':                    
                    output += '\n<object id="' + id + '" type="'+ type +'" '+ classid +'height="'+ height +'" width="'+ width +'">\n<param name="src" value="'+ url +'" />\n'
                    + get_parameters('object',obj)
                    + '<embed id="' + id + '" type="'+ type +'" height="'+ height +'" width="'+ width +'" src="'+ url +'"'
                    + get_parameters('embed',obj)
                    + '></embed>\n'
                    + '</object>\n';
                    break;
                    
                    default :
                    // swfobject
                    var flash_version = (data.flash_version) ? data.flash_version : '9.0.0';
                    output += '<div id="' + id + '"></div>\n<script type="text/javascript">var params = { ' + get_parameters('swfobject',obj) + ' }; var atts = { id:"jlembed_' + id + '" }; swfobject.embedSWF("' + url + '","' + id + '", "' + width + '", "' + height + '", "' + flash_version + '", null, null, params, atts);</script>';    
                }
                obj.html(output);
                do_caption(obj);
                obj.append('<!-- END JLEMBED OUTPUT -->\n');
                obj.addClass('jlembed_loaded');
                obj.removeClass('jlembed_loading');
            },
            
            quick_time = function(obj){
                // Function for displaying Quicktime. v.1.0.0
                data = obj.data(), browser = navigator.appName, classid = 'classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" ', output = '';
                type = 'video/quicktime';
                url = get_resource(obj);
                var id = (data.id) ? data.id : 'jlembed_' + Math.floor(Math.random()),
                height = (data.height) ? data.height : _error('Error: Missing data-height attribute.'),
                width = (data.width) ? data.width : _error('Error: Missing data-width attribute.'),
                loop = (data.width) ? data.loop : 'false',
                autostart = (data.autostart) ? data.autostart : 'true';
                output += '\n<!-- BEGIN JLEMBED OUTPUT -->';
                switch(data.format){
                    case 'embed':
                    output += '\n<embed id="' + id + '" type="'+ type +'" '+ classid +'height="'+ height +'" width="'+ width +'" src="'+ url +'" autostart="'+ autostart +'" loop="'+ loop +'"';
                    output += get_parameters('embed',obj);
                    output += '></embed>\n';
                    break;
                    
                    case 'object':
                    output += '\n<object id="' + id + '" type="'+ type +'" '+ classid +'height="'+ height +'" width="'+ width +'">\n<param name="src" value="'+ url +'" />\n<param name="autostart" value="'+ autostart +'" />\n<param name="loop" value="'+ loop +'" />\n'
                    + get_parameters('object',obj)
                    + '</object>\n';
                    break;
                    
                    default :
                    // objectembed
                    output += '\n<object id="' + id + '" type="'+ type +'" '+ classid +'height="'+ height +'" width="'+ width +'">\n<param name="src" value="'+ url +'" />\n<param name="autostart" value="'+ autostart +'" />\n<param name="loop" value="'+ loop +'" />\n'
                    + get_parameters('object',obj)
                    + '<embed id="' + id + '" type="'+ type +'" height="'+ height +'" width="'+ width +'" src="'+ url +'" autostart="'+ autostart +'" loop="'+ loop +'"'
                    + get_parameters('embed',obj)
                    + '></embed>\n'
                    + '</object>\n';
                }
                obj.html(output);
                do_caption(obj);
                obj.append('<!-- END JLEMBED OUTPUT -->\n');
                obj.addClass('jlembed_loaded');
                obj.removeClass('jlembed_loading');
            },
            
            silver_light = function(obj){
                // Function for displaying Silverlight. v.1.0.0
                
                data = obj.data(), output = '';
                type = 'application/x-silverlight-2';
                url = get_resource(obj);
                var id = (data.id) ? data.id : 'jlembed_' + Math.floor(Math.random()),
                height = (data.height) ? data.height : _error('Error: Missing data-height attribute.'),
                width = (data.width) ? data.width : _error('Error: Missing data-width attribute.'),
                loop = (data.width) ? data.loop : 'false',
                autostart = (data.autostart) ? data.autostart : 'true';
                output += '\n<!-- BEGIN JLEMBED OUTPUT -->';                
                switch(data.format){
                    case 'embed':
                    output += '\n<embed id="' + id + '" data="data:'+ type +'," type="'+ type +'" height="'+ height +'" width="'+ width +'" source="'+ url +'"';
                    output += get_parameters('embed',obj);
                    output += '></embed>\n';
                    break;
                    
                    case 'object':
                    output += '\n<object id="' + id + '" data="data:'+ type +'," type="'+ type +'" height="'+ height +'" width="'+ width +'">\n<param name="source" value="'+ url +'" />\n'
                    + get_parameters('object',obj)
                    + '</object>\n';
                    break;
                    
                    default :
                    // objectembed
                    output += '\n<object id="' + id + '" data="data:'+ type +'," type="'+ type +'" height="'+ height +'" width="'+ width +'">\n<param name="source" value="'+ url +'" />\n'
                    + get_parameters('object',obj)
                    + '<embed id="' + id + '" data="data:'+ type +'," type="'+ type +'" height="'+ height +'" width="'+ width +'" source="'+ url +'"'
                    + get_parameters('embed',obj)
                    + '></embed>\n'
                    + '</object>\n';
                }
                obj.html(output);
                do_caption(obj);
                obj.append('<!-- END JLEMBED OUTPUT -->\n');
                obj.addClass('jlembed_loaded');
                obj.removeClass('jlembed_loading');
                
            },
            
            music_player = function(obj){
                // Function for displaying the Music Player. v.1.0.0
                data = obj.data(), browser = navigator.appName, classid = 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ', output = '';
                type = 'application/x-shockwave-flash';
                url = 'http://jasonlau.biz/home/jlmusicplayer.swf';
                var id = (data.id) ? data.id : 'jlembed_' + Math.floor(Math.random()),
                height = (data.height) ? data.height : 40,
                width = (data.width) ? data.width : 200,
                format = (data.format) ? data.format : 'objectembed',
                params = '';                
                $.each(data.params, function(index, value){
                    params += index + '=' + value + ':|:'
                });
                var songs = '';
                $.each(data.src, function(index, value){
                    songs += value + '||' + index + '::';
                });
                var build = params + songs;
                build = base64_encode(build);
                                
                output += '\n<!-- BEGIN JLEMBED OUTPUT -->';
                switch(data.format){
                    case 'embed':
                    output += '\n<embed id="' + id + '" type="'+ type +'" '+ classid +'height="'+ height +'" width="'+ width +'" src="'+ url +'" allowscriptaccess="always" flashvars="&amp;build='
                    + build
                    + '&amp;"></embed>\n';
                    break;
                    
                    case 'object':
                    output += '\n<object id="' + id + '" type="'+ type +'" '+ classid +'height="'+ height +'" width="'+ width +'">\n<param name="src" value="'+ url +'" />\n<param name="flashVars" value="&amp;build='+ build +'&amp;" />\n<param name="allowscriptaccess" value="always" />\n'
                    + '</object>\n';
                    break;
                    
                    case 'swfobject':
                    var flash_version = (data.flash_version) ? data.flash_version : '9.0.0';
                    output += '<div id="' + id + '"></div>\n<script type="text/javascript">var params = { "wmode":"transparent","quality":"high","allowscriptaccess":"always","allowfullscreen":"true" }; var atts = { id:"jlembed_' + id + '","wmode":"transparent","quality":"high","allowscriptaccess":"always","allowfullscreen":"true" }; var flashvars = { build:"' + build + '" }; swfobject.embedSWF("' + url + '","' + id + '", "' + width + '", "' + height + '", "' + flash_version + '", null, flashvars, params, atts);</script>';  
                    break;
                    
                    default :
                    // objectembed
                    output += '\n<object id="' + id + '" type="'+ type +'" '+ classid +'height="'+ height +'" width="'+ width +'">\n<param name="src" value="'+ url +'" />\n<param name="flashVars" value="&amp;build='+ build +'&amp;" />\n<param name="allowscriptaccess" value="always" />\n'
                    + '<embed id="' + id + '" type="'+ type +'" height="'+ height +'" width="'+ width +'" src="'+ url +'" flashvars="&amp;build='
                    + build
                    + '&amp;"></embed>\n'
                    + '</object>\n';  
                }
                obj.html(output);
                do_caption(obj);
                obj.append('<!-- END JLEMBED OUTPUT -->\n');
                obj.addClass('jlembed_loaded');
                obj.removeClass('jlembed_loading');
                
            },
            
            you_tube = function(obj){
                // Function for displaying YouTube. v.1.0.0
                var data = obj.data(),                
                output = '',
                id = (data.id) ? data.id : 'player' + Math.round(Math.random()*1000),
                divid = id + '_div',
                playlist = data.src.split(','),
                width = (data.width) ? data.width : 480,
                height = (data.height) ? data.height : 295,
                api_key = (data.youtube_key) ? data.youtube_key : 'AI39si7VTVOVTwe6TuTDB36MwOuIEVGdwN844nhbCb7GXi8_90RcEpTgD1BXLAlb_P9CnkzU6RdV1nUvTaI2vay9hBdy8Iuh3g',
                url = (data.chromeless) ? 'http://gdata.youtube.com/apiplayer?enablejsapi=1&version=3&key=' + api_key + '&modestbranding=1&playerapiid=' + id : 'http://www.youtube.com/v/' + playlist[0] + '?enablejsapi=1&version=3&key=' + api_key + '&modestbranding=1&playerapiid=' + id;
                obj.append('\n<!-- BEGIN JLEMBED OUTPUT -->\n<div id="' + divid + '"></div>');
                do_controls(obj, id);
                do_caption(obj);
                if(data.debug){
                  obj.append('<!-- END JLEMBED OUTPUT -->\n');  
                }
                obj.append('<div id="debug_' + id + '"></div>\n');
                var params = { allowScriptAccess: "always" };
                var atts = { id: id };
                swfobject.embedSWF(url, divid, width, height, "10", null, null, params, atts);
                obj.addClass('jlembed_loaded');
                obj.removeClass('jlembed_loading');
            },
            
            do_caption = function(obj){
                // Function for displaying a caption beneath the media. v.1.0.0
                if(obj.data().caption){
                    obj.append('\n<div class="jlembed-caption">' + obj.data().caption + '</div>\n');
                }                
            },
            
            do_controls = function(obj, playerId){
                // Function for displaying button controls below the YouTube player. v.1.0.0
                if(obj.data().controls || obj.data().debug){
                    obj.append('\n<div id="jlembed_controls_' + playerId + '"><button class="previous" onClick="jlembed_previousPlaylistItem(\'' + playerId + '\')" href="javascript:void(0)">Previous</button><button class="play" onClick="jlembed_playVideo(\'' + playerId + '\')" href="javascript:void(0)">Play</button><button class="pause" onClick="jlembed_pauseVideo(\'' + playerId + '\')" href="javascript:void(0)">Pause</button><button class="next" onClick="jlembed_nextPlaylistItem(\'' + playerId + '\')" href="javascript:void(0)">Next</button><button class="stop" onClick="jlembed_stopVideo(\'' + playerId + '\')" href="javascript:void(0)">Stop</button></div>\n');
                }                               
            },
            
            trim = function(str, chars){
                // Function for trimming characters from both ends of a string. v.1.0.0
                return ltrim(rtrim(str, chars), chars);
            },
            
            ltrim = function(str, chars){
                // Function for trimming characters from the beginning of a string. v.1.0.0
                chars = chars || "\\s";
                return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
            },
            
            rtrim = function(str, chars){
                // Function for trimming characters from the end of a string. v.1.0.0
                chars = chars || "\\s";
                return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
            },
            
            _error = function(message){
                // Function for displaying an JavaScript alert. v.1.0.0
                alert(message);
                
            },
            
            _activate = function(obj){
                // Function to begin the process. v.1.0.0
                mode = (obj.data().mode == undefined) ? 'windowsmedia' : obj.data().mode;
                
                if(!plugin_exists(mode)){
                    // Required plugin not found. Process ends here.
                    return false;
                }
                // Required plugin found. Switch mode.
                switch (mode){
                    case 'adobeflash':
                    adobe_flash(obj);
                    break;
                    
                    case 'quicktime':
                    quick_time(obj);
                    break;
                    
                    case 'realplayer':
                    real_player(obj);
                    break;
                    
                    case 'silverlight':
                    silver_light(obj);
                    break;
                    
                    case 'musicplayer':
                    music_player(obj);
                    break;
                    
                    case 'youtube':
                    you_tube(obj);
                    break;
                    
                    default :
                    // windowsmedia
                    windows_media(obj);                 
                }  
            },
            
            _go = function(){
                // The master-class
                $(".jlembed").each(function(){
                    st = $(window).scrollTop(), t = h+st, pos = $(this).offset();
                    $(this).data({
                        'offset_top': pos.top,
                        'offset_left': pos.left
                    });
                    
                    if((t >= pos.top && pos.left <= w && !$(this).hasClass('jlembed_loading') && !$(this).hasClass('jlembed_loaded') && $(this).data('screw')) || (!$(this).hasClass('jlembed_loading') && !$(this).hasClass('jlembed_loaded') && !$(this).data('screw'))){
                        $(this).addClass('jlembed_loading');
                        _activate($(this));
                    }
                });
            };
            
            $(window).scroll(function() {
                 _go();                             
            });
            
            _go();
            
        }
	});	
})(jQuery);

if(!jlembed){
    var jlembed = function(){
        jQuery(document).ready(function($){
            // Call jlEmbed on the body selector
            $("body").jlEmbed(); 
        });        
    };
}

if(!swfobject){
    /*	SWFObject v2.2 <http://code.google.com/p/swfobject/>
    is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
    */
    var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
}

// YouTube API

function onYouTubePlayerReady(playerId) {
    var data = jQuery('#' + playerId).parent().data(),
    playlist = data.src.split(','),
    video_url = 'http://www.youtube.com/v/' + playlist[0];
    try{
    myjlembedplayer = document.getElementById(playerId);
    myjlembedplayer.addEventListener("onStateChange", "jlembed_onPlayerStateChange('"+playerId+"')");
    myjlembedplayer.addEventListener("onError", "jlembed_onPlayerError");
    myjlembedplayer.addEventListener("onError", "jlembed_playerError('"+playerId+"')");
    jQuery('#' + playerId).parent().data({'player_ready': true , 'current_playlist_item': 0});
    var setCurrentVolume = (data.volume) ? data.volume : 100;
    jlembed_setVolume(playerId,setCurrentVolume);   
    if(!jlembedListener){
       var jlembedListener = setInterval('jlembed_updatePlayerData(\''+playerId+'\')', 250);  
    }
    jQuery('#' + playerId).parent().data({
            'current_playlist_item': 0,
            'video_url': video_url
    });
    jlembed_updatePlayerData(playerId);
    if(data.chromeless){
        if(data.autoplay){
            jlembed_loadVideoByUrl(playerId, video_url);             
        } else {
            jlembed_cueVideoByUrl(playerId, video_url);  
        }        
    } else {
        if(data.autoplay){
            jlembed_playVideo(playerId);            
        } else {
            jlembed_cueVideoByUrl(playerId, video_url);
        }   
    }    
    } catch(e){}    
}

function jlembed_updatePlayerData(playerId) {
    try{
        var percent_played = (!jlembed_getCurrentTime(playerId)) ? 0 : Math.round((parseInt(jlembed_getCurrentTime(playerId))/parseInt(jlembed_getDuration(playerId)))*100),
        percent_loaded = (!jlembed_getVideoBytesLoaded(playerId)) ? 0 : Math.round((jlembed_getVideoBytesLoaded(playerId)/jlembed_getVideoBytesTotal(playerId))*100),
        current_volume = (!jlembed_getVolume(playerId)) ? 100 : jlembed_getVolume(playerId),
        duration = (!jlembed_getDuration(playerId)) ? 0 : jlembed_getDuration(playerId),
        current_time = (!jlembed_getCurrentTime(playerId)) ? '0:00' : jlembed_getCurrentTime(playerId),
        bytes_total = (!jlembed_getVideoBytesTotal(playerId)) ? 0 : jlembed_getVideoBytesTotal(playerId),
        bytes_loaded = (!jlembed_getVideoBytesLoaded(playerId)) ? 0 : jlembed_getVideoBytesLoaded(playerId),
        error_code = (!jQuery(document).data('yterror')) ? 'none' : jQuery(document).data('yterror');
        jQuery('#' + playerId).parent().data({
            'error_code': error_code,
            'bytes_loaded': bytes_loaded,
            'bytes_total': bytes_total,
            'current_time': current_time,
            'video_duration': duration,
            'current_volume': current_volume,
            'percent_loaded': percent_loaded,
            'percent_played': percent_played,
        });
     } catch(e){}
     var data = jQuery('#' + playerId).parent().data();
     if(data.debug){
        var output = '';
        jQuery.each(data, function(key, value){
           output +=  key + ' => ' + value + '<br />\n';
        });
        jQuery('#debug_' + playerId).html(output);
     }    
}

function jlembed_onPlayerStateChange(playerId) {
    var current_state = jlembed_getPlayerState(playerId),
    current_time = jlembed_getCurrentTime(playerId),
    current_duration = jlembed_getDuration(playerId),
    percent_played = Math.round((current_time/current_duration)*100);
    jQuery('#' + playerId).parent().data({
        'player_state': current_state
    });
    if(current_state == '0' || (current_state == '2' && percent_played > 98)){
        // the video is finished - on to the next item
        jlembed_nextPlaylistItem(playerId);                 
    }
}

function jlembed_nextPlaylistItem(playerId){
    var data = jQuery('#' + playerId).parent().data(),
    current_playlist_item = data.current_playlist_item,
    all_playlist_items = data.src.split(','),
    number_of_playlist_items = all_playlist_items.length,
    next_item = (parseInt(current_playlist_item)+1 < number_of_playlist_items && number_of_playlist_items > 1) ? parseInt(current_playlist_item)+1 : 0,
    loop = (data.loop) ? data.loop : false;
    jQuery('#' + playerId).parent().data({
            'current_playlist_item': next_item,
            'video_url': 'http://www.youtube.com/v/' + all_playlist_items[next_item]
    });
    if(next_item > 0){
        // play next item
        jlembed_loadVideoById(playerId, all_playlist_items[next_item]);
    } else {
        // end of the playlist
        // loop?
        if(data.loop){
            // play next item
            jlembed_loadVideoById(playerId, all_playlist_items[0]);
        } else {
            // cue next item
            jlembed_cueVideoById(playerId, all_playlist_items[0]);
        }
    }   
}

function jlembed_previousPlaylistItem(playerId){
    var data = jQuery('#' + playerId).parent().data(),
    current_playlist_item = data.current_playlist_item,
    all_playlist_items = data.src.split(','),
    number_of_playlist_items = all_playlist_items.length,
    prev_item = (parseInt(current_playlist_item)-1 < 0) ? parseInt(number_of_playlist_items)-1 : parseInt(current_playlist_item)-1;
    jQuery('#' + playerId).parent().data({
        'current_playlist_item': prev_item,
        'video_url': 'http://www.youtube.com/v/' + all_playlist_items[prev_item]
    });
    jlembed_loadVideoById(playerId, all_playlist_items[prev_item]);   
}

function jlembed_onPlayerError(errorCode) {
    jQuery(document).data('yterror',errorCode);
}

function jlembed_playerError(playerId) {   
    var data = jQuery('#' + playerId).parent().data(),
    error_code = jQuery(document).data('yterror');
    if(error_code && error_code != ''){
        if(data.error_alert){
            alert('An error occurred in the YouTube player. Error code: ' + error_code);
        }
        if(!data.stop_onerror){
            jlembed_nextPlaylistItem(playerId);
        } else {
            jlembed_cueFirstPlaylistItem(playerId);
        }          
    }
}

// Queueing functions

function jlembed_cueFirstPlaylistItem(playerId, startSeconds, suggestedQuality){
    if(playerId){
        var data = jQuery('#' + playerId).parent().data(),
        playlist = data.src.split(',');
        jlembed_cueVideoById(playerId, playlist[0], startSeconds, suggestedQuality);
        return true;
    } else {
        return false;
    }
}

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

// YouTube playlist functions

function jlembed_cuePlaylist(playerId, playlist, index, startSeconds, suggestedQuality){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.cuePlaylist(playlist, index, startSeconds, suggestedQuality);
        return true;
    } else {
        return false;
    }    
}

function jlembed_loadPlaylist(playerId, playlist, index, startSeconds, suggestedQuality){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.loadPlaylist(playlist, index, startSeconds, suggestedQuality);
        return true;
    } else {
        return false;
    }  
}

function jlembed_getPlaylist(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        return myjlembedplayer.getPlaylist();
    } else {
        return false;
    }  
}

function jlembed_getPlaylistIndex(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        return myjlembedplayer.getPlaylistIndex();
    } else {
        return false;
    }  
}

function jlembed_nextVideo(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.nextVideo();
        return true;
    } else {
        return false;
    }  
}

function jlembed_previousVideo(playerId){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.previousVideo();
        return true;
    } else {
        return false;
    }  
}

function jlembed_playVideoAt(playerId, index){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.playVideoAt(index);
        return true;
    } else {
        return false;
    }  
}

function jlembed_setLoop(playerId, loopPlaylists){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.setLoop(loopPlaylists);
        return true;
    } else {
        return false;
    }  
}

function jlembed_setShuffle(playerId, shufflePlaylist){
    if(playerId){
        myjlembedplayer = document.getElementById(playerId);
        myjlembedplayer.setShuffle(shufflePlaylist);
        return true;
    } else {
        return false;
    }  
}

// Last, but not least
jlembed();

 -->