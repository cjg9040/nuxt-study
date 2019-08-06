const {Nuxt, Builder} = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()

// req.body에 접근하기 위한 Body parser
app.use(bodyParser.json())

// req.session을 만들기 위한 session
app.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000}
}))

// POST /api/login 로 로그인하여 req.session.authUser에 추가.
app.post('/api/login', function (req, res) {
    if (req.body.username === 'demo' && req.body.password === 'demo') {
        req.session.authUser = {username: 'demo'}
        return res.json({username: 'demo'})
    }
    res.status(401).json({error: 'Bad credentials'})
})

// POST /api/logout 로 로그아웃하여 req.session.authUser에서 제거.
app.post('/api/logout', function (req, res) {
    delete req.session.authUser
    res.json({ok: true})
})

// 옵션으로 Nuxt.js를 인스턴스화 합니다.
const isProd = process.env.NODE_ENV === 'production'
const nuxt = new Nuxt({dev: !isProd})
// 프로덕션 환경에서 빌드되지 않음.
if (!isProd) {
    const builder = new Builder(nuxt)
    builder.build()
}
app.use(nuxt.render)
app.listen(3000)
    .then(() => {
        console.log('Server is listening on http://localhost:3000')
    })
