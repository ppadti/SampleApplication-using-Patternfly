import { Card, TextContent } from '@patternfly/react-core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const PostId = () => {
  const history = useHistory()
  const location = useLocation()
  const id = location.state
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/posts/${id}`)
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
  }, [data, id])
  // data.forEach((info) => console.log(info))

  return (
    <>
      {error ? <TextContent>Something went wrong...</TextContent> : ''}
      <Card></Card>
    </>
  )
}

export default PostId
