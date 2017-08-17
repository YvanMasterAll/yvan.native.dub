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

const musics = [
    'http://m10.music.126.net/20170816172654/e98c15fbd2b6f36a2d0ec01ba465dbb0/ymusic/8407/89ce/0a0c/a58186d9efbaeaafcec93f1a2656fc03.mp3',
    'http://m10.music.126.net/20170816150654/7b4bbb27f32f8c022ff7cf1a6fed7fe4/ymusic/02b5/6817/46a1/06f51bc768cfe541c5a1f34b1f8a1161.mp3',
    'http://m10.music.126.net/20170816144135/44728cc9e29095838c333569f4cc5843/ymusic/b1ed/c729/9647/1ccd2c7540bdc6d0659dd4ecc3e0bcd4.mp3?&bitrate=320000',
    'http://m10.music.126.net/20170816144318/eee2c75b34fb7b25da3e2aa931aaffbe/ymusic/b277/081a/dcb1/20454020684106e853b46589fbe98f51.mp3?&bitrate=320000'
]
const videos = [
    'http://v4.music.126.net/20170818093741/f9581fe48006c2d689b130ce419437c3/web/cloudmusic/ICAgMCYgMiIgIDYgMTBhNA==/mv/5621379/4fff8db29a83dad5cff2d8a9d6d52837.mp4',
    'http://v4.music.126.net/20170818093741/f9581fe48006c2d689b130ce419437c3/web/cloudmusic/ICAgMCYgMiIgIDYgMTBhNA==/mv/5621379/4fff8db29a83dad5cff2d8a9d6d52837.mp4',
    'http://v4.music.126.net/20170818093741/f9581fe48006c2d689b130ce419437c3/web/cloudmusic/ICAgMCYgMiIgIDYgMTBhNA==/mv/5621379/4fff8db29a83dad5cff2d8a9d6d52837.mp4',
    'http://v4.music.126.net/20170818093741/f9581fe48006c2d689b130ce419437c3/web/cloudmusic/ICAgMCYgMiIgIDYgMTBhNA==/mv/5621379/4fff8db29a83dad5cff2d8a9d6d52837.mp4'
]
let MockTopicVideoList = ({num}) => {
    return new _.times(num, (i) => {
        return {
            id:faker.random.number(),
            index:i,
            key:i,
            avatar: faker.image.avatar(),
            name: faker.internet.userName(),
            title: faker.date.future(),
            hits: faker.random.number(),
            thumbsup: faker.random.number(),
            comments: faker.random.number(),
            video: videos[i],
            music: musics[0]
        }
    })
}

export  { MockDubVideoList, MockTopicVideoList }