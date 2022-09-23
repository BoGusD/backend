// @ts-check

const Koa = require('koa');

const Pug = require('koa-pug');

const websockify = require('koa-websocket');
const route = require('koa-route');

const path = require('path');

const mongoClient = require('./public/mongo');

const _client = mongoClient.connect();

const serve = require('koa-static');
const mount = require('koa-mount');

const app = websockify(new Koa());
const PORT = 4500;

app.use(mount('/public', serve('public')));

const pug = new Pug({
  viewPath: path.resolve(__dirname, './views'),
  app,
});

app.ws.use(
  route.all('/chat', async (ctx) => {
    const { server } = app.ws;
    const client = await _client;
    const cursor = client.db('bogus').collection('chats');
    const chats = cursor.find(
      {},
      {
        sort: {
          createdAt: 1,
        },
      }
    );
    const chatsData = await chats.toArray();

    ctx.websocket.send(
      JSON.stringify({
        type: 'sync',
        data: {
          chatsData,
        },
      })
    );

    server.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          type: 'chat',
          data: {
            name: '서버',
            msg: `새로운 유저가 참여 했습니다. 현재 유저 수 ${server.clients.size}`,
            bg: 'bg-danger',
            text: 'text-white',
          },
        })
      );
    });

    ctx.websocket.on('message', async (message) => {
      const chat = JSON.parse(message);

      const insertClient = await _client;
      const chatCursor = insertClient.db('bogus').collection('chats');
      await chatCursor.insertOne({
        name: chat.name,
        msg: chat.msg,
        bg: chat.bg,
        text: chat.text,
        // ..chat << 전개 연산자를 사용해도 됨
        createdAt: new Date(),
      });

      server.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            type: 'chat',
            data: {
              ...chat,
            },
          })
        );
      });
    });

    ctx.websocket.on('close', () => {
      server.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            type: 'chat',
            data: {
              name: '서버',
              msg: `새로운 유저가 나갔습니다. 현재 유저 수 ${server.clients.size}`,
              bg: 'bg-darkness',
              text: 'text-white',
            },
          })
        );
      });
    });
  })
);
app.use(async (ctx, next) => {
  await ctx.render('chat');
});

app.listen(PORT, () => {
  console.log(`서버는 ${PORT}에서 작동중입니다.`);
});
