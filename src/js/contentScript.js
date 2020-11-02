const guruCardCopy = document.getElementsByClassName("ghq-CardHomeSidebarCopySection__menu-item ghq-clickable");
const guruCardClose = document.getElementsByClassName("ghq-gsvg ghq-CardHeaderRightSection__item ghq-clickable");
const helpScoutTicketReply = document.getElementsByClassName('redactor_redactor redactor_editor');

if (guruCardCopy && guruCardClose && helpScoutTicketReply) {
	chrome.runtime.onMessage.addListener(function (message) {
		// Try accessing the Guru Extension in the shadow DOM...
		const guruExtensionClose = document.querySelector("guru-shadow").shadowRoot.querySelector("div.ghq-ExtensionHeader > span.ghq-clickable:last-child");		
		// Click the copy content button...
		guruCardCopy[0].click();				
		setTimeout(function(){
			// Add some delay to give the Guru extension time to display the copy notification...
			// Click the close card button...
			guruCardClose[1].click();
			// Click the close extension button..
			guruExtensionClose.click();	
			// Set focus to HS Reply box...
			helpScoutTicketReply[0].focus();			
			//if the command included paste instruction
			if(message.command=="copy-paste-card-content"){
				// Paste clipboard content into the HS Reply box...
				document.execCommand('paste');
			}						
		}, 500); 		
	});
}
