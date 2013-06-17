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
 
 /* {"type":"GetUserSettingsResponse","data":{
 *      "userSettings":{
 *          "gcmKeys":["snfdggd","dsfbsdb","refgsfb"],"emailNotification":true,"language":"english","eventSettings":{
 *              "1":{"colorCode":"FFFFFF"},"2":{"colorCode":"000000"},"3":{"colorCode":"FF0000"},"4":{"colorCode":"00FF00"}
 *           }}
 *      }
 * }
 */
 
data_send=new Object();
data_receive=new Object();
usersettings=new Object();

data_send={type:"GetUserSettingsRequest",data:{}}; //bauen des js Objekt
usersettings=sendrequest(data_send);

var eventSettings=usersettings.data.userSettings.eventSettings;

$.each(eventSettings, recurse);    //ermitteln der EventID´s --> sind keys fuer die colorCode Objekte
    
function recurse(key, val) {
	if(val instanceof Object) {
		var id=key;
		var color= "#"+val.colorCode;
		var datum="00.00.0000"; //Noch auslesen
		var uhrzeit="00:00";	//Noch auslesen
		var raum="Raum";		//Noch auslesen
		var lAE ="2013.03.12 <br/>11:46Uhr";	//Noch auslesen bzw komplett weglassen
		data_send={type:"GetEventRequest",data:{"eventID":key}}; //bauen des js Objekt
		data_receive=sendrequest(data_send);
		
		if(data_receive.type!="RequestNotPracticableException"){
			var artVeranstaltung=data_receive.data.event.eventName;
			var eventGroupID=data_receive.data.event.eventGroupID;
			
			data_send={type:"GetEventGroupRequest",data:{"eventGroupID":eventGroupID}}; //bauen des js Objekt
			data_receive=sendrequest(data_send);
			
			var name=data_receive.data.eventGroup.eventGroupName+" "+artVeranstaltung;
			
			var elem= "<tr id=\""+key+"\">";
			elem+="<td><a href=\"#\"><img src=\"images/del.png\"/></a></td>";
			elem+="<td style=\"background-color:"+color+";\"></td>";
			elem+="<td><a href=\"#\" class=\"linkToSubpage\">"+name+"</a></td>";
			elem+="<td>"+datum+"</td>";
			elem+="<td>"+uhrzeit+"</td>";
			elem+="<td>"+raum+"</td>";
			elem+="<td>"+lAE+"</td>";
			elem+="</tr>";
			
			$('#meineabos').append(elem);
		}else{
			alert("Event mit id="+key+" nicht vorhanden!");
		}
	} 
}
