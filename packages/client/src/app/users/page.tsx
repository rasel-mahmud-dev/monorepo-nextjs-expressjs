"use client"

import React, {useEffect, useState} from 'react';
import {fetchUsersAction} from "@/store/actions";
import {RootState, useAppDispatch, useAppSelector} from "@/store";


const Page = () => {

    const dispatch = useAppDispatch()

    const userState = useAppSelector(state =>state.userState)

    useEffect(()=>{
        dispatch(fetchUsersAction())
    }, [])

    return (
        <div>
            <h1>Users List {userState.users?.length}</h1>

            <ul>
                {userState?.users?.map(post=>(
                    <div key={post.id}>
                        <p>{post.username}</p>
                    </div>
                ))}
            </ul>

        </div>
    );
};

export default Page;