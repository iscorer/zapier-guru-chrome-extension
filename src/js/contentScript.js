const guruCopy = document.getElementsByClassName("ghq-CardHomeSidebarCopySection__menu-item ghq-clickable");
//const guruClose = document.getElementsByClassName("ghq-gsvg ghq-CardHeaderRightSection__item ghq-clickable");
const helpScoutTicketReply = document.getElementsByClassName('redactor_redactor redactor_editor');

if (guruCopy && helpScoutTicketReply) {
	chrome.runtime.onMessage.addListener(function (message) {
		// Click the copy content button...
		guruCopy[0].click();
		// Click the close card button...
		//guruCardTopbar[1].click();
		//if the command included paste instruction
		if(message.command=="copy-paste-card-content"){
			// Set focus to HS Reply copy-card-contentbox...
			helpScoutTicketReply[0].focus();
			// Paste clipboard content into the HS Reply box...
			document.execCommand('paste');
		}
	});
}
