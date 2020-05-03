const clientID = process.env.FAT_SECRET_API_CLIENT_ID
const clientSecret = process.env.FAT_SECRET_API_CLIENT_SECRET
const oauthUrl = process.env.FAT_SECRET_API_OAUTH_URL
const apiUrl = process.env.FAT_SECRET_API_URL

const FormData = require('form-data')

import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FatSecretService {
    private accessToken: string
    private expiresIn: number

    constructor(
        private httpService: HttpService,
    ) {
        this.initialize().subscribe( res => {
            this.accessToken = res.data.access_token
            this.expiresIn = res.data.expires_in
        })
    }

    private initialize(): Observable<any> {
        const form = new FormData()
        form.append('grant_type', 'client_credentials')
        form.append('scope', 'basic')

        return this.httpService.post(oauthUrl, form, {
            auth: {
                username: clientID,
                password: clientSecret
            },
            headers: form.getHeaders(),
            
        })
    }

    public searchIngredient() {
        this.httpService.post(apiUrl, {}, {

        })
    }
    
}
