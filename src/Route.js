import React, { useEffect, useState } from 'react'
export default () => {
    const [flag, setFlag] =useState(true)
    return(<div>
        <h1 onClick={()=> setFlag(!flag)}>Click on</h1>
        { flag  && <Test /> }
    </div>)
}
const Test = () => {
    const [test, setTest] = useState(0)
    useEffect(() => {
        console.log("compoent init called", test)
    }, [])
    useEffect(()=> {
        console.log("firesd on test change ", test)
    }, [test])
    useEffect(() => {
        return () => { console.log("clean Up Dcode")}
    }, [])
    return(<p onClick={()  => setTest(test+1)}>This is Test Bloack{test}</p>)
}