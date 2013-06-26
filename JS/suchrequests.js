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
  * This function is requesting the Category Tree and displays it so that
  * the user can search for Events and subscribe to them
  */

/*
 * {"type":"GetCategoriesResponse","data":{
 * 		"categoryTree":{
 * 			"id":0,
 * 			"name":"Uni",
 * 			"children":[{
 * 				"id":1,
 * 				"name":"BA",
 * 				"children":[{
 * 					"id":3,
 * 					"name":"INF",
 * 					"children":[{
 * 						"id":6,
 * 						"name":"S2",
 * 						"children":[]
 * 						},
 * 			{"id":10,"name":"S1","children":[]},{"id":11,"name":"S3","children":[]},{"id":12,"name":"S4","children":[]}]},{"id":4,"name":"WI","children":[{"id":13,"name":"S1","children":[]}]},{"id":5,"name":"MN","children":[{"id":14,"name":"S1","children":[]},{"id":15,"name":"S2","children":[]}]}]},{"id":2,"name":"MA","children":[{"id":7,"name":"BLA","children":[{"id":9,"name":"S1","children":[]}]},{"id":8,"name":"TEST","children":[{"id":16,"name":"S1","children":[]}]}]}]}}}
 * 
 * 
 */

 $(document).ready(function(){

data_send=new Object();
data_receive=new Object();
//var tested="";

data_send={type:"GetCategoriesRequest",data:{}}; //bauen des js Objekt
data_receive=sendrequest(data_send);    //aufruf sendrequest in sendrequest.js

var list="<ul id=\"tree\">";
output(data_receive.data.categoryTree.children);
list+="</ul>";

$('#inhalt').append(list);
 
function output(element){
	for (var index in element){
		var t = element[index];
		if(t.children==""){
			//tested=testSubscribed(t.id);
			//if(tested!="true"){
				//list+="<li><a href=\"#\" id=\""+t.id+"\" class=\"linkToSubpage\">" + t.name + "</a><a class=\"abolink\" href=\"#\" onclick=\"abonieren("+t.id+")\">[Abonieren]</a></li>";
			//}else{
			//	list+="<li><a href=\"#\" id=\""+t.id+"\" class=\"linkToSubpage\">" + t.name + "</a><a class=\"abolink\" href=\"#\" onclick=\"deabonieren("+t.id+")\">[Deabonieren]</a></li>";
			//}
			//tested="";
			list+="<li><a href=\"#\" id=\""+t.id+"\" class=\"linkToSubpage\">" + t.name + "</a><a class=\"abolink\" href=\"#\" onclick=\"abonieren("+t.id+")\">[Abonieren]</a><a class=\"abolink\" href=\"#\" onclick=\"deabonieren("+t.id+")\">[Deabonieren]</a></li>";
		}else{
			list+="<li><span class=\"ausklappen\">"+t.name+"</span>";
			list+="<ul>";
			output(t.children);
			list+="</ul>"
		}
	}
}

});
