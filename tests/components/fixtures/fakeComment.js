const fakeComment = [
  {
    id: '1',
    userName: 'name',
    date: {
      toDate: jest.fn(() => new Date()),
    },
    message: 'comment',
    uid: '1',
  },
];

export default fakeComment;
