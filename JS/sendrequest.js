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
 
 
 /* In diesem Skript wird das js Objekt in json geparst und an den Server geschick.
  * Zurück kommt ein wieder in js geparstes Objekt was dann zur Ausgabe verwendet werden kann.
  * An diese Funktion muss ein fertig gepacktest Objekt übergeben werden!
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
        //alert(status);
    }
    
    xmlHttp.open( "POST", theUrl, false ); 
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
    xmlHttp.send( myJSONtext );             
    /*if(xmlHttp.readyState == 4){ 
        alert("OK!"); 
    }*/ 
    return xmlHttp.responseText; 
}

