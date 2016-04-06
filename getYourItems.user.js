// ==UserScript==
// @name            Joe's Get Your Items for Popmundo
// @namespace       http://popmundo-diaries.com/
// @Author	        Joe Isaacs CharId #3248185 <joe.isaacs.pm@gmail.com>
// @description     Allows you to filter items of a specific character ID In a locale. Any problems, please contact Joe Isaacs (http://www.popmundo.com/World/Popmundo.aspx/Character/3248185)
// @version         1.0.1
// @include         http://*.popmundo.com/World/Popmundo.aspx/Locale/ItemsEquipment/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @grant           GM_info
// ==/UserScript==

//jQuery
var jisQuery = jQuery.noConflict();

function getFilterCharacterID() {
    var url = location.href;
    var idx = url.indexOf( "#" ) + 1;
    return idx != -1 ? url.substring( idx ) : "";
}

function getFilterLocaleBaseURL() {
    var url = location.href;
    var idxIni = url.lastIndexOf( "/World" ) ;
    var idxLength = url.lastIndexOf( "#" ) ;
    
    return idxLength < 0 ?
                url.substring( idxIni ) + "#":
                url.substring( idxIni, idxLength) + "#";
}

var jsButton =  "window.location.assign( '" + getFilterLocaleBaseURL() + "' + document.getElementById( 'textFilterID' ).value ); window.location.reload();";               

var addElement =    "<tr class=\"group\"><td id=\"ctl00_cphLeftColumn_ctl00_repItemGroups_ctl01_tdCheckboxFiller\"></td><td colspan=\"2\">Filter Items</td></tr>"
                    + "<tr class=\"even hoverable\"><td id=\"ctl00_cphLeftColumn_ctl00_repItemGroups_ctl01_tdCheckboxFiller\"></td>"
                    + "<td>"
                    + "<input type=\"number\" id=\"textFilterID\" name=\"textFilterID\" placeholder=\"Character ID\" value=\"" + getFilterCharacterID() + "\">"
                    + "&nbsp;&nbsp;<button type=\"button\" onclick=\""
                    + jsButton
                    + "\">Filter</button>"
                    + "</td></tr>";

jisQuery( "#checkedlist thead" ).append( addElement );

if ( window.location.href.match( /\/World\/Popmundo.aspx\/Locale\/ItemsEquipment\/[0-9]*#[0-9]*$/g ) ) {

    jisQuery( "#checkedlist tbody tr.hoverable" ).each( function()
    {
        var toHide = true;
        jisQuery( this ).find( 'a[id$="_lnkItemOwner"][href$="' + getFilterCharacterID() + '"]').each( function()
        {
            toHide = false;
        })
        if ( toHide ) {
            jisQuery( this ).hide();
        }
        
    });
}