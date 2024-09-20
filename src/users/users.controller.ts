import { Body, InternalServerErrorException, Controller, Logger, Post, BadRequestException } from '@nestjs/common';
import { SignupDto } from './dtos/signupDto';
import { LoginDto } from './dtos/loginDto';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UsersService) { }

    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        const { username, email, password } = signupDto;
        return await this.userService.createUser(username, email, password);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.userService.validateUser(email, password);
        if (!user) {
            throw new BadRequestException('Invalid credentials'); 
        }
        return { message: 'Login successful' };
    }   
}
