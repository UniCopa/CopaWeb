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
  * Displays the description in the form itself
  */

var $inputControl = $(".labelinside>input, .labelinside>textarea");

$inputControl.each(function (index, domElement)
{
  /*@cc_on if (document.documentMode && document.documentMode >= 8) @*/
  if ($(this).parent().css("display") == "inline")
    $(this).parent().css("display", "inline-block");

  if (!$(this).val())
    $(this).parent().children("label").show();
});

$inputControl.bind("focus", function(event)
{
  $(this).parent().children("label").hide();
});

$inputControl.bind("blur", function(event)
{
  if (!$(this).val())
    $(this).parent().children("label").show();
});
