import {
  Card,
  CardBody,
  CardTitle,
  Gallery,
  GalleryItem,
  PageSection,
  TextContent,
} from '@patternfly/react-core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Photo = () => {
  const location = useLocation()
  const id: any = location.state
  const [albumData, setAlbumData] = useState([])
  const [albumError, setAlbumError] = useState(null)

  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/photos')
      .then((response) => {
        setAlbumData(response.data)
      })

      .catch((error) => {
        console.error('Error in loading data', error)
        setAlbumError(error)
      })
  }, [id])

  const filteredPhotos = albumData.filter((photo) => photo['albumId'] === id)
  console.log(filteredPhotos.length)

  return (
    <>
      {albumError ? (
        <TextContent>Something went wrong...</TextContent>
      ) : (
        <PageSection>
          <Gallery hasGutter>
            {filteredPhotos.map(
              (album: { [x: string]: string | undefined }) => (
                <GalleryItem key={album['id']}>
                  <Card>
                    <CardTitle>{album['title']}</CardTitle>
                    <CardBody>
                      <img src={album['thumbnailUrl']} alt="img"></img>
                    </CardBody>
                  </Card>
                </GalleryItem>
              ),
            )}
          </Gallery>
        </PageSection>
      )}
    </>
  )
}

export default Photo
