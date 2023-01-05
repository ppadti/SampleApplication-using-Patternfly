import {
  ActionGroup,
  Avatar,
  Button,
  Card,
  CardBody,
  CardTitle,
  DrawerActions,
  DrawerCloseButton,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  Flex,
  FlexItem,
  Form,
  FormGroup,
  Stack,
  StackItem,
  Text,
  TextArea,
  TextContent,
  TextInput,
  TextVariants,
  Truncate,
} from '@patternfly/react-core'
import axios from 'axios'

import React, { useEffect, useState } from 'react'

interface CommentSectionProps {
  postId: any
  onClose: (event: React.MouseEvent<HTMLDivElement>) => void
}

const avatarImg =
  'https://www.patternfly.org/v4/images/avatarImg.668560cdf25a4932ef9f711b4acad52d.svg'

export const CommentSection = ({ postId, onClose }: CommentSectionProps) => {
  const [commentData, setCommentData] = useState<
    { postId: number; id: number; name: string; email: string; body: string }[]
  >([])
  const [error, setError] = useState(null)
  const [showing, setShowing] = useState(false)
  const [comment, setComment] = useState('')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')

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
          postId: postId,
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

  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => {
        setCommentData(response.data)
      })

      .catch((error) => {
        console.error('Error in loading data', error)
        setError(error)
      })
  }, [postId])

  const count = commentData.length

  return (
    <DrawerPanelContent>
      <DrawerHead>
        <Stack>
          <StackItem>
            <TextContent>
              <Text component="h1">Comments ({count})</Text>
            </TextContent>
          </StackItem>
          <StackItem></StackItem>
        </Stack>
        <DrawerActions>
          <DrawerCloseButton onClick={onClose} />
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
            <Stack hasGutter>
              {commentData.map((comment) => (
                <>
                  <StackItem>
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
                  </StackItem>
                  <StackItem>{comment.body}</StackItem>
                </>
              ))}
              <Button variant="primary" onClick={handleCommentSection}>
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
                    <Button variant="primary" onClick={addComment}>
                      Add
                    </Button>
                  </ActionGroup>
                </Form>
              )}
            </Stack>
          </>
        )}
      </DrawerPanelBody>
    </DrawerPanelContent>
  )
}
