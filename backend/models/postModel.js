const mongoose = require('mongoose')

const Account = require('./accountModel')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, required: true, ref: Account },
    isPinned: { type: Boolean, required: true, default: false },
    event: { type: eventSchema, required: false },
    donation: { type: donationSchema, required: false },
}, { timestamps: true, versionKey: false })

const eventSchema = new Schema({
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    membersCount: { type: Number, required: true },
    members: [{ type: Schema.Types.ObjectId, required: false, ref: Account }],
})

const donationSchema = new Schema({
    goal: { type: String, required: true },
    amount: { type: Number, required: true },
    donors: [{ type: donorSchema, required: false }],
})

const donorSchema = new Schema({
    account: { type: Schema.Types.ObjectId, required: true, ref: Account },
    amount: { type: Number, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model('Post', postSchema)