$(function() {
	$('span.ausklappen').next().hide();
	$("span.ausklappen").before("<span>[+] </span>");
	$("span.ausklappen").css("cursor", "pointer");
	$("span.ausklappen").click(function() {
		$(this).next().slideToggle("slow");
		if ($(this).prev(this).text() == "[+] " )
			$(this).prev(this).replaceWith("<span>[-] </span>");
		else if ($(this).prev(this).text() == "[-] " )
			$(this).prev(this).replaceWith("<span>[+] </span>");
	});
});
