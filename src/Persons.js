import React from "react";
import {Form as SForm, Button, Icon} from "semantic-ui-react";
import store from "store";
import {links, formatters as F, inputs as I, Layout, Form, DataBrowser, ViewModel, WithModel, Filter} from "convection";
import PersonService from "./PersonService";
import Person from "./Person";
const {ReadLink} = links


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

// export const BRAND_ACTION = 'brand_action'
//
// export const brandActions = [
//   {
//     name: BRAND_ACTION,
//     path: '/marcas/accion',
//     component: Edit,
//   },
// ]
