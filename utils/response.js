import js2xmlparser from "js2xmlparser";

export async function sendResponse(res, data, statusCode, message) {
  if (!message) {
    res.format({
      json: function () {
        return res.status(statusCode).send(data);
      },
      xml: function () {
        const xmlData = js2xmlparser.parse("data", { data });
        return res.status(statusCode).send(xmlData);
      },
    });
  } else {
    res.format({
      json: function () {
        return res.status(statusCode).send(message);
      },
      xml: function () {
        const xmlData = js2xmlparser.parse("data", { message });
        return res.status(statusCode).send(xmlData);
      },
    });
  }
}
