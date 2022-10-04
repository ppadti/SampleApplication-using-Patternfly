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
  Panel,
  PanelMainBody,
  PanelMain,
  Form,
  FormGroup,
  TextInput,
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
    axios('https://jsonplaceholder.typicode.com/comments')
      .then((response) => {
        setCommentData(
          response.data?.filter(
            (comment: { postId: any }) => comment.postId === id,
          ),
        )
        console.log(commentData.length)
      })

      .catch((error) => {
        console.error('Error in loading data', error)
        setError(error)
      })
  }, [])

  const count = commentData.length
  console.log(commentData)

  const onExpand = () => {
    drawerRef.current && drawerRef.current.focus()
  }

  const onClick = () => {
    setIsExpanded(!isExpanded)
  }

  const onCloseClick = () => {
    setIsExpanded(false)
  }
  const handleCommentSection = () => {
    setShowing(!showing)
    setComment('')
    setEmail('')
    setName('')
  }

  const addComment = () => {
    if (comment && name && email) {
      setComment('')
      setEmail('')
      setName('')

      setCommentData((prevState) => [
        ...prevState,
        {
          postId: id,
          id: id,
          name: name,
          email: email,
          body: comment,
        },
      ])

      console.log(commentData.length)
    }
  }

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')

  const handleNameChange = (name: string) => {
    setName(name)
  }

  const handleEmailChange = (email: string) => {
    setEmail(email)
  }

  const updateComment = (name: string) => {
    setComment(name)
  }

  const panelContent = (
    <DrawerPanelContent>
      <Panel isScrollable>
        <PanelMain maxHeight="70rem">
          <DrawerHead>
            <span tabIndex={isExpanded ? 0 : -1}>
              {error ? (
                <TextContent>Something went wrong...</TextContent>
              ) : (
                <>
                  <TextContent>
                    <Text component={TextVariants.h1}>Comments ({count})</Text>
                  </TextContent>

                  {/* <hr></hr> */}
                  {commentData.map((comment) => (
                    <Card key={comment['id']}>
                      <CardHeader>
                        <CardTitle>
                          <Avatar src={avatarImg} alt="avatar" />
                        </CardTitle>
                        <CardTitle style={{ paddingLeft: '0.5rem' }}>
                          <Text component={TextVariants.h2}>
                            {comment['name']}
                          </Text>
                        </CardTitle>
                      </CardHeader>
                      <CardBody>{comment['email']}</CardBody>
                      <CardBody>{comment['body']}</CardBody>
                    </Card>
                  ))}
                  <br></br>
                  <Button variant="primary" onClick={handleCommentSection}>
                    Add Comment
                  </Button>
                  {showing && (
                    <>
                      <Form>
                        <FormGroup
                          label="Full name"
                          isRequired
                          fieldId="simple-form-name-01"
                        >
                          <TextInput
                            isRequired
                            type="text"
                            id="simple-form-name-01"
                            name="simple-form-name-01"
                            aria-describedby="simple-form-name-01-helper"
                            value={name}
                            onChange={handleNameChange}
                          />
                        </FormGroup>
                        <FormGroup
                          label="Email"
                          isRequired
                          fieldId="simple-form-email-01"
                        >
                          <TextInput
                            isRequired
                            type="email"
                            id="simple-form-email-01"
                            name="simple-form-email-01"
                            value={email}
                            onChange={handleEmailChange}
                          />
                        </FormGroup>
                        <FormGroup
                          label="Your comments"
                          isRequired
                          fieldId="horizontal-form-exp"
                        >
                          <TextArea
                            placeholder="Enter your comment"
                            value={comment}
                            name="inputGroup-with-textarea"
                            id="inputGroup-with-textarea"
                            aria-label="textarea with button"
                            onChange={updateComment}
                          ></TextArea>
                        </FormGroup>
                        <ActionGroup>
                          <Button
                            id="textAreaButton2"
                            variant="primary"
                            onClick={addComment}
                          >
                            Add
                          </Button>
                        </ActionGroup>
                      </Form>
                    </>
                  )}
                </>
              )}
            </span>
            <DrawerActions>
              <DrawerCloseButton onClick={onCloseClick} />
            </DrawerActions>
          </DrawerHead>
        </PanelMain>
      </Panel>
    </DrawerPanelContent>
  )

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
                  <Button
                    variant="secondary"
                    aria-expanded={isExpanded}
                    onClick={onClick}
                  >
                    Read Comments ({count})
                  </Button>
                </ActionGroup>
              </PageSection>
            </>
          )}
        </DrawerContentBody>
      </DrawerContent>
    </Drawer>
  )
}

export default PostId
