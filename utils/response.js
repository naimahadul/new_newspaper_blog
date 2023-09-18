import js2xmlparser from "js2xmlparser";

export async function sendResponse(res, data, statusCode) {
  res.format({
    json: function () {
      return res.status(statusCode).send(data);
    },
    xml: function () {
      const xmlData = js2xmlparser.parse("data", { data });
      return res.status(statusCode).send(xmlData);
    },
  });
}
