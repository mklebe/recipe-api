import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiTags, ApiConsumes, ApiProperty, ApiBody, ApiResponse } from '@nestjs/swagger'
import { diskStorage } from  'multer'
import { extname } from  'path'

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
                destination: './images/recipe',
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
        status: 200,
        schema: {
            type: 'string'
        }
    })
    @ApiConsumes('multipart/form-data')
    async uploadFile( @UploadedFile() file ) {
        return file.path
    }
}
