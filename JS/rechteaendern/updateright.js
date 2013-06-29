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
    
    //section if the user is a owner and deputy
    if(right!='Rightholder'){    //'Owner'
        //output my appointed users
        var elem= "<h4 id=\"headline\">appointed users</h4><br><br>";
        $('#users').append(elem);
        
        data_send={type:"GetMyAppointedUsersRequest",data:{eventID:id}}; //built js object
        data_receive=sendrequest(data_send);

        var appointedUsers;   //contains all appointed users
        //built array for the appointed users
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
            
            var elem= "<p id=\"headline\">"+rights+"</p><br>";
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
         
         //built list with all deputies for this event
         var elem= "<h4 id=\"headline\">all other users</h4><br><br>";
         $('#users').append(elem);
         
        data_send={type:"GetAllDeputiesRequest",data:{eventID:id}}; //built js object
        data_receive=sendrequest(data_send);

        var deputies=data_receive.data.names;   //contains all deputies
        
        var elem= "<p id=\"headline\">Deputies</p><br>";
        $('#users').append(elem);
        
        for(i in deputies){
            var name=deputies[i];
            
            var elem= "<p>"+name+"</p>";
            $('#users').append(elem);
         }
         var elem= "<br>";
         $('#users').append(elem);
         //built list with all rightholders for this event
        data_send={type:"GetAllRightholdersRequest",data:{eventID:id}}; //built js object
        data_receive=sendrequest(data_send);

        var rightholders=data_receive.data.names;   //contains all deputies
        
        var elem= "<p id=\"headline\">Rightholders</p><br>";
        $('#users').append(elem);
        
        for(i in rightholders){
            var name=rightholders[i];
            
            var elem= "<p>"+name+"</p>";
            $('#users').append(elem);
         }
         
         //add user
         var input="<h4 id=\"headline\">add role to user</h4><br><br>"; //added a table arround the inputs an the button
         input+="<table><tr><td>email: </td>";
         input+="<td><input type=\"text\" id=\"email_add\"</td></tr>";
         input+="<tr><td>role: </td>";
         input+="<td><input type=\"text\" id=\"role_add\"></td></tr></table>";
         $('#inhalt').append(input);
         var button="<br/><p><input type=\"button\" id=\"call_add_role\" value=\"add role\" /></p><br>";
         $('#inhalt').append(button);
         
         document.getElementById('call_add_role').onclick = function()
         {
             var email = document.getElementById('email_add').value;
             //email noch auf form pruefen: <name>@<domain>
             var role = document.getElementById("role_add").value;
             //role noch auf form pruefen: <deputy>|<rightholder>
            add_role(id, email, role);
         };
         
         //remove user
         var input="<h4 id=\"headline\">remove role from user</h4><br><br>";    //added a table arround the inputs an the button
         input+="<table><tr><td>email: </td>";
         input+="<td><input type=\"text\" id=\"email_rm\"></td></tr>";
         input+="<tr><td>role: </td>";
         input+="<td><input type=\"text\" id=\"role_rm\"></td></tr></table>";
         $('#inhalt').append(input);
         var button="<br/><p><input type=\"button\" id=\"call_remove_role\" value=\"remove role\" /></p><br>";
         $('#inhalt').append(button);
         
         document.getElementById('call_remove_role').onclick = function()
         {
             var email = document.getElementById('email_rm').value;
             //email noch auf form pruefen: <name>@<domain>
             var role = document.getElementById("role_rm").value;
             //role noch auf form pruefen: <deputy>|<rightholder>
             remove_role(id, email, role);
         };
     }
     
     //section if the user is a rightholder
     if(right=='Rightholder'){
        //built list with all deputies for this event
        data_send={type:"GetAllDeputiesRequest",data:{eventID:id}}; //built js object
        data_receive=sendrequest(data_send);

        var deputies=data_receive.data.names;   //contains all deputies
        
        var elem= "<h4 id=\"headline\">Deputies</h4><br><br>";
        $('#users').append(elem);
        
        for(i in deputies){
            var name=deputies[i];
            
            var elem= "<p>name: "+name+"</p>";
            $('#users').append(elem);
         }
         var elem= "<br>";
         $('#users').append(elem);
         //built list with all rightholders for this event
        data_send={type:"GetAllRightholdersRequest",data:{eventID:id}}; //built js object
        data_receive=sendrequest(data_send);

        var rightholders=data_receive.data.names;   //contains all deputies
        
        var elem= "<h4 id=\"headline\">Rightholders</h4><br><br>";
        $('#users').append(elem);
        
        for(i in rightholders){
            var name=rightholders[i];
            
            var elem= "<p>name: "+name+"</p>";
            $('#users').append(elem);
         }
         //include the headline
         var headline="<h4 id=\"headline\">"+right+"</4><br>";
         $('#inhalt').append(headline);
         
         //droprole button
         var button="<br><p><input type=\"button\" id=\"callfunction\" value=\"drop role\" /></p><br>";
         $('#inhalt').append(button);
         document.getElementById('callfunction').onclick = function()
         {
            drop_role(id);
         };
     }
});

function drop_role(id){
    
    data_send=new Object();
    data_receive=new Object();

    data_send={type:"DropRoleRequest",data:{eventID:id}}; 
    data_receive=sendrequest(data_send);    
    
    if(data_receive.data.droppedRole=='RIGHTHOLDER'){
        alert("You droped your role!");
    }
}

function add_role(id, email, role){
    
    data_send=new Object();
    data_receive=new Object();

    data_send={type:"AddRoleToUserRequest",data:{eventID:id,userEmail:email,role:role}}; 
    data_receive=sendrequest(data_send);    
    
    if(data_receive.type!='AddRoleToUserResponse'){
        alert("You added a role to a user!");
    }
    //alert("add_role"+id + email + role);
}

function remove_role(id, email, role){
    
    data_send=new Object();
    data_receive=new Object();

    data_send={type:"RemoveRoleFromUserRequest",data:{eventID:id,userEmail:email,role:role}}; 
    data_receive=sendrequest(data_send);    
    
    if(data_receive.type!='RemoveRoleFromUserResponse'){
        alert("You added a role to a user!");
    }
    //alert("add_role"+id + email + role);
}

});
