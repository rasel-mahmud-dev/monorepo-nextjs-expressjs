import express, {Request, Response} from "express"
import cors from "cors"

const app = express()

app.use(cors())

app.get("/", (req: Request, res: Response) => {
    res.send("Hi there")
})


app.get("/data", (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');

    let count = 0

    res.write(`
            <h1 class="text-4xl font-semibold ">Events and Streams in Node.js</h1>
            
            <img  src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*1dll_sFO-u0xUFceJTWuVA.jpeg" >
            
        `)

    setInterval(() => {

        res.write(`
            Traditional way of reading input and writing response involved file loading in memory which would consume much more memory and it would be waste of resources. Node.js has its async nature all around pretty much it would be considered as replacement option for this cumbersome method.
    
            Node.js Events
            An event is like a broadcast, while a callback is like a handshake. A component that raises events knows nothing about its clients, while a component that uses callbacks knows a great deal. This makes events ideal for scenarios where the significance of the occurrence is determined by the client. Maybe the client wants to know, maybe it doesn’t.
            
            Node.js comes with built-in support for events baked into the core events module. As always, use require(‘events’) to load the module. The events module has one simple class “EventEmitter”, which we present next.
            
            EventEmitter Class
            Subscribing an event would be like :
            
            events/1basic.js
            var EventEmitter = require('events').EventEmitter;
            var emitter = new EventEmitter();
            // Subscribe
            emitter.on('foo', function (arg1, arg2) {
            console.log('Foo raised, Args:', arg1, arg2);
            });
            // Emit
            emitter.emit('foo', { a: 123 }, { b: 456 });
            Creating instance with simple EventEmitter call , using ‘on’ to subscribe which has passed arguments as - (i) string which is event name (ii) listener(callback function). Then at last ‘emit’ function is used which can be followed by any number of arguments. This was of subscribing an event.
            
            Unsubscribing an event would look like:
            
            var EventEmitter = require('events').EventEmitter;
            var emitter = new EventEmitter();
            var fooHandler = function () {
            console.log('handler called');
            // Unsubscribe
            emitter.removeListener('foo',fooHandler);
            };
            emitter.on('foo', fooHandler);
            // Emit twice
            emitter.emit('foo');
            emitter.emit('foo');
            Here we wrote unsubscribing block of code ahead of triggering event for removing listeners attached to it. Note that second event raised goes unnoticed as at first approach event raised was of unsubscribing listener from it.
        `)
        count++
        if (count > 100) {
            res.end()
        }

    }, 1000)


    // let str = fs.createReadStream("./bigText.txt", {
    //     highWaterMark: 1024
    // })
    // str.on("data", (chunk)=>{
    //     res.write(chunk.toString())
    // })
    // str.on("end", ()=>{
    //     res.end(null)
    // })
})


app.listen(1000, () => console.log("server is running on port 1000"))