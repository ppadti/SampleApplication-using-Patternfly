import '@patternfly/react-core/dist/styles/base.css'
import {
  Page,
  Masthead,
  MastheadToggle,
  MastheadMain,
  MastheadBrand,
  PageSidebar,
  PageSection,
  PageToggleButton,
  Card,
  NavList,
  Nav,
  NavItem,
} from '@patternfly/react-core'
import { Link, Route } from 'react-router-dom'
import BarsIcon from '@patternfly/react-icons/dist/esm/icons/bars-icon'
import React from 'react'
import Posts from './Components/Post/Posts'
import Album from './Components/Album'
import UserDetails from './Components/UserDetails'
import PostId from './Components/Post/PostId'
// import PostId from './Components/Post/PostId'
// import PostId from './Components/PostId'

function App() {
  const [isNavOpen, setIsNavOpen] = React.useState(false)

  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen)
  }

  const header = (
    <Masthead>
      <MastheadToggle>
        <PageToggleButton
          variant="plain"
          aria-label="Global navigation"
          isNavOpen={isNavOpen}
          onNavToggle={onNavToggle}
          id="centered-nav-toggle"
        >
          <BarsIcon />
        </PageToggleButton>
      </MastheadToggle>
      <MastheadMain>
        <MastheadBrand href="https://patternfly.org" target="_blank">
          Logo
        </MastheadBrand>
      </MastheadMain>
    </Masthead>
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
    <PageSidebar
      nav={Navigation}
      isNavOpen={isNavOpen}
      id="centered-section-sidebar"
    />
  )
  return (
    <>
      <Page header={header} sidebar={sidebar}>
        <PageSection isWidthLimited isCenterAligned>
          <Card>
            <Route exact path="/">
              <Posts />
            </Route>
            <Route exact path="/album">
              <Album />
            </Route>
            <Route exact path="/user">
              <UserDetails />
            </Route>
            <Route path="/postId/*">
              <PostId />
            </Route>
          </Card>
        </PageSection>
      </Page>
    </>
  )
}

export default App
