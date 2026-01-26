import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
    it('renders headline', () => {
        render(<App />)
        const headline = screen.getByText(/Vite \+ React/i)
        expect(headline).toBeInTheDocument()
    })

    it('renders logos', () => {
        render(<App />)
        const viteLogo = screen.getByAltText(/Vite logo/i)
        expect(viteLogo).toBeInTheDocument()
        const reactLogo = screen.getByAltText(/React logo/i)
        expect(reactLogo).toBeInTheDocument()
    })
})
