import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { TailSpin } from 'react-loader-spinner'
import {
  Button,
  Gallery,
  PageSection,
  PageSectionVariants,
  TextContent,
} from '@patternfly/react-core'
import { useHistory } from 'react-router-dom'

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
    history.push({ pathname: `/post/${id}`, state: id })
  }

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
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

        <Gallery hasGutter>
          {data?.slice(0, count).map((details) => (
            <Button
              key={details['id']}
              isLarge
              component="a"
              variant="secondary"
              onClick={() => {
                showDetails(details['id'])
              }}
            >
              Post - {details['id']}
            </Button>
          ))}
        </Gallery>

        <Button
          variant="primary"
          onClick={addMore}
          style={{ marginTop: '1rem' }}
        >
          Load more
        </Button>
      </PageSection>
    </>
  )
}

export default Posts
