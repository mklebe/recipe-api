import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiTags, ApiConsumes, ApiProperty, ApiBody } from '@nestjs/swagger'

class FileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}

@ApiTags('image')
@Controller('image')
export class ImageController {
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file'),
    )
    @ApiOperation({operationId: 'uploadImage'})
    @ApiBody({
        description: 'Recipe image',
        type: FileUploadDto
    })
    @ApiConsumes('multipart/form-data')
    async uploadFile( @UploadedFile() file ) {
        console.log( 'File upload' )
        console.log( file )
    }
}
