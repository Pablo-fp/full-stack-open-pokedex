import React from 'react'
import { render, screen } from '@testing-library/react'
import axiosMock from 'axios'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom'
import App from '../src/App'
import { BrowserRouter } from 'react-router-dom'

jest.mock('axios')

describe('<App />', () => {
  it('fetches data', async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: {
        results: [
          {
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
            name: 'bulbasaur',
            id: 1
          }
        ]
      }
    })
    await act(async () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )
    })
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(axiosMock.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/?limit=50'
    )
  })

  it('shows error', async () => {
    axiosMock.get.mockRejectedValueOnce(new Error())
    await act(async () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )
    })
    expect(screen.getByTestId('error')).toBeVisible()
  })
})
