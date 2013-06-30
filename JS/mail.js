function changenotification(){
	if(document.getElementById('mail').checked){
		//An server senden, dass user per email benachrichtigt werden möchte
		alert("Sie werden ab sofort per email benachrichtigt");
	}else{
		//An server senden, dass user nicht per email benachrichtigt werden möchte
		alert("Sie werden ab sofort nicht mehr per email benachrichtigt");
	}
}
