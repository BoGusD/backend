// @ts-check



// /**
//  * @typedef Post
//  * @property {number} id
//  * @property {string} title
//  * @property {string} content
//  */

// /** @type {Post[]} */
// const posts = [
//     {
//       id: 1,
//       title: '첫번째 블로그 글',
//       content: '첫번째 내용입니다.',
//     },
//     {
//       id: 2,
//       title: '두번째 블로그 글',
//       content: '두번째 내용입니다',
//     },
//     {
//       id: 3,
//       title: '세번째 블로그 글',
//       content: '세번째 내용',
//     },
//   ];

  const fs = require('fs').promises;

  async function getPosts() {
    const jsonPosts = await fs.readFile('database.json', 'utf-8');
    return JSON.parse(jsonPosts).posts;
  }

   async function savePosts(posts) {
    const content = {
      posts,
    }
    return fs.writeFile('database.json', JSON.stringify(content), 'utf-8');
   };
  
  const routes = [
    // 블로그 목록을 가져오는 API
    {
      url: '/posts',
      method: 'GET',
      id: 'undefined',
      callback: async () => {
        const posts = await getPosts();
        const length = posts.length;
        return {
          statusCode: 200,
          body: {
            posts,
            totalCounts: length,
            },
        };
      },
    },
  
    // 특정 ID의 블로그 글을 가져오는 API
    {
      url: '/posts',
      method: 'GET',
      id: 'number',
      callback: async (postId) => {
        const posts = await getPosts();
        const id = postId;
        if (!id) {
          return {
            statusCode: 404,
            body: 'Not found',
          };
        }
  
        const result = posts.find((post) => post.id === id);
  
        if (!result) {
          return {
            statusCode: 404,
            body: 'ID Not found',
          };
        }
  
        return {
          statusCode: 200,
          body: result,
        };
      },
    },
  
    // 새로운 글을 쓰는 API
    {
      url: '/posts',
      method: 'POST',
      id: 'undefined',
      callback: async (id, newPost) => {
        const posts = await getPosts();

        posts.push({
          id: posts[posts.length - 1].id + 1,
          title: newPost.title,
          content: newPost.content,
        });
        savePosts(posts);

        return {
          statusCode: 200,
          body: 'post is uploaded',
        };
      },
    },
 
  // 새로운 글을 수정하는 API
  {
    url: '/posts',
    method: 'PUT',
    id: 'number',
    callback: async (id, newPost) =>{
      const posts = await getPosts();
        if(!id){
            return{
                statusCode: 404,
                body: 'Not found',
            }
        }

        const result = posts.find((post) => post.id === id);

        if(!result){
            return{
                statusCode: 404,
                body: 'Not found',
            }
        }
        const modifyPost = newPost;
        modifyPost.id = id;
        posts [id - 1] = modifyPost;

        savePosts(posts);
        return {
            statusCode: 200,
            body: modifyPost,
        }
        }

    },

  //글을 삭제하는 API
    {
    url: '/posts',
    method: 'DELETE',
    id: 'number',

        callback: async(id) => {
            if(!id){
                return{
                    statusCode: 404,
                    body: 'Not found',
                }
            }
            const posts = await getPosts();
            posts.splice(id - 1 , 1);
            savePosts(posts);
            return{
                statusCode: 200,
                body: 'post delete',
            }    
        }
    },
];
  
  module.exports = {
    routes,
  };