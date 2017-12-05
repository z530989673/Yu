var GameEvent = /** @class */ (function () {
    function GameEvent(eventName, eventArgs, eventInst) {
        this.eventName = eventName;
        this.eventArgs = eventArgs;
        this.eventInst = eventInst;
    }
    return GameEvent;
}());
var EventCenter = /** @class */ (function () {
    function EventCenter() {
    }
    // maintain a list of listeners
    EventCenter.addEventListener = function (theEvent, theHandler) {
        this._eventHandlers[theEvent.eventName] = this._eventHandlers[theEvent.eventName] || [];
        this._eventHandlers[theEvent.eventName].push([theHandler, theEvent.eventInst]);
    };
    // remove a listener
    EventCenter.removeEventListener = function (theEvent, theHandler) {
        this._eventHandlers[theEvent.eventName] = [];
    };
    // remove all listeners
    EventCenter.removeAllListeners = function (theEvent) {
        this._eventHandlers = {};
    };
    // dispatch event to all listeners
    EventCenter.dispatchAll = function (theEvent) {
        var theHandlers = this._eventHandlers[theEvent.eventName];
        if (theHandlers) {
            for (var i = 0; i < theHandlers.length; i += 1) {
                this.dispatchEvent(theEvent, theHandlers[i]);
            }
        }
    };
    // send event to a handler
    EventCenter.dispatchEvent = function (theEvent, theHandler) {
        theEvent.eventInst = theHandler[1];
        theHandler[0](theEvent);
    };
    EventCenter._eventHandlers = {};
    return EventCenter;
}());
//# sourceMappingURL=EventCenter.js.map