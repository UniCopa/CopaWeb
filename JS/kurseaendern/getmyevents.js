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
* Give a rightholder his events back who he have the rights to change something
* this script is for the site change events
*/

/*
*{"type":"GetMyEventsResponse","data":{"eventIDs":{"RIGHTHOLDER":[],"DEPUTY":[],"OWNER":[]}}}
*/


data_send=new Object();
data_receive=new Object();


data_send={type:"GetMyEventsRequest",data:{}}; //bauen des js Objekt
data_receive=sendrequest(data_send);    //aufruf sendrequest in sendrequest.js

if(data_receive.type!="GetMyEventsResponse"){
    alert("Ops, something is not working, please try it again later!")
}
else{
    var eventIDs=data_receive.data.eventIDs.RIGHTHOLDER;        //IMPORTANT: !!!!!! noch nach den Eigner-klassen unterscheiden, im moment nur fuer rightholder
    
    for(e in eventIDs){
        
        var id=eventIDs[e];   //e --> rightholder hav´nt events yet
        var color= "#"+"000000";//noch auslesen !!siehe mieneabos.js
        var datum="00.00.0000"; //Noch auslesen
        var uhrzeit="00:00";	//Noch auslesen
        var raum="Raum";		//Noch auslesen
        var lAE ="2013.03.12 <br/>11:46Uhr";	//Noch auslesen bzw. komplett weglassen
        
        data_send={type:"GetEventRequest",data:{"eventID":id}}; 
        data_receive=sendrequest(data_send);
        
        if(data_receive.type!="RequestNotPracticableException"){
            var artVeranstaltung=data_receive.data.event.eventName; //contains Uebung or Vorlesung
            var eventGroupID=data_receive.data.event.eventGroupID;  //for checking the Eventname
            
            data_send={type:"GetEventGroupRequest",data:{"eventGroupID":eventGroupID}}; 
            data_receive=sendrequest(data_send);
            
            var name=data_receive.data.eventGroup.eventGroupName+" "+artVeranstaltung;
            
            var elem= "<tr>";
            elem+="<td><a href=\"#\" class=\"SubpageChangeEvents\"><img src=\"images/bearbeiten.png\"/></a></td>";
            elem+="<td style=\"background-color:"+color+";\"></td>";
            elem+="<td><a href=\"#\" class=\"linkToSubpage\" id=\""+id+"\">"+name+"</a></td>";    //theire is a bug --> can´t open the subpage...
            elem+="<td>"+datum+"</td>";
            elem+="<td>"+uhrzeit+"</td>";
            elem+="<td>"+raum+"</td>";
            elem+="<td>"+lAE+"</td>";
            elem+="</tr>";
            
            $('#kurse-aendern').append(elem);   //an Tabelle anhaengen
        }
        else{
            alert("Event mit id="+id+" nicht vorhanden!");
        }
    }
    alert("run correct");
} 
