import {Inngest} from "inngest";

export const inngest =new Inngest({id:"vistara",
name:"Vistara",
credentials:{
    gemini:{
    apiKey:process.env.GEMINI_API_KEY
    }
}
})