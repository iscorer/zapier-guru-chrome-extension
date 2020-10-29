const guruCardSidebar = document.getElementsByClassName("ghq-CardHomeSidebarCopySection__menu-item ghq-clickable");
const guruCardTopbar = document.getElementsByClassName("ghq-gsvg ghq-CardHeaderRightSection__item ghq-clickable");
const helpScoutTicketReply = document.getElementsByClassName('redactor_redactor redactor_editor');

if (guruCardSidebar && guruCardTopbar && helpScoutTicketReply) {
  chrome.runtime.onMessage.addListener(function (message) {
    // Click the copy content button...
    guruCardSidebar[0].click();
    // Click the close card button...
    guruCardTopbar[1].click();
    // Set focus to HS Reply box...
    helpScoutTicketReply[0].focus();
    // Paste clipboard content into the HS Reply box...
    document.execCommand('paste');
  });
}
