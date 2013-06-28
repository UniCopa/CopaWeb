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
  * This script changes the color of an subscribed event
  */
  
  	usersettings=new Object();
    var eventSettingsNeew="";
    var eventSettings;
    var id;
 
function changeColor(input){
	id=arguments[0];
    data_send=new Object();
    data_send={type:"GetUserSettingsRequest",data:{}}; 
    usersettings=sendrequest(data_send);    
    eventSettings=usersettings.data.userSettings.eventSettings;   
    var language=usersettings.data.userSettings.language;
    var emailNotification=usersettings.data.userSettings.emailNotification;
    var gcmKey=usersettings.data.userSettings.gcmKeys;
    $.each(eventSettings, recursee);
    eventSettingsNeew=eventSettingsNeew.substr(0, eventSettingsNeew.length-1); //removes last comma
    eventSettingsNeew="{"+eventSettingsNeew+"}";
    eventSettingsNeew=JSON.parse(eventSettingsNeew);
    data_send={"type":"SetUserSettingsRequest","data":{"userSettings":{"gcmKeys":gcmKey,"emailNotification":emailNotification,"language":language,"eventSettings":eventSettingsNeew}}};
	receive_response=new Object();
	receive_response=sendrequest(data_send);
	if(receive_response.type=="SetUserSettingsResponse"){   
		alert("Changed Color!!!");  
	} 
    eventSettingsNew="";
}

function recursee(key, val) {
	if(val instanceof Object) {
		var color= val.colorCode;
		if(key==id){
			eventSettingsNeew+="\""+key+"\":{\"colorCode\":\"987587\"},";
		}else{
			eventSettingsNeew+="\""+key+"\":{\"colorCode\":\""+color+"\"},";
		}
	} 
}
