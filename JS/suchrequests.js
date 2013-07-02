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
var cid_sr;
var EGName_sr;
var EGID_sr;

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
			list+="<li><span class=\"ausklappen\">"+t.name+"</span><ul>";
			getEventGroup_sr(t.id); //liefert name und EventGroupID		
			list+="</ul>";	
		}else{
			list+="<li><span class=\"ausklappen\">"+t.name+"</span>";
			list+="<ul>";
			output(t.children);
			list+="</ul>";
		}
	}
}

//{"type":"GetEventGroupsResponse","data":{"eventGroupList":[{"eventGroupID":2,"eventGroupName":"Telematik 1(Test)","eventGroupInfo":"Ilf","categories":[6]}]}}

function getEventGroup_sr(input_sr){
	cid_sr=arguments[0];
	data_send={type:"GetEventGroupsRequest",data:{"categoryNodeID":cid_sr,"searchTerm":""}}; 
	data_receive=sendrequest(data_send);
	var r=data_receive.data.eventGroupList;
	for(e in r){
		EGName_sr = r[e].eventGroupName;
		EGID_sr = r[e].eventGroupID;
		list+="<li><span class=\"ausklappen\">"+EGName_sr+"</span>";
		list+="<ul>";
		getEvents(EGID_sr);//liefert Events der EventGroup
		list+="</ul>";
	}
}

//{"type":"GetEventsResponse","data":{"eventList":[{"eventID":4,"eventGroupID":2,"eventName":"Uebung 1","categories":[6]},{"eventID":6,"eventGroupID":2,"eventName":"Vorlesung","categories":[6]}]}}

function getEvents(input_sr){
	var EGID_sr=arguments[0];
	data_send={type:"GetEventsRequest",data:{"eventGroupID":EGID_sr,"categoryNodeID":cid_sr}}; 
	data_receive=sendrequest(data_send);
	q=data_receive.data.eventList;
	for(e in q){
		var EventID_gE = q[e].eventID;
		var EventName_gE = q[e].eventName;
		var testIfSubscribed=isSubscribed(EventID_gE);
		list+="<li><a href=\"#\" id=\""+EventID_gE+"\" class=\"linkToSubpage\">" + EventName_gE + "</a>";
		if(testIfSubscribed==true){
			list+="<a class=\"abolink\" href=\"#\" onclick=\"deabonieren("+EventID_gE+")\">[Deabonieren]</a>";	
		}else{
			list+="<a class=\"abolink\" href=\"#\" onclick=\"abonieren("+EventID_gE+")\">[Abonieren]</a>";
		}
		list+="</li>";
	}	
}

});
