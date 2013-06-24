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
  * Shows all changes to subscribed Events  
  */
 
data_send=new Object();
data_receive=new Object();

var d = new Date();
var d = (d.getTime()-d.getMilliseconds())/1000; //zeit in millis

data_send={type:"GetSubscribedSingleEventUpdatesRequest",data:{"since":{"millis":d}}}; 
data_receive=sendrequest(data_send);
output(data_receive.data.updates);

//Ausgabe funktioniert noch nicht
function output(element){
	for (var index in element){
		var t = element[index];
		alert(t);
	}
}
