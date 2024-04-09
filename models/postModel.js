import { Schema, model } from "mongoose";

const commentsSchema = Schema({
    text: { type: String, required: [true, 'This field is required']},
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    timePosted: Date
})

const playStyleSchema = Schema({
    offersSeshZero:  { type: Boolean, required: [true, 'This field is required']},
    roleplayHvy: { type: String, required: [true, 'This field is required']},
    combatHvy: { type: String, required: [true, 'This field is required']},
    exploreHvy: { type: String, required: [true, 'This field is required']},
    drinking: { type: String, required: [true, 'This field is required']},
    snacks: { type: String, required: [true, 'This field is required']},
    "maps&minis": Boolean,
    sandboxVsLinear: String,
    hbrewVsMod: String
})

const charCreationSchema = Schema({
    abilityScores: { type: String, required: [true, 'This field is required']},
    sourceMaterial: { type: String, required: [true, 'This field is required']},
    restrictions: { type: String, required: [true, 'This field is required']},
    startingLvl: Number
})

const postSchema = Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    location: { type: Number, required: [true, 'Zipcode is required']}, //zipcode
    campaignName: { type: String, required: [true, 'Campaign name required']},
    description:  { type: String, required: [true, 'Description name required']},
    players:  Array,
    totalSlots:  { 
        type: Number, 
        required: [true, 'This field is required'],
        min: 1
    },
    startTime: Date,
    expectedLength:  { 
        type: String, 
        required: [true, 'This field is required'],
        enum: ['one-shot', 'short campaign', 'long campaign']
    },
    frequency: {
        type: String,
        enum: ['every week', 'every other week', 'monthly']
    },
    freqDays: {
        type: [String],
        enum: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
    },
    timeOfDay: {
        type: Number,
    },
    playStyle: playStyleSchema,
    charCreation: charCreationSchema,
    comments: [commentsSchema]
})


const Post = model('Post', postSchema)

export default Post