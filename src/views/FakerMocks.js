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
    'http://v4.music.126.net/20170819060841/0ec34b84a086f598d145c4233485c2a9/web/cloudmusic/ICAhIDUgMCJgJTEwIWA4JA==/mv/5477119/8169bf1aeae811bbc335befac4622abd.mp4',
    'http://v4.music.126.net/20170819060908/450d916d682d7d429a8b0bc433650c47/web/cloudmusic/JDFkYDAwMSAwNiAgMCIjNg==/mv/5280039/4b9c22fd5bfb65d1a2acebbf5ca5834c.mp4',
    'http://v4.music.126.net/20170819060942/1cab3158c4ca0925fa00cc53fadf9afb/web/cloudmusic/IDEhMiA0MyAwMCAhMDYiMQ==/mv/347005/ce394df901a26e5ac5ad072ae3800ca8.mp4',
    'http://v4.music.126.net/20170819061029/364340d314a1ced6bd4a9d114b8c545a/web/cloudmusic/ISQkIDgwYSEiIDEwYjBiIg==/mv/28118/8885891be441d1d29c58af5ffe001f69.mp4'
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