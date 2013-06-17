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
 
$('.linkToSubpage').on('click', function(){
	var id=$(this).parent().parent().attr('id');
	$('#inhalt').find('table').remove(); //Löscht aktuellen Ihnalt der Seite
	
	
	data_send=new Object();
	data_receive=new Object();
	
	data_send={type:"GetSingleEventRequest",data:{"id":id}}; //bauen des js Objekt
	data_receive=sendrequest(data_send);
	//SingleEvents ausgeben
	
	var newContent="<table  id=\"meineabos\">";
	newContent+="<tr id=\"description\"><th>Datum</th><th>Uhrzeit</th><th>Raum</th><th>Zuletzt ge&auml;ndert</th><th>Von</th><th>Kommentar</th></tr><tr><td>14.06.2013</td><td>11:00</td><td>LdV HS 2</td><td>2013.06.08 <br/>23:53Uhr</td><td>Kuske</td><td>Raum- und Termin&auml;um&auml;nderung wegen ISWI</td></tr>";
	newContent+="</table>";
	$('#inhalt').append(newContent);
});
