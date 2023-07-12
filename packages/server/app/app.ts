import express, {Request, Response} from "express"

const app =  express()

app.get("/", (req: Request, res: Response)=>{
    res.send("Hi there")
})


app.get("/stream", (req: Request, res: Response)=>{
    res.send("Streaming")
})



app.listen(1000, ()=> console.log("server is running on port 1000") )