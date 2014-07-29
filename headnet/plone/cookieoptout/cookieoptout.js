function newCookie(name,value,days){
	var date,expires;
	if(days){
		date=new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));expires="; expires="+date.toGMTString()
	} else{
		expires=""
	}
    document.cookie=name+"="+escape(value)+expires+"; path=/;"
}

function getCookie(name){
	var nameEQ=name+"=", ca=document.cookie.split(';'), i, c;
	for(i=0;i<ca.length;i=i+1){
		c=ca[i];
		while(c.charAt(0)===' '){
			c=c.substring(1,c.length)
		}
        if(c.indexOf(nameEQ)===0){
			return unescape(c.substring(nameEQ.length,c.length))
		}
	}
    return null
}


var optoutcookie = 'cookieoptout'
var cookie_opt_out_status = getCookie(optoutcookie);

$.ajaxSetup({ cache: true });


//if (cookie_opt_out_status == 'yes' || cookie_opt_out_status == null) {
//    window['ga-disable-UA-18702110-1'] = true;
//} else {
//    $.getScript("/++resource++policy.survey.js");
//}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i];
    	var eqPos = cookie.indexOf("=");
    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=."+window.location.hostname;
    }
}

function cookie_opt_out() {
    if (cookie_opt_out_status != 'yes') {
	deleteAllCookies();
	newCookie(optoutcookie, 'yes', 30);
    }
}
function cookie_opt_in() {
    if (cookie_opt_out_status != 'no') {
	newCookie(optoutcookie, 'no', 30);
	// track current page view
	window['ga-disable-UA-18702110-1'] = false;
	_gaq.push(['_trackPageview']);
    }
}

jQuery(function($) {

    jQuery.expr[':'].noparents = function(a,i,m){
	return jQuery(a).parents(m[3]).length < 1;
    };

    if (window.location.hash == '#cookieoptout') {
	cookie_opt_out();
    }
    else if (window.location.hash == '#cookieoptin') {
	cookie_opt_in();
    }
    else if (cookie_opt_out_status == null) {
	$('#portal-cookieoptout').slideDown('normal');

	$("a").filter(':noparents(#portal-globalnav)').bind('click', function() {
	    if ( window.location.hostname === this.hostname && this.hash === '') {
		cookie_opt_in();
	    }
	});
    }

  $("a[href|='#cookieoptout'], a[href|='#cookieoptin']").on('click', function(event) {
    if (this.hash == '#cookieoptout') {
      $('#portal-cookieoptout').slideUp('normal');
      cookie_opt_out();
    } else {
      cookie_opt_in();
    }
    window.location.hash = '';
    window.location.reload();
  });
});
         
