import {
  Button,
  Gallery,
  PageSection,
  TextContent,
} from '@patternfly/react-core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Album = () => {
  const history = useHistory()

  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [count, setCount] = useState(25)

  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/albums')
      .then((response) => {
        setData(response.data)
      })

      .catch((error) => {
        console.error('Error in loading data', error)
        setError(error)
      })
  }, [])

  const addMore = () => {
    setCount(count + 5)
  }

  const showDetails = (id: number) => {
    history.push({ pathname: `/album/${id}/photos`, state: id })
  }

  return (
    <>
      {error ? <TextContent>Something went wrong...</TextContent> : ''}
      <PageSection>
        <Gallery hasGutter>
          {data?.slice(0, count).map((album) => (
            <Button
              key={album['id']}
              isLarge
              component="a"
              variant="secondary"
              onClick={() => {
                showDetails(album['id'])
              }}
            >
              Album - {album['id']}
            </Button>
          ))}
        </Gallery>
        <br></br>
        <Button variant="primary" onClick={addMore}>
          Load more
        </Button>
      </PageSection>
    </>
  )
}

export default Album
