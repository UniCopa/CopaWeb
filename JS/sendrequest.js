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
  * This is script gets called by each script that sends a request to the server.
  * It parses the request (javascript object) to JSON and sends it to the server
  * The server returns a json object that gets reparsed to a javascript object
  * and gets returned to the requestscript.
  */
 
 
receive=new Object();


function sendrequest(send){

    var jsontext = JSON.stringify(send);    //parsen des json fuer server
    var requesttext = "req="+jsontext;   //bauen des request-Strings

    jsontext=httpPost("/service", requesttext);    //aufruf senden
        
    receive = JSON.parse(jsontext); //rueckparsen
    
    return receive;
}

function httpPost(theUrl, myJSONtext)
{
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onload=function(){
        var status= xmlHttp.status;
        var data= xmlHttp.responseText;
    }
    
    xmlHttp.open( "POST", theUrl, false ); 
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
    xmlHttp.send( myJSONtext );             
    /*if(xmlHttp.readyState == 4){ 
        alert("OK!"); 
    }*/ 
    return xmlHttp.responseText; 
}

