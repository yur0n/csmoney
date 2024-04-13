import { connect } from 'mongoose';

(async function connectDB() {
	await connect(process.env.MONGODB_CONNECTION  || 'mongodb+srv://yur0n:786512@cluster0.0na8y.mongodb.net/csmoney?retryWrites=true&w=majority')
})()