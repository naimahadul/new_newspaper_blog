import {
  createBlog,
  getBlogId,
  findAllBlogs,
  updateBlogById,
  getAllBlogsByAuthor,
} from "../../services/blogService.js";
import db from "../../models/index.js";

jest.mock("../../models/index.js", () => ({
  Blog: {
    findAndCountAll: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    findAll: jest.fn(),
  },
}));

describe("createBlog", () => {
  it("should create a blog entry", async () => {
    const info = {
      title: "Test Blog Post",
      description: "This is a test blog post.",
      authorId: "testUserId",
    };
    const mockCreatedBlog = {
      title: "Test Blog Post",
      description: "This is a test blog post.",
      authorId: "testUserId",
    };
    const mockCreate = jest
      .spyOn(db.Blog, "create")
      .mockResolvedValue(mockCreatedBlog);
    const result = await createBlog(info);
    expect(result).toEqual(mockCreatedBlog);
    expect(mockCreate).toHaveBeenCalledWith(info);
    mockCreate.mockRestore();
  });
});

describe("getBlogId", () => {
  it("should get a blog by ID", async () => {
    const mockBlogId = "ec3ed24d-13c3-4a39-9270-88ea73d83b9";

    const mockBlog = {
      authorid: "bc79214a-3c61-474-ba79-d89c5e32ed0d",
      blogid: "1234556",
      title: "Test Blog",
      description: "This is a test blog.",
    };
    jest.spyOn(db.Blog, "findByPk").mockResolvedValue(mockBlog);

    const result = await getBlogId(mockBlogId);

    expect(db.Blog.findByPk).toHaveBeenCalledWith(mockBlogId);
    expect(result).toEqual(mockBlog);
  });
});

describe("findAllBlogs", () => {
  it("should find and return blogs", async () => {
    const mockPage = 1;
    const mockSize = 2;
    const mockBlogs = {
      count: 2,
      rows: [
        {
          title: "Test Blog 1",
          description: "This is test blog 1.",
        },
        {
          title: "Test Blog 2",
          description: "This is test blog 2.",
        },
      ],
    };

    jest.spyOn(db.Blog, "findAndCountAll").mockResolvedValue(mockBlogs);

    const result = await findAllBlogs(mockPage, mockSize);

    expect(db.Blog.findAndCountAll).toHaveBeenCalledWith({
      limit: mockSize,
      offset: mockPage * mockSize,
    });
    expect(result).toEqual(mockBlogs);
  });
});

describe("updateBlogById", () => {
  it("should update a blog by ID", async () => {
    const mockBlogId = "ec3ed24d-13c3-4a39-9270-88ea73d83b98";

    const mockBlog = {
      id: mockBlogId,
      title: "Test Blog",
      description: "This is a test blog.",
      save: jest.fn(),
    };

    jest.spyOn(db.Blog, "findByPk").mockResolvedValue(mockBlog);

    const mockUpdateInfo = {
      blogId: mockBlogId,
      title: "Updated Test Blog",
      description: "This is an updated test blog.",
    };

    const result = await updateBlogById(mockUpdateInfo);

    expect(db.Blog.findByPk).toHaveBeenCalledWith(mockUpdateInfo.blogId);
    expect(mockBlog.title).toBe(mockUpdateInfo.title);
    expect(mockBlog.description).toBe(mockUpdateInfo.description);
    expect(mockBlog.save).toHaveBeenCalled();
    expect(result).toEqual(mockBlog);
  });

  it("should handle errors", async () => {
    const mockUpdateInfo = {
      blogId: "invalid-blog-id",
      title: "Updated Test Blog",
      description: "This is an updated test blog.",
    };

    jest
      .spyOn(db.Blog, "findByPk")
      .mockRejectedValue(new Error("Database error"));

    await expect(updateBlogById(mockUpdateInfo)).rejects.toThrow(
      "Database error"
    );
  });
});

describe("getAllBlogsByAuthor", () => {
  it("should get all blogs by author ID", async () => {
    const mockAuthorId = "testUserId";

    const mockBlogs = [
      {
        title: "Test Blog 1",
        description: "This is test blog 1.",
        authorId: mockAuthorId,
      },
      {
        title: "Test Blog 2",
        description: "This is test blog 2.",
        authorId: mockAuthorId,
      },
    ];

    jest.spyOn(db.Blog, "findAll").mockResolvedValue(mockBlogs);

    const result = await getAllBlogsByAuthor(mockAuthorId);

    expect(db.Blog.findAll).toHaveBeenCalledWith({
      where: { authorId: mockAuthorId },
    });
    expect(result).toEqual(mockBlogs);
  });

  it("should handle errors", async () => {
    const mockAuthorId = "testUserId";

    jest
      .spyOn(db.Blog, "findAll")
      .mockRejectedValue(new Error("Database error"));

    await expect(getAllBlogsByAuthor(mockAuthorId)).rejects.toThrow(
      "Database error"
    );
  });
});
