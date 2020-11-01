import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Alvaro Castillo',
    email: 'avo@email.com',
    password: bcrypt.hashSync('1234567', 10),
  },
  {
    name: 'Jess Gardea',
    email: 'jess@cool.com',
    password: bcrypt.hashSync('12345678', 10),
  },
];

export default users;
