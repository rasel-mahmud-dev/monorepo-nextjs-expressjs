import React, {useState} from 'react';
import Button from "@/components/Button";



const Page = () => {
    const [isChange, setChange] = useState(false)

    return (
        <div>
            <h1 role="heading">Welcome {isChange ? " RaseL": ""}</h1>
            <Button onClick={()=>setChange(true)}>Click Me</Button>
        </div>
    );
};

export default Page;