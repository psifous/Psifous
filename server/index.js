const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const next = require('next')


const PORT = process.env.port || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(()=>{
    const server = express()
    const indexRouter = require('./routes/index')
    const userRouter = require('./routes/users')
    const candidateRouter = require('./routes/candidates')
    const electionRouter = require('./routes/elections')
    const communityRouter = require('./routes/communities')
    const conjunctionRouter = require('./routes/conjunction')
    const adminRouter = require('./routes/admins')
    const loginRouter = require('./routes/login')


    server.use(cors())
    server.use(logger('dev'));
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
 
    server.use('/api',indexRouter)

    server.use('/api/users',userRouter)
    server.use('/api/candidates', candidateRouter)
    server.use('/api/elections' , electionRouter)
    server.use('/api/communities' , communityRouter)
    server.use('/api/conjunctions' , conjunctionRouter)
    server.use('/api/admins', adminRouter)
    server.use('/api/login', loginRouter)
    


    server.get('*',(req, res)=>{
      return handle(req, res);
    });

    server.listen(PORT,(err) =>{
      if(err) throw err;
      console.log(`> ready on port ${PORT}`);
    })
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1)
  })