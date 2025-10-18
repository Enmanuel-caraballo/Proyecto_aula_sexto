import express, { response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();

// const configuration = new configuration({
//   apiKey: process.env.OPEN_API_KEY
// })

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) =>{
  res.status(200).send({
    message: 'Hello World'
  });
});

app.post('/', async (req, res) =>{
try {
  const prompt = req.body.prompt;
 // console.log("API Key cargada:", process.env.OPEN_API_KEY ? "✅ Sí" : "❌ No");

  const response = await openai.chat.completions.create({

     model: "gpt-4o-mini",
     messages: [
      {role: "system", content: "Eres un asistente útil y amable"},
      {role: "user", content: prompt}
     ],
    //  prompt: `${prompt}`,
      temperature: 0.7,
     max_completion_tokens: 3000,
    //  top_p: 1,
    //  frequency_penalty: 0.5,
    //  presence_penalty: 0,

  })

  res.status(200).send({
    bot: response.choices[0].message.content,
    // bot: response.data.choices[0].text
  })


} catch (error) {
  console.log(error);
  res.status(500).send({error});
}
});



// app.post("/generation", async (req, res) =>{
//   try {
//     const prompt = req.body.prompt;

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {role: "system", content: "Eres un asistente util"},
//         {role: "user", content: prompt},

//       ],
//     });

//     res.status(200).send({
//       response: completion.choices[0].message.content,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({error: error.message});
//   }
// });


app.listen(3000, ()=> console.log('Server is runnig on port http://localhost:3000'));
