// @ts-check

// // @ts-check

// const http = require('http');
// const { routes } = require('./route');

// const server = http.createServer((req, res) => {
//   const urlArr = req.url ? req.url.split('/') : [];

//   let id;

//   console.log(urlArr);

//   if (urlArr.length > 2) {
//     id = parseInt(urlArr[2], 10);
//   } else {
//     id = undefined;
//   }

//   async function main() {
//     const route = routes.find(
//       (_route) =>
//         req.url &&
//         req.method &&
//         req.url.search(_route.url) !== -1 &&
//         _route.method === req.method &&
//         typeof id === _route.id
//     );

//     if (!route) {
//       console.log('해당 API를 찾을 수 없습니다.');

//       res.statusCode = 404;
//       res.end('Not found');
//     } else {
//       let newPost;

//       if (req.method === 'POST') {
//         newPost = await new Promise((resolve, reject) => {
//           req.setEncoding('utf-8');
//           req.on('data', (data) => {
//             if (data !== undefined) {
//               resolve(JSON.parse(data));
//             } else {
//               reject();
//             }
//           });
//         });
//       }

//       const result = await route.callback(id, newPost);
//       console.log(result);

//       res.statusCode = result.statusCode;
//       res.end(JSON.stringify(result.body));
//     }
//   }

//   main();



// //         promise
// //         .then((data) => {
// //             newPost =JSON.parse(data);
            
// //         const result = route.callback(id, newPost);

// //         console.log(result.body);

// //         req.statusCode= result.statusCode;
// //         res.end(JSON.stringify(result.body));
// //         }).catch(( )=> {
// //             res.statusCode = 404,
// //             res.end("there's no data");
// //         })
// //     }
// //   }


//     /**
//      * GET /posts           목록 가져오기
//      * GET /posts/:id       특정 글 내용 가져오기
//      * POST /posts          새로운 글 올리기
//      * PUT /posts/:id       특정 글 내용 수정하기
//      * DELETE /posts/:id    특정 글 삭제하기
//      */

// //     if (req.url === '/posts' && req.method === 'GET') {
// //          const result = {
// //             posts: posts.map((post) => ({
                
// //                 id: post.id,
// //                 title: post.title,
// //                 content: post.content,
// //             })),
// //             totalCount: posts.length,
// //         };

// //         res.setHeader('Content-Type', 'application/json; charset=utf-8');
// //         res.statusCode = 200;
// //         res.end(JSON.stringify(result));
// //     }
// //     //     //json형태로 변환하기 위한 부분
// //     //     res.setHeader('Content-Type', 'application/json; charset=utf-8');
// //     //     res.statusCode = 200;
// //     //     res.end(JSON.stringify(result));
// //     //     console.log('블로그의 글 목록을 가져오는 API 입니다');
// //      else if (id !== -1 && req.method === 'GET') {
// //         const result = posts.find((post) => post.id === id);

// //         if(result){
// //             console.log('블로그의 특정 글 내용을 보여주는 API 입니다');

// //             res.statusCode = 200;
// //             res.end(JSON.stringify(result));

// //         } else {
// //             console.log(' 해당 id를 가지는 포스트를 찾을 수 없었습니다.');

// //             res.statusCode = 404;
// //             res.end('해당 id를 가지는 포스트를 찾을 수 없었습니다.');
// //         }
// //     }   
// //     else if (req.url === '/posts' && req.method === 'POST') {
// //         req.setEncoding('utf-8');
// //         req.on('data', (data) => {
// //            const newPost = JSON.parse(data);
// //            posts.push({
// //             id: posts[posts.length - 1].id + 1,
// //             title: newPost.title,
// //             content: newPost.content,
// //            });
// //         });
// //         res.setHeader('Content-Type', 'application/json; charset=utf-8');
// //         res.statusCode = 200;
// //         res.end('블로그의 새로운 글을 올리는 API 입니다');

// //         console.log('블로그의 새로운 글을 등록하는 api 입니다');
// //      }
// //      else if (id !== -1 && req.method === 'PUT') {
// //         console.log('$$$$$');
// //         req.setEncoding('utf-8');
// //         req.on('data', (data) => {
// //             console.log(data);
// //             const newUpdate = JSON.parse(data);
// //             newUpdate.id = id;
// //             posts[id - 1] = newUpdate;
// //             });
// //         res.setHeader('Content-Type', 'application/json; charset=utf-8');
// //         res.statusCode = 200;
// //         res.end(`수정된 포스트의 id번호는 ${id}입니다.`);

// //         console.log('블로그의 새로운 글을 수정하는 API 입니다');
// //     }
// //     else if (id !== -1 && req.method === 'DELETE'){
        
// //         posts.splice(id - 1, 1);
// //         res.setHeader('Content-Type', 'application/json; charset=utf-8');
// //         res.statusCode=200;
// //         res.end(`삭제된 포스트의 id번호는 ${id}입니다.`);

// //         console.log('블로그의 특정 글을 삭제하는 API 입니다.');
// //     }
// //      else {
// //         req.statusCode = 400;
// //         res.end('Not Found');
// //         console.log('해당 API를 찾을 수 없습니다.');
// //     }
    


// const PORT = 4000;
// server.listen(PORT, () => {
//  console.log(`해당 서버는 ${PORT}에서 작동 중입니다.`);
// });





const http = require('http');

/**
 * @typedef Post
 * @property {number} id
 * @property {string} title
 * @property {string} content

 */
/** @type {Post[]}*/

const posts = [
    {
        id: 1,
        title: '첫번째 데이터',
        content: '첫번째 내용',
    },
    {
        id: 2,
        title: '두번째 데이터',
        content: '두번째 내용',
    },
];

/**
 * 블로그용 서버 API 구성
 *
 * GET /posts          목록 가져오기
 * GET /posts/:id      글 내용 가져오기
 * POST /posts         새로운 글 올리기
 * PUT /posts/:id      기존 글 수정하기
 * DELETE /posts/:id   기존 글 삭제하기
 */


const server = http.createServer((req, res) => {
    console.log('REQ URL' , req.url);

    const urlArr = req.url ? req.url.split('/') : [];
  let id = -1;
  console.log(urlArr);

  if (urlArr.length > 2) {
    id = parseInt(urlArr[2], 10);
  }
  console.log('@@@', id, typeof id);

if (req.url === '/posts' && req.method === 'GET'){
    const result = {
        posts: posts.map((posts) =>({

            id: posts.id,
            title: posts.title,
            content: posts.content,
        })),
        totalCount: posts.length,
    };
    res.setHeader('Content-Type', 'application/json; chareset=utf-8');
    res.statusCode = 200;
    res.end(JSON.stringify(result));
}
else if (id!== -1 && req.method === 'GET'){
    const result=posts.find((post) => post.id === id);

    if(result){
        console.log('블로그의 특정 글 내용을 보여주는 API입니다.');
        res.statusCode = 200;
        res.end(JSON.stringify(result));
    }
    else {
        console.log(' 해당 id를 가지는 포스트를 찾을 수 없었습니다.');

        res.statusCode = 404;
        res.end('해당 id를 가지는 포스트를 찾을 수 없었습니다.');
    }

}
else if (req.url === '/posts' && req.method === 'POST'){
    req.setEncoding('utf-8');
    req.on('data', (data) => {
        const newPost = JSON.parse(data);
        posts.push({
            id: posts[posts.length -1].id + 1,
            title: newPost.title,
            content: newPost.content,
        })
    })
    res.setHeader('Content-Type', 'application/json; chareset=utf-8');
    res.statusCode = 200;
    res.end('새로운 글 등록!');

    console.log('블로그의 글을 올릴 때 호출할 API 입니다.');
}
else if(id !== -1 && req.method === 'PUT'){
   req.setEncoding('utf-8');
   req.on('data', (data) => {
    const newUpdate = JSON.parse(data);
    newUpdate.id = id;
    posts[id - 1] = newUpdate;
    });
   res.setHeader('Content-Type', 'application/json; chareset=utf-8');
   res.statusCode = 200;
   res.end(`수정된 포스트의 id번호는 ${id}입니다.`);

   console.log('블로그의 새로운 글을 수정하는 API 입니다');
}
else if(id !== -1 && req.method === 'DELETE'){
    
    posts.splice(id -1 , 1);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode=200;
    res.end(`삭제된 포스트의 id번호는 ${id}입니다.`);

    console.log('블로그의 특정 글을 삭제하는 API 입니다.');
}
else {
    req.statusCode = 400;
    res.end('Not Found');
    console.log('해당 API를 찾을 수 없습니다.');
}
});









const PORT = 4000;
server.listen(PORT, () => {
 console.log(`해당 서버는 ${PORT}에서 작동 중입니다.`);
});