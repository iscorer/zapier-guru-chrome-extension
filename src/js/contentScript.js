chrome.runtime.onMessage.addListener(function (message) {
	// Collect the required DOM elements
	var guruCardCopy = document.getElementsByClassName("ghq-CardHomeSidebarCopySection__menu-item ghq-clickable");
	var guruCardClose = document.getElementsByClassName("ghq-gsvg ghq-CardHeaderRightSection__item ghq-clickable");
	var helpScoutTicketReply = document.getElementsByClassName('redactor_redactor redactor_editor');
	var guruExtensionClose = document.querySelector("guru-shadow").shadowRoot.querySelector("div.ghq-ExtensionHeader > span.ghq-clickable:last-child");
	// Check to ensure the copy button was found
	if(guruCardCopy.length<1){
		alert("Guru Card Content Copy/Paster Error:\nUnable to detect Guru's Copy Card button.\nPlease ensure the Guru extension has a card open in a tab with a HelpScout ticket draft reply.");
	}else{
		// Click the copy content button...
		guruCardCopy[0].click();
		// Check that the close buttons are available
		if( (guruCardClose.length<1) || (guruExtensionClose.length<1) ){
			console.log("Failed to close the Guru extension because the necessary DOM elements weren't captured. Check lines 4 and 6 of contentScript.js to make sure the selectors are still accurate. Guru might have been updated.");
		}else{
			// Add some delay to give the Guru extension time to display the copy notification...
			setTimeout(function(){
				// Click the close card button...
				guruCardClose[1].click();
				// Click the close extension button..
				guruExtensionClose.click();
				// Check that a draft reply is open - no need for alert on failure here
				if(helpScoutTicketReply.length>0){
					// Set focus to HS Reply box...
					focusToEnd(helpScoutTicketReply[0]);
				}
				// If the command included paste instruction
				if(message.command=="copy-paste-card-content"){
					// Check that a draft reply is open - this check does matter
					if(helpScoutTicketReply.length<1){
						alert("Guru Card Content Copy/Paster Error:\nA draft HelpScout reply could not be found. Card content was copied to your clipboard, but won't be pasted.\nYou can still manually paste it right now, though!");
					}else{
						// Paste clipboard content into the HS Reply box...
						document.execCommand('paste');
						// Set focus to end of HS Reply box again
						focusToEnd(helpScoutTicketReply[0]);
					}
				}
			}, 500);
		}
	}
});

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
