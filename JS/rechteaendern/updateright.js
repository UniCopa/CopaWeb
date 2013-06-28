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
* For the subpage of the right management page.
*/

$(document).ready(function(){

$('.SubpageRights').on('click', function(){
    
    var id=$(this).attr('id');
    var right=$(this).attr('name');
    $('#inhalt').find('table').remove(); //remove actuall content from the webpage
    
    data_send=new Object();
    data_receive=new Object();
    
    //section if the user is a owner
    if(right=='Owner'){
        data_send={type:"GetMyAppointedUsersRequest",data:{eventID:id}}; //built js object
        data_receive=sendrequest(data_send);

        var appointedUsers;   //contains all appointed users
        //built array for the different users
        var owners=data_receive.data.appointedUsers.OWNER; 
        var deputies=data_receive.data.appointedUsers.DEPUTY;
        
        var arrays = [owners, deputies];    //the outer for-loop is for building the headlines for the users classes
        for(i in arrays){
            var appointedUsers=arrays[i];
            
            var rights;
            if(i==0)
                rights='Owner';
            if(i==1)
                rights='Deputy';
            
            var elem= "<h4>"+rights+"</h4>";
            $('#users').append(elem);   
        
            for(e in appointedUsers){
                
                var userelements=appointedUsers[e];   //userelements contains the username and the email as a object            
                
                var name=userelements.name; //contains Uebung or Vorlesung
                var email=userelements.email;  //for checking the Eventname
                
                var elem= "<p>name: "+name+" | email: "+email+"</p>";
                $('#users').append(elem);
             }
             var elem= "<br>";
             $('#users').append(elem);
         }
         //einfuegen der Buttons
     }
     //section if the user is a deputy
     if(right=='Deputy'){
        //built list with all deputies for this event
        data_send={type:"GetAllDeputiesRequest",data:{eventID:id}}; //built js object
        data_receive=sendrequest(data_send);

        var deputies=data_receive.data.names;   //contains all deputies
        
        var elem= "<h4>Deputies</h4>";
        $('#users').append(elem);
        
        for(i in deputies){
            var name=deputies[i];
            
            var elem= "<p>name: "+name+" | email: [KOMMT NOCH]</p>";
            $('#users').append(elem);
         }
         //built list with all rightholders for this event
        data_send={type:"GetAllRightholdersRequest",data:{eventID:id}}; //built js object
        data_receive=sendrequest(data_send);

        var rightholders=data_receive.data.names;   //contains all deputies
        
        var elem= "<h4>Rightholders</h4>";
        $('#users').append(elem);
        
        for(i in rightholders){
            var name=rightholders[i];
            
            var elem= "<p>name: "+name+" | email: [KOMMT NOCH]</p>";
            $('#users').append(elem);
         }
         //einfuegen der Buttons
     }
     //section if the user is a rightholder
     if(right=='Rightholder'){
        //built list with all deputies for this event
        data_send={type:"GetAllDeputiesRequest",data:{eventID:id}}; //built js object
        data_receive=sendrequest(data_send);

        var deputies=data_receive.data.names;   //contains all deputies
        
        var elem= "<h4>Deputies</h4>";
        $('#users').append(elem);
        
        for(i in deputies){
            var name=deputies[i];
            
            var elem= "<p>name: "+name+" | email: [KOMMT NOCH]</p>";
            $('#users').append(elem);
         }
         //built list with all rightholders for this event
        data_send={type:"GetAllRightholdersRequest",data:{eventID:id}}; //built js object
        data_receive=sendrequest(data_send);

        var rightholders=data_receive.data.names;   //contains all deputies
        
        var elem= "<h4>Rightholders</h4>";
        $('#users').append(elem);
        
        for(i in rightholders){
            var name=rightholders[i];
            
            var elem= "<p>name: "+name+" | email: [KOMMT NOCH]</p>";
            $('#users').append(elem);
         }
         //einfuegen der Buttons
     }
});

function sendchange(){
    alert("it works");
    
    //get all information from the form for changing a event
    var form=document.kurse_aendern;    //reduce write expenses
    
    if(form.aenderungsart.selectedIndex!=0){    //if 'NICHTS' is the selection, skip this event
        if(form.aenderungsart.selectedIndex==1){    //if 'verschieben' is the selection pack the id + the comments and send this to the server
            var place=form.place.value;
            var time=form.time.value;
            var comment=form.comment.value;
            
            var msg=place+" "+time+" "+comment;
        }
        if(form.aenderungsart.selectedIndex==2){    //if 'ausfall' is the selection, pack nothing send this to the server
            
            var msg="Null";
        }
        
        
        var id=$('#inhalt').find('#meineabos').find('tr').attr('id');   //filter the id from the event out of the DOM
        alert(id);
        
        data_send=new Object();
        data_receive=new Object();

        data_send={type:"AddSingleEventUpdateRequest",data:{updatedSingleEvent:id,comment:msg}}; //bauen des js Objekt

        data_receive=sendrequest(data_send);    //aufruf sendrequest in sendrequest.js

        if(data_receive.type!="AddSingleEventUpdateResponse"){
            alert("Ops, something is not working, please try it again later!")
        }
        else{
            alert("Das Ding verarscht mich nicht mehr!");
        }
    }
}

});
