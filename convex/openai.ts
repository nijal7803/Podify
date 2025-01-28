// import { action } from "./_generated/server";
// import { v } from "convex/values";

// import OpenAI from "openai";
// import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// })

// export const generateAudioAction = action({
//   args: { input: v.string(), voice: v.string() },
//   handler: async (_, { voice, input }) => {
//     const mp3 = await openai.audio.speech.create({
//       model: "tts-1",
//       voice: voice as SpeechCreateParams['voice'],
//       input,
//     });

//     const buffer = await mp3.arrayBuffer();
    
//     return buffer;
//   },
// });

// export const generateThumbnailAction = action({
//   args: { prompt: v.string() },
//   handler: async (_, { prompt }) => {
//     const response = await openai.images.generate({
//       model: 'dall-e-3',
//       prompt,
//       size: '1024x1024',
//       quality: 'standard',
//       n: 1,
//     })

//     const url = response.data[0].url;

//     if(!url) {
//       throw new Error('Error generating thumbnail');
//     }

//     const imageResponse = await fetch(url);
//     const buffer = await imageResponse.arrayBuffer();
//     return buffer;
//   }
// })

"use node"
import { action } from "./_generated/server";
import { v } from "convex/values";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

export const generateAudioAction = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (_, { voice, input }) => {
    const outputPath = path.join("/tmp", "output.wav"); // Temporary file path for generated audio

    return new Promise((resolve, reject) => {
      // Run Coqui TTS CLI command
      const ttsProcess = spawn("tts", [
        "--text",
        input,
        "--model_name",
        voice || "tts_models/en/ljspeech/tacotron2", // Use a default model if no voice specified
        "--out_path",
        outputPath,
      ]);

      ttsProcess.on("close", (code) => {
        if (code === 0) {
          // Read the generated audio file
          fs.readFile(outputPath, (err, data) => {
            if (err) {
              reject(new Error("Error reading generated audio file."));
            } else {
              resolve(data); // Return the audio file as a buffer
            }
            // Clean up the temporary file
            fs.unlinkSync(outputPath);
          });
        } else {
          reject(new Error("Error generating audio with Coqui TTS."));
        }
      });

      ttsProcess.on("error", (err) => {
        reject(new Error(`Failed to execute Coqui TTS: ${err.message}`));
      });
    });
  },
});

export const generateThumbnailAction = action({
  args: { prompt: v.string() },
  handler: async (_, { prompt }) => {
    throw new Error("Thumbnail generation using Coqui TTS is not supported.");
  },
});
