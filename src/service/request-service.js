const { request_repo } = require("../repositories");
const { requestDB } = require("../modules");
const { sendRequestEmail } = require("../utility/mail-trap/emails");
const { event_service } = require(".");

const Request_repo = new request_repo(requestDB);
// correct all good
async function create_request(object) {
  const hostId = object.hostId;
  const guestId = object.guestId;
  const eventId = object.event;
  try {
    const data = await Request_repo.create({
      host: hostId,
      guest: guestId,
      house: eventId,
    });

    sendRequestEmail(data.email, data.hostId, data.guest);
    return data;
  } catch (erro) {
    console.error(erro);
  }
}
// correct all good
function delete_request(id) {
  return Request_repo.delete(id);
}
// correct all good
async function get_all_request(userId, role) {
  try {
    if (role == "guest") {
      return Request_repo.find({ guest: Object(userId) });
    }
    if (role == "geust") {
      return Request_repo.find({ guest: Object(userId) });
    }
    if (role == "host") {
      return Request_repo.find({ host: Object(userId) });
    }
    return ["hello"];
  } catch (error) {
    throw error;
  }
}
// correct all good
function get_request_details(id) {
  try {
    return Request_repo.findById(id);
  } catch (error) {
    console.log(error);
    return null;
  }
}
//correct all goood
async function alreadyExit(object) {
  console.log(object, "this is th object");
  try {
    return Request_repo.findOne(object);
  } catch (error) {
    console.log(error);
    return null;
  }
}
// the service function updates the request object in the database
async function update_request(id, object) {
  const request = await Request_repo.get_details(id);
  const eventId = request.event;
  const event = await event_service.get_details(eventId);
  const maxguest = event.maxguest;
  const currentRequest = event.requestCount;

  if (currentRequest >= maxguest) {
    data = await Request_repo.update(Object(id), object);
    await event_service.update_event(event, { $inc: { requestCount: 1 } });
  }
}
//export all function in an object
module.exports = {
  create_request: create_request,
  delete_request: delete_request,
  get_all_request: get_all_request,
  get_request_details: get_request_details,
  update_request: update_request,
  alreadyExit,
};
