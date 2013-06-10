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
 
function send(){
    
    id=document.getElementById("eventinput").value;
    data={type : "GetSingleEventRequest",id : id}; 
    var jsontext = JSON.stringify(data);
    
    httpPost("https://copa.prakinf.tu-ilmenau.de", jsontext);
    
    data = JSON.parse(jsontext);

    alert(data.id);
    
    //data=httpGet("https://copa.prakinf.tu-ilmenau.de");
    //einkommentieren beim funktionstest und data=... unter httpGet schreiben
    
}


function httpPost(theUrl, myJSONtext)
{
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, true );   //auf true gesetzt da jetzt nichts weiter zurück kommt um somit die alert Bestätigung anzeigen zu lassen, das würde sonst nicht gehen da er ewig warten würde (syncron)
    xmlHttp.send( myJSONtext );             //wieder auf false setzen wenn erstes Objekt zurück kommen soll!
    alert("Anfrage versendet");
}

/*function httpGet(theUrl) 
{ 
 	var xmlHttp = null; 
 	xmlHttp = new XMLHttpRequest(); 
 	xmlHttp.open( "GET", theUrl, false ); 
  	xmlHttp.send( null ); 
	if(xmlHttp.readyState == 4){ 
	alert(„OK!“); 
    } 
    return xmlHttp.responseText; 
}*/
