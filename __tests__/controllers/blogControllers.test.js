import mockDb from "../../__mock__/mockDb";
import blogService from "../../services/blogService";
import * as blogControllers from "../../controllers/blogControllers.js";
import httpMocks from "node-mocks-http";
describe("Blog controller test", () => {
  describe("Add blog test", () => {
    it("Blog creation successfull", async () => {
      const req = { body: {} };
      const res = {};
      const next = jest.fn();
      await blogControllers.blogsCreate(req, res, next);
    });
    it("Blog Added", async () => {
      const req = httpMocks.createRequest({
        body: {
          title: "Blog 1",
          description: "Description 1",
        },
        userId: "1ea6c1e5-5649-4591-a813-441d0c840a1b",
        headers: {
          accept: "application/json",
        },
      });
      const res = httpMocks.createResponse();
      const expectedResponse = {
        data: mockDb.blogs[0],
      };
      const next = jest.fn();
      jest
        .spyOn(blogService, "createBlog")
        .mockResolvedValueOnce(expectedResponse.data);
      await blogControllers.blogsCreate(req, res, next);
      expect(blogService.createBlog).toHaveBeenCalledTimes(1);
      var data = res._getJSONData();
      var resStatusCode = res.statusCode;
      expect(blogService.createBlog).toHaveBeenCalledWith({
        title: req.body.title,
        description: req.body.description,
        authorId: req.userId,
      });
      expect(data).toStrictEqual(expectedResponse);
      expect(resStatusCode).toBe(201);
    });
  });
});

describe("Delete blog test", () => {
  it("should delete blog successfully", async () => {
    const req = httpMocks.createRequest({
      params: {
        blogId: "1",
      },
    });
    var res = httpMocks.createResponse();

    const expectedResponse = {
      data: mockDb.blogs[2],
    };
    const next = jest.fn();

    jest
      .spyOn(blogService, "deleteBlogById")
      .mockResolvedValueOnce(expectedResponse.data);

    await blogControllers.deleteBlog(req, res, next);
    expect(blogService.deleteBlogById).toHaveBeenCalledTimes(1);
    expect(blogService.deleteBlogById).toHaveBeenCalledWith(req.params.id);
    var data = res._getJSONData();
    var resStatusCode = res.statusCode;
    expect(resStatusCode).toBe(204);
  });
});

describe("Update blog test", () => {
  it("should edit blog successfully", async () => {
    const req = httpMocks.createRequest({
      body: {
        title: "Blog 1",
        description: "Description 1",
        blogId: "1",
      },
      params: {
        id: "1",
      },
    });

    var res = httpMocks.createResponse();
    const expectedResponse = {
      data: mockDb.blogs[0],
    };
    const next = jest.fn();
    jest
      .spyOn(blogService, "updateBlogById")
      .mockResolvedValueOnce(expectedResponse.data);
    await blogControllers.updateBlog(req, res, next);
    expect(blogService.updateBlogById).toHaveBeenCalledTimes(1);
    var data = res._getJSONData();
    var resStatusCode = res.statusCode;
    expect(blogService.updateBlogById).toHaveBeenCalledWith(req.body);
    expect(data).toStrictEqual(expectedResponse);
    expect(resStatusCode).toBe(200);
  });
});

describe("Blog controller test", () => {
  describe("Get blog by ID test", () => {
    it("should get a blog by ID", async () => {
      const blogId = 1;
      const req = httpMocks.createRequest({
        params: {
          id: blogId,
        },
      });
      const res = httpMocks.createResponse();
      const expectedBlog = {
        authorId: "1ea6c1e5-5649-4591-a813-441d0c840a1b",
        description: "Test Description",
        title: "Test Blog",
      };
      jest.spyOn(blogService, "getBlogId").mockResolvedValueOnce(expectedBlog);
      await blogControllers.getBlogById(req, res);
      expect(blogService.getBlogId).toHaveBeenCalledWith(req.params.id);
      expect(res.statusCode).toBe(200);
      const data = res._getJSONData();
    });
  });
});

describe("View Blog Test", () => {
  it("should get all blogs", async () => {
    const req = httpMocks.createRequest({
      query: {
        page: 0,
        size: 5,
      },
    });

    const res = httpMocks.createResponse();
    const expectedResponse = {
      data: mockDb.blogs,
    };
    const next = jest.fn();

    jest
      .spyOn(blogService, "findAllBlogs")
      .mockResolvedValueOnce(expectedResponse.data);

    await blogControllers.getAllBlogs(req, res, next);
    expect(blogService.findAllBlogs).toHaveBeenCalledTimes(1);

    var data = res._getJSONData();
    var resStatusCode = res.statusCode;
    expect(blogService.findAllBlogs).toHaveBeenCalledWith(
      req.query.page,
      req.query.size
    );

    expect(data).toStrictEqual(expectedResponse);
    expect(resStatusCode).toBe(200);
  });

  it("View single blog", async () => {
    const req = httpMocks.createRequest({
      params: {
        blogId: 1,
      },
    });
    var res = httpMocks.createResponse();
    const expectedResponse = {
      data: mockDb.blogs[0],
    };
    const next = jest.fn();

    jest
      .spyOn(blogService, "getBlogId")
      .mockResolvedValueOnce(expectedResponse.data);

    const response = await blogControllers.getBlogById(req, res, next);
    expect(blogService.getBlogId).toHaveBeenCalledTimes(2);
    var data = res._getJSONData();
    var resStatusCode = res.statusCode;
    expect(blogService.getBlogId).toHaveBeenCalledWith(req.params.blogId);

    expect(data).toStrictEqual(expectedResponse);
    expect(resStatusCode).toBe(200);
  });
});
