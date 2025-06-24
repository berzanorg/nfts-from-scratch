function createMetadataObject(props: {
  number: number
  name: string
  description: string
  image: `ipfs://${string}`
  attributes: Array<{
    trait_type: string
    value: string
  }>
}) {
  return {
    name: `${props.name} #${props.number}`,
    description: `${props.description}`,
    image: `${props.image}`,
    attributes: props.attributes,
  } as const
}

for (let i = 0; i < 33; i++) {
  const metadataObject = createMetadataObject({
    number: i,
    name: 'Keonehorse',
    description: 'The smartest yet humblest human horse.',
    image: 'ipfs://CID/keonehorse.jpeg',
    attributes: [
      { trait_type: 'Kind', value: 'Human horse' },
      { trait_type: 'Intelligence', value: 'Wonderful' },
      { trait_type: 'Humbleness', value: 'Amazing' },
    ],
  })

  await Bun.write(`out/${i}`, JSON.stringify(metadataObject), { createPath: true })
}
