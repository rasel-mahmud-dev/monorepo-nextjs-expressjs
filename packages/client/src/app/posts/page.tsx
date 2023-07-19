"use client"

import React, {useEffect, useState} from 'react';

interface Post {
    title: string,
    id: number
}
const Page = () => {

    const [posts, setPosts]  = useState<Post[]>([])
    const [errorMessage, setErrorMessage]  = useState<string>("")

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/posts").then(res=>res.json()).then(data=>{
            setPosts(data)
            setErrorMessage("")
        }).catch(ex=>{
            setPosts([])
            setErrorMessage("post fetch fail")
        })
    }, [])

    return (
        <div>
            <h1>Total Post {posts?.length}</h1>

            <ul>
                {posts.map(post=>(
                    <div key={post.id}>
                        <p>{post.title}</p>
                    </div>
                ))}
            </ul>

            <h1>{errorMessage ? errorMessage : ""}</h1>

        </div>
    );
};

export default Page;