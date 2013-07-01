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
  * This script checks if event is subscribed
  */
 
var eventID_testing;
var eventSettingsNw="";
var isSubscribed_is=false; //test if event is in abos (false=not in abos; true=in abos)
	
function isSubscribed(input){
	eventID_testing=arguments[0];
	
	//UserSettings ermitteln
    usersettings=new Object();  //special object for the UserSettings
    data_send=new Object();
    data_send={type:"GetUserSettingsRequest",data:{}}; //bauen des js Objekt
    usersettings=sendrequest(data_send);    //aufruf sendrequest in sendrequest.js
    
    
    //cutting the usersettings
    var eventSettings=usersettings.data.userSettings.eventSettings;     
   
    //building new eventsettings
	$.each(eventSettings, recurse_is);
	
	//clearing eventSettingsNw
	eventSettingsNw="";
	return isSubscribed_is;
}
function recurse_is(key, val) {
	if(val instanceof Object){
		if(key==eventID_testing){
			isSubscribed_is=true; //evend is subscribed
		}
	} 
}
