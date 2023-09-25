import js2xmlparser from "js2xmlparser";

export async function sendResponse(req, res, data, statusCode) {
  if (req.headers.accept === "application/xml") {
    const xmlData = js2xmlparser.parse("data", { data });
    return res.status(statusCode).send(xmlData);
  } else {
    return res.status(statusCode).json({ data });
  }
  //  res.format({
  //   json: function () {
  //      return res.status(statusCode).json({ data });
  //   },
  //   xml: function () {
  //     const xmlData = js2xmlparser.parse("data", { data });
  //      return res.status(statusCode).send(xmlData);
  //   },
  // });
}

// .....................................
// export async function sendResponse(res, data, statusCode) {
//     res.format({
//       json: function () {
//         return res.status(statusCode).send(data);
//       },
//       xml: function () {
//         const xmlData = js2xmlparser.parse("data", data);
//         return res.status(statusCode).send(xmlData);
//       },
//     });

// }
export default sendResponse;
