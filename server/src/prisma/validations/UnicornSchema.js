import Schema from "./Schema.js";

class UnicornSchema extends Schema {
  static get yupSchema() {
    return this.yup
      .object()
      .noUnknown()
      .shape({
        name: this.yup.string().max(255).required(),
        age: this.yup.number().integer().positive().required(),
        magicalAbility: this.yup.string(),
      });
  }
}

export default UnicornSchema;
