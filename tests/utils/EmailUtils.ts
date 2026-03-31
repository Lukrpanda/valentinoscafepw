import { MailSlurp } from 'mailslurp-client';

export class mibandejadeentrada {

    private mailslurp: MailSlurp;
    constructor(){
       this.mailslurp = new MailSlurp({ apiKey: process.env.MAIL_SLURP_API_KEY! });
        
    }

    public async creandoInbox(){

        const inbox = await this.mailslurp.inboxController.createInboxWithDefaults();
        return inbox;


    }

    public async obtenerEmail(inboxId: string) {

        const email = await this.mailslurp.waitForLatestEmail(inboxId, 30000);
        return email;   

    }





}
