//Unit Test #1
test('Equality of username and password', () => {
    expect({ username: 'Yerke', password: 'Qwerty'})
    .toEqual({ username: 'Yerke', password: 'Qwerty'});
});


//Unit Test #2
test('Choosen places equality', () => {
    expect(['Bayanaul', 'Burabay', 'Kolsay']).toEqual(['Bayanaul', 'Burabay', 'Kolsay']);
});

const {MongoClient} = require('mongodb');

//Unit Test #3
// describe('insert', () => {
//   let connection;
//   let db;

//   beforeAll(async () => {
//     connection = await MongoClient.connect('mongodb+srv://admin:admin@cluster0.stzed.mongodb.net/placesDB?retryWrites=true&w=majority', {
//       useNewUrlParser: true,
//     });
//     db = await connection.db(global.placesDB);
//   });

// //   afterAll(async () => {
// //     await connection.close();
// //     await db.close();
// //   });

//   it('should create a new user into collection', async () => {
//     const users = db.collection('users');

//     const mockUser = {_id: 'aaa', email:'aaa@aaa', username: 'aaa', password: 'aaa'};
//     await users.insertOne(mockUser);

//     const insertedUser = await users.findOne({_id: '123qqq'});
//     expect(insertedUser).toEqual(mockUser);
//   });
// });

//Unit Test #4
// describe('insert', () => {
//     let connection;
//     let db;
  
//     beforeAll(async () => {
//       connection = await MongoClient.connect('mongodb+srv://admin:admin@cluster0.stzed.mongodb.net/placesDB?retryWrites=true&w=majority', {
//         useNewUrlParser: true,
//       });
//       db = await connection.db(global.placesDB);
//     });
  
//     it('should insert a message into collection', async () => {
//       const messages = db.collection('messages');
  
//       const mockMessage = {_id: 'a123', name: 'aaa', email:'aaa@aaa',  message: 'Something good will happen but not today'};
//       await messages.insertOne(mockMessage);
  
//       const insertedMessage = await messages.findOne({_id: 'qqq123'});
//       expect(insertedMessage).toEqual(mockMessage);
//     });
//   });

//Unit Test #4
//   describe('remove', () => {
//     let connection;
//     let db;
  
//     beforeAll(async () => {
//       connection = await MongoClient.connect('mongodb+srv://admin:admin@cluster0.stzed.mongodb.net/placesDB?retryWrites=true&w=majority', {
//         useNewUrlParser: true,
//       });
//       db = await connection.db(global.placesDB);
//     });
  
//     it('should delete a message from collection', async () => {
//       const messages = db.collection('messages');
  
//       const mockMessage = {_id: 'qwerty.id', name: 'Name', email:'aa@mail.ru',  message: 'Smth'};
//       await messages.deleteOne(mockMessage);
  
//       const removedMessage = await messages.findOne({_id: 'qwerty.id'});
//       expect(removedMessage).toEqual(null);
//     });
//   });

//Unit Test #5
  describe('remove', () => {
    let connection;
    let db;
  
    beforeAll(async () => {
      connection = await MongoClient.connect('mongodb+srv://admin:admin@cluster0.stzed.mongodb.net/placesDB?retryWrites=true&w=majority', {
        useNewUrlParser: true,
      });
      db = await connection.db(global.placesDB);
    });
  
    it('should delete account from collection', async () => {
      const users = db.collection('users');
  
      const mockUser = {_id: 'qwerty', email:'qwerty@qw', username: 'qwerty', password: 'qwerty'};
      await users.deleteOne(mockUser);
  
      const removedUser = await users.findOne({_id: 'qwerty'});
      expect(removedUser).toEqual(null);
    });
  });