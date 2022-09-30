import {
  Button,
  Card,
  CardTitle,
  Gallery,
  GalleryItem,
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
    console.log(id)
    history.push({ pathname: `/photo/${id}`, state: id })
  }

  return (
    <>
      {error ? <TextContent>Something went wrong...</TextContent> : ''}
      <PageSection>
        <Gallery hasGutter>
          {data?.slice(0, count).map((album) => (
            <GalleryItem key={album['id']}>
              <Card
                onClick={() => {
                  showDetails(album['id'])
                }}
                style={{
                  height: '10rem',
                  padding: '1rem',
                  cursor: 'pointer',
                }}
              >
                {' '}
                <label style={{ color: 'red' }}>Album - {album['id']} </label>
                <CardTitle>{album['title']}</CardTitle>
              </Card>
            </GalleryItem>
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
