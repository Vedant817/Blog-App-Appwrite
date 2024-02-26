/* eslint-disable no-useless-catch */
import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf.js'

export class AuthService {
    client = new Client();
    account;

    constructor(){
        //? Done for creating an account each time an object is created for the same.
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount){
                return this.login({email, password})
            }else{
                throw new Error('Error creating an Account') //TODO: Can handle proper error object.
            }
        } catch (error) {
            throw error
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession({email, password})
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log('Appwrite Service :: getCurrentUser :: '+error);
        }
        return null
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log('Appwrite Service :: logout :: '+error);
        }
    }
}

const authService = new AuthService();
export default authService;