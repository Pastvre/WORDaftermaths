
const LogStyles = {
    NORMAL: 0,
    COMMENT: 1,
    MADNESS: 2
}

var terminalSectionsCount = 0;
var logTypingSpeed = 30;//2;
var logLineSpeed = 80;
var currentTerminalStyle = LogStyles.NORMAL;
var terminalLinesQueue = [];
var linePrefix = "> ";

var terminalBodyElem = document.body;

var lastLogSection = null;

function setTerminalBodyElem(elem) {
    terminalBodyElem = elem;
}

function insertBlankLogLine() {
    var elem = document.createElement('div');
    elem.classList.add('terminal');
    elem.id = "terminal-text-" + terminalSectionsCount;
    terminalSectionsCount += 1;
    terminalBodyElem.appendChild(elem);
    lastLogSection = elem;
    return elem;
}

function startLogSection(style) {
    var elem = document.createElement('div');
    elem.classList.add('terminal');
    switch (style) {
        case LogStyles.COMMENT:
            elem.classList.add('commentStyle');
            break;
        case LogStyles.MADNESS:
            //elem.classList.add('madnessStyle');
            elem.classList.add('glitch');
            break;
        default:
            // no additional styling
            break;
    }
    elem.id = "terminal-text-" + terminalSectionsCount;
    terminalSectionsCount += 1;
    terminalBodyElem.appendChild(elem);
    lastLogSection = elem;
    return elem;
}

function startTypingLog() {
    if (terminalLinesQueue.length > 0) {
        var autoScroll = true;
        var line = terminalLinesQueue.pop();
        var scrollView = document.getElementById('terminal-lines');
        var scrollOffset = scrollView.scrollHeight - scrollView.scrollTop;
        if (typeof line === 'string') {
            var text = linePrefix + decodeURIComponent(line);
            var id = startLogSection(currentTerminalStyle).id;
            if (autoScroll) {
                scrollView.scrollTop = scrollView.scrollHeight - scrollOffset;
            }
            startTypingAnimation(id, text, logTypingSpeed, function() { setTimeout(startTypingLog, logLineSpeed); });
        } else {
            currentTerminalStyle = line;
            startTypingLog();
        }
    }
}

function typeLog() {
    if (arguments.length == 0)
        return;
    var startTyping = terminalLinesQueue.length == 0;
    for (var i = 0; i < arguments.length; i += 1) {
        terminalLinesQueue.unshift(arguments[i]);
    }
}

function getMad(probability) {
    messages = [
        ">:)",
        "I see you.",
        "Quit snooping.",
        "Get out.",
        "Not you again. I thought I had disconnected this server.",
        "Ugh. Another rat snooping through my archives. Begone."
    ];
    if (Math.random() < probability) {
        var i = Math.floor(Math.random()*messages.length);
        i += Math.floor(Math.random()*messages.length);
        i += Math.floor(Math.random()*messages.length);
        i = i % messages.length;
        var message = messages[i];
        typeLog(LogStyles.MADNESS, message);
    }
}

function beginLog(weekNum) {
    insertBlankLogLine();
    typeLog(LogStyles.COMMENT, '=====BEGIN LOG=====');
    typeLog(LogStyles.COMMENT, 'INITIALIZING SYSTEM');
    typeLog(LogStyles.COMMENT, 'CALIBRATING CLOCK: WEEK ' + weekNum + ' OF LIBERATION');
}

function endLog() {
    typeLog(LogStyles.COMMENT, 'REBOOTING SYSTEM');
    typeLog(LogStyles.COMMENT, '=====END LOG=====');
    startTypingLog();
}