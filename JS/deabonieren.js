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
 * The function deabonieren() gets the ID of a SingleEvent, and then it requests the usersettings.
 * it searches for all subscribed events and puts them in eventSettingsNew.
 * if the ID of the event unsubscribing is not in eventsettings there will be no update of usersettings,
 * else the new subscribed events are the old subscribed events without the unsubscribed event
 */

/* {"type":"GetUserSettingsResponse","data":{
 *      "userSettings":{
 *          "gcmKeys":["snfdggd","dsfbsdb","refgsfb"],"emailNotification":true,"language":"english","eventSettings":{
 *              "1":{"colorCode":"FFFFFF"},"2":{"colorCode":"000000"},"3":{"colorCode":"FF0000"},"4":{"colorCode":"00FF00"}
 *           }}
 *      }
 * }
 */

var aboID;
var eventSettingsNew="";
var test="false"; //test if event is in abos (false=not in abos; true=in abos)

function deabonieren(input){ 
	aboID = arguments[0];  
    
    //UserSettings ermitteln
    usersettings=new Object();  //special object for the UserSettings
    data_send=new Object();
    data_send={type:"GetUserSettingsRequest",data:{}}; //bauen des js Objekt
    usersettings=sendrequest(data_send);    //aufruf sendrequest in sendrequest.js
    
    
    //cutting the usersettings
    var eventSettings=usersettings.data.userSettings.eventSettings;     
    var language=usersettings.data.userSettings.language;
    var emailNotification=usersettings.data.userSettings.emailNotification;
    var gcmKey=usersettings.data.userSettings.gcmKeys;
    
    //building new eventsettings
	$.each(eventSettings, recurse);
	eventSettingsNew=eventSettingsNew.substr(0, eventSettingsNew.length-1); //removes last comma
	eventSettingsNew="{"+eventSettingsNew+"}";
	eventSettingsNew=JSON.parse(eventSettingsNew);
	
	//unsubscribing event, if subscribed
	if(test=="false"){
		alert(unescape("Diese Veranstaltung haben sie nicht aboniert. Sie k%F6nnen sie nicht deabonieren"));  //unescape("..%F6..") is for correctly outputting ö
	}else{
		data_send={"type":"SetUserSettingsRequest","data":{"userSettings":{"gcmKeys":gcmKey,"emailNotification":emailNotification,"language":language,"eventSettings":eventSettingsNew}}};
		receive_response=new Object();
		receive_response=sendrequest(data_send);
		if(receive_response.type=="SetUserSettingsResponse"){   
			alert("Veranstalltung erfolgreich deaboniert!");  //better outputting name, not id
		} 
	}
	
	//clearing eventSettingsNew
	eventSettingsNew="";
	test="false";
}

function recurse(key, val) {
	if(val instanceof Object) {
		var id=key;
		var color= val.colorCode;
		if(id!=aboID){
			eventSettingsNew+="\""+id+"\":{\"colorCode\":\""+color+"\"},";
		}else{
			test="true"; //evend is subscribed
		}
	} 
}
