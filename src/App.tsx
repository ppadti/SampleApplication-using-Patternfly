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
  PageSectionVariants,
  PageHeader,
} from '@patternfly/react-core'
import { Link, Route } from 'react-router-dom'
import BarsIcon from '@patternfly/react-icons/dist/esm/icons/bars-icon'
import React from 'react'
import Posts from './Components/Post/Posts'
import Album from './Components/Albums/Album'
import UserDetails from './Components/UserDetails'
import PostId from './Components/Post/PostId'
import Photo from './Components/Albums/Photo'
import SinglePhoto from './Components/Albums/SinglePhoto'
// import PostId from './Components/Post/PostId'
// import PostId from './Components/PostId'

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
        <PageSection isCenterAligned variant={PageSectionVariants.light}>
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
        </PageSection>
      </Page>
    </>
  )
}

export default App
