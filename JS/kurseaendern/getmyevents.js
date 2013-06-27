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


$(document).ready(function(){

data_send=new Object();
data_receive=new Object();


data_send={type:"GetMyEventsRequest",data:{}}; //bauen des js Objekt
data_receive=sendrequest(data_send);    //aufruf sendrequest in sendrequest.js

if(data_receive.type!="GetMyEventsResponse"){
    alert("Ops, something is not working, please try it again later!");
}
else{
    //append all events with owner rights
    var eventIDs;   //contains all id´s with rigths
    //built array for the different types
    var IDsRightholders=data_receive.data.eventIDs.RIGHTHOLDER; 
    var IDsDeputy=data_receive.data.eventIDs.DEPUTY;
    var IDsOwner=data_receive.data.eventIDs.OWNER;
    
    var eventIDs=IDsRightholders.concat(IDsDeputy,IDsOwner);    //concat all tree arrays
    
    for(e in eventIDs){
        
        var id=eventIDs[e];   //e contains the indexes from the array
        
        //get the other elements
        data_send={type:"GetCurrentSingleEventsRequest",data:{"eventID":id,"since":{"millis":0}}}; 
        data_receive=sendrequest(data_send);
        
        var element=data_receive.data.singleEvents;
        for (var index in element){
            var t = element[index];
            
            var utcSeconds = t.date.millis/1000;
            var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
            d.setUTCSeconds(utcSeconds);
            
            //Output Date
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1; //Months are zero based
            var curr_year = d.getFullYear();
            var date=curr_date + "." + curr_month + "." + curr_year;
            
            //Output Time
            var h = (d.getHours () < 10 ? '0' + d.getHours () : d.getHours ());
            var m = (d.getMinutes () < 10 ? '0' + d.getMinutes () : d.getMinutes ());
            var time=h+":"+m;		
        }
        
        var color= "#"+"000000";//noch auslesen !!siehe mieneabos.js -- vermutlich weglassen
        var datum=date; 
        var uhrzeit=time;
        var raum=t.location;
        
        data_send={type:"GetEventRequest",data:{"eventID":id}}; 
        data_receive=sendrequest(data_send);
        
        if(data_receive.type!="RequestNotPracticableException"){
            var artVeranstaltung=data_receive.data.event.eventName; //contains Uebung or Vorlesung
            var eventGroupID=data_receive.data.event.eventGroupID;  //for checking the Eventname
            
            data_send={type:"GetEventGroupRequest",data:{"eventGroupID":eventGroupID}}; 
            data_receive=sendrequest(data_send);
            
            var name=data_receive.data.eventGroup.eventGroupName+" "+artVeranstaltung;
            
            var elem= "<tr>";
            elem+="<td><a href=\"#\" id=\""+id+"\" class=\"SubpageChangeEvents\"><img src=\"images/bearbeiten.png\"/></a></td>";
            elem+="<td style=\"background-color:"+color+";\"></td>";
            elem+="<td><a href=\"#\" class=\"linkToSubpage\" id=\""+id+"\">"+name+"</a></td>";    //theire is a bug --> can´t open the subpage...
            elem+="<td>"+datum+"</td>";
            elem+="<td>"+uhrzeit+"</td>";
            elem+="<td>"+raum+"</td>";
            elem+="</tr>";
            
            $('#kurse-aendern').append(elem);   //an Tabelle anhaengen
        }
        else{
            alert("Event mit id="+id+" nicht vorhanden!");
        }
     }
   // alert("run correct");
}
}); 
