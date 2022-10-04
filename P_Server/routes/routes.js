// @ts-check



const routes = [
  {
    url: '/posts',
    method: 'GET',
    callback: () => ({
      statusCode: 200,
      body: {
        posts:posts.map((post) =>({
            id: post.id,
            title:post.title,
        })),
        totalCount:post.length;
      }
    }),
  },
];
