const guruCardCopy = document.getElementsByClassName("ghq-CardHomeSidebarCopySection__menu-item ghq-clickable");
const guruCardClose = document.getElementsByClassName("ghq-gsvg ghq-CardHeaderRightSection__item ghq-clickable");
const helpScoutTicketReply = document.getElementsByClassName('redactor_redactor redactor_editor');

if (guruCardCopy && guruCardClose && helpScoutTicketReply) {
	chrome.runtime.onMessage.addListener(function (message) {
		// Try accessing the Guru Extension in the shadow DOM...
		const guruExtensionClose = document.querySelector("guru-shadow").shadowRoot.querySelector("div.ghq-ExtensionHeader > span.ghq-clickable:last-child");		
		// Click the copy content button...
		guruCardCopy[0].click();
		// Add some delay to give the Guru extension time to display the copy notification...				
		setTimeout(function(){
			// Click the close card button...
			guruCardClose[1].click();
			// Click the close extension button..
			guruExtensionClose.click();	
			// Set focus to HS Reply box...
			focusToEnd(helpScoutTicketReply[0]);
			//if the command included paste instruction
			if(message.command=="copy-paste-card-content"){
				// Paste clipboard content into the HS Reply box...
				document.execCommand('paste');
				// Set focus to HS Reply box...
				focusToEnd(helpScoutTicketReply[0]);
			}						
		}, 500);
	});
}

// Finds the end of the HelpScout reply and moves the focus there
function focusToEnd(el) {
	el.focus();
	if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
		var range = document.createRange();
		range.selectNodeContents(el);
		range.collapse(false);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	} else if (typeof document.body.createTextRange != "undefined") {
		var textRange = document.body.createTextRange();
		textRange.moveToElementText(el);
		textRange.collapse(false);
		textRange.select();
	}
}
