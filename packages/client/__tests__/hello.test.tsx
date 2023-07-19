import Hello from "../src/app/hello/page"
import {screen, render, fireEvent} from "@testing-library/react";

it("test Hello page", async ()=>{
    const mockFn = jest.fn();
    let {getByText} =  render(<Hello />)
    const btn = screen.getByText("Click Me")
    fireEvent.click(btn)

    await screen.getByRole("heading")

    expect(screen.getByRole('heading')).toHaveTextContent('Welcome RaseL')


})