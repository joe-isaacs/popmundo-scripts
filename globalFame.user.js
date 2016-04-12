// ==UserScript==
// @name            Joe's Global Fame for Popmundo
// @namespace       http://popmundo-diaries.com/
// @Author	        Joe Isaacs CharId #3248185 <joe.isaacs.pm@gmail.com>
// @description     This will change the look and feel of Popmundo game by allowing you to see the global fame and popularity of your band. Any problems, please contact Joe Isaacs (http://www.popmundo.com/World/Popmundo.aspx/Character/3248185)
// @version         1.0.0
// @include         http://*.popmundo.com/World/Popmundo.aspx/Artist/Popularity/*
// @include         http://*.popmundo.com/World/Popmundo.aspx/Artist/InviteArtist/*
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
var urlCurrent = window.location.href;
var numCities = 49;
var mediaFame = 0;
var mediaMC = 0;

/**
 * ********** Area: execution
 */

if( canExec( /\/World\/Popmundo.aspx\/Artist\/Popularity\/[0-9]*/g ) ) {
	addsGlobalFameMedia();
}

if( canExec( /\/World\/Popmundo.aspx\/Artist\/Popularity\/[0-9]*/g )
		|| canExec( /\/World\/Popmundo.aspx\/Artist\/InviteArtist\/[0-9]*/g ) ) {
	AddsTicketPrice();
}

/**
 * ********** Area: functions
 */

//Calc world fame media
function addsGlobalFameMedia() {
	jisQuery( "a[href^='/World/Popmundo.aspx/Help/Scoring/']" ).each( function() {
		//media value;
		var tmpVal = jisQuery( this ).attr( 'title' );
		tmpVal = tmpVal.replace( '/26', '' );
		//Increases the media
		mediaFame += parseInt( tmpVal );
	} );

//Calc world media coverage
	jisQuery( "#tablefame div[class$='ProgressBar']" ).each( function() {
		//media value;
		var tmpVal = jisQuery( this ).attr( 'title' );
		tmpVal = tmpVal.replace( '%', '' );

		//Increases the media
		mediaMC += parseInt( tmpVal );
	} );

//Add global line to table
	jisQuery( "tr:first" ).after( function() {
		var mediaFame_val = mediaFame / numCities;
		mediaFame_val = mediaFame_val.toFixed( 2 );

		var mediaMC_val = mediaMC / numCities;
		mediaMC_val = mediaMC_val.toFixed( 2 );

		var tmpVal = '<tr class="even" style="font-weight:bold;"><td>Global</td><td>' + mediaFame_val + '</td><td>' + mediaMC_val + '%</td></tr>';
		jisQuery( this ).after( tmpVal );
	} );
}


//Adds number to quality
function AddsTicketPrice() {
	jisQuery( "a[href^='/World/Popmundo.aspx/Help/Scoring/']" ).each( function() {
		//media value;
		var tmpVal = jisQuery( this ).attr( 'title' );
		tmpVal = tmpVal.replace( '/26', '' );

		switch( parseInt( tmpVal ) ) {
			case( 0 ):
				tmpVal = '5$';
				break;
			case( 1 ):
				tmpVal = '5$';
				break;
			case( 2 ):
				tmpVal = '5$';
				break;
			case( 3 ):
				tmpVal = '7$';
				break;
			case( 4 ):
				tmpVal = '9$';
				break;
			case( 5 ):
				tmpVal = '12$';
				break;
			case( 6 ):
				tmpVal = '15$';
				break;
			case( 7 ):
				tmpVal = '18$';
				break;
			case( 8 ):
				tmpVal = '20$';
				break;
			case( 9 ):
				tmpVal = '25$';
				break;
			case( 10 ):
				tmpVal = '30$';
				break;
			case( 11 ):
				tmpVal = '35$';
				break;
			case( 12 ):
				tmpVal = '40$';
				break;
			case( 13 ):
				tmpVal = '45$';
				break;
			case( 14 ):
				tmpVal = '50$';
				break;
			case( 15 ):
				tmpVal = '65$';
				break;
			case( 16 ):
				tmpVal = '70$';
				break;
		}

		jisQuery( this ).after( '<span style="color: #41924B">&nbsp;&nbsp;ticket: ' + tmpVal + '</span>' );
	} );
}