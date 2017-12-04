
class GameEvent
{
  public eventName:string;
  public eventArgs:any;
  public eventInst:any;
  constructor(eventName:string, eventArgs:any, eventInst:any)
  {
    this.eventName = eventName;
    this.eventArgs = eventArgs;
    this.eventInst = eventInst;
  }
}

class EventCenter {
  private static _eventHandlers = {};

  // maintain a list of listeners
  public static addEventListener(theEvent:GameEvent, theHandler:any) : void {
    this._eventHandlers[theEvent.eventName] = this._eventHandlers[theEvent.eventName] || [];
    this._eventHandlers[theEvent.eventName].push([theHandler, theEvent.eventInst]);
  }

  // remove a listener
  public static removeEventListener(theEvent:GameEvent, theHandler:any) {
    this._eventHandlers[theEvent.eventName] = [];
  }

  // remove all listeners
  public static removeAllListeners(theEvent:GameEvent) {
    this._eventHandlers = {};
  }

  // dispatch event to all listeners
  public static dispatchAll(theEvent:GameEvent) {
    var theHandlers = this._eventHandlers[theEvent.eventName];
    if(theHandlers) {
      for(var i = 0; i < theHandlers.length; i += 1) {
        this.dispatchEvent(theEvent, theHandlers[i]);
      }
    }
  }

  // send event to a handler
  public static dispatchEvent(theEvent:GameEvent, theHandler:any) {
    theEvent.eventInst = theHandler[1];
    theHandler[0](theEvent);
  }
}
	