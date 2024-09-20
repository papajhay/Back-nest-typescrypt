import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/users/dtos/loginDto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    // Inscription
    async register(username: string, email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.usersService.createUser(username, email, hashedPassword);
    }

    // Connexion
    async login(loginDto: LoginDto): Promise<{ access_token: string }> {
        const { email, password } = loginDto;
        const user = await this.usersService.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { email: user.email, username: user.username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
