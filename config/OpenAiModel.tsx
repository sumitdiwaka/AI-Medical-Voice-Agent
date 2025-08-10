import OpenAI from "openai";


export const  openai = new OpenAI({
    baseURL:'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENAI_ROUTER_API_KEY
});
