const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");

//const OPENAI_API_KEY = "sk-proj-wDGIadIKxJLNsl385W3WT3BlbkFJFOsg5AvJX3iQ1TofrmN4";

 const updateImageCard = (imgDataArray) => {
    const imgCard = imageGallery.querySelectorAll(".img-card");[index];
    const imgElement = imgCard.querySelector("img");

    //Set the image source to the AI-generated image data
    const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`;
    imgElement.src = aiGeneratedImg;

    //When the image is loaded, remove the loading class
    imgElement.onload = () => {
        imgCard.classList.remove("loading");
    }

 }

const generateAiImages = async (userPrompt, userImageQuantity) => {
    try {
        // Send a request to the OpenAI to generate images based on user inputs
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: parseInt(userImageQuantity),
                size: "512x512",
                response_format: "b64_json"
            })
        });

        if(!response.ok) throw new Error("Failed to generate images! Please try again.");

        const {data} = await response.json(); //Get data from the response
        updateImageCard([...data]);
    } catch (error) {
        alert(error.message);
    }
}

const handleFormSubmission = (e) => {
    e.preventDefault();

    //Get user input and image quantity values from the form
    const userPrompt = e.srcElement[0].value;
    const userImageQuantity = e.srcElement[1].value;

    //Creating HTML markup for image cards with loading state
    const imgCardMarkup = Array.form({length: userImageQuantity}, () =>
        `<div class="img-card loading">
            <img src="images/loader.svg" alt="image">
            <a href="#" class="download-btn">
                <img src="images/download.svg" alt="download icon">
            </a>
        </div>`
    ).join("");

    imageGallery.innerHTML = imgCardMarkup;
    generateAiImages(userPrompt, userImageQuantity);
}


generateForm.addEventListener("submit", handleFormSubmission);