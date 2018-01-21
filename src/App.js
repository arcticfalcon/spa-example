import React from 'react'

import {Admin} from 'convection'
import { Resource } from 'convection'
import DevTools from 'mobx-react-devtools'
import { NavLink, Route, Switch } from 'react-router-dom'

import Menu from 'Menu'
import { PERSON_RESOURCE, Edit, Browse } from 'Persons'



const App = () => (
  <Admin menu={<Menu />}>
    <Resource path="/persons" name={PERSON_RESOURCE} add={Edit} browse={Browse} read={Edit} />
    <DevTools />
  </Admin>
)

export default App

/*
browse
read
edit
add
delete

 <Admin menu={menu} [client={defaultClient}]>
 <Resource [path='/marcas'] name={BRAND_RESOURCE} list={BrandList} show={BrandShow} ... actions={brandActions} [service={}]/>

 <Action path='/accion' name={SOME_ACTION} component={}/>
 </Admin>

 Links:
 <R.ShowLink to={BRAND_RESOURCE} {...props}/>
 <R.ListLink to={BRAND_RESOURCE} {...props}/>
 <R.ActionLink to={BRAND_ACTION} {...props}/>


 */
