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
usersettings=new Object();  //special object for the UserSettings

data_send={type:"GetUserSettingsRequest",data:{}}; //bauen des js Objekt
usersettings=sendrequest(data_send);    //aufruf sendrequest in sendrequest.js

//zerlegen des Requestobjektes --> um es dann wieder mit der neuen ID zusammenzubauen
var eventSettings=usersettings.data.userSettings.eventSettings;     //Var´s mit Grossbuchstaben sind die Bestandteile des UserSettingsObjects
var language=usersettings.data.userSettings.language;
var emailNotification=usersettings.data.userSettings.emailNotification;
var gcmKey=usersettings.data.userSettings.gcmKeys;

var UserName = "<p>";
// UserName += usersettings.data.userSettings.name; //Ändern sobald verfügbar
UserName += "Max Mustermann";
UserName += "</p>";
$('#user').append(UserName);
