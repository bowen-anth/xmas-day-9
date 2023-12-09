/** uncomment one of these **/
import OpenAI from "openai"
// import { HfInference } from '@huggingface/inference'

const dialogModal = document.getElementById('dialog-modal')
const imageContainer = document.getElementById('image-container')
const generatedImage = document.getElementById('generatedImage')
const userInput = document.getElementById('user-input')
const btnSend = document.querySelector('.btn-send')
//openai stuff
const apiKey = process.env.OPENAI_API_KEY
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

async function handleSubmit () {
    event.preventDefault()
    const inputtedText = userInput.value
    dialogModal.close()
// Chat GPT API Call *Brrrrrr'ing Brrrrr'ing*
    // const image = await openai.images.generate({ 
    //     model: "dall-e-3", 
    //     prompt: inputtedText
    // });
    // const image_url = image.data[0].url;
    // console.log(image_url)
    // console.log(userInput.value)

    // generatedImage.src = image_url
    // imageContainer.style.display = "block";
    // HF api call
const HFInference = (
    await import("https://cdn.skypack.dev/@huggingface/inference@2.0.0")
  ).HfInference;
  const TOKEN = process.env.HUGGING_FACE_TOKEN;
  const hf = new HFInference(TOKEN);
  const blob = await hf.textToImage({
    inputs: inputtedText,
    parameters: {
      negative_prompt: "easynegative",
    },
    model: "stabilityai/stable-diffusion-2",
  });
//   const tab = window.open((target = "_blank"));
//   tab.location.href = window.URL.createObjectURL(blob);
  generatedImage.src = window.URL.createObjectURL(blob);
}

    // async function blobToBase64(blob) {
    // return new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => resolve(reader.result);
    //     reader.onerror = reject;
    //     reader.readAsDataURL(blob);
    // })
    // }
    // const imageUrl = await blobToBase64(response)

btnSend.addEventListener('click', handleSubmit);

    /** show dialog on load **/
    dialogModal.show()


