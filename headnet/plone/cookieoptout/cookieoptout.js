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

jQuery.ajaxSetup({ cache: true });


if (cookie_opt_out_status == 'yes' || cookie_opt_out_status == null) {
    window['ga-disable-UA-70856278-1'] = true;
}
//} else {
//    jQuery().getScript("/++resource++policy.survey.js");
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
	window['ga-disable-UA-42051765-1'] = false;
	var _gaq = _gaq || [];
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
	jQuery('#portal-cookieoptout').slideDown('normal');

	jQuery("a").filter(':noparents(#portal-globalnav)').bind('click', function() {
	    if ( window.location.hostname === this.hostname && this.hash === '') {
		cookie_opt_in();
	    }
	});
    }

  jQuery("a[href|='#cookieoptout'], a[href|='#cookieoptin']").click(function(event) {
    if (this.hash == '#cookieoptout') {
      jQuery('#portal-cookieoptout').slideUp('normal');
      cookie_opt_out();
    } else {
      cookie_opt_in();
    }
    window.location.hash = '';
    window.location.reload();
  });
});
         
