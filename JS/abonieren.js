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
 * The function abonieren() gets the ID of a SingleEvent, an than she create a new UserSetting-String to send this the Servlet.
 * After the correct send and subscribe of the event, the user become a message (an alert)
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
usersettings=new Object();  //special object for the UserSettings
send_usersettings=new Object(); //special object for sending the UserSettings with new Event(ID)
receive_response=new Object();  //special object to extract the SetUserSettingsResponse to check the subscribe

function abonieren(){   //noch die ID mit den AUFRUF uebergeben
    
    //UserSettings ermitteln
    data_send={type:"GetUserSettingsRequest",data:{}}; //bauen des js Objekt
    
    usersettings=sendrequest(data_send);    //aufruf sendrequest in sendrequest.js
    
    
    //zerlegen des Requestobjektes --> um es dann wieder mit der neuen ID zusammenzubauen
    var eventSettings=usersettings.data.userSettings.eventSettings;     //Var´s mit Grossbuchstaben sind die Bestandteile des UserSettingsObjects
    var language=usersettings.data.userSettings.language;
    var emailNotification=usersettings.data.userSettings.emailNotification;
    var gcmKey=usersettings.data.userSettings.gcmKeys;
    
    
    //neue ID hinzufuegen, colorCode auf schwarz setzen
    var temp=JSON.stringify(eventSettings); //eventSettings-Objekt in String parsen um es besser bearbeiten zu können
    temp=temp.substr(0, temp.length-1);     //letztes Element aus dem String entfernen (die '}') um neue ID + colorCode anzuhaengen 
    temp+=",\"14\":{\"colorCode\":\"000000\"}}";    // anhaengen + abschliessende } anfuegen   !!!!!!!! ID hier fest eingestellt AENDERN: mit funktionsaufruf uebergeben1
    eventSettings=JSON.parse(temp);     //wieder in Objekt parsen zum zusammenbauen
    
    
    //zusammenfuegen des Requestobjektes
    send_usersettings={"type":"SetUserSettingsRequest","data":{"userSettings":{"gcmKeys":gcmKey,"emailNotification":emailNotification,"language":language,"eventSettings":eventSettings}}};
    
    
    //absenden
    receive_response=sendrequest(send_usersettings);
    
    //check subscribe
    if(receive_response.type=="SetUserSettingsResponse"){   //nicht die beste Variante um auf erfolgreiches subscribe zu testen
        alert("Veranstalltung erfolgreich aboniert!");  
    }
    
    
    
    /*$.each(usersettings.data.userSettings.eventSettings, recurse);    //ermitteln der EventID´s --> sind keys fuer die colorCode Objekte
    
    function recurse(key, val) {
        
        if(val instanceof Object) {
            alert(key);
        } 
    }*/
    
}
