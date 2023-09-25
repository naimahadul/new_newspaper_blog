import mockDb from "../../__mock__/mockDb";
import blogService, { createBlog } from "../../services/blogService";
import customError from "../../utils/customErrorHandler";
import * as blogControllers from "../../controllers/blogControllers.js";
import constentNegotiation  from "../../utils/response.js";
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
      const req ={
        body: {
          title: "Blog 1",
          description: "Description 1",
        },
        userId: "1ea6c1e5-5649-4591-a813-441d0c840a1b",
        headers: {
          accept: "application/json",
        },
      };
      const res = {};
      const expectedResponse = {
        data: mockDb.blogs[0],
      };
      const next = jest.fn();
      jest
        .spyOn(blogService, "createBlog")
        .mockResolvedValueOnce(expectedResponse);
        jest
        .spyOn(constentNegotiation, "sendRensponse")
        .mockReturnValueOnce(expectedResponse);
      
      const response = await blogControllers.blogsCreate(req, res, next);
      expect(blogService.createBlog).toHaveBeenCalledTimes(1);
      //var data = res._getJSONData();
      console.log(response);
      expect(blogService.createBlog).toHaveBeenCalledWith({
        title: req.body.title,
        description: req.body.description,
        authorId: req.userId,
      });
      expect(response).toStrictEqual(expectedResponse);
      expect(resStatusCode).toBe(201);
    });
  });
});
