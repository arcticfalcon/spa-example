import React from 'react'
import { extendObservable, observable, action, computed, useStrict, toJS } from 'mobx'
import { Form as SForm, Button, Icon } from 'semantic-ui-react'

import store from 'store'

import {links, formatters as F, inputs as I} from 'convection'
import {Layout, Form, DataBrowser} from 'convection'
const {ReadLink} = links
import {ViewModel, ModelValidation, WithModel} from 'convection'
import {sanitize, initSanitizers, sanitizers} from 'convection'
import {Filter} from 'convection'

import { Length } from 'class-validator'

useStrict(true)

class Name {
  @observable first
  @observable last

  static fromJSON({ first, last }) {
    const name = new Name()
    name.first = first
    name.last = last
    return name
  }
}

class PersonService {
  static fetch(id) {
    const response = {
      data: { name: { first: 'john', last: 'flem' }, status: 'asd', notes: id },
    }

    return new Promise(resolve => setTimeout(() => resolve(response), 2000))
  }

  static post(model) {
    return new Promise(resolve => setTimeout(() => {
      const persons = store.get('persons') || []
      persons.push(model)
      store.set('persons', persons)
      resolve(model)
    }, 2000))
  }
}

class Person extends ModelValidation {
  @observable name = {}

  @observable status = ''

  @sanitize(sanitizers.alpha)
  @Length(10, 20)
  @observable
  notes = ''

  constructor() {
    super()
    initSanitizers(this)
  }

  @computed
  get full() {
    return `${this.name.first || ''} ${this.name.last || ''} ${this.status || ''}`
  }
}

export const PERSON_RESOURCE = 'persons'

export const Edit = props => {
  const viewModel = new ViewModel(
    new Person(),
    params => PersonService.fetch(params.id),
    PersonService.post
  )

  return (
    <Layout title="Person" actions={[<Button primary content={'Yeah'} />]}>
      <Form viewModel={viewModel} submit={viewModel.submit} autoComplete="off">
        <WithModel as={SForm.Group} widths="equal">
          <I.Text path="name.first" required />
          <I.Text path="name.last" />
        </WithModel>
        <I.Text path="id" required />
        <I.Text path="status" required />
        <I.Text path="notes" dynamicProps={model => ({ disabled: !model.status })} />
        <I.Submit />
      </Form>
    </Layout>
  )
}



const FilterForm = ({ model }) => (
  <Form viewModel={model} submit={model.submit} autoComplete="off">
    <I.Text path="name" />
    <I.Text path="status" />
    <I.Text path="notes" />
    <I.Submit />
    <I.Submit onClick={model.reset} content={'Reset'} />
  </Form>
)

export const Browse = () => {
  const filterModel = new Filter((p, a, b) => {
    return new Promise(resolve => {
      setTimeout(
        () => {
          resolve({
            data: store.get('persons') || [],
          })},
        1000
      )
    })
  })

  return (
    <Layout title="Persons">
      <DataBrowser filterModel={filterModel} filters={<FilterForm model={filterModel} />}>
        <F.Text path="name.first" />
        <F.Text path="name.last" />
        <WithModel
          render={model => {
            return (
              <ReadLink resourceName={PERSON_RESOURCE} id={model.id}>
                <Icon name="unhide" />
              </ReadLink>
            )
          }}
        />
      </DataBrowser>
    </Layout>
  )
}

export const BRAND_ACTION = 'brand_action'

export const brandActions = [
  {
    name: BRAND_ACTION,
    path: '/marcas/accion',
    component: Edit,
  },
]
