import { ConflictException, Injectable,  InternalServerErrorException } from '@nestjs/common';
import { SignupDto } from './dtos/signupDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from "bcrypt";
import { LoginDto } from './dtos/loginDto';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,) { }

    // Méthode centralisée pour créer un utilisateur
    async createUser(username: string, email: string, password: string): Promise<User> {
        const hash = await bcrypt.hash(password, 10); // Hacher le mot de passe
        const user = this.usersRepository.create({ username, email, password: hash });
        return await this.usersRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
    }


    // Méthode pour gérer l'inscription
    async postSignup(body: SignupDto): Promise<string> {
        try {
            const { username, email, password } = body;

            // Utilisation de la méthode createUser pour créer un utilisateur
            await this.createUser(username, email, password);

            return 'Utilisateur créé avec succès';
        } catch (error) {
            if (error instanceof QueryFailedError) {
                // Vérification spécifique pour une erreur de duplicata d'email
                if (error.message.includes('ER_DUP_ENTRY')) {
                    throw new ConflictException('Cet email est déjà utilisé.');
                }
            }

            // Si ce n'est pas une erreur de duplicata, lancer une erreur générique
            throw new InternalServerErrorException('Erreur serveur, veuillez réessayer plus tard.');
        }
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
}
