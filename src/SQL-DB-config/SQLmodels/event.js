class Event {
  constructor({
    _id,
    host,
    title,
    description,
    maxguest,
    location,
    views,
    requestCount,
    category,
    thumbnail,
    avaliable,
    createdAt,
    updatedAt,
  }) {
    this.id = _id;
    this.host = host;
    this.title = title;
    this.description = description;
    this.maxGuest = maxguest;
    this.location = location;
    this.views = views;
    this.requestCount = requestCount;
    this.category = category;
    this.thumbnail = thumbnail;
    this.avaliable = avaliable;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  increaseView() {
    this.views++;
  }

  markUnavailable() {
    this.avaliable = false;
  }

  markAvailable() {
    this.avaliable = true;
  }
}

module.exports = Event;
