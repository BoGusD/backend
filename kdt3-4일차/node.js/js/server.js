// @ts-check

const http = require('http');
const { routes } = require('./route');

const server = http.createServer((req, res) => {
  const urlArr = req.url ? req.url.split('/') : [];

  let id;

  console.log(urlArr);

  if (urlArr.length > 2) {
    id = parseInt(urlArr[2], 10);
  } else {
    id = undefined;
  }

  async function main() {
    const route = routes.find(
      (_route) =>
        req.url &&
        req.method &&
        req.url.search(_route.url) !== -1 &&
        _route.method === req.method &&
        typeof id === _route.id
    );
    res.setHeader('Content-Type', 'application/json; utf=8')

    if (!route) {
      console.log('해당 API를 찾을 수 없습니다.');

      res.statusCode = 404;
      res.end('Not found');
    } else {
      let newPost;

      if (req.method === 'POST' || req.method === 'PUT') {
        newPost = await new Promise((resolve, reject) => {
          req.setEncoding('utf-8');
          req.on('data', (data) => {
            if (data !== undefined) {
              resolve(JSON.parse(data));
            } else {
              reject();
            }
          });
        });
      }
      const result = await route.callback(id, newPost);
      console.log(result);

      res.statusCode = result.statusCode;
      res.end(JSON.stringify(result.body));
    }
  }

  main();

  /**
   * GET  /posts         목록 가져오기
   * GET  /posts/:id     특정 글 내용 가져오기
   * POST /posts         새로운 글 올리기
   * PUT  /posts/:id     특정 글 내용 수정하기
   * DELETE /posts/:id   특정 글 삭제하기
   */
  // if (req.url === '/posts' && req.method === 'GET') {
  //   const result = {
  //     posts: posts.map((post) => ({
  //       id: post.id,
  //       title: post.title,
  //     })),
  //     totalCount: posts.length,
  //   };

  //   res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //   res.statusCode = 200;
  //   res.end(JSON.stringify(result));
  // } else if (id !== -1 && req.method === 'GET') {
  //   const result = posts.find((post) => post.id === id);

  //   res.setHeader('Content-Type', 'application/json; charset=utf-8');

  //   if (result) {
  //     console.log('블로그의 특정 id를 가지는 글의 내용을 보여주는 api 입니다');

  //     res.statusCode = 200;
  //     res.end(JSON.stringify(result));
  //   } else {
  //     console.log('해당 id를 가지는 포스트를 찾을 수 없었습니다.');

  //     res.statusCode = 404;
  //     res.end('해당 id를 가지는 포스트를 찾을 수 없었습니다.');
  //   }
  // } else if (req.url === '/posts' && req.method === 'POST') {
  //   req.setEncoding('utf-8');
  //   req.on('data', (data) => {
  //     const newPost = JSON.parse(data);
  //     posts.push({
  //       id: posts[posts.length - 1].id + 1,
  //       title: newPost.title,
  //       content: newPost.content,
  //     });
  //   });

  //   res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //   res.statusCode = 200;
  //   res.end('새로운 글이 등록 되었습니다.');

  //   console.log('블로그의 새로운 글을 등록하는 api 입니다');
  // } else if (id !== -1 && req.method === 'PUT') {
  //   req.setEncoding('utf-8');
  //   req.on('data', (data) => {
  //     const modifyPost = JSON.parse(data);
  //     modifyPost.id = id;
  //     posts[id - 1] = modifyPost;
  //   });

  //   res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //   res.statusCode = 200;
  //   res.end(`수정 된 포스트의 id 번호는 ${id} 입니다.`);

  //   console.log('블로그의 특정 글을 수정하는 api 입니다');
  // } else if (id !== -1 && req.method === 'DELETE') {
  //   posts.splice(id - 1, 1);

  //   res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //   res.statusCode = 200;
  //   res.end(`id 번호가 ${id}인 포스트를 삭제 하였습니다.`);

  //   console.log('블로그의 특정 글을 삭제하는 api 입니다.');
  // } else {
  //   res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //   res.statusCode = 404;
  //   res.end('해당 api 는 존재하지 않습니다.');

  //   console.log('해당 api 는 존재하지 않습니다.');
  // }
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`해당 서버는 ${PORT}번 포트에서 작동 중입니다.`);
});