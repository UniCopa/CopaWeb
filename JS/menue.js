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
 * By clicking the button, the menue is opening.
 * If the botton is clicked again, the menue is hiding
 */

$(document).ready(function(){
	$("#menuebutton").on('click',function(){
		usersettings=new Object();
		data_send=new Object();
		data_send={type:"GetUserSettingsRequest",data:{}};
		usersettings=sendrequest(data_send); 
		var emailNotification=usersettings.data.userSettings.emailNotification;
		var recdata=JSON.stringify(emailNotification);
		if(recdata=="true"){
			$('#mail').attr('checked','checked');
		}else{
			$('#mail').removeAttr('checked');
		}
		$("#menue").toggle();
		$("#menueD").toggle();
	});
});
