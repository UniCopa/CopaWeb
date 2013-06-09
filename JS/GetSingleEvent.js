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
    data={type : "GetSingleEventRequest",id : 13}; 
    var jsontext = JSON.stringify(data);
    
    httpPost("https://copa.prakinf.tu-ilmenau.de", jsontext);
    
 }


function httpPost(theUrl, myJSONtext)
{
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, true );   //auf true gesetzt da jetzt nichts weiter zurück kommt um somit die alert Bestätigung anzeigen zu lassen, das würde sonst nicht gehen da er ewig warten würde
    xmlHttp.send( myJSONtext );
    alert("Anfrage versendet");
}



/*function login()
{
    
    
    
    
    
    data = JSON.parse(jsontext);

    
	document.getElementById("output").innerHTML=data.unilogin + " " + data.passwort;	
    
    location.href="abos.html";	
}*/


