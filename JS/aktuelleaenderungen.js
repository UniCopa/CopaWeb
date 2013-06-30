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
  * Shows all changes to subscribed Events  
  */
  
  /*
{
	"type":"GetSubscribedSingleEventUpdatesResponse",
	"data":{
			"updates":
				[
					[
						{
							"updatedSingleEvent":
							{
								"singleEventID":0,
								"eventID":0,
								"location":"DUMMY",
								"date":{"millis":0},
								"supervisor":"DUMMY",
								"durationMinutes":0
							},
							"oldSingleEventID":19,
							"updateDate":{"millis":1382471714176},
							"creatorName":"Der P",
							"comment":"Ausfall"
						}
					],
					[
						{
							"updatedSingleEvent":
							{
								"singleEventID":0,
								"eventID":0,
								"location":"DUMMY",
								"date":{"millis":0},
								"supervisor":"DUMMY",
								"durationMinutes":0
							},
							"oldSingleEventID":22,
							"updateDate":{"millis":1382471714176},
							"creatorName":"Schredderer",
							"comment":"Removed"
						}
					]
				]
			}
}
   */
 
data_send=new Object();
data_receive=new Object();
usersettings=new Object();
var i; //SingleEventID des alten SE
var eventID_ae; //EventID der jeweiligen Änderung
var colorCodeOfEvent="";
var eventGroupID;
var oldLocation;
var oldDate;

var d = new Date();
var d = (d.getTime()-d.getMilliseconds())/1000; //zeit in millis

data_send={type:"GetSubscribedSingleEventUpdatesRequest",data:{"since":{"millis":d}}}; 
data_receive=sendrequest(data_send);
data_send={type:"GetUserSettingsRequest",data:{}}; //bauen des js Objekt
usersettings=sendrequest(data_send);    //aufruf sendrequest in sendrequest.js
eventSettings=usersettings.data.userSettings.eventSettings

//Änderungen ausgeben
output(data_receive.data.updates);


function output(element){
	for (var index in element){
		var t = element[index];
		for(var index2 in t){
			var p =t[index2];
			
			getColor(p.oldSingleEventID)
			var name=getNameOfEvent();
			var timeOfChange=getDate(p.updateDate.millis);
			
			var elem= "<tr>";
			elem+="<td style=\"background-color:#"+colorCodeOfEvent+";\"></td>";
			elem+="<td><a href=\"#\" class=\"linkToSubpage\" id=\""+eventID_ae+"\">"+name+"</a></td>";
			
			if(p.updatedSingleEvent.singleEventID==0 && p.updatedSingleEvent.eventID==0){
				elem+="<td>Event is cancelt</td>";
				elem+="<td>"+oldDate+"</td>";
				elem+="<td style=\"text-align:center;\">-</td>";
				elem+="<td>"+oldLocation+"</td>";
			}else{
				var timeOfEvent=getDate(p.updatedSingleEvent.date.millis);
				elem+="<td>"+timeOfEvent+"</td>";
				elem+="<td>"+oldDate+"</td>";
				elem+="<td>"+p.updatedSingleEvent.location+"</td>";
				elem+="<td>"+oldLocation+"</td>";
			}
			
			elem+="<td>"+timeOfChange+"</td>";
			elem+="<td>"+p.creatorName+"</td>";
			elem+="<td>"+p.comment+"</td>";
			elem+="</tr>";
			$('#aktuelleaenderungen').append(elem);
		}
	}
}

function getNameOfEvent(){//Namen der Veranstaltung herausbekommen
	data_send={type:"GetEventRequest",data:{"eventID":eventID_ae}};
	data_receive=sendrequest(data_send);
	var artVeranstaltung=data_receive.data.event.eventName;
	eventGroupID=data_receive.data.event.eventGroupID;
	data_send={type:"GetEventGroupRequest",data:{"eventGroupID":eventGroupID}}; //bauen des js Objekt
	data_receive=sendrequest(data_send);
	var name=data_receive.data.eventGroup.eventGroupName+" "+artVeranstaltung;
	return name;
}

function getDate(input){
	var utcSeconds = arguments[0];
	utcSeconds = utcSeconds/1000
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
	var time=h+":"+m+" Uhr";	
	
	var changeDate=date+"<br>"+time;
	return changeDate;
}

function getColor(input){
	i = arguments[0];
	data_send={type:"GetSingleEventRequest",data:{"singleEventID":i}}; //bauen des js Objekt
	data_receive=sendrequest(data_send);
	eventID_ae=data_receive.data.singleEvent.eventID;
	oldLocation=data_receive.data.singleEvent.location;
	oldDate=getDate(data_receive.data.singleEvent.date.millis);
	$.each(eventSettings, recurse);
}

function recurse(key, val) {
	if(val instanceof Object) {
		var id=key;
		
		if(id==eventID_ae){
			colorCodeOfEvent= val.colorCode;
		}
	} 
}
