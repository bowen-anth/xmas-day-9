/** uncomment one of these **/
import OpenAI from "openai"
// import { HfInference } from '@huggingface/inference'

const dialogModal = document.getElementById('dialog-modal')
const imageContainer = document.getElementById('image-container')
const generatedImage = document.getElementById('generatedImage')
const userInput = document.getElementById('user-input')
const btnSend = document.querySelector('.btn-send')
//openai stuff
// const openai = require('openai');
const apiKey = process.env.OPENAI_API_KEY
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

async function handleSubmit () {
    event.preventDefault()
    const inputtedText = userInput.value
    dialogModal.close()
// Chat GPT API Call *Brrrrrr'ing Brrrrr'ing*
    const image = await openai.images.generate({ 
        model: "dall-e-3", 
        prompt: inputtedText
    });
    const image_url = image.data[0].url;
    console.log(image_url)
    console.log(userInput.value)

    generatedImage.src = image_url
    imageContainer.style.display = "block";
}
btnSend.addEventListener('click', handleSubmit);

    /** show dialog on load **/
    dialogModal.show()
/**
 * 🎄 Challenge:
 * 1. When a user hits submit, dialogModal 
 *    should be hidden.
 * 2. Use the inputted text to generate an image 
 *    for the e-card using an AI model. 
 *    ⚠️ Make sure the image is square.
 * 3. Render the image to imageContainer.
 * 
 * 🎁 hint.md for help!
 **/   

