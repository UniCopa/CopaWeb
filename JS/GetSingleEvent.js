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
 
 
data=new Object();
data2=new Object();


function send(){
    alert("HI");
    id=document.getElementById("eventinput").value;
    data={req:{type:"GetSingleEventRequest",data:{singleEventID:id}}}; //{type : "GetSingleEventRequest",id : id}; 
    
    
    var jsontext = JSON.stringify(data);
    jsontext=httpPost("/service", "req="+jsontext);
    
    alert("[DEBUB] send 1");
    //data2 = JSON.parse(jsontext);
    
    alert(jsontext);
    

    document.getElementById("output").innerHTML=data2.data.singleEventID;
}

function httpPost(theUrl, myJSONtext)
{
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onload=function(){
        var status= xmlHttp.status;
        var data= xmlHttp.responseText;
        //alert(status);
    }
    
    xmlHttp.open( "POST", theUrl, false );   
    xmlHttp.send( myJSONtext );             
    alert("Anfrage versendet");
    if(xmlHttp.readyState == 4){ 
        alert("OK!"); 
    } 
    return xmlHttp.responseText; 
}
