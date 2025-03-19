import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Role } from '../models/roles';

type HttpResponse = {
  end: (body?: string) => void;
};

type HttpRequest = {
  getHeader: (name: string) => string | undefined;
};

const users: { [key: string]: { password: string; role: Role } } = {};

export async function registerUser({ username, password, role }: { username: string; password: string; role: Role }) {
  if (users[username]) {
    throw new Error('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = { password: hashedPassword, role };
}

export async function loginUser({ username, password }: { username: string; password: string }) {
  const user = users[username];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  return jwt.sign({ username, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
}

export function authenticate(allowedRoles: Role[]) {
  return (res: HttpResponse, req: HttpRequest, next: () => void) => {
    const token = req.getHeader('authorization')?.split(' ')[1];
    if (!token) {
      res.end('Unauthorized');
      return;
    }
    try {
      const payload: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      if (!allowedRoles.includes(payload.role)) {
        res.end('Forbidden');
        return;
      }
      next();
    } catch {
      res.end('Unauthorized');
    }
  };
}
