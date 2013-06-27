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
  * This script is call from every link in the functionbar to initialize the website.
  * That means to check for rigths (if change curse link is displayed and aso.). To do this, we get the lists with all events with the right to change somethink.
  * If a id is in one list, the user have rights. It follows, if the lists are empty we delete the useless links from the DOM (the links have id´s).
  */
 



$(document).ready(function(){

//get the lists with all events with the right to change somethink
data_send={type:"GetMyEventsRequest",data:{}};
data_receive=sendrequest(data_send);    

if(data_receive.type!="GetMyEventsResponse"){
    alert("Ops, something is not working, please try it again later!");
}
else{
    var eventIDs;   //contains all id´s with rigths
    //built array for the different types
    var IDsRightholders=data_receive.data.eventIDs.RIGHTHOLDER; 
    var IDsDeputy=data_receive.data.eventIDs.DEPUTY;
    var IDsOwner=data_receive.data.eventIDs.OWNER;
    
    var eventIDs=IDsRightholders.concat(IDsDeputy,IDsOwner);    //concat all tree arrays
    
    //check rigths from user
    if(eventIDs.length==0){    //if length from array NULL than have the user no rights
        $('#kurseaendern').remove();
        $('#rechteverwaltung').remove();
    }
}

//IMPORTNT: output the username on every page, when it is implemented than write a text in the description on the top of this script, if not delete this!
});



