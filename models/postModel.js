import { Schema, model } from "mongoose";

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
    totalSlots:  { type: String, required: [true, 'This field is required']},
    startTime: Date,
    expectLength: Number,
    expectLUnit: String,
    playStyle: playStyleSchema,
    charCreation: charCreationSchema,
    comments: Array
})

const Post = model('Post', postSchema)

export default Post