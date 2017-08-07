import path from 'path';
/**
 * development || production
 */
const mode = 'development';
const name = 'your-app-name';
/**
 * Example for MongoDB:  mongodb://localhost:27017/{name}-{mode}
 */
export default {
  mode: mode,
  name: name,
  root: path.normalize(`${__dirname}/../..`),
  base: path.normalize(`${__dirname}/..`),
  client: `${path.normalize(`${__dirname}/../..`)}/client`,
  server: {
    ip: 'localhost',
    port: 8000
  },
  secret: `your_secret_key`,
  // Roles: if a user has multiple roles, will take the time of the greater role
  roles: [
    {
      role: 'user',
      time: 60, // minutes
    }, {
      role: 'admin',
      time: 'infinite'
    }
  ],
  redis: {
    sessions: {
      conn: {
        //host: '/tmp/redis.sock', //unix domain
        host: '127.0.0.1', //can be IP or hostname
        port: 6379,
        maxretries: 10, //reconnect retries, default 10
        //auth: '123', //optional password, if needed
        db: 0 //optional db selection
      },
      // If you want multiples logins or only one device in same time
      multiple: true,
      pubsub: {
        //// Enable events to expired,del...
        events: true
      }
    },
    // By default the port to listen the sockets is +1 of the port of the server.port
    // Example: server.port: 8000, then socket.port = 8001
    sockets: {
      conn: {
        host: '127.0.0.1',
        port: 6379
      }
    }
  },
  database: {
    mongo: {
      db: {
        // uri: mongodb://username:password@host:port/database?options
        uri: `mongodb://localhost:27017/${name}-${mode}`,
        options: {
          useMongoClient: false
        },
        // plant: once - alway - never
        seeds: [
          {
            path: '/seeds/user',
            plant: 'alway'
          }, {
            path: '/seeds/hello',
            plant: 'alway'
          }
        ]
      }
    }
  },
  path: {
    // paths 404
    disabled: '/:url(api|auth|assets|lib)/*'
  },
  email: {
    host: 'hostexample',
    secure: true,
    port: 465,
    auth: {
      user: 'example@gmail.com',
      pass: 'examplePassword'
    }
  },
  swagger: {
    enabled: true,
    info: {
      version: 'v1.0',
      title: name,
      description: `RESTful API ${name}`,
      "contact": {
        "name": "Developer",
        "url": "http://www.example.com",
        "email": "example@example.com"
      },
      "license": {
        "name": "MIT",
        "url": "https://github.com/kevoj/nodetomic-api/blob/master/LICENSE"
      }
    }
  },
  // session: defaultStore, mongoStore, redisStore
  // note: Required for Twitter oAuth
  session: 'defaultStore',
  oAuth: {
    local: {
      enabled: true
    },
    facebook: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/facebook/callback'
    },
    twitter: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/twitter/callback'
    },
    google: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/google/callback'
    },
    github: {
      enabled: true,
      clientID: '52be92c9a41f77a959eb',
      clientSecret: '76c9bb03c689d098506822fa80dba372a1fe29c8',
      callbackURL: '/auth/github/callback'
    },
    bitbucket: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/bitbucket/callback'
    }
  },
  // DEV
  livereload: { // livereload
    enabled: false,
    ip: 'localhost',
    port: 35729
  },
  log: true // Log request in console?
};
