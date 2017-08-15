import faker from 'faker'
import _ from 'lodash'

let MockVideoList = ({num}) => {
    return new _.times(num, (i) => {
        return {
            id:faker.random.number(),
            index:i,
            key:i,
            title: faker.random.words(),
            hits: faker.random.number(),
            image: faker.random.image(),
            desc: faker.name.jobDescriptor()
        }
    })
}

export  { MockVideoList }