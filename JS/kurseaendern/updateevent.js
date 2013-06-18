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

/*data_send=new Object();
data_receive=new Object();

//data_send={type:"AddSingleEventUpdateRequest",data:{updatedEvent:{updatedSingleEvent:"1",comment:"Seminarleiter ist Krank",latestLastUpdate:"-128"}}}; //bauen des js Objekt
data_send={type:"AddSingleEventUpdateRequest",data:{updatedSingleEvent:"1",comment:"Seminarleiter ist Krank"}}; //bauen des js Objekt

data_receive=sendrequest(data_send);    //aufruf sendrequest in sendrequest.js

if(data_receive.type!="AddSingleEventUpdateResponse"){
    alert("Ops, something is not working, please try it again later!")
}
else{*/
    $('.SubpageChangeEvents').on('click', function(){
        var id=$(this).parent().parent().attr('id');
        $('#inhalt').find('table').remove(); //Löscht aktuellen Ihnalt der Seite
        
        
        data_send=new Object();
        data_receive=new Object();
        
        data_send={type:"GetSingleEventRequest",data:{"id":id}}; //bauen des js Objekt
        data_receive=sendrequest(data_send);
        
        //built form
        var form="<form action=\"JS/kurseaendern/updateevent.js\" name=\"kurse_aendern\" onsubmit=\"return pruefen()\">";
        //built table
        var table="<table id=\"kurse-aendern-subpage\">";
        table+="<tr><th>F&auml;cher</th><th>Datum</th><th>Art der &Auml;nderung</th><th>Raum/Zeit</th><th>Kommentar</th></tr>"; //headline
        
        //SingleEvents ausgeben
        table+="<table  id=\"meineabos\">";
        table+="<tr><td><b>Linux/SELinux</b></td><td>dd-mm</td><td><select name=\"aenderungsart\"><option>--NICHTS--</option><option value=\"verschieben\">Verschieben</option><option value=\"ausfall\">Ausfall</option></select></td><td><p>Ort</p><input type=\"text\" name=\"ort\"><br><br><p>Zeit</p><input type=\"text\" name=\"zeit\"></td><td><input type=\"text\" name=\"kommentar\"></td></tr>";
        table+="</table>";
        
        //end form
        form+="<div id=\"submit_kurse\"><input type=\"submit\" value=\"Absenden\"><input type=\"reset\" value=\"Alles R&uuml;ckg&auml;ngig\"></div></form>";
        
        $('#inhalt').append(newContent);
    });

//}

/*<div id="inhalt">
        <form action="JS/kurse_aendern.js" name="kurse_aendern" onsubmit="return pruefen()"><!--js datei noch schreiben, diese wird dann das objekt in json parsen und an den server senden-->
            <table id="kurse-aendern-unterseite">
                <tr>
                    <th>F&auml;cher</th>
                    <th>Datum</th>
                    <th>Art der &Auml;nderung</th>
                    <th>Raum/Zeit</th>
                    <th>Kommentar</th>
                </tr>
                <tr>
                    <td><b>Linux/SELinux</b></td>
                    <td>dd-mm</td>
                    <td>
                        <select name="aenderungsart">
                        <option>--NICHTS--</option>
                        <option value="verschieben">Verschieben</option>
                        <option value="ausfall">Ausfall</option>
                        </select>
                    </td>
                    <td>
                        <p>Ort</p>
                        <input type="text" name="ort">
                        <br><br>
                        <p>Zeit</p>
                        <input type="text" name="zeit">
                    </td>
                    <td>
                        <input type="text" name="kommentar">
                    </td>
                </tr>
            </table>
            <div id="submit_kurse">    
                <input type="submit" value="Absenden">
                <input type="reset" value="Alles R&uuml;ckg&auml;ngig">
            </div>
        </form>
	</div>
*/
