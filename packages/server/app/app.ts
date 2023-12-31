import express, {Request, Response} from "express"
import cors from "cors"
import jsonwebtoken, {JwtPayload} from "jsonwebtoken"
import multer from "multer"


const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hi there!")
})


app.post("/login", (req: Request, res: Response) => {
    const {email, password} = req.body
    if (email && password) {
        let token = jsonwebtoken.sign({email}, "SUPER_SECRET", {expiresIn: "10s"})
        res.status(200).send({
            email,
            password,
            token: token
        })
    } else {
        res.status(500).json({message: "Login fail"})
    }
})


app.get("/auth-validate", (req: Request, res: Response) => {
    try {
        const token = req.headers["token"] as string || ""

        if (!token) return res.status(403).json({message: "Please provide authentication token"})

        type JWTP = (Partial<JwtPayload> & { email: string }) | null
        let data: JWTP = jsonwebtoken.verify(token, "SUPER_SECRET") as JWTP

        if (!data) {
            return res.status(403).json({message: "Please login again"})
        }

        res.status(200).send({
            user: {
                email: data.email
            },
            message: "User successfully logged"
        })
    } catch (ex) {
        return res.status(403).json({message: "Please login again"})
    }
})


app.get("/data", (req: Request, res: Response) => {

    // Set the appropriate headers for SSE
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    // Send an initial event to establish the SSE connection
    res.write('event: connected\n');
    res.write('data: Connected to SSE\n\n');
    res.write(`event: asdasdasd`);
    res.end()
})


const upload = multer({dest: 'uploads/'})

app.post("/upload", (req: Request, res: Response) => {

    upload.single("image")(req, res, function (err) {
        if(err) return res.status(500).json({message: "File upload fail"})

        if (!req.file) return res.status(500).json({message: "File upload fail"})
        res.status(200).json({message: "File upload success"})
    })
})


export default app