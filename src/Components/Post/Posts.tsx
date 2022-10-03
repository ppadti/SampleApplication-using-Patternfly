import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { TailSpin } from 'react-loader-spinner'
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
import { useHistory } from 'react-router-dom'
// import PostId from './PostId'

// type Props = {
//   idProps: number
// }

const Posts = () => {
  const history = useHistory()

  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(25)

  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setData(response.data)
      })

      .catch((error) => {
        console.error('Error in loading data', error)
        setError(error)
      })
    // .finally(() => {
    //   setTimeout(() => {
    //     setLoading(false)
    //   }, 100)
    // })
  }, [])

  const addMore = () => {
    setCount(count + 5)
  }
  const showDetails = (id: number) => {
    history.push({ pathname: `/postId/${id}`, state: id })
  }

  return (
    <>
      {error ? <TextContent>Something went wrong...</TextContent> : ''}
      {/* {loading ? (
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{ justifyContent: 'center', marginTop: '25rem' }}
          wrapperClass=""
          visible={true}
        />
      ) : ( */}
      <PageSection>
        <Gallery hasGutter>
          {data?.slice(0, count).map((details) => (
            <GalleryItem key={details['id']}>
              <Card
                onClick={() => {
                  showDetails(details['id'])
                }}
                style={{
                  cursor: 'pointer',
                }}
              >
                <CardTitle style={{ color: 'red' }}>Title </CardTitle>
                <CardBody>
                  <Truncate content={details['title']}></Truncate>
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
      {/* )} */}
    </>
  )
}

export default Posts
