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

$(document).ready(function(){
 
 
	var newContent;
	var id;
	var eventColor;
	var name;
	//var eventName_subpage="<div id=\"headline\"> <h2>Test</h2> </div>";
	var eventName_subpage;

$('.linkToSubpage').on('click', function(){
	id=$(this).attr('id');
	$('#inhalt').remove();
	$('#headline').find('h2').remove();
	getname_sp();
	$('#headline').append(eventName_subpage);
	var d = new Date();
	var d = (d.getTime()-d.getMilliseconds())/1000; //zeit in millis
	data_send=new Object();
	data_receive=new Object();
	color();
	data_send={type:"GetCurrentSingleEventsRequest",data:{"eventID":id,"since":{"millis":0}}}; 
	data_receive=sendrequest(data_send);

	newContent="<div id=\"inhalt\">";
	
	output(data_receive.data.singleEvents);
	newContent+="<table style=\"border-collapse:separate; border-spacing:4px;\"><tr><td style=\"vertical-align:middle;\"><div id=\"anzeigefarbe\" style=\"width:1em; height:1em; background-color:#"+eventColor+";\"></div></td><td style=\"vertical-align:middle;\">";/*<tr><td style=\"vertical-align:middle;\"><a href=\"#\"><img src=\"images/del.png\"/></a></td><td style=\"vertical-align:middle;\"><a class=\"abolink\" href=\"#\" onclick=\"abonieren("+id+")\">[Abonieren]</a><a class=\"abolink\" href=\"#\" onclick=\"deabonieren("+id+")\">[Deabonieren]</a></td>*/

	
	newContent+="<form action=\"#\" name=\"colorBox\">";
	
	newContent+="<select id=\""+id+"\" size=\"1\" onchange=\"changeColor(this.id, this.options[this.selectedIndex].value);\">";
	newContent+="<option value=\"default\">Farbe der Veranstaltung &auml;ndern</option>";
	newContent+="<option value=\"6495ED\">Blau</option>";
	newContent+="<option value=\"B22222\">Rot</option>";
	newContent+="<option value=\"FFDD00\">Gelb</option>";
	newContent+="<option value=\"FF1493\">Pink</option>";
	newContent+="<option value=\"9ACD32\">Gr&uuml;n</option>";
	newContent+="<option value=\"FF8C00\">Orange</option>";
	newContent+="<option value=\"5C1B72\">Lila</option>";
	newContent+="<option value=\"000000\">Schwarz</option>";
	newContent+="</select></form>";
	newContent+="</td></tr></table></div>";
	
	
	
	//Buttons without functions yet
	$('body').append(newContent);
});


function output(element){
	var newContent2="Null";//first null to check if there are any events ore not
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
		newContent2+="<tr><td>"+date+"</td><td>"+time+"</td><td>"+t.location+"</td><td>"+t.supervisor+"</td><td>"+t.durationMinutes+"</td></tr>";
	}
	
	if(newContent2=="Null"){//No singeleEvents
		newContent+="<p>For this event is no SingleEvent available</p><br>"
	}else{//SngleEvents
		newContent+="<table  id=\"meineabos\" class=\""+id+"\"><tr id=\"description\"><th>Datum</th><th>Uhrzeit</th><th>Raum</th><th>Supervisor</th><th>Dauer</th></tr>";
		newContent2=newContent2.substr(4, newContent2.length); //removes Null
		newContent+=newContent2;
		newContent+="</table><br>";
	}
}

function color(){
	usersettings=new Object();  //special object for the UserSettings
    data_send=new Object();
    data_send={type:"GetUserSettingsRequest",data:{}}; //bauen des js Objekt
    usersettings=sendrequest(data_send);    //aufruf sendrequest in sendrequest.js
    var eventSettings=usersettings.data.userSettings.eventSettings;
    
    $.each(eventSettings, recurse);
}

function recurse(key, val) {
	if(val instanceof Object) {
		var color= val.colorCode;
		if(key==id){
			eventColor = val.colorCode;
		}
	} 
}


function getname_sp(){
	data_send={type:"GetEventRequest",data:{"eventID":id}}; //bauen des js Objekt
	data_receive=sendrequest(data_send);
	
	var artVeranstaltung=data_receive.data.event.eventName;
	var eventGroupID_sp=data_receive.data.event.eventGroupID;
	
	data_send={type:"GetEventGroupRequest",data:{"eventGroupID":eventGroupID_sp}}; //bauen des js Objekt
	data_receive=sendrequest(data_send);
	
	eventName_subpage="<h2>"+data_receive.data.eventGroup.eventGroupName+" "+artVeranstaltung+"</h2>";
}

});
