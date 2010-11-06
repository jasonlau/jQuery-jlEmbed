<?php

/* 
    M3U.PHP
    ==================================================================
    © JasonLau.biz - Version 1.0.0
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
 
 // http://YOUR_SERVER/m3u.php?build=
 
ob_start(); 
parse_str($_SERVER['QUERY_STRING']);
$pl = base64_decode($build);
$pl = explode("::",$pl);
header("Cache-control: public");
header("Content-Disposition: filename=playlist.m3u");
header("Content-Type: audio/x-mpegurl;");
echo "#EXTM3U\n";
foreach($pl as $item){
    $i = explode("||",$item);
    echo "#EXTINF:-1," . $i[1] . "\n";
    echo $i[0] . "\n";
$x++;
}
ob_end_flush();
?>