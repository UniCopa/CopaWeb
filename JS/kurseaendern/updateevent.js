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
* For the subpage of change events.
*/

var selected_ue;
var place_ue;
var time_ue;
var comment_ue;

$(document).ready(function(){

$('.SubpageChangeEvents').on('click', function(){
    var id=$(this).attr('id');
    $('#inhalt').find('table').remove(); //remove actuall content from the webpage
    
    data_send=new Object();
    data_receive=new Object();
    
    data_send={type:"GetCurrentSingleEventsRequest",data:{"eventID":id,"since":{"millis":0}}}; 
    data_receive=sendrequest(data_send);
    
    var element=data_receive.data.singleEvents;
    for (var index in element){
        var singleEventID = element[index].singleEventID;   //get ID from a specific single Event
        data_send={type:"GetSingleEventRequest",data:{singleEventID:singleEventID}}; //built js object
        data_receive=sendrequest(data_send);    
        
        var utcSeconds = data_receive.data.singleEvent.date.millis/1000;    //date from the event
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
        
        
        data_send={type:"GetEventRequest",data:{"eventID":id}}; //determine eventGroupID 
        data_receive=sendrequest(data_send);
        
        if(data_receive.type!="RequestNotPracticableException"){
            var artVeranstaltung=data_receive.data.event.eventName;
            var eventGroupID=data_receive.data.event.eventGroupID;
            
            data_send={type:"GetEventGroupRequest",data:{"eventGroupID":eventGroupID}}; //determine the enventname
            data_receive=sendrequest(data_send);
            
            var name=data_receive.data.eventGroup.eventGroupName+" "+artVeranstaltung;
            
            //built form
            var form="<form action=\"JS/kurseaendern/updateevent.js\" name=\"kurse_aendern\" onsubmit=\"return sendchange()\">";   //implement the function call for sending the change
            //built table
            var table="<table id=\"kurse-aendern-subpage\">";
            //table+="<tr><th>F&auml;cher</th><th>Datum</th><th>Art der &Auml;nderung</th><th>Raum/Zeit</th><th>Kommentar</th></tr>"; //headline
            
            //SingleEvents ausgeben
            table+="<table  id=\"meineabos\">";
            table+="<tr id="+singleEventID+"><td><b>"+name+"</b></td><td>"+date+"<br>"+time+"<p>Uhr</p></td><td><select id=\"aenderungsart\"><option>--NICHTS--</option><option value=\"verschieben\">Verschieben</option><option value=\"ausfall\">Ausfall</option></select></td><td><p>Ort</p><input type=\"text\" name=\"place\"><br><br><p>Zeit</p><input type=\"text\" name=\"time\"></td><td><p>Kommentar</p><br><input type=\"text\" name=\"comment\" style=\"width:250px;\"></td></tr>";
            table+="</table>";
            
            //built website
            var newContent=form+table;
            
            
            
            //end form
            form+="<div id=\"submit_kurse\"><input type=\"button\" id=\"sendchange\" value=\"Absenden\"><input type=\"reset\" value=\"R&uuml;ckg&auml;ngig\"></div></form>";
            //type=\"submit\"
            newContent+=form;
            
            $('#inhalt').append(newContent);
            
            selected_ue=document.kurse_aendern.aenderungsart.selectedIndex;
            place_ue=document.kurse_aendern.place.value;
            time_ue=document.kurse_aendern.time.value;
            comment_ue=document.kurse_aendern.comment.value;
        }else{
            alert("Event mit id="+id+" nicht vorhanden!");
        }
        
    }
    
    document.getElementById('sendchange').onclick = function()  //call function sendchange()
    {
         
         sendchange(selected_ue, place_ue, time_ue, comment_ue);
    };
    
});



});

function sendchange(selected_ue, place_ue, time_ue, comment_ue){
    //alert("it works");
    
    //get all information from the form for changing a event
    //var selected = arguments[0];
    //var place = arguments[1];
    //var time = arguments[2];
    //var comment = arguments[3];
    
    alert(selected_ue);
    
    if(selected!=0){    //if 'NICHTS' is the selection, skip this event
        if(selected==1){    //if 'verschieben' is the selection pack the id + the comments and send this to the server
            var msg=place+" "+time+" "+comment;
        }
        if(selected==2){    //if 'ausfall' is the selection, pack nothing send this to the server
            
            var msg="Null";
        }
        
        
        var id=$('#inhalt').find('#meineabos').find('tr').attr('id');   //filter the id from the event out of the DOM
        alert(id);
        
        data_send=new Object();
        data_receive=new Object();

        data_send={type:"AddSingleEventUpdateRequest",data:{updatedSingleEvent:id,comment:msg}}; //bauen des js Objekt

        data_receive=sendrequest(data_send);    //aufruf sendrequest in sendrequest.js

        if(data_receive.type!="AddSingleEventUpdateResponse"){
            alert("Ops, something is not working, please try it again later!")
        }
        else{
            alert("Das Ding verarscht mich nicht mehr!");
        }
    }
}


/*
//built table
        var table="<table id=\"kurse-aendern-subpage\">";
        //SingleEvents ausgeben
        table+="<table  id=\"meineabos\">";
        table+="<tr id="+id+"><td><b>"+name+"</b></td><td><p>Date: </p>"+date+"<br><p>Time: </p>"+time+"<p>Uhr</p></td><td><select name=\"aenderungsart\" onchange=\"sendchange();\"><option>--NICHTS--</option><option value=\"verschieben\">Verschieben</option><option value=\"ausfall\">Ausfall</option></select></td></tr>";
        table+="</table>";
        
        //built website
        var newContent=table;
*/
