import { connect, ConnectOptions } from 'mongoose';

export const dbConnect = () => {
    connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        // useUnifiedTechnology: true

    } as ConnectOptions).then(
        () =>  console.log("connect successfully"),
        (error) => console.log(error)

    );
}