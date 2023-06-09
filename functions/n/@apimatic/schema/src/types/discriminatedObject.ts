import { Schema, SchemaMappedType, SchemaType } from '../schema';
import { objectEntries } from '../utils';
import { ObjectXmlOptions } from './object';

export function discriminatedObject<
  TSchema extends Schema<any, any>,
  TDiscrimProp extends keyof SchemaType<TSchema>,
  TDiscrimMappedProp extends keyof SchemaMappedType<TSchema>,
  TDiscrimMap extends Record<string, TSchema>
>(
  discriminatorMappedPropName: TDiscrimMappedProp,
  discriminatorPropName: TDiscrimProp,
  discriminatorMap: TDiscrimMap,
  defaultDiscriminator: keyof TDiscrimMap,
  xmlOptions?: ObjectXmlOptions
): Schema<any, any> {
  const schemaSelector = (
    value: unknown,
    discriminatorProp: string | TDiscrimProp | TDiscrimMappedProp,
    isAttr: boolean = false
  ) => {
    if (
      typeof value === 'object' &&
      value !== null &&
      ((isAttr && xmlObjectHasAttribute(value, discriminatorProp as string)) ||
        (!isAttr && (discriminatorProp as string) in value))
    ) {
      const discriminatorValue = isAttr
        ? (value as { $: Record<string, unknown> }).$[
            discriminatorProp as string
          ]
        : (value as Record<typeof discriminatorProp, unknown>)[
            discriminatorProp
          ];
      if (
        typeof discriminatorValue === 'string' &&
        discriminatorValue in discriminatorMap
      ) {
        return discriminatorMap[discriminatorValue];
      }
    }
    return discriminatorMap[defaultDiscriminator];
  };
  return {
    type: () =>
      `DiscriminatedUnion<${discriminatorPropName},[${objectEntries(
        discriminatorMap
      )
        .map(([_, v]) => v.type)
        .join(',')}]>`,
    map: (value, ctxt) =>
      schemaSelector(value, discriminatorPropName).map(value, ctxt),
    unmap: (value, ctxt) =>
      schemaSelector(value, discriminatorMappedPropName).unmap(value, ctxt),
    validateBeforeMap: (value, ctxt) =>
      schemaSelector(value, discriminatorPropName).validateBeforeMap(
        value,
        ctxt
      ),
    validateBeforeUnmap: (value, ctxt) =>
      schemaSelector(value, discriminatorMappedPropName).validateBeforeUnmap(
        value,
        ctxt
      ),
    mapXml: (value, ctxt) =>
      schemaSelector(
        value,
        xmlOptions?.xmlName ?? discriminatorPropName,
        xmlOptions?.isAttr
      ).mapXml(value, ctxt),
    unmapXml: (value, ctxt) =>
      schemaSelector(value, discriminatorMappedPropName).unmapXml(value, ctxt),
    validateBeforeMapXml: (value, ctxt) =>
      schemaSelector(
        value,
        xmlOptions?.xmlName ?? discriminatorPropName,
        xmlOptions?.isAttr
      ).validateBeforeMapXml(value, ctxt),
  };
}

function xmlObjectHasAttribute(value: object, prop: string): boolean {
  return (
    '$' in value &&
    typeof (value as { $: unknown }).$ === 'object' &&
    (prop as string) in (value as { $: Record<string, unknown> }).$
  );
}
