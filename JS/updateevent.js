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

data_send=new Object();
data_receive=new Object();

data_send={type:"AddSingleEventUpdateRequest",data:{eventUpdate:{updatedSingleEvent:"1",comment:"Seminarleiter ist Krank"}}}; //bauen des js Objekt
data_receive=sendrequest(data_send);    //aufruf sendrequest in sendrequest.js

if(data_receive.type!="AddSingleEventUpdateResponse"){
    alert("Ops, something is not working, please try it again later!")
}
else{
    alert("Check");
}
