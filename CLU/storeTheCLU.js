// store the CLU details
const url = "https://sujanbiswas.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-10-01-preview";
const config = {
    headers: {
        "Ocp-Apim-Subscription-Key": "8c3cb078db5b43fda11c6f9e67ce308a",
        "Content-Type": "application/json"
    }
};
const getData = (text)=>{
    return {
        
            kind: "Conversation",
            analysisInput: {
                conversationItem: {
                    id: "1",
                    text: text,
                    modality: "text",
                    language: "en-US",
                    participantId: "1"
                }
            },
            parameters: {
                projectName: "travelBotCLU",
                verbose: true,
                deploymentName: "TravelBot",
                stringIndexType: "TextElement_V8"
            }
    }
}

module.exports.url = url;
module.exports.config = config;
module.exports.getData = getData;
