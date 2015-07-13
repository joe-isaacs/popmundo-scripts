// ==UserScript==
// @name            Joe's EditorTools for Popmundo
// @namespace       http://popmundo-diaries.com/
// @Author          Joe Isaacs CharId #3248185 <joe.isaacs.pm@gmail.com>
// @description     Prevents loss of changes in It's Pop articles
// @version         1.0
// @include         http://*.popmundo.com/Special/ED/Popmundo.aspx/EditArticle/*
// @require         https://greasyfork.org/scripts/10153-sptranslations/code/spTranslations.js
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @grant           GM_info
// ==/UserScript==

//jQuery
var jisQuery = jQuery.noConflict();

jisQuery( '#ctl00_cphLeftColumn_ctl00_txtTitle' ).attr("onchange","_etChanged = true;");
jisQuery( '#ctl00_cphLeftColumn_ctl00_txtPreamble' ).attr("onchange","_etChanged = true;");
jisQuery( '#ctl00_cphLeftColumn_ctl00_txtText' ).attr("onchange","_etChanged = true;");
jisQuery( '#ctl00_cphLeftColumn_ctl00_btnSave' ).attr("onchange","_etChanged = false;");
jisQuery( 'body' ).attr("onbeforeunload","return etBeforeUnload();");
jisQuery( '#aspnetForm' ).attr("onsubmit","return etOnSubmit();");
jisQuery( '#ctl00_cphLeftColumn_ctl00_txtPublishDate' ).attr("onfocus","etChangeDate('ctl00_cphLeftColumn_ctl00_txtPublishDate');");






