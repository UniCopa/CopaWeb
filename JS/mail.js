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
  * This script changes the mailnotification
  */
  
  	
  	
  	function changenotification(){
		usersettings=new Object();
		data_send=new Object();
		data_send={type:"GetUserSettingsRequest",data:{}};
		usersettings=sendrequest(data_send); 
		var txt=""; 
		var eventSettings=usersettings.data.userSettings.eventSettings;     
		var language=usersettings.data.userSettings.language;
		var emailNotification=usersettings.data.userSettings.emailNotification;
		var gcmKey=usersettings.data.userSettings.gcmKeys;
		if(document.getElementById('mail').checked){
			//An server senden, dass user per email benachrichtigt werden möchte
			emailNotification=true;
			txt="Sie werden ab sofort per email benachrichtigt";
		}else{
			//An server senden, dass user nicht per email benachrichtigt werden möchte
			emailNotification=false;
			txt="Sie werden ab sofort nicht mehr per email benachrichtigt";
		}
		data_send={"type":"SetUserSettingsRequest","data":{"userSettings":{"gcmKeys":gcmKey,"emailNotification":emailNotification,"language":language,"eventSettings":eventSettings}}};
		receive_response=new Object();
		receive_response=sendrequest(data_send);
		if(receive_response.type=="SetUserSettingsResponse"){   
			alert(txt);  
		} 
	}
