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
  * This script requests the Usersettings to get all subscribed events 
  * and there colorcodes.
  * Then it request the name and other informations for each Event
  * and displays them
  */
 
 /* {"type":"GetUserSettingsResponse","data":{
 *      "userSettings":{
 *          "gcmKeys":["snfdggd","dsfbsdb","refgsfb"],"emailNotification":true,"language":"english","eventSettings":{
 *              "1":{"colorCode":"FFFFFF"},"2":{"colorCode":"000000"},"3":{"colorCode":"FF0000"},"4":{"colorCode":"00FF00"}
 *           }}
 *      }
 * }
 */
 
$(document).ready(function(){
 
var test="False"; //Tests if any abos
data_send=new Object();
data_receive=new Object();
usersettings=new Object();

data_send={type:"GetUserSettingsRequest",data:{}}; //bauen des js Objekt
usersettings=sendrequest(data_send);

var eventSettings=usersettings.data.userSettings.eventSettings;


var elem="<table id=\"meineabos\"><tr id=\"description\">";//<th></th>
elem+="<th></th><th>Veranstaltung</th><th>N&auml;chster Termin</th><th>Uhrzeit</th><th>Raum</th></tr>";
$('#inhalt').append(elem);
$.each(eventSettings, recurse);    //ermitteln der EventID´s --> sind keys fuer die colorCode Objekte
if(test=="False"){
	$('#inhalt').remove();
	var newContent="<div id=\"inhalt\"><p>Sie haben noch nichts aboniert.</p></div>";
	$('body').append(newContent);
}else{
	elem="</table>";
	$('#inhalt').append(elem);
}
    
function recurse(key, val) {
	if(val instanceof Object) {
		var id=key;
		var color= "#"+val.colorCode;
		data_send={type:"GetEventRequest",data:{"eventID":key}}; //bauen des js Objekt
		data_receive=sendrequest(data_send);
		test="True";
		if(data_receive.type!="RequestNotPracticableException"){
			var artVeranstaltung=data_receive.data.event.eventName;
			var eventGroupID=data_receive.data.event.eventGroupID;
			
			data_send={type:"GetEventGroupRequest",data:{"eventGroupID":eventGroupID}}; //bauen des js Objekt
			data_receive=sendrequest(data_send);
			
			var name=data_receive.data.eventGroup.eventGroupName+" "+artVeranstaltung;
			
			//Next Event
			var now = new Date();
			now = (now.getTime()-now.getMilliseconds())/1000; //zeit in millis
			
			data_send={type:"GetCurrentSingleEventsRequest",data:{"eventID":id,"since":{"millis":now}}}; 
            data_receive=sendrequest(data_send);
            
            
            var recdata=JSON.stringify(data_receive.data); 
            var ref="{\"singleEvents\":[]}";
            
            if(recdata!=ref){ //checks if there is a next singleevent or not
				var date_ma=data_receive.data.singleEvents[0].date.millis; 
				var raum_ma=data_receive.data.singleEvents[0].location;		
				
				date_ma = date_ma/1000;
				var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
				d.setUTCSeconds(date_ma);

				//Output Date
				var curr_date = d.getDate();
				var curr_month = d.getMonth() + 1; //Months are zero based
				var curr_year = d.getFullYear();
				var datum_ma=curr_date + "." + curr_month + "." + curr_year;

				//Output Time
				var h = (d.getHours () < 10 ? '0' + d.getHours () : d.getHours ());
				var m = (d.getMinutes () < 10 ? '0' + d.getMinutes () : d.getMinutes ());
				var uhrzeit_ma=h+":"+m+" Uhr";
			}else{
				var datum_ma="-";
				var uhrzeit_ma="-";
				var raum_ma="-";
			}
			var elem= "<tr>";
			//elem+="<td><a href=\"#\"><img src=\"images/del.png\"/></a></td>";
			elem+="<td style=\"background-color:"+color+";\"></td>";
			elem+="<td><a href=\"#\" class=\"linkToSubpage\" id=\""+key+"\">"+name+"</a></td>";
			elem+="<td>"+datum_ma+"</td>";
			elem+="<td>"+uhrzeit_ma+"</td>";
			elem+="<td>"+raum_ma+"</td>";
			elem+="</tr>";
			
			$('#meineabos').append(elem);
		}else{
			alert("Event mit id="+key+" nicht vorhanden!");
		}
	} 
}

});
