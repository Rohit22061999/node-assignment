import events from 'events'
const eventEmitter = new events.EventEmitter() 
 
let method1=()=> console.log("event1")
let method2=()=> console.log("event2")

eventEmitter.on('myevent',method1)
eventEmitter.on('myevent',method2)

eventEmitter.emit('myevent')

eventEmitter.removeListener('myevent',method1)
eventEmitter.emit('myevent')


