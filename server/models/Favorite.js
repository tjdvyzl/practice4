const { SchemaType } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const FavoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
        /*
        ObjectId 하나만 갖고있어도 User의 관한 모든 정보 예를들어 token이나 image정보 등을 가지고 올 수 있으므로
        ref로 User으 지정해줘야한다. 
        */
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        type: String
    }
}, {timeStamps: true}) // 생성된 시간같은걸 자동으로 처리해준다.

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = {Favorite}