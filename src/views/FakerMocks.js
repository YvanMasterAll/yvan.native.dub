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
    'http://m10.music.126.net/20170820181355/75d07c02074a3bb7ac5e39ecc5430ccc/ymusic/a8ed/2621/e9c7/ce01f3e558c66835faa14efcdd866e1b.mp3',
    'http://m10.music.126.net/20170816150654/7b4bbb27f32f8c022ff7cf1a6fed7fe4/ymusic/02b5/6817/46a1/06f51bc768cfe541c5a1f34b1f8a1161.mp3',
    'http://m10.music.126.net/20170816144135/44728cc9e29095838c333569f4cc5843/ymusic/b1ed/c729/9647/1ccd2c7540bdc6d0659dd4ecc3e0bcd4.mp3?&bitrate=320000',
    'http://m10.music.126.net/20170816144318/eee2c75b34fb7b25da3e2aa931aaffbe/ymusic/b277/081a/dcb1/20454020684106e853b46589fbe98f51.mp3?&bitrate=320000'
]
const videos = [
    'http://v4.music.126.net/20170821000334/b4f404e387f36cf19ee019b00d9f9b68/web/cloudmusic/ICAhIDUgMCJgJTEwIWA4JA==/mv/5477119/4db60173f972fdd3d17ab12dfea644db.mp4',
    'http://v4.music.126.net/20170820005748/f163b7434364c2d4d86364a06b8b15b2/web/cloudmusic/MCEhICA4MDMiITExICAwJA==/mv/507196/40c22eefda69c792a05638c4fc30ca2d.mp4',
    'http://v4.music.126.net/20170820005810/188e2dc87237eb13b16a898431c1248e/web/cloudmusic/IDEhMiA0MyAwMCAhMDYiMQ==/mv/347005/ce394df901a26e5ac5ad072ae3800ca8.mp4',
    'http://v4.music.126.net/20170820010003/6f3f1e65062caf76dccb7832bda743da/web/cloudmusic/ICBgIDAwMCAwJCEgNSJiIA==/mv/84829/56782051677738abdf1e7bafab0d89ee.mp4'
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