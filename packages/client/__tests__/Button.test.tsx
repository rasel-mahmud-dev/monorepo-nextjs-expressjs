import {fireEvent, render, screen} from '@testing-library/react'
import LinkButton from '@/components/LinkButton'
import React from "react";
import Button from "@/components/Button";

describe('Button', () => {
    it('render link button', () => {
        render(<LinkButton href="/" role="button">Go to Home</LinkButton>)
        const heading = screen.getByRole('button', {
            name: /Go to Home/i,
        })
        expect(heading).toBeInTheDocument()
    })


    it('go to google login page', () => {
        const {getByText} = render(<LinkButton href="/login" role="button">Go to Login</LinkButton>)
        const  link = getByText("Go to Login")
        fireEvent.click(link)

        console.log(window.location.href)

        expect(window.location.href).toBe("/login")
    })

    it("should be click once", ()=>{
        const clickMock = jest.fn()
        const {getByText} = render(<Button onClick={clickMock}>Click me</Button>)
        const btn = getByText("Click me")
        fireEvent.click(btn)

        expect(clickMock).toHaveBeenCalledTimes(1)

    })
})