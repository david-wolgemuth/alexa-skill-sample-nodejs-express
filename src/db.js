const mongoose = require('mongoose');
const OVERALL_MOOD = 'OVERALL_MOOD';

mongoose.connect(process.env.MONGO_URI, {}, () => {
  console.log('Connected to mongo');
});

const UserSchema = new mongoose.Schema(
  {
    amazonUserId: String,
  },
  {
    timestamps: true
  }
).add({
  addMoodWord: function ({ moodWord, percent }) {
    const userId = this._id;
    return CheckInSchema.create({
      userId, moodWord, percent
    });
  },
  addOverallMood: function ({ percent }) {
    const userId = this._id;
    const moodWord = OVERALL_MOOD;
    return CheckInSchema.create({
      userId, moodWord, percent
    });
  }
});

const CheckInSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId
    },
    moodWord: {
      type: String
    },
    percent: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

mongoose.model('CheckIn', CheckInSchema);
mongoose.model('User', UserSchema);
