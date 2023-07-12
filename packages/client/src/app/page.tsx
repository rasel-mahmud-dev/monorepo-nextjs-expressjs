"use client"

import {createRef, useEffect} from "react";


const fetchData = async (url: string, cb: (data: string)=>void) => {
    try {
        const response = await fetch(url);
        const reader = response.body && response.body.getReader();
        if(!reader) return;

        while (true) {
            const {done, value} = await reader.read();

            if (done) {
                // Stream has ended
                break;
            }

            // Process the received chunk of data
            const chunk = value;

            const decoder = new TextDecoder();
            const text = decoder.decode(chunk);
            // ...
            cb(text);
        }

    } catch (error) {
        // Handle any errors that occur during the streaming process
        console.error(error);
    }
}

export default function Home() {

    const el = createRef<HTMLDivElement>(null)


    useEffect(()=>{

        fetchData("http://localhost:1000/data", function(data){
            if(el.current){
                el.current.innerHTML += data
            }
        })

    }, [])




    return (
        <main className="flex">
          <div ref={el} className="whitespace-pre-line break-all">
            <h1>Hello</h1>
          </div>
        </main>
    )
}
