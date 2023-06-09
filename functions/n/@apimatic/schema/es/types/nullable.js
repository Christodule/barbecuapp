/**
 * Creates a nullable schema.
 *
 * The nullable schema allows null values or the values allowed by the given
 * 'schema'.
 */
function nullable(schema) {
  return {
    type: function () {
      return "Nullable<" + schema.type() + ">";
    },
    validateBeforeMap: function (value, ctxt) {
      return value === null ? [] : schema.validateBeforeMap(value, ctxt);
    },
    validateBeforeUnmap: function (value, ctxt) {
      return value === null ? [] : schema.validateBeforeUnmap(value, ctxt);
    },
    map: function (value, ctxt) {
      return value === null ? null : schema.map(value, ctxt);
    },
    unmap: function (value, ctxt) {
      return value === null ? null : schema.unmap(value, ctxt);
    },
    validateBeforeMapXml: function (value, ctxt) {
      return value === null ? [] : schema.validateBeforeMapXml(value, ctxt);
    },
    mapXml: function (value, ctxt) {
      return value === null ? null : schema.mapXml(value, ctxt);
    },
    unmapXml: function (value, ctxt) {
      return value === null ? null : schema.unmapXml(value, ctxt);
    }
  };
}

export { nullable };