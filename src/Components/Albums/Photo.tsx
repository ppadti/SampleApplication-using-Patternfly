import {
  Card,
  CardBody,
  CardTitle,
  Gallery,
  GalleryItem,
  PageSection,
  TextContent,
  Text,
  TextVariants,
  Truncate,
  Button,
  CardFooter,
} from '@patternfly/react-core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const Photo = () => {
  const history = useHistory()
  const location = useLocation()
  const albumId: any = location.state
  const [albumData, setAlbumData] = useState([])
  const [albumError, setAlbumError] = useState(null)

  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      .then((response) => {
        setAlbumData(response.data)
      })

      .catch((error) => {
        console.error('Error in loading data', error)
        setAlbumError(error)
      })
  }, [albumId])

  const showDetails = (id: number) => {
    history.push({
      pathname: `/album/${albumId}/photos/${id}`,
      state: id,
    })
  }

  return (
    <>
      {albumError ? (
        <TextContent>Something went wrong...</TextContent>
      ) : (
        <PageSection>
          <TextContent>
            <Text component={TextVariants.h1} style={{ marginBottom: '1rem' }}>
              Album - {albumId}
            </Text>
          </TextContent>
          <Gallery hasGutter>
            {albumData.map((photo) => (
              <GalleryItem key={photo['id']}>
                <Card>
                  <CardTitle>
                    <Truncate content={photo['title']}></Truncate>
                  </CardTitle>
                  <CardBody>
                    <img src={photo['thumbnailUrl']} alt="img"></img>
                  </CardBody>
                  <CardFooter>
                    <Button
                      variant="link"
                      onClick={() => {
                        showDetails(photo['id'])
                      }}
                    >
                      View more
                    </Button>
                  </CardFooter>
                </Card>
              </GalleryItem>
            ))}
          </Gallery>
        </PageSection>
      )}
    </>
  )
}

export default Photo
