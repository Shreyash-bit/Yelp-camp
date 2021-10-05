const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Databse connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  // const c = new Campground({ title: 'purple field' });
  // await c.save();
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;

    const camp = new Campground({
      //YOUR USER ID
      author: "615be5bbb3a33c1a30836e3d",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, nulla eos. Id numquam cupiditate repudiandae esse recusandae facere quod nobis, harum dolore ea? Error rem ut animi, molestiae recusandae qui?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dkqtts79g/image/upload/v1617630537/YelpCamp/wzbccyrczzbqq808w25i.png",
          filename: "YelpCamp/wzbccyrczzbqq808w25i",
        },
        {
          url: "https://res.cloudinary.com/dkqtts79g/image/upload/v1617515899/YelpCamp/m078wucyrp79wvz7kjp4.jpg",
          filename: "YelpCamp/m078wucyrp79wvz7kjp4",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
