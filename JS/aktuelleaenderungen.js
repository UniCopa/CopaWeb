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
 
data_send=new Object();
data_receive=new Object();

data_send={type:"GetSubscribedSingleEventUpdatesRequest",data:{since:"0"}}; //bauen des js Objekt
data_receive=sendrequest(data_send);

/*usersettings=new Object();  //special object for the UserSettings
send_usersettings=new Object(); //special object for sending the UserSettings with new Event(ID)


data_send={type:"GetUserSettingsRequest",data:{}}; //bauen des js Objekt
usersettings=sendrequest(data_send);    //aufruf sendrequest in sendrequest.js

var eventSettings=usersettings.data.userSettings.eventSettings;     //Var´s mit Grossbuchstaben sind die Bestandteile des UserSettingsObjects

$.each(eventSettings, recurse);    //ermitteln der EventID´s --> sind keys fuer die colorCode Objekte
    
function recurse(key, val) {
	if(val instanceof Object) {
		showUpdate(key);
	} 
}

function showUpdate(key){
	alert(key);
	data_send={type:"GetUserSettingsRequest",data:{}}; //bauen des js Objekt
}
/*
data_send={type:"GetMyEventsRequest",data:{}}; //bauen des js Objekt

data_receive=sendrequest(data_send);    //aufruf sendrequest in sendrequest.js
*/
