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
  Drawer,
  DrawerContent,
  Flex,
  FlexItem,
  PageSectionVariants,
} from '@patternfly/react-core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CommentSection } from '../Post/CommentSection'

const SinglePost = () => {
  const location = useLocation()
  const postId: any = location.state
  const [postData, setPostData] = useState<{ [key: string]: any }>({})

  const [postError, setPostError] = useState(null)
  const [userError, setUserError] = useState(null)
  const [userData, setUserData] = useState<{ [key: string]: any }>({})
  const [isExpanded, setIsExpanded] = React.useState(false)

  useEffect(() => {
    axios(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        setPostData(response.data)
      })

      .catch((error) => {
        console.error('Error in loading data', error)
        setPostError(error)
      })
  }, [postId])

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

  const onClick = () => {
    setIsExpanded(!isExpanded)
  }

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
                Read Comments
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
        <DrawerContent
          panelContent={
            <CommentSection
              onClose={(): void => setIsExpanded(false)}
              postId={postId}
            />
          }
        >
          {pageContent}
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SinglePost
