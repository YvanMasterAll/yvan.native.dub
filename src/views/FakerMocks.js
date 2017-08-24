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
    'http://link.hhtjim.com/baidu/100575177.mp3',
    'http://link.hhtjim.com/baidu/87967607.mp3',
    'http://link.hhtjim.com/baidu/267894474.mp3',
    'http://link.hhtjim.com/baidu/276867440.mp3'
]
const videos = [
    'http://115.231.144.61/5/i/k/f/u/ikfuigucfiuexlzsmrnwfswgyyrozz/hc.yinyuetai.com/CA3A015C0E08A156E3C86D7F0619E128.mp4?sc=79354dcd37128aa8&br=794&vid=2862632&aid=4539&area=US&vst=0&ptp=mv&rd=yinyuetai.com',
    'http://115.231.144.61/1/z/c/c/v/zccvudzipzkeattmxgmxecrjfhasuj/hc.yinyuetai.com/2EB5015D7A5B88A345D95473936CB92F.mp4?sc=14d68df8b8ea767a&br=707&vid=2919037&aid=154&area=HT&vst=2&ptp=mv&rd=yinyuetai.com',
    'http://115.231.144.61/10/l/r/b/g/lrbgbdwjskgnpzasfrsaqfeketxbtg/hc.yinyuetai.com/B083015DEFA85FCE16AD5D7B5A672324.mp4?sc=7f11289cd931a0cb&br=779&vid=3019051&aid=40376&area=KR&vst=0&ptp=mv&rd=yinyuetai.com',
    'http://115.231.144.61/9/f/e/y/k/feykpqmdztzqpnjxfrbofvutqbwiqg/hc.yinyuetai.com/BCE9015DEB6510FAA2DEB755866A9A82.mp4?sc=5671e8c619c7ddb5&br=781&vid=3018338&aid=448&area=US&vst=0&ptp=mv&rd=yinyuetai.com',
]
const titles = [
    'wild one',
    '最长的电影',
    '棒子 MV',
    '欧美 MV'
]

let MockTopicVideoList = ({num}) => {
    return new _.times(num, (i) => {
        return {
            id:faker.random.number(),
            index:i,
            key:i,
            avatar: faker.image.avatar(),
            name: faker.internet.userName(),
            hits: faker.random.number(),
            thumbsup: faker.random.number(),
            comments: faker.random.number(),
            video: videos[i],
            music: musics[0],
            title: titles[i]
        }
    })
}

let MockTopicVideoCommentList = ({num}) => {
    return new _.times(num, (i) => {
        return {
            id:faker.random.number(),
            index:i,
            key:i,
            avatar: faker.image.avatar(),
            name: faker.internet.userName(),
            thumbsup: faker.random.number(),
            comment: faker.lorem.sentence()
        }
    })
}

export  { MockDubVideoList, MockTopicVideoList, MockTopicVideoCommentList }