// ==UserScript==
// @name            Joe's Fold Groups for Popmundo
// @namespace       http://popmundo-diaries.com/
// @Author	        Joe Isaacs CharId #3248185 <joe.isaacs.pm@gmail.com>
// @description     This will change the look and feel of Popmundo game by allowing you to fold groups of items like recipes. Any problems, please contact Joe Isaacs (http://www.popmundo.com/World/Popmundo.aspx/Character/3248185)
// @version         1.0.0
// @include         http://*.popmundo.com/World/Popmundo.aspx/Character/Recipes/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require         http://localhost/hgFunctions.js
// @grant           GM_info
// ==/UserScript==

function appendJsFile( scriptFile ) {
	var script = document.createElement( "script" );
	script.type = "text/javascript";
	script.src = scriptFile;
	jisQuery( "head" ).append( script );
}

function canExec( execRegex ) {
	var execCurrentUrl = window.location.href;

	if( execCurrentUrl.match( execRegex ) ) {
		return true;
	} else {
		return false;
	}
}

/**
 * ********** Area: variables
 */

var jisQuery = jQuery.noConflict();

/**
 * ********** Area: execution
 */

if( canExec( /\/World\/Popmundo.aspx\/Character\/Recipes\/[0-9]*/g ) ) {
	giveSortableTableFoldOption();
}

/**
 * ********** Area: functions
 */

//Adds the code to display the buttons which will hide and display the groups in receipts
function giveSortableTableFoldOption() {
	jisQuery( 'table.data.sortable' ).each( function() {
		var tblId = jisQuery( this ).attr( 'id' );
		jisQuery( this ).find( 'th.header' ).not( '.width60' ).each( function() {
			
			
			var btnCode =	'&nbsp;<input type="button" onclick="'
							+ "jQuery( '#" + tblId + " tbody' ).hide();"
							+ '" value="Hide">'
							+ '&nbsp;<input type="button" onclick="'
							+ "jQuery( '#" + tblId + " tbody' ).show();"
							+ '" value="Show">';
			jisQuery( this ).append( btnCode );
		} );
	} );
}