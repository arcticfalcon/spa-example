import React, { Component } from 'react'
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react'
import { NavLink, Route } from 'react-router-dom'
import { links, injectRouteStore } from 'convection'
const {BrowseLink, AddLink} = links
import { PERSON_RESOURCE } from 'Persons'

export default class MenuBar extends Component {
  render() {
    return (
      <Menu vertical pointing>
        <Menu.Item>
          <Input placeholder="Search..." />
        </Menu.Item>

        <BrowseLink resourceName={PERSON_RESOURCE}>
          <Menu.Item>List persons</Menu.Item>
        </BrowseLink>

        <AddLink resourceName={PERSON_RESOURCE}>
          <Menu.Item>Add Person</Menu.Item>
        </AddLink>
        <More />
      </Menu>
    )
  }
}


const More = injectRouteStore(({ routeStore }) => (
  <Dropdown item text="More">
    <Dropdown.Menu>
      <Dropdown.Item icon="edit" text="Edit Profile" />
      <Dropdown.Item icon="globe" text="Choose Language" />
      <Dropdown.Item icon="settings" text="Account Settings" />
    </Dropdown.Menu>
  </Dropdown>
))
