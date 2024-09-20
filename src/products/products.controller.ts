import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
// import { UpdateProductDto } from './dtos/updateProductDto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    async getAllProducts(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async createProduct(
        @Body() body: { name: string; description: string; image: string; price: number },
        @UploadedFile() file: Express.Multer.File,
    ): Promise<Product> {
        const { name, description, price } = body;
        // Ici, vous pouvez gérer le fichier (par exemple, le stocker sur le serveur ou dans un stockage cloud)
        // Ajoutez le chemin du fichier ou l'URL à votre base de données en fonction de votre logique
        return this.productsService.createProduct(name, description, file?.path || '', price);
    }
}
