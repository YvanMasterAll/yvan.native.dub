import faker from 'faker'
import _ from 'lodash'

let MockVideoList = new _.times(28, (i) => {
    return {
        id:i,
        index:i,
        key:i,
        title: faker.date.future(),
        hits: faker.random.number()
    }
})

export  { MockVideoList }