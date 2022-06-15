
interface IAttribute {
    trait_type: string,
    value: string
}

export const getValueFromTrait = (attributes: IAttribute[], traitType: string) => {
    const attribute: IAttribute[] = attributes.filter(attr => attr.trait_type === traitType)
    return attribute[0].value
}
