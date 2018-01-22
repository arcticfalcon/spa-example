import React from "react";
import {observable, computed} from "mobx";
import {ModelValidation, sanitize, initSanitizers, sanitizers} from "convection";
import {Length} from "class-validator";

// class Name {
//   @observable first
//   @observable last
//
//   static fromJSON({ first, last }) {
//     const name = new Name()
//     name.first = first
//     name.last = last
//     return name
//   }
// }


export default class Person extends ModelValidation {
  @observable name = {}
  @observable id

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
