const mockDb = {
    authors: [
      {
        authorId: '1',
        name: 'Author 1',
        email: 'author1@example.com',
        password: 'password1',
      },
      {
        authorId: '2',
        name: 'Author 2',
        email: 'author2@example.com',
        password: 'password2',
      },
    ],
    blogs: [
      {
        blogId: '1',
        title: 'Blog 1',
        description: 'Description 1',
        authorId: '1ea6c1e5-5649-4591-a813-441d0c840a1b',
      },
      {
        blogId: '2',
        title: 'Blog 2',
        description: 'Description 2',
        authorId: '2',
      },
    ],
  };
  
export default mockDb;
