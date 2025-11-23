class Request {
  constructor({ _id, host, guest, house, accepted, createdAt, updatedAt }) {
    this.id = _id;
    this.host = host;
    this.guest = guest;
    this.house = house;
    this.accepted = accepted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  approve() {
    this.accepted = true;
  }

  reject() {
    this.accepted = false;
  }
}

module.exports = Request;
