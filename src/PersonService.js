import React from "react";
import store from "store";


export default class PersonService {
  static fetch(id) {
    const persons = store.get('persons') || []

    const response = {
      data: persons.filter(person => person.id === id),
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
