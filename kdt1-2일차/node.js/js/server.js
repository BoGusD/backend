// @ts-check

const http = require('http');

const posts = [
    {
        id: 1,
        title: '첫번째 글',
        content: '첫번째 내용입니다.',
    },
    {
        id: 2,
        title: '두번째 글',
        content: '두번째 내용입니다.',
    },
];


const server = http.createServer((req, res) => {
    console.log('@@@@', req.url);

const urlArr = req.url ? req.url.split('/') : [];  
  let id = '-1';
if (urlArr.length > 2){
    [ , , id] = urlArr; //구조 할당을 해주기 위한 부분
    id = urlArr[2];
  }  

  console.log(urlArr);

    /**
     * GET /posts           목록 가져오기
     * GET /posts/:id       특정 글 내용 가져오기
     * POST /posts          새로운 글 올리기
     * PUT /posts/:id       특정 글 내용 수정하기
     * DELETE /posts/:id    특정 글 삭제하기
     */

    if (req.url === '/posts' && req.method === 'GET') {
        const result = {
            posts: posts.map((post) =>({
                id: post.id,
                title: post.title
            })),
            totalCount: posts.length,
        };
        //json형태로 변환하기 위한 부분
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.statusCode = 200;
        res.end(JSON.stringify(result));
        console.log('블로그의 글 목록을 가져오는 API 입니다');
    } else if (urlArr[1] === 'posts' && req.method === 'GET') {
        res.statusCode = 200;
        console.log('블로그의 특정 글 내용을 보여주는 API 입니다');
    } else if (req.url === '/post' && req.method === 'POST') {
        res.statusCode = 200;
        console.log('블로그의 새로운 글을 올리는 API 입니다');
    } else if (urlArr[1] === 'posts' && req.method === 'PUT') {
        res.statusCode = 200;
        console.log('블로그의 특정 글을 수정하는 API 입니다');
    }
    else if (urlArr[1] === 'posts' && req.method === 'DELETE') {
        res.statusCode = 200;
        console.log('블로그의 특정 글을 삭제하는 API 입니다');
    } else {
        req.statusCode = 400;
        res.end('Not Found');
        console.log('해당 API를 찾을 수 없습니다.');
    }
});
  
const PORT = 4000;
server.listen(PORT, () => {
   
 console.log(`해당 서버는 ${PORT}에서 작동 중입니다.`);
});

