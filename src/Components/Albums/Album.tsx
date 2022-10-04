import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Gallery,
  GalleryItem,
  PageSection,
  TextContent,
  Truncate,
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
    history.push({ pathname: `/album/${id}/photos`, state: id })
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
                  cursor: 'pointer',
                }}
              >
                {' '}
                <CardTitle style={{ color: 'red' }}>
                  Album - {album['id']}{' '}
                </CardTitle>
                <CardBody>
                  <Truncate content={album['title']}></Truncate>
                </CardBody>
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
