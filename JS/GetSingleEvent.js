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
    
    id=document.getElementById("eventinput").value;
    data={type:"GetSingleEventRequest",data:{singleEventID:id}} //{type : "GetSingleEventRequest",id : id}; 
    
    var jsontext = JSON.stringify(data);
    alert(data.data.singleEventID);
    httpPost("https://copa.prakinf.tu-ilmenau.de/service", jsontext);
    
    jsontext=httpGet("https://copa.prakinf.tu-ilmenau.de/service");
    alert("[DEBUB] send 1");
    data2 = JSON.parse(jsontext);
    
    alert(jsontext);
    

    document.getElementById("output").innerHTML=data2.data.singleEventID;
   
    
}


function httpPost(theUrl, myJSONtext)
{
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, true );   //auf true gesetzt da jetzt nichts weiter zurück kommt um somit die alert Bestätigung anzeigen zu lassen, das würde sonst nicht gehen da er ewig warten würde (syncron)
    xmlHttp.send( myJSONtext );             //wieder auf false setzen wenn erstes Objekt zurück kommen soll!
    alert("Anfrage versendet");
}

function httpGet(theUrl) 
{ 
    alert("[DEBUB] GET 1");
 	var xmlHttp = null; 
 	xmlHttp = new XMLHttpRequest(); 
 	xmlHttp.open( "GET", theUrl, true ); 
  	xmlHttp.send( null ); 1
	if(xmlHttp.readyState == 4){ 
        alert("OK!"); 
    } 
    alert(xmlHttp.responseText);
    return xmlHttp.responseText; 
}
