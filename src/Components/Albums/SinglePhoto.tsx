import {
  Card,
  CardTitle,
  TextContent,
  TextVariants,
  Text,
  CardBody,
} from '@patternfly/react-core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const SinglePhoto = () => {
  const history = useHistory()
  const location = useLocation()
  const photoId: any = location.state
  const [photoData, setPhotoData] = useState<{ [key: string]: any }>({})
  const [photoError, setPhotoError] = useState(null)

  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
      .then((response) => {
        setPhotoData(response.data)
      })

      .catch((error) => {
        console.error('Error in loading data', error)
        setPhotoError(error)
      })
  }, [photoId])

  return (
    <>
      <TextContent>
        <Text component={TextVariants.h1} style={{ marginBottom: '1rem' }}>
          Album - {photoData.albumId}
        </Text>
      </TextContent>
      <Card style={{ alignItems: 'center' }}>
        <CardTitle>{photoData.title}</CardTitle>
        <CardBody isFilled>
          {' '}
          <img src={photoData.url} alt="img"></img>
        </CardBody>
      </Card>
    </>
  )
}

export default SinglePhoto
