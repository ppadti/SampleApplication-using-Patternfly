import {
  ActionGroup,
  Button,
  Card,
  CardBody,
  CardTitle,
  PageSection,
  TextContent,
  Text,
  TextVariants,
  Avatar,
  Flex,
  FlexItem,
  CardHeader,
  TextArea,
} from '@patternfly/react-core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Drawer,
  DrawerPanelContent,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
} from '@patternfly/react-core'
const avatarImg =
  'https://www.patternfly.org/v4/images/avatarImg.668560cdf25a4932ef9f711b4acad52d.svg'

const PostId = () => {
  const location = useLocation()
  const id: any = location.state
  const [postData, setPostData] = useState<{ [key: string]: any }>({})
  const [commentData, setCommentData] = useState<
    { postId: number; id: number; name: string; email: string; body: string }[]
  >([])
  const [error, setError] = useState(null)
  const [postError, setPostError] = useState(null)
  const [isExpanded, setIsExpanded] = React.useState(false)
  const drawerRef = React.useRef<HTMLDivElement>()
  const [showing, setShowing] = useState(false)
  const [comment, setComment] = useState('')

  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        setPostData(response.data)
      })

      .catch((error) => {
        console.error('Error in loading data', error)
        setPostError(error)
      })
  }, [id])

  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/comments`)
      .then((response) => {
        setCommentData(response.data)
      })

      .catch((error) => {
        console.error('Error in loading data', error)
        setError(error)
      })
  }, [postData.id])

  const filteredComments = commentData.filter(
    (comment: { [x: string]: unknown }) => comment['postId'] === id,
  )

  const onExpand = () => {
    drawerRef.current && drawerRef.current.focus()
  }

  const onClick = () => {
    setIsExpanded(!isExpanded)
  }

  const onCloseClick = () => {
    setIsExpanded(false)
  }

  const panelContent = (
    <DrawerPanelContent>
      <DrawerHead>
        <span tabIndex={isExpanded ? 0 : -1}>
          {error ? (
            <TextContent>Something went wrong...</TextContent>
          ) : (
            <>
              <TextContent>
                <Text component={TextVariants.h1}>Comments</Text>
              </TextContent>
              <hr></hr>
              {filteredComments.map((comment) => (
                <Card key={comment['id']}>
                  <CardHeader>
                    <CardTitle>
                      {' '}
                      <Avatar src={avatarImg} alt="avatar" />
                      {comment['name']}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>{comment['email']}</CardBody>
                  <CardBody>{comment['body']}</CardBody>
                </Card>
              ))}
            </>
          )}
        </span>
        <DrawerActions>
          <DrawerCloseButton onClick={onCloseClick} />
        </DrawerActions>
      </DrawerHead>
    </DrawerPanelContent>
  )

  const handleCommentSection = () => {
    setShowing(!showing)
    setComment('')
  }

  const addComment = () => {
    if (comment) {
      setComment('')

      setCommentData((prevState) => [
        {
          postId: id,
          id: id,
          name: 'Pushpa',
          email: 'pushpa@gmail.com',
          body: comment,
        },
        ...prevState,
      ])
      console.log(commentData)
    }
  }
  const updateComment = (name: string) => {
    setComment(name)
  }
  return (
    <Drawer isExpanded={isExpanded} onExpand={onExpand}>
      <DrawerContent panelContent={panelContent}>
        <DrawerContentBody>
          {postError ? (
            <TextContent>Something went wrong...</TextContent>
          ) : (
            <>
              <PageSection>
                <Card>
                  <CardTitle>Post - {postData.id}</CardTitle>
                  <CardTitle>{postData.title}</CardTitle>
                  <CardBody>{postData.body}</CardBody>
                </Card>
                <br></br>

                <ActionGroup>
                  <Flex>
                    <FlexItem>
                      <Button variant="primary" onClick={handleCommentSection}>
                        Add Comment
                      </Button>
                    </FlexItem>
                    <FlexItem>
                      <Button
                        variant="primary"
                        aria-expanded={isExpanded}
                        onClick={onClick}
                      >
                        Read Comments
                      </Button>
                    </FlexItem>
                  </Flex>
                </ActionGroup>
                <br></br>
                {showing && (
                  <>
                    <TextArea
                      placeholder="Enter your comment"
                      value={comment}
                      name="inputGroup-with-textarea"
                      id="inputGroup-with-textarea"
                      aria-label="textarea with button"
                      onChange={updateComment}
                    ></TextArea>
                    <ActionGroup>
                      <Button
                        id="textAreaButton2"
                        variant="primary"
                        onClick={addComment}
                      >
                        Add
                      </Button>
                    </ActionGroup>
                  </>
                )}
              </PageSection>
            </>
          )}
        </DrawerContentBody>
      </DrawerContent>
    </Drawer>
  )
}

export default PostId
