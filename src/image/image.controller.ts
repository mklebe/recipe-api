import { Controller, Post, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiTags, ApiConsumes, ApiProperty, ApiBody, ApiResponse } from '@nestjs/swagger'
import { diskStorage } from  'multer'
import { extname } from  'path'
const fs = require('fs')
const cloudinary = require('cloudinary')

class CloudinaryImage {
    @ApiProperty()
    url: string

    @ApiProperty()
    height: number

    @ApiProperty()
    width: number
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
        type: CloudinaryImage
    })
    @ApiConsumes('multipart/form-data')
    async uploadFile( @UploadedFile() file ) {
        let image 
        const filePath = file.path
        await cloudinary.uploader.upload( filePath, (result) => {
            image = result
        })
        fs.unlink(filePath, () => {
            console.log( `### removed ${filePath} ###` )
        })
        return image
    }
}
