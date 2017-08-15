import faker from 'faker'
import _ from 'lodash'

let MockDubVideoList = ({num}) => {
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

let MockTopicVideoList = new _.times(28, (i) => {
    return {
        id:i,
        index:i,
        key:i,
        avatar: faker.image.avatar(),
        name: faker.internet.userName(),
        title: faker.date.future(),
        hits: faker.random.number(),
        thumbsup: faker.random.number(),
        comments: faker.random.number(),
        video: faker.random.image()
    }
})

export  { MockDubVideoList, MockTopicVideoList }