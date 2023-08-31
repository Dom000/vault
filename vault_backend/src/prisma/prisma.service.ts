import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi';
import { OnModuleInit } from "../../interface/module.init"

@Service()
export class PrismaService extends PrismaClient
    implements OnModuleInit {

    async onModuleInit() {
        await this.$connect().then(() => {
            console.log("Database Connected==========🔗🔗🔗🔗🔗🔗🔗🔗=======>");
        }).catch((error) => {
            console.log(error.message);
        });

    }


}






