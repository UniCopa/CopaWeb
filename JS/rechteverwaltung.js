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
* In this script is the logic for right management implemented.
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
    
    //var eventIDs=IDsRightholders.concat(IDsDeputy,IDsOwner);    //concat all tree arrays
    
    var arrays = [IDsOwner, IDsDeputy, IDsRightholders];    //the outer for-loop is for building the headlines in the table
    for(i in arrays){
        var eventIDs=arrays[i];
        
        var rights;
        if(i==0)
            rights='Owner';
        if(i==1)
            rights='Deputy';
        if(i==2)
            rights='Rightholder';
        
        var elem= "<tr>";
            elem+="<td><h4>"+rights+"</h4></td>";
            elem+="</tr>";
        $('#kurse-aendern').append(elem);   //an Tabelle anhaengen
    
        for(e in eventIDs){
            
            var id=eventIDs[e];   //e contains the indexes from the array            
            
            data_send={type:"GetEventRequest",data:{"eventID":id}}; 
            data_receive=sendrequest(data_send);
            
            if(data_receive.type!="RequestNotPracticableException"){
                var artVeranstaltung=data_receive.data.event.eventName; //contains Uebung or Vorlesung
                var eventGroupID=data_receive.data.event.eventGroupID;  //for checking the Eventname
                
                data_send={type:"GetEventGroupRequest",data:{"eventGroupID":eventGroupID}}; 
                data_receive=sendrequest(data_send);
                
                var name=data_receive.data.eventGroup.eventGroupName+" "+artVeranstaltung;
                
                var elem= "<tr>";
                elem+="<td><a href=\"#\" id=\""+id+"\" class=\"SubpageRights\"><img src=\"images/rechteverwaltung.png\"/></a></td>";
                elem+="<td><a href=\"#\" class=\"linkToSubpage\" id=\""+id+"\">"+name+"</a></td>";   
                elem+="</tr>";
                
                $('#kurse-aendern').append(elem);   //add to table
            }
            else{
                alert("Event mit id="+id+" nicht vorhanden!");
            }
         }
     }
}
}); 
