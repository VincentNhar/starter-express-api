const mongoose = require('mongoose')

const mapSchema = new mongoose.Schema({
    imageBase64: {
        type: String,
        required: true
    },
    seed: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        enum: ['Diner','Basic','Medium','Large','Huge'],
        required: true
    },
    dimension:{
        width: {
            type:Number,
            default: function(){
                switch (this.type){
                    case 'Huge':
                        return 16;
                    case 'Large':
                        return 13;
                    case 'Medium':
                        return 14;
                    case 'Basic':
                    case 'Diner':
                        return 10;
                    default:
                        return 0;
                }
            }
        },
        height: {
            type:Number,
            default: function(){
                switch (this.type){
                    case 'Huge':
                        return 12;
                    case 'Large':
                        return 9;
                    case 'Basic':
                        return 7;
                    case 'Medium':
                    case 'Diner':
                        return 6;
                    default:
                        return 0;
                }
            }
        }
    },
    startingTable:{
        type: Number,
        min: 0,
        max: 4,
        default: function(){
            switch (this.type){
                case 'Huge':
                    return 4;
                case 'Large':
                    return 3
                case 'Medium':
                case 'Basic':
                    return 2;
                case 'Diner':
                    return 1;
                default:
                    return 0;
            }
        }
    },
    rating:{
        type:Number,
        default:0
    },
    copyCount:{
        type: Number,
        default: 0
    }
})

// Convert seed to uppercase before saving
mapSchema.pre('save',function (next){
    this.seed = this.seed.toUpperCase(); 
    next();
})

module.exports = mongoose.model("Map",mapSchema)