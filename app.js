const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var multer = require('multer')
var fs = require('fs')
// 5초마다 보내기위해 추가
const schedule = require('node-schedule');
const { send } = require('process')


//이미지 파일 저장할때 쓰는 코드
var storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './images/');
    },
    filename(req, file, callback) {
        callback(null, `${file.originalname}.jpg`);
    },
});
var storage2 = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './finger/');
    },
    filename(req, file, callback) {
        callback(null, `${file.originalname}.jpg`);
    },
});

const upload = multer({ storage: storage });
const finger = multer({ storage: storage2 });


app.use(express.json())

app.set('view engine', 'ejs')

//본인인증 데이터 전송 (지문사진 + 유저아이디 + 선택) 
app.post('/api/upload', upload.array('photo', 10), (req, res) => {
    console.log('file', req.files);
    console.log('body', req.body);
    const data = req.body
    console.log('InFo Id : ' + data.UserID)
    console.log('Select : ' + data.Select)
    res.status(200).json({
        what: 'noID',
    });

});

//폼데이터 받기
app.post('/api/addinfo', finger.array('photo', 10), (req, res) => {
    console.log('file', req.files);
    console.log(req.body)
    const data = req.body
    res.status(200).json({
        message: 'success!',
    });
    // res.send(res.json())
})

// //회원가입 데이터 보내기
// app.get('/api/send/signup', function (req, res, next) {
//     const json = {
//         signup: 'complete'
//     }
//     console.log('signup : ' + json.signup)
//     res.send(json)
// })

//로그인 데이터 보내기
app.get('/api/queryauth/Info1', function (req, res, next) {
    const json = {
        adultauth: 'student'
        //adultauth: 'noneId'
        //adultauth: 'unmatches'
    }
    console.log('adultauth : ' + json.adultauth)
    res.send(json)
})

// app.get(('/api/send/adult', schedule.scheduleJob('5 * * * *', function (req, res, next) {
//     const json = {
//         //adultauth: 'student'
//         adultauth: 'adult'
//         //adultauth: 'unmatches'
//     }
//     console.log('adultauth : ' + json.adultauth)
//     res.send(json)
// })))



const PORT = 8080
app.listen(PORT, function () {
    console.log('Server is ready at ' + PORT)
})