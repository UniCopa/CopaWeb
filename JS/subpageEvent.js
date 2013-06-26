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
  * If you click on an Event on any page this script removes all content 
  * from the page and loads the subpage of the event.
  * It shows all Single Events with name, date, time, room, last change and 
  * comment.
  */
 
	var newContent;
 
$('.linkToSubpage').on('click', function(){
	var id=$(this).attr('id');
	$('#inhalt').remove();
	var d = new Date();
	var d = (d.getTime()-d.getMilliseconds())/1000; //zeit in millis
	data_send=new Object();
	data_receive=new Object();
	
	data_send={type:"GetCurrentSingleEventsRequest",data:{"eventID":id,"since":{"millis":0}}}; 
	data_receive=sendrequest(data_send);

	newContent="<div id=\"inhalt\"><table  id=\"meineabos\">";
	newContent+="<tr id=\"description\"><th>Datum</th><th>Uhrzeit</th><th>Raum</th><th>Supervisor</th><th>Dauer</th></tr>";
	output(data_receive.data.singleEvents);
	newContent+="</table><br><table style=\"border-collapse:separate; border-spacing:4px;\"><tr><td style=\"vertical-align:middle;\"><div style=\"width:1em; height:1em; background-color:red;\"></div></td><td style=\"vertical-align:middle;\"><a href=\"#\">Farbe der Veranstaltung &auml;ndern</a></td></tr>";/*<tr><td style=\"vertical-align:middle;\"><a href=\"#\"><img src=\"images/del.png\"/></a></td><td style=\"vertical-align:middle;\"><a class=\"abolink\" href=\"#\" onclick=\"abonieren("+id+")\">[Abonieren]</a><a class=\"abolink\" href=\"#\" onclick=\"deabonieren("+id+")\">[Deabonieren]</a></td>*/
	newContent+="</tr></table></div>";
	//Buttons without functions yet
	$('body').append(newContent);
});

function output(element){
	for (var index in element){
		var t = element[index];
		
		var utcSeconds = t.date.millis/1000;
		var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
		d.setUTCSeconds(utcSeconds);
		
		//Output Date
		var curr_date = d.getDate();
		var curr_month = d.getMonth() + 1; //Months are zero based
		var curr_year = d.getFullYear();
		var date=curr_date + "." + curr_month + "." + curr_year;
		
		//Output Time
		var h = (d.getHours () < 10 ? '0' + d.getHours () : d.getHours ());
        var m = (d.getMinutes () < 10 ? '0' + d.getMinutes () : d.getMinutes ());
		var time=h+":"+m;		
		
		//Output SingleEvent
		newContent+="<tr><td>"+date+"</td><td>"+time+"</td><td>"+t.location+"</td><td>"+t.supervisor+"</td><td>"+t.durationMinutes+"</td></tr>";
	}
}
