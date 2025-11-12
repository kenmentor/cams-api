const { event_service } = require("../service");
const { response } = require("../utility");
const { badResponse } = require("../utility/response");

const get_event_detail = async (req, res) => {
  console.log("commmmmmmmmm");
  try {
    const { id } = req.params;
    if (!id) {
      const responseData = response.badResponse;
      responseData.message = "ID required";
      return res.json(responseData).status(200);
    }
    console.log(id, "this id jbfyfyuf by");
    const data = await event_service.get_details(id); // ✅ Pass correct ID
    const responseData = response.goodResponse;
    responseData.data = data;
    res.json(responseData).status(200);
  } catch (error) {
    console.error("Error fetching resource:", error);
    res.status(500).json({ error: "Failed to fetch resource" }); // ✅ Send error response
  }
};
async function get_event(req, res) {
  console.log("Incoming query params:", req.query);

  // Destructure based on keyword interface (include new fields)
  const { searchWord, limit, category } = req.query;

  try {
    const data = await event_service.find_event({
      location: decodeURIComponent(searchWord || ""), // matches frontend
      limit: limit ? parseInt(limit) : 50,
      category, // ✅ optional filter
    });

    const responseData = response.goodResponse;
    responseData.data = data;
    return res.status(200).json(responseData);
  } catch (error) {
    const responseData = response.badResponse;
    console.error("Error fetching data from DB:", error);
    res.status(500).json(responseData);
  }
}

async function update_event_view(req, res) {
  console.log("commmmmmmmmm");
  const id = await req.params.id;
  try {
    const data = await event_service.update_event_view(id);
    const responseData = response.goodResponse;
    responseData.data = data;
    res.json(responseData);
  } catch (erro) {
    const responseData = response.badResponse;
    res.json(responseData);
    console.log("erro happen while updating view ");
    throw erro;
  }
}

async function upload_event(req, res) {
  try {
    const { files, body } = req;

    console.log(body, "fjbbjbjbjjb");

    const data = await event_service.upload_event(files, body);

    res.status(200).json({
      status: true,
      message: "event uploaded successfully",
      data,
    });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}
async function update_event(req, res) {
  try {
    const { body, params } = req;
    const { id } = params;

    if (body.price) {
      body.price = Number(body.price);
    }

    const data = await event_service.update_event(id, body);

    const responseData = {
      ...response.goodResponse,
      data,
    };

    res.json(responseData);
  } catch (err) {
    console.error("Update event error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: err.message,
    });
  }
}

async function delete_event(req, res) {
  console.log("commmmmmmmmm");
  const id = await req.body.id;
  const data = await user_service.delete();
  const responseData = response.goodResponse;
  responseData.data = data;
  res.json(responseData);
}
async function attend(req, res) {
  console.log("commmmmmmmmm");

  const { body, params } = req;
  const id = await params.id;
  const { eventId } = await body;
  try {
    const prevData = await event_service.get_details(eventId);
    const avaliable = prevData.request.includes(id);
    if (avaliable) {
      const data = await event_service.update_event(eventId, {
        attendee: [...prevData.attendee, id],
      });

      const responseData = {
        ...response.goodResponse,
        data,
      };

      res.json(responseData);
    }
    res.json(
      (badResponse.message =
        "you didnt request for the event so you cant sign attendance")
    );
  } catch (err) {
    console.error("Update event error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: err.message,
    });
  }
}

async function request(req, res) {
  console.log("commmmmmmmmm");

  const { body, params } = req;
  const userId = await params.id;
  const { eventId } = await body;

  try {
    const prevData = await event_service.get_details(eventId);
    const avaliable = !(prevData.maxgeust >= prevData.attendee.length);
    if (avaliable) {
      const data = await event_service.update_event(eventId, {
        request: [...prevData.attendee, userId],
      });

      const responseData = {
        ...response.goodResponse,
        data,
      };
      res.json(responseData);
    }
    res.json((badResponse.message = "attendance cannot be procced"));
  } catch (err) {
    console.error("Update event error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: err.message,
    });
  }
}

module.exports = {
  upload_event,
  update_event_view,
  get_event,
  get_event_detail,
  update_event,
  delete_event,
  attend,
  request,
};
