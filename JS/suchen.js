/*
 * Copyright (C) 2013 UniCopa
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 
 /*
  * This function animates the Categories Tree.
  * First all subelements are hidden,
  * by clicking the text all subelements are fading in,
  * if this text is clicked again all subelements are hidden again
  */
  
  
 $(document).ready(function(){
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
