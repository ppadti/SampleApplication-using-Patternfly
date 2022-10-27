import '@patternfly/react-core/dist/styles/base.css'
import {
  Page,
  PageSidebar,
  NavList,
  Nav,
  NavItem,
  PageHeader,
} from '@patternfly/react-core'
import { Link, Route } from 'react-router-dom'

import React from 'react'
import Posts from './Components/Post/Posts'
import Album from './Components/Albums/Album'
import UserDetails from './Components/UserDetails'
import PostId from './Components/Post/SinglePost'
import Photo from './Components/Albums/Photo'
import SinglePhoto from './Components/Albums/SinglePhoto'

function App() {
  const [isNavOpen, setIsNavOpen] = React.useState(false)

  const onNavToggle = (): void => {
    setIsNavOpen(!isNavOpen)
  }

  const header = (
    <PageHeader
      showNavToggle
      isNavOpen={isNavOpen}
      onNavToggle={onNavToggle}
      aria-label={'global_navigation'}
    />
  )

  const Navigation = (
    <Nav
      id="nav-primary-simple"
      role="navigation"
      theme="dark"
      aria-label={'global'}
    >
      <NavList id="nav-list-simple">
        <NavItem id={'connectors'} ouiaId="smart-events">
          <Link to="/">Post</Link>
        </NavItem>
      </NavList>
      <NavList id="nav-list-simple">
        <NavItem id={'connectors'} ouiaId="smart-events">
          <Link to="/album">Albums</Link>
        </NavItem>
      </NavList>
      <NavList id="nav-list-simple">
        <NavItem id={'connectors'} ouiaId="smart-events">
          <Link to="/user">User Details</Link>
        </NavItem>
      </NavList>
    </Nav>
  )

  const sidebar = (
    <PageSidebar nav={Navigation} isNavOpen={isNavOpen} id="vertical-sidebar" />
  )
  return (
    <>
      <Page header={header} sidebar={sidebar} role="main">
        <Route exact path="/">
          <Posts />
        </Route>
        <Route exact path="/album">
          <Album />
        </Route>
        <Route exact path="/user">
          <UserDetails />
        </Route>
        <Route exact path="/post/*">
          <PostId />
        </Route>
        <Route exact path="/album/*/photos">
          <Photo />
        </Route>
        <Route exact path="/album/*/photos/*">
          <SinglePhoto />
        </Route>
      </Page>
    </>
  )
}

export default App
