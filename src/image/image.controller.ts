import { Controller, Post, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiTags, ApiConsumes, ApiProperty, ApiBody, ApiResponse } from '@nestjs/swagger'
import { diskStorage } from  'multer'
import { extname } from  'path'
const cloudinary = require('cloudinary')

class NestImage {
    @ApiProperty()
    src: string
}

class FileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}

@ApiTags('image')
@Controller('image')
export class ImageController {
    @Post('upload/recipe')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './static/images/recipe',
                filename: (req, file, cb) => {
                    console.log( req )
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                }
            })
        }),
    )
    @ApiOperation({operationId: 'uploadImage'})
    @ApiBody({
        description: 'Recipe image',
        type: FileUploadDto
    })
    @ApiResponse({
        status: 201,
        type: NestImage
    })
    @ApiConsumes('multipart/form-data')
    async uploadFile( @UploadedFile() file ) {
        console.log(`### Upload ${file.path} ###`)
        cloudinary.uploader.upload( file.path, (result) => {
            console.log( result )
        })
        return {src: file.path}
    }
}
