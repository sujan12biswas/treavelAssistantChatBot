// store the Question Answering details
const url = "https://sujanbiswas.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=travelBotQuestionAnswering&api-version=2021-10-01&deploymentName=production";
const config = {
    headers: {
        "Ocp-Apim-Subscription-Key": "8c3cb078db5b43fda11c6f9e67ce308a",
        "Content-Type": "application/json"
    }
};
const getData = (text)=>{
    return {
        
            question: text
            
    }
}

module.exports.url = url;
module.exports.config = config;
module.exports.getData = getData;
