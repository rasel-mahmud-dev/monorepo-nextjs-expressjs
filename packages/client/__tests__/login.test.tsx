import { render, screen } from '@testing-library/react'
import Login from '../src/app/login/page'

describe('Home', () => {
    it('renders a login page header', () => {
        render(<Login />)

        const heading = screen.getByRole('heading', {
            name: /Login Here/i,
        })

        expect(heading).toBeInTheDocument()
    })
})