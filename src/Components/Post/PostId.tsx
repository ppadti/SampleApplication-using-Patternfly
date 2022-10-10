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
  TextArea,
  Form,
  FormGroup,
  TextInput,
  Truncate,
  Drawer,
  DrawerPanelContent,
  DrawerContent,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
  Stack,
  StackItem,
  DrawerPanelBody,
  Flex,
  FlexItem,
  PageSectionVariants,
} from '@patternfly/react-core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const avatarImg =
  'https://www.patternfly.org/v4/images/avatarImg.668560cdf25a4932ef9f711b4acad52d.svg'

const PostId = () => {
  const location = useLocation()
  const postId: any = location.state
  const [postData, setPostData] = useState<{ [key: string]: any }>({})
  const [commentData, setCommentData] = useState<
    { postId: number; id: number; name: string; email: string; body: string }[]
  >([])
  const [error, setError] = useState(null)
  const [postError, setPostError] = useState(null)
  const [userError, setUserError] = useState(null)
  const [userData, setUserData] = useState<{ [key: string]: any }>({})
  const [isExpanded, setIsExpanded] = React.useState(false)
  const drawerRef = React.useRef<HTMLDivElement>()
  const [showing, setShowing] = useState(false)
  const [comment, setComment] = useState('')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')

  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        setPostData(response.data)
      })

      .catch((error) => {
        console.error('Error in loading data', error)
        setPostError(error)
      })
  }, [])
  console.log(postData.userId)

  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => {
        setCommentData(response.data)
      })

      .catch((error) => {
        console.error('Error in loading data', error)
        setError(error)
      })
  }, [])

  const count = commentData.length

  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/users/${postData.userId}`)
      .then((response) => {
        setUserData(response.data)
      })

      .catch((error) => {
        console.error('Error in loading data', error)
        setUserError(error)
      })
  }, [postData.userId])
  console.log(userData)

  // const onExpand = () => {
  //   drawerRef.current && drawerRef.current.focus()
  // }

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
          postId,
          id: postId,
          name: name,
          email: email,
          body: comment,
        },
      ])
    }
  }

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
      <DrawerHead>
        <Stack>
          <StackItem>
            <TextContent>
              <Text component="h1">Comments ({count})</Text>
            </TextContent>
          </StackItem>
        </Stack>
        <DrawerActions>
          <DrawerCloseButton onClick={onCloseClick} />
        </DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>
        {error ? (
          <TextContent>
            {' '}
            <Text component={TextVariants.h2}>Unable to load...</Text>
          </TextContent>
        ) : (
          <>
            {commentData.map((comment) => (
              <>
                <Card style={{ margin: '1rem' }}>
                  <CardTitle>
                    <Flex style={{ alignItems: 'center' }}>
                      <Flex direction={{ default: 'column' }}>
                        <FlexItem>
                          <Avatar
                            src={avatarImg}
                            alt="avatar"
                            size="md"
                            border="dark"
                          />
                        </FlexItem>
                      </Flex>
                      <Flex
                        direction={{ default: 'column' }}
                        flex={{ default: 'flex_1' }}
                      >
                        <FlexItem style={{ margin: '0rem' }}>
                          <Text component={TextVariants.h2}>
                            <Truncate content={comment.name}></Truncate>
                          </Text>
                        </FlexItem>
                        <FlexItem>
                          <Button isInline component="span" variant="link">
                            {comment.email}
                          </Button>
                        </FlexItem>
                      </Flex>
                    </Flex>
                  </CardTitle>
                  <CardBody>{comment.body}</CardBody>
                </Card>
              </>
            ))}
            <Button
              variant="primary"
              onClick={handleCommentSection}
              style={{ marginBottom: '1rem' }}
            >
              Add Comment
            </Button>
            {showing && (
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
                    variant="primary"
                    onClick={addComment}
                    style={{ marginBottom: '1rem' }}
                  >
                    Add
                  </Button>
                </ActionGroup>
              </Form>
            )}
          </>
        )}
      </DrawerPanelBody>
    </DrawerPanelContent>
  )

  const pageContent = (
    <>
      {' '}
      <PageSection variant={PageSectionVariants.light}>
        {postError ? (
          <TextContent>Something went wrong...</TextContent>
        ) : (
          <>
            <Card style={{ marginBottom: '1rem' }}>
              <CardTitle>
                <TextContent>
                  <Text component={TextVariants.h1}>{postData.title}</Text>
                </TextContent>{' '}
                <Flex>
                  <FlexItem>
                    <TextContent>
                      <Text component={TextVariants.small}>
                        {' '}
                        by {userData.username}
                      </Text>
                    </TextContent>
                  </FlexItem>
                  <FlexItem>
                    {' '}
                    <Button isInline component="span" variant="link">
                      - {userData.email}
                    </Button>
                  </FlexItem>
                </Flex>
              </CardTitle>
              <CardBody>{postData.body}</CardBody>
            </Card>

            <ActionGroup>
              <Button
                variant="secondary"
                aria-expanded={isExpanded}
                onClick={onClick}
              >
                Read Comments ({count})
              </Button>
            </ActionGroup>
          </>
        )}
      </PageSection>
    </>
  )

  return (
    <>
      <Drawer isExpanded={isExpanded}>
        <DrawerContent panelContent={panelContent}>{pageContent}</DrawerContent>
      </Drawer>
    </>
  )
}

export default PostId
