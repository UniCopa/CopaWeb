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

data_send=new Object();
data_receive=new Object();

data_send={type:"GetCategoriesRequest",data:{}}; //bauen des js Objekt
data_receive=sendrequest(data_send);    //aufruf sendrequest in sendrequest.js

var list="<ul id=\"tree\">";
$.each(data_receive.data.categoryTree.children, recurse);
list+="</ul>";


$('#tree').append(list);
 

function recurse(key, val) {

    
    if(key=='name'){
            list+="<li><a href=\"#\" class=\"bla\">" + val + "</a></li>";
    }else{
        if(val instanceof Object) {
            list += "<ul>"; 
            $.each(val, recurse);
            list += "</ul>";
        } else {
            if(key!='id'){
                if(val!='Uni')
                    list += "<li><a href=\"#\">" + val + "</a></li>";
            }
            
        }
    }
}
